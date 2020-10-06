import { Component } from '../lib/preact.js';
import { html } from '../Helpers.js';
import {publicState, localState} from '../Main.js';
import Identicon from './Identicon.js';
import {translate as t} from '../Translation.js';
import Session from '../Session.js';
import Fuse from '../lib/fuse.basic.esm.min.js';

class SearchBox extends Component {
  constructor() {
    super();
    this.eventListeners = {};
    this.follows = {};
    this.state = {results:[]};
    this.debouncedIndexAndSearch = _.debounce(() => {
      const options = {keys: ['name'], includeScore: true, includeMatches: true, threshold: 0.3};
      this.fuse = new Fuse(Object.values(this.follows), options);
      this.search();
    }, 200);
  }

  addEntry(key) {
    if (this.follows[key]) return;
    this.follows[key] = {key};
    publicState.user(key).get('profile').get('name').on((name, a, b, e) => {
      this.eventListeners[key] = e;
      this.follows[key].name = name;
      this.debouncedIndexAndSearch();
    });
  }

  getFollows() {
    this.addEntry(Session.getKey().pub);
    publicState.user(Session.getKey().pub).get('follow').map().on((follows, key, b, e) => {
      this.eventListeners['follow'] = e;
      if (follows) {
        this.addEntry(key);
      } else {
        delete this.follows[key];
        this.eventListeners[key] && this.eventListeners[key].off();
      }
    });
  }

  onInput() {
    this.search();
  }

  componentDidMount() {
    this.getFollows();
    localState.get('activeRoute').on((a,b,c,e) => {
      this.eventListeners['activeRoute'] = e;
      $(this.base).find('input').val('');
      this.setState({results:[]});
    });
    this.adjustResultsPosition();
  }

  componentDidUpdate() {
    this.adjustResultsPosition();
  }

  adjustResultsPosition() {
    const input = $(this.base).find('input');
    this.offsetLeft = input[0].offsetLeft;
  }

  componentWillUnmount() {
    Object.values(this.eventListeners).forEach(e => e.off());
  }

  onSubmit(e) {
    e.preventDefault();
    const links = $(this.base).find('a');
    links.length && links[0].click();
    $(this.base).find('input').blur();
  }

  search() {
    const input = $(this.base).find('input');
    const query = input.val();
    if (query && this.fuse) {
      const results = this.fuse.search(query).slice(0,5);
      if (results.length) {
        $(document).off('keyup').on('keyup', e => {
          if (e.key === "Escape") { // escape key maps to keycode `27`
            $(document).off('keyup');
            input.val('');
            this.setState({results:[]});
          }
        });
      }
      this.setState({results});
    } else {
      this.setState({results:[]});
    }
  }

  render() {
    return html`
      <div class="search-box hidden-xs">
        <form onSubmit=${e => this.onSubmit(e)}><input type="text" placeholder=${t('search')} onInput=${() => this.onInput()}/></form>
        <div class="search-box-results" style="left: ${this.offsetLeft || ''}">
          ${this.state.results.map(r => {
            const i = r.item;
            return html`
              <a href="/profile/${i.key}"><${Identicon} str=${i.key} width=40/> ${i.name || ''}</a>
            `;
          })}
        </div>
      </div>
    `;
  }
}

export default SearchBox;