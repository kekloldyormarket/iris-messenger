(window.webpackJsonp=window.webpackJsonp||[]).push([[8],{nsvG:function(e,n,t){"use strict";function r(e){return r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},r(e)}function o(){return o=Object.assign||function(e){for(var n=1;n<arguments.length;n++){var t=arguments[n];for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(e[r]=t[r])}return e},o.apply(this,arguments)}function i(e,n){return function(e){if(Array.isArray(e))return e}(e)||function(e,n){var t=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null==t)return;var r,o,i=[],u=!0,a=!1;try{for(t=t.call(e);!(u=(r=t.next()).done)&&(i.push(r.value),!n||i.length!==n);u=!0);}catch(e){a=!0,o=e}finally{try{u||null==t.return||t.return()}finally{if(a)throw o}}return i}(e,n)||function(e,n){if(!e)return;if("string"==typeof e)return u(e,n);var t=Object.prototype.toString.call(e).slice(8,-1);"Object"===t&&e.constructor&&(t=e.constructor.name);if("Map"===t||"Set"===t)return Array.from(e);if("Arguments"===t||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t))return u(e,n)}(e,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function u(e,n){(null==n||n>e.length)&&(n=e.length);for(var t=0,r=new Array(n);t<n;t++)r[t]=e[t];return r}function a(e,n){for(var t=0;t<n.length;t++){var r=n[t];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function s(e,n){return s=Object.setPrototypeOf||function(e,n){return e.__proto__=n,e},s(e,n)}function c(e){var n=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}();return function(){var t,r=d(e);if(n){var o=d(this).constructor;t=Reflect.construct(r,arguments,o)}else t=r.apply(this,arguments);return l(this,t)}}function l(e,n){if(n&&("object"===r(n)||"function"==typeof n))return n;if(void 0!==n)throw new TypeError("Derived constructors may only return object or undefined");return function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e)}function d(e){return d=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)},d(e)}function f(e){return function(e){return"object"===r(e)&&null!==e}(e)&&"postMessage"in e&&"function"==typeof e.postMessage}t.r(n),t.d(n,"default",(function(){return _}));var p=t("/ieh"),y=t.n(p),h=t("nGfp"),v=t("jzLy"),b=t.n(v),w=function(e,n,t,r){return new(t||(t=Promise))((function(o,i){function u(e){try{s(r.next(e))}catch(e){i(e)}}function a(e){try{s(r.throw(e))}catch(e){i(e)}}function s(e){var n;e.done?o(e.value):(n=e.value,n instanceof t?n:new t((function(e){e(n)}))).then(u,a)}s((r=r.apply(e,n||[])).next())}))},_=function(e){function n(e,n){var t;if((t=l.call(this))._network=n,t._publicKey=null,t._popup=null,t._handlerAdded=!1,t._nextRequestId=1,t._autoApprove=!1,t._responsePromises=new Map,t.handleMessage=function(e){var n;if(t._injectedProvider&&e.source===window||e.origin===(null===(n=t._providerUrl)||void 0===n?void 0:n.origin)&&e.source===t._popup)if("connected"===e.data.method){var r=new h.PublicKey(e.data.params.publicKey);t._publicKey&&t._publicKey.equals(r)||(t._publicKey&&!t._publicKey.equals(r)&&t.handleDisconnect(),t._publicKey=r,t._autoApprove=!!e.data.params.autoApprove,t.emit("connect",t._publicKey))}else if("disconnected"===e.data.method)t.handleDisconnect();else if(e.data.result||e.data.error){var o=t._responsePromises.get(e.data.id);if(o){var u=i(o,2),a=u[1];e.data.result?(0,u[0])(e.data.result):a(new Error(e.data.error))}}},t._beforeUnload=function(){t.disconnect()},f(e))t._injectedProvider=e;else{if("string"!=typeof e)throw new Error("provider parameter must be an injected provider or a URL string.");t._providerUrl=new URL(e),t._providerUrl.hash=new URLSearchParams({origin:window.location.origin,network:t._network}).toString()}return t}!function(e,n){if("function"!=typeof n&&null!==n)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(n&&n.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),Object.defineProperty(e,"prototype",{writable:!1}),n&&s(e,n)}(n,e);var t,r,u,l=c(n);return t=n,(r=[{key:"handleConnect",value:function(){var e,n=this;return this._handlerAdded||(this._handlerAdded=!0,window.addEventListener("message",this.handleMessage),window.addEventListener("beforeunload",this._beforeUnload)),this._injectedProvider?new Promise((function(e){n.sendRequest("connect",{}),e()})):(window.name="parent",this._popup=window.open(null===(e=this._providerUrl)||void 0===e?void 0:e.toString(),"_blank","location,resizable,width=460,height=675"),new Promise((function(e){n.once("connect",e)})))}},{key:"handleDisconnect",value:function(){var e=this;this._handlerAdded&&(this._handlerAdded=!1,window.removeEventListener("message",this.handleMessage),window.removeEventListener("beforeunload",this._beforeUnload)),this._publicKey&&(this._publicKey=null,this.emit("disconnect")),this._responsePromises.forEach((function(n,t){var r=i(n,2)[1];e._responsePromises.delete(t),r(new Error("Wallet disconnected"))}))}},{key:"sendRequest",value:function(e,n){return w(this,void 0,void 0,(function*(){var t=this;if("connect"!==e&&!this.connected)throw new Error("Wallet not connected");var r=this._nextRequestId;return++this._nextRequestId,new Promise((function(i,u){var a,s,c,l;t._responsePromises.set(r,[i,u]),t._injectedProvider?t._injectedProvider.postMessage({jsonrpc:"2.0",id:r,method:e,params:o({network:t._network},n)}):(null===(a=t._popup)||void 0===a||a.postMessage({jsonrpc:"2.0",id:r,method:e,params:n},null!==(c=null===(s=t._providerUrl)||void 0===s?void 0:s.origin)&&void 0!==c?c:""),t.autoApprove||null===(l=t._popup)||void 0===l||l.focus())}))}))}},{key:"publicKey",get:function(){return this._publicKey}},{key:"connected",get:function(){return null!==this._publicKey}},{key:"autoApprove",get:function(){return this._autoApprove}},{key:"connect",value:function(){return w(this,void 0,void 0,(function*(){this._popup&&this._popup.close(),yield this.handleConnect()}))}},{key:"disconnect",value:function(){return w(this,void 0,void 0,(function*(){this._injectedProvider&&(yield this.sendRequest("disconnect",{})),this._popup&&this._popup.close(),this.handleDisconnect()}))}},{key:"sign",value:function(e,n){return w(this,void 0,void 0,(function*(){if(!(e instanceof Uint8Array))throw new Error("Data must be an instance of Uint8Array");var t=yield this.sendRequest("sign",{data:e,display:n});return{signature:b.a.decode(t.signature),publicKey:new h.PublicKey(t.publicKey)}}))}},{key:"signTransaction",value:function(e){return w(this,void 0,void 0,(function*(){var n=yield this.sendRequest("signTransaction",{message:b.a.encode(e.serializeMessage())}),t=b.a.decode(n.signature),r=new h.PublicKey(n.publicKey);return e.addSignature(r,t),e}))}},{key:"signAllTransactions",value:function(e){return w(this,void 0,void 0,(function*(){var n=yield this.sendRequest("signAllTransactions",{messages:e.map((function(e){return b.a.encode(e.serializeMessage())}))}),t=n.signatures.map((function(e){return b.a.decode(e)})),r=new h.PublicKey(n.publicKey);return e=e.map((function(e,n){return e.addSignature(r,t[n]),e}))}))}},{key:"diffieHellman",value:function(e){return w(this,void 0,void 0,(function*(){if(!(e instanceof Uint8Array))throw new Error("Data must be an instance of Uint8Array");return yield this.sendRequest("diffieHellman",{publicKey:e})}))}}])&&a(t.prototype,r),u&&a(t,u),Object.defineProperty(t,"prototype",{writable:!1}),n}(y.a)}}]);
//# sourceMappingURL=8.chunk.31cc3.js.map