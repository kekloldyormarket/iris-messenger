import Gun from 'gun';
import 'gun/sea';
import 'gun/nts.js';
import 'gun/lib/open';
import 'gun/lib/radix';
import 'gun/lib/radisk';
import 'gun/lib/store';
import 'gun/lib/rindexed';
import _ from 'lodash-es';

import PeerManager from './PeerManager.js';
import iris from 'iris-lib';
import Helpers from './Helpers.js';

const State = {
  init(publicOpts) {
    Gun.log.off = true;
    const o = Object.assign({ peers: PeerManager.getRandomPeers(), localStorage: false, retry:Infinity }, publicOpts);
    this.public = Gun(o);
    if (publicOpts && publicOpts.peers) {
      publicOpts.peers.forEach(url => PeerManager.addPeer({url}));
    }
    this.local = Gun({peers: [], file: 'State.local', multicast:false, localStorage: false}).get('state');
    if (Helpers.isElectron) {
      this.electron = Gun({peers: ['http://localhost:8768/gun'], file: 'State.electron', multicast:false, localStorage: false}).get('state');
    }
    this.blockedUsers = {};

    // Is this the right place for this?
    this.local.get('block').map().on((isBlocked, user) => {
      if (isBlocked === this.blockedUsers[user]) { return; }
      if (isBlocked) {
        this.blockedUsers[user] = isBlocked;
        State.local.get('groups').map().once((v, k) => {
          State.local.get('groups').get(k).get(user).put(false);
        });
      } else {
        delete this.blockedUsers[user];
      }
    });

    window.State = this;
    iris.util.setPublicState && iris.util.setPublicState(this.public);
  },

  getBlockedUsers() {
    return this.blockedUsers;
  },

  group(groupNode = 'everyone') {
    const _this = this;
    return {
      get(path, callback) {
        requestAnimationFrame(() => {
          const follows = {};
          if (typeof groupNode === 'string') {
            groupNode = _this.local.get('groups').get(groupNode);
          }
          groupNode.map((isFollowing, user) => {
            if (_this.blockedUsers[user]) { return; } // TODO: allow to specifically query blocked users?
            if (follows[user] && follows[user] === isFollowing) { return; }
            follows[user] = isFollowing;
            if (isFollowing) { // TODO: callback on unfollow, for unsubscribe
              let node = State.public.user(user);
              if (path && path !== '/') {
                node = _.reduce(path.split('/'), (sum, s) => sum.get(decodeURIComponent(s)), node);
              }
              callback(node, user);
            }
          })
        });
      },

      map(path, callback) {
        this.get(path, (node, from) => node.map((...args) => callback(...args, from)));
      },

      on(path, callback) {
        this.get(path, (node, from) => node.on((...args) => callback(...args, from)));
      }
    }
  },
};

export default State;
