(() => {
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[Object.keys(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };

  // tsBuild/Storage.js
  var require_Storage = __commonJS({
    "tsBuild/Storage.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.StorageApi = exports.InternalStorageApi = exports.localStorage = void 0;
      function getLocalStorage() {
        if (window.localStorage)
          return window.localStorage;
        if (window.$Dr?.localStorage)
          return window.$Dr.localStorage;
        const frame = document.createElement("frame");
        frame.src = "about:blank";
        document.body.appendChild(frame);
        let localStorage = Object.getOwnPropertyDescriptor(frame.contentWindow, "localStorage");
        frame.remove();
        Object.defineProperty(window, "localStorage", localStorage);
        localStorage = window.localStorage;
        delete window.localStorage;
        return localStorage;
      }
      exports.localStorage = getLocalStorage();
      var storage = new class {
        pluginStorage;
        internalStorage;
        constructor() {
          this.pluginStorage = exports.localStorage.getItem("DrPluginStorage") || {};
          this.internalStorage = exports.localStorage.getItem("DrInternalStorage") || {};
        }
        getInternalData(key, defVal = null) {
          let data = this.internalStorage[key];
          return data === null ? defVal : data;
        }
        setInternalData(key, value) {
          const data = this.internalStorage;
          data[key] = value;
          exports.localStorage.setItem("DrInternalStorage", JSON.stringify(data));
        }
        deleteInternalData(key) {
          const data = this.internalStorage;
          if (!data[key])
            return;
          delete data[key];
          exports.localStorage.setItem("DrInternalStorage", JSON.stringify(data));
        }
        getData(plugin, key, defVal = null) {
          let data = this.pluginStorage[plugin]?.[key];
          return data === null ? defVal : data;
        }
        getAllData(plugin) {
          return this.pluginStorage[plugin];
        }
        setData(plugin, key, value) {
          let data = this.pluginStorage[plugin];
          if (!data)
            data = this.pluginStorage[plugin] = {};
          data[key] = value;
          this.pluginStorage[plugin] = data;
          exports.localStorage.setItem("DrPluginStorage", JSON.stringify(this.pluginStorage));
        }
        deleteData(plugin, key) {
          const data = this.pluginStorage[plugin];
          if (!data)
            return;
          delete data[key];
          this.pluginStorage[plugin] = data;
          exports.localStorage.setItem("DrPluginStorage", JSON.stringify(this.pluginStorage));
        }
      }();
      exports.InternalStorageApi = {
        getData: (key, defVal = null) => storage.getInternalData(key, defVal),
        setData: (key, value) => storage.setInternalData(key, value),
        deleteData: (key) => storage.deleteInternalData(key)
      };
      exports.StorageApi = {
        getData: (plugin, key, defVal = null) => storage.getData(plugin, key, defVal),
        getAllData: (plugin) => storage.getAllData(plugin),
        setData: (plugin, key, value) => storage.setData(plugin, key, value),
        deleteData: (plugin, key) => storage.deleteData(plugin, key)
      };
    }
  });

  // tsBuild/getModule.js
  var require_getModule = __commonJS({
    "tsBuild/getModule.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.default = (() => {
        if (window.webpackChunkdiscord_app.getModule)
          return window.webpackChunkdiscord_app.getModule;
        else {
          let getModule = function(filter, first = true) {
            let modules = [];
            function byPropsAll(...props) {
              const norm = getModule((m) => props.every((prop) => typeof m[prop] !== "undefined"), false);
              let def = [];
              for (const module2 of getModule((m) => props.every((prop) => typeof m.default?.[prop] !== "undefined"), false))
                def.push(module2.default);
              return [...norm, ...def];
            }
            function byDisplayName(displayName) {
              const norm = getModule((m) => m.default?.displayName === displayName, false);
              const type = getModule((m) => m.default?.type?.displayName === displayName, false);
              const rend = getModule((m) => m.default?.type?.render?.displayName === displayName, false);
              return [...norm, ...type, ...rend];
            }
            if (Array.isArray(filter))
              modules = byPropsAll(...filter);
            else if (typeof filter === "string")
              modules = byDisplayName(filter);
            else if (typeof filter === "function") {
              for (let ite in webpackExports.c) {
                if (!Object.hasOwnProperty.call(webpackExports.c, ite))
                  return;
                let ele = webpackExports.c[ite].exports;
                if (!ele)
                  continue;
                if (filter(ele))
                  modules.push(ele);
              }
            }
            if (first)
              return modules[0];
            return modules;
          };
          let webpackExports = window.webpackChunkdiscord_app.push([["DrDiscord"], {}, (e) => e]);
          Object.assign(getModule, {
            webpackExports,
            id: (num) => webpackExports.c[num],
            getId: (mod) => {
              let toReturn;
              for (let cs in webpackExports.c)
                if (webpackExports.c[cs].exports === mod)
                  toReturn = cs;
              return toReturn;
            }
          });
          window.webpackChunkdiscord_app.getModule = getModule;
          return getModule;
        }
      })();
    }
  });

  // tsBuild/React.js
  var require_React = __commonJS({
    "tsBuild/React.js"(exports) {
      "use strict";
      var __importDefault = exports && exports.__importDefault || function(mod) {
        return mod && mod.__esModule ? mod : { "default": mod };
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.ReactDOM = exports.React = void 0;
      var getModule_1 = __importDefault(require_getModule());
      exports.React = (0, getModule_1.default)(["createElement", "Fragment"]);
      exports.ReactDOM = (0, getModule_1.default)(["hydrate", "render"]);
    }
  });

  // tsBuild/Modal.js
  var require_Modal = __commonJS({
    "tsBuild/Modal.js"(exports) {
      "use strict";
      var __importDefault = exports && exports.__importDefault || function(mod) {
        return mod && mod.__esModule ? mod : { "default": mod };
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      var getModule_1 = __importDefault(require_getModule());
      var React_1 = require_React();
      var Markdown = (0, getModule_1.default)((m) => m.default?.displayName === "Markdown" && m.default.rules).default;
      var { Messages } = (0, getModule_1.default)(["Messages"], false)[1];
      var ConfirmationModal = (0, getModule_1.default)("ConfirmModal").default;
      var Button = (0, getModule_1.default)(["ButtonColors"]);
      var { openModal, closeModal, closeAllModals } = (0, getModule_1.default)(["openModal", "openModalLazy"]);
      var TextInput = (0, getModule_1.default)("TextInput").default;
      var { SingleSelect } = (0, getModule_1.default)(["SingleSelect"]);
      var TextArea = (0, getModule_1.default)("TextArea").default;
      exports.default = {
        openModal,
        closeModal,
        closeAllModals,
        elements: (0, getModule_1.default)(["ModalRoot"]),
        prompt: async (title, opts = {}) => {
          const { defaultValue = "", type = "input", options = [], ...other } = opts;
          let toReturn = defaultValue;
          return new Promise((resolve) => {
            openModal((props) => {
              if (props.transitionState === 2)
                resolve(null);
              return React_1.React.createElement(ConfirmationModal, { header: title, confirmButtonColor: Button.ButtonColors.BRAND, confirmText: Messages.OKAY, cancelText: Messages.CANCEL, onConfirm: () => resolve(toReturn), onCancel: () => resolve(null), ...props }, React_1.React.createElement(React_1.React.memo(() => {
                const [value, setValue] = React_1.React.useState(defaultValue);
                if (type.toLowerCase() === "input")
                  return React_1.React.createElement(TextInput, { ...other, value, onInput: (ele) => {
                    setValue(ele.target.value);
                    toReturn = ele.target.value;
                  } });
                if (type.toLowerCase() === "textarea")
                  return React_1.React.createElement(TextArea, { ...other, value, onChange: (val) => {
                    setValue(val);
                    toReturn = val;
                  } });
                if (type.toLowerCase() === "dropdown")
                  return React_1.React.createElement(SingleSelect, { ...other, value, options, onChange: (val) => {
                    setValue(val);
                    toReturn = val;
                  } });
              })));
            });
          });
        },
        showConfirmationModal: (title, content, options = {}) => {
          const emptyFunction = () => {
          };
          const { onConfirm = emptyFunction, onCancel = emptyFunction, confirmText = Messages.OKAY, cancelText = Messages.CANCEL, danger = false, key = void 0 } = options;
          if (!Array.isArray(content))
            content = [content];
          content = content.map((c) => typeof c === "string" ? React_1.React.createElement(Markdown, null, c) : c);
          return openModal((props) => {
            return React_1.React.createElement(ConfirmationModal, { header: title, confirmButtonColor: danger ? Button.ButtonColors.DANGER : Button.ButtonColors.BRAND, confirmText, cancelText, onConfirm, onCancel, ...props }, content);
          }, { modalKey: key });
        }
      };
    }
  });

  // tsBuild/patch.js
  var require_patch = __commonJS({
    "tsBuild/patch.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      var patches = {};
      function patch(name, module2, funcName, callback, opts = {}) {
        if (!name)
          throw new Error("Name is required (First argument)");
        if (!module2)
          throw new Error("Module is required (Second argument)");
        if (!funcName)
          throw new Error("FuncName is required (Third argument)");
        if (!callback)
          throw new Error("Callback is required (Fourth argument)");
        if (!module2[funcName])
          throw new Error("Function doesnt exist in Module");
        const { type = "after" } = opts;
        const original = module2[funcName];
        if (!module2[funcName].__originalFunction)
          module2[funcName].__originalFunction = original;
        if (!module2[funcName].__patches)
          module2[funcName].__patches = [];
        if (type === "after")
          module2[funcName] = function() {
            const result = original.apply(this, arguments);
            callback.apply(this, [[...arguments], result, this]);
            return result;
          };
        else if (type === "before")
          module2[funcName] = function() {
            callback.apply(this, [[...arguments], this]);
            return original.apply(this, arguments);
          };
        else if (type === "instead")
          module2[funcName] = function() {
            return callback.apply(this, [[...arguments], original, this]);
          };
        else
          throw new Error(`Unknown patch type: ${type}`);
        if (Object.keys(original).length)
          for (const key of Object.keys(original))
            module2[funcName][key] = original[key];
        const position = module2[funcName].__patches.push([module2, funcName, callback, type]) - 1;
        let didUnpatch = false;
        function unpatch() {
          if (didUnpatch)
            return;
          didUnpatch = true;
          delete patches[name];
          module2[funcName] = module2[funcName].__originalFunction;
          module2[funcName].__patches.splice(position, 1);
          const oldPatches = module2[funcName].__patches;
          module2[funcName].__patches = [];
          for (const _patch of oldPatches)
            setImmediate(patch, ..._patch);
        }
        if (!name.startsWith("DrDiscordInternal")) {
          if (patches[name])
            patches[name].push(unpatch);
          else
            patches[name] = [unpatch];
        }
        return () => unpatch();
      }
      Object.assign(patch, {
        before: (name, module2, funcName, callback, opts = {}) => patch(name, module2, funcName, callback, { ...opts, type: "before" }),
        after: (name, module2, funcName, callback, opts = {}) => patch(name, module2, funcName, callback, { ...opts, type: "after" }),
        instead: (name, module2, funcName, callback, opts = {}) => patch(name, module2, funcName, callback, { ...opts, type: "instead" }),
        patches,
        unpatchAll: (name) => {
          if (name.startsWith("DrDiscordInternal"))
            return "DO NOT UNPATCH INTERNAL FUNCTIONS!";
          let Patches = patches[name];
          if (!Patches)
            return;
          if (Array.isArray(Patches))
            for (const Patch of Patches)
              Patch();
        },
        quick: (module2, funcName, callback, opts = {}) => {
          let id = (Math.random() * Date.now()).toString();
          const patched = patch(id, module2, funcName, callback, opts);
          delete patches[id];
          return patched;
        }
      });
      exports.default = patch;
    }
  });

  // tsBuild/Util.js
  var require_Util = __commonJS({
    "tsBuild/Util.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.waitFor = exports.getOwnerInstance = exports.getReactInstance = exports.sleep = void 0;
      var sleep = (time) => new Promise((resolve) => setTimeout(resolve, time));
      exports.sleep = sleep;
      var getReactInstance = (element) => {
        if (element.__reactInternalInstance$)
          return element.__reactInternalInstance$;
        const ReactKey = Object.keys(element).find((k) => k.startsWith("__reactInternalInstance") || k.startsWith("__reactFiber"));
        return element[ReactKey] || null;
      };
      exports.getReactInstance = getReactInstance;
      var getOwnerInstance = (element) => {
        const sn = element.__reactFiber$?.return?.stateNode;
        if (sn && sn.forceUpdate)
          return sn;
      };
      exports.getOwnerInstance = getOwnerInstance;
      var waitFor = async (querySelector) => {
        let elem;
        while (!(elem = document.querySelector(querySelector)))
          await (0, exports.sleep)(1);
        return elem;
      };
      exports.waitFor = waitFor;
    }
  });

  // tsBuild/i18n.js
  var require_i18n = __commonJS({
    "tsBuild/i18n.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.languages = void 0;
      exports.languages = {
        global: {
          name: "Discord Re-envisioned"
        },
        en: {
          settings: "Settings",
          misc: "Misc"
        }
      };
      var i18n = new Proxy(exports.languages[navigator.language.split("-", 1)[0]], {
        get: (target, key) => {
          const lang = navigator.language.split("-", 1)[0];
          return exports.languages.global[key] || exports.languages[lang][key] || exports.languages.en[key] || key;
        }
      });
      exports.default = i18n;
    }
  });

  // tsBuild/ui/PanelButton.js
  var require_PanelButton = __commonJS({
    "tsBuild/ui/PanelButton.js"(exports) {
      "use strict";
      var __importDefault = exports && exports.__importDefault || function(mod) {
        return mod && mod.__esModule ? mod : { "default": mod };
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.Context = void 0;
      var getModule_1 = __importDefault(require_getModule());
      var React_1 = require_React();
      var i18n_1 = __importDefault(require_i18n());
      var PanelButton = (0, getModule_1.default)("PanelButton").default;
      var { openContextMenu, closeContextMenu } = (0, getModule_1.default)(["openContextMenu"]);
      var Menu = (0, getModule_1.default)(["MenuItem"]);
      var Discord = (0, getModule_1.default)("Discord").default;
      exports.Context = React_1.React.memo(() => {
        React_1.React.createElement(Menu.default, { onClose: closeContextMenu, navId: "DrApi-context-menu" }, React_1.React.createElement(Menu.MenuItem, { id: "settings", label: i18n_1.default.settings }), React_1.React.createElement(Menu.MenuSeparator, null), React_1.React.createElement(Menu.MenuItem, { id: "misc", label: i18n_1.default.misc }));
      });
      exports.default = React_1.React.memo(() => {
        return React_1.React.createElement(PanelButton, { icon: () => React_1.React.createElement("svg", { width: "22", height: "22", viewBox: "0 0 22 22", fill: "currentColor" }, React_1.React.createElement("path", { d: "M11.1903 7.802C11.1903 8.426 11.1003 9.092 10.9203 9.8C10.7403 10.496 10.4883 11.192 10.1643 11.888C9.84032 12.572 9.43832 13.232 8.95832 13.868C8.49032 14.492 7.95632 15.044 7.35632 15.524C6.75632 15.992 6.09632 16.37 5.37632 16.658C4.66832 16.946 3.91232 17.09 3.10832 17.09C2.94032 17.09 2.77232 17.078 2.60432 17.054C2.43632 17.042 2.26832 17.024 2.10032 17C2.42432 15.344 2.74232 13.73 3.05432 12.158C3.17432 11.498 3.30032 10.814 3.43232 10.106C3.56432 9.386 3.69032 8.678 3.81032 7.982C3.93032 7.286 4.04432 6.62 4.15232 5.984C4.27232 5.348 4.36832 4.772 4.44032 4.256C4.95632 4.16 5.47832 4.07 6.00632 3.986C6.53432 3.902 7.07432 3.86 7.62632 3.86C8.27432 3.86 8.82032 3.962 9.26432 4.166C9.72032 4.37 10.0863 4.652 10.3623 5.012C10.6503 5.372 10.8603 5.792 10.9923 6.272C11.1243 6.752 11.1903 7.262 11.1903 7.802ZM6.94232 6.398C6.81032 7.106 6.67232 7.784 6.52832 8.432C6.38432 9.08 6.24032 9.734 6.09632 10.394C5.95232 11.054 5.80832 11.744 5.66432 12.464C5.52032 13.184 5.38232 13.97 5.25032 14.822C5.53832 14.63 5.81432 14.372 6.07832 14.048C6.35432 13.712 6.61232 13.328 6.85232 12.896C7.09232 12.464 7.30832 12.008 7.50032 11.528C7.70432 11.048 7.87832 10.58 8.02232 10.124C8.16632 9.668 8.27432 9.242 8.34632 8.846C8.43032 8.45 8.47232 8.108 8.47232 7.82C8.47232 7.376 8.34632 7.028 8.09432 6.776C7.85432 6.524 7.47032 6.398 6.94232 6.398ZM10.0456 17.018C10.3696 15.422 10.6816 13.862 10.9816 12.338C11.0896 11.69 11.2096 11.018 11.3416 10.322C11.4736 9.614 11.5936 8.918 11.7016 8.234C11.8216 7.538 11.9296 6.872 12.0256 6.236C12.1336 5.588 12.2176 5 12.2776 4.472C12.9616 4.256 13.6996 4.1 14.4916 4.004C15.2836 3.896 16.0696 3.842 16.8496 3.842C17.3176 3.842 17.7016 3.896 18.0016 4.004C18.3136 4.112 18.5536 4.268 18.7216 4.472C18.9016 4.664 19.0276 4.892 19.0996 5.156C19.1716 5.42 19.2076 5.714 19.2076 6.038C19.2076 6.518 19.1236 6.992 18.9556 7.46C18.7876 7.916 18.5596 8.354 18.2716 8.774C17.9956 9.182 17.6716 9.56 17.2996 9.908C16.9396 10.244 16.5496 10.52 16.1296 10.736C16.3456 11.216 16.5736 11.744 16.8136 12.32C17.0656 12.884 17.2996 13.424 17.5156 13.94C17.7556 14.54 18.0016 15.14 18.2536 15.74L15.4636 16.712C15.2236 15.944 15.0076 15.224 14.8156 14.552C14.7316 14.276 14.6476 13.994 14.5636 13.706C14.4796 13.406 14.4016 13.124 14.3296 12.86C14.2576 12.596 14.1976 12.362 14.1496 12.158C14.1016 11.942 14.0716 11.768 14.0596 11.636L13.8256 11.708C13.7536 12.092 13.6636 12.542 13.5556 13.058C13.4596 13.574 13.3696 14.072 13.2856 14.552C13.1776 15.116 13.0696 15.686 12.9616 16.262L10.0456 17.018ZM14.2756 9.206C14.5036 9.182 14.7796 9.086 15.1036 8.918C15.4396 8.75 15.7576 8.552 16.0576 8.324C16.3576 8.084 16.6156 7.838 16.8316 7.586C17.0476 7.334 17.1556 7.112 17.1556 6.92C17.1556 6.788 17.1136 6.686 17.0296 6.614C16.9456 6.53 16.8256 6.47 16.6696 6.434C16.5256 6.386 16.3636 6.356 16.1836 6.344C16.0036 6.332 15.8176 6.326 15.6256 6.326C15.4936 6.326 15.3556 6.332 15.2116 6.344C15.0796 6.344 14.9596 6.344 14.8516 6.344L14.2756 9.206Z" })), tooltipText: i18n_1.default.name });
      });
    }
  });

  // tsBuild/index.js
  var require_tsBuild = __commonJS({
    "tsBuild/index.js"(exports) {
      "use strict";
      var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
        if (k2 === void 0)
          k2 = k;
        Object.defineProperty(o, k2, { enumerable: true, get: function() {
          return m[k];
        } });
      } : function(o, m, k, k2) {
        if (k2 === void 0)
          k2 = k;
        o[k2] = m[k];
      });
      var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? function(o, v) {
        Object.defineProperty(o, "default", { enumerable: true, value: v });
      } : function(o, v) {
        o["default"] = v;
      });
      var __importStar = exports && exports.__importStar || function(mod) {
        if (mod && mod.__esModule)
          return mod;
        var result = {};
        if (mod != null) {
          for (var k in mod)
            if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k))
              __createBinding(result, mod, k);
        }
        __setModuleDefault(result, mod);
        return result;
      };
      var __importDefault = exports && exports.__importDefault || function(mod) {
        return mod && mod.__esModule ? mod : { "default": mod };
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      var Storage_1 = require_Storage();
      var getModule_1 = __importDefault(require_getModule());
      var Modal_1 = __importDefault(require_Modal());
      var patch_1 = __importDefault(require_patch());
      var React_1 = require_React();
      var Util = __importStar(require_Util());
      var PanelButton_1 = __importDefault(require_PanelButton());
      var i18n_1 = __importDefault(require_i18n());
      window.$Dr = {
        localStorage: Storage_1.localStorage,
        StorageApi: Storage_1.StorageApi,
        InternalStorageApi: Storage_1.InternalStorageApi,
        getModule: getModule_1.default,
        ReactDOM: React_1.ReactDOM,
        React: React_1.React,
        Modal: Modal_1.default,
        patch: patch_1.default,
        Util,
        i18n: i18n_1.default
      };
      window.DrApi = {
        Storage: Storage_1.StorageApi,
        getModule: getModule_1.default,
        ReactDOM: React_1.ReactDOM,
        React: React_1.React,
        Modal: Modal_1.default,
        patch: patch_1.default,
        Util,
        i18n: i18n_1.default
      };
      async function start() {
        const eleOI = Util.getOwnerInstance(await Util.waitFor(".panels-j1Uci_ > .container-3baos1"));
        (0, patch_1.default)("DrDiscordInternal-Panel-Patch", eleOI.__proto__, "render", (_, res) => {
          res.props.children[res.props.children.length - 1].props.children.unshift(React_1.React.createElement(PanelButton_1.default, null));
        });
        eleOI.forceUpdate();
      }
      start();
    }
  });
  require_tsBuild();
})();
