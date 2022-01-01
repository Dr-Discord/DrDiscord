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
          this.pluginStorage = JSON.parse(exports.localStorage.getItem("DrPluginStorage")) || {};
          this.internalStorage = JSON.parse(exports.localStorage.getItem("DrInternalStorage")) || {};
        }
        getInternalData(key, defVal = null) {
          let data = this.internalStorage[key];
          return data === void 0 ? defVal : data;
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
          const Content = React_1.React.memo(() => {
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
          });
          return new Promise((resolve) => {
            openModal((props) => {
              if (props.transitionState === 2)
                resolve(null);
              return React_1.React.createElement(ConfirmationModal, { header: title, confirmButtonColor: Button.ButtonColors.BRAND, confirmText: Messages.OKAY, cancelText: Messages.CANCEL, onConfirm: () => resolve(toReturn), onCancel: () => resolve(null), ...props }, React_1.React.createElement(Content, null));
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

  // tsBuild/i18n.js
  var require_i18n = __commonJS({
    "tsBuild/i18n.js"(exports) {
      "use strict";
      var __importDefault = exports && exports.__importDefault || function(mod) {
        return mod && mod.__esModule ? mod : { "default": mod };
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.languages = exports.Messages = void 0;
      var getModule_1 = __importDefault(require_getModule());
      exports.Messages = (0, getModule_1.default)(["Messages"], false)[1].Messages;
      exports.languages = {
        global: {
          name: "Discord Re-envisioned",
          vers: "0.0.1"
        },
        en: {
          settings: "Settings",
          misc: "Misc",
          banWarnNote: "Warning you can get banned if you arent careful!",
          enDevMode: "Enable Discord Developer Mode"
        }
      };
      var i18n = new Proxy(exports.languages[navigator.language.split("-", 1)[0]], {
        get: (target, key) => {
          const lang = navigator.language.split("-", 1)[0];
          return exports.languages.global[key] || exports.languages[lang][key] || exports.languages.en[key] || exports.Messages[key] || key;
        }
      });
      exports.default = i18n;
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

  // tsBuild/ui/Icons.js
  var require_Icons = __commonJS({
    "tsBuild/ui/Icons.js"(exports) {
      "use strict";
      var __importDefault = exports && exports.__importDefault || function(mod) {
        return mod && mod.__esModule ? mod : { "default": mod };
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.CustomCSS = exports.Themes = exports.Plugins = exports.Settings = void 0;
      var React_1 = require_React();
      var getModule_1 = __importDefault(require_getModule());
      exports.Settings = (0, getModule_1.default)("Gear").default;
      exports.Plugins = React_1.React.memo((props) => React_1.React.createElement("svg", {
        fill: "currentcolor",
        viewBox: "0 0 24 24",
        children: React_1.React.createElement("path", {
          d: "M20,20H4c-1.105,0-2-0.895-2-2V9c0-1.105,0.895-2,2-2h1V5c0-0.552,0.448-1,1-1h4c0.552,0,1,0.448,1,1v2h2V5 c0-0.552,0.448-1,1-1h4c0.552,0,1,0.448,1,1v2h1c1.105,0,2,0.895,2,2v9C22,19.105,21.105,20,20,20z"
        }),
        ...props
      }));
      exports.Themes = React_1.React.memo((props) => React_1.React.createElement("svg", {
        fill: "currentcolor",
        viewBox: "0 0 24 24",
        children: React_1.React.createElement("path", {
          d: "M 7.15625 3.0292969 C 6.3771406 3.0476719 5.6462969 3.5239219 5.3417969 4.2949219 L 4.2714844 7 L 17.623047 7 L 7.9375 3.1699219 C 7.68075 3.0684219 7.4159531 3.0231719 7.15625 3.0292969 z M 5 9 C 3.897 9 3 9.897 3 11 L 3 19 C 3 20.103 3.897 21 5 21 L 19 21 C 20.103 21 21 20.103 21 19 L 21 11 C 21 9.897 20.103 9 19 9 L 5 9 z M 17 11 L 18 11 C 18.552 11 19 11.448 19 12 L 19 18 C 19 18.552 18.552 19 18 19 L 17 19 C 16.448 19 16 18.552 16 18 L 16 12 C 16 11.448 16.448 11 17 11 z"
        }),
        ...props
      }));
      exports.CustomCSS = React_1.React.memo((props) => React_1.React.createElement("svg", {
        fill: "currentcolor",
        viewBox: "0 0 50 50",
        children: React_1.React.createElement("path", {
          d: "M 31.148438 -0.0625 L 12.121094 18.964844 C 11.828125 19.253906 11.746094 19.695313 11.910156 20.070313 C 13.597656 23.914063 14.882813 28.789063 14.039063 29.632813 C 12.15625 31.515625 10.292969 32.285156 8.492188 33.03125 C 7.011719 33.644531 5.609375 34.226563 4.472656 35.363281 C 0.640625 39.195313 -1.546875 45.554688 1.445313 48.550781 C 2.359375 49.460938 3.667969 49.941406 5.238281 49.941406 C 8.265625 49.941406 11.953125 48.210938 14.636719 45.527344 C 15.886719 44.277344 16.804688 42.339844 17.695313 40.46875 C 18.515625 38.746094 19.359375 36.96875 20.363281 35.964844 C 20.613281 35.71875 21.105469 35.589844 21.796875 35.589844 C 24.839844 35.589844 29.832031 38.046875 29.882813 38.070313 C 30.269531 38.261719 30.730469 38.1875 31.035156 37.882813 L 36.371094 32.542969 L 44.925781 23.988281 C 44.964844 23.957031 45.015625 23.914063 45.039063 23.890625 C 45.050781 23.878906 45.054688 23.859375 45.066406 23.847656 L 50.0625 18.851563 Z M 7 45 C 5.894531 45 5 44.105469 5 43 C 5 41.898438 5.894531 41 7 41 C 8.105469 41 9 41.898438 9 43 C 9 44.105469 8.105469 45 7 45 Z M 36.371094 29.714844 L 20.285156 13.628906 L 23.152344 10.761719 C 23.308594 11.242188 23.59375 11.707031 24.027344 12.144531 C 25.898438 14.011719 29.164063 12.085938 29.800781 11.679688 C 32.054688 10.246094 33.023438 10.28125 33.113281 10.332031 C 33.25 10.613281 33.164063 11.53125 31.996094 14.292969 L 31.917969 14.476563 C 30.910156 16.867188 31.84375 18.304688 32.484375 18.953125 C 33.546875 20.011719 35.027344 19.640625 36.214844 19.339844 C 37.277344 19.074219 38 18.925781 38.351563 19.277344 C 38.785156 19.710938 38.5 20.792969 38.246094 21.746094 C 37.933594 22.9375 37.609375 24.164063 38.449219 25.007813 C 38.980469 25.539063 39.617188 25.765625 40.277344 25.808594 Z"
        }),
        ...props
      }));
    }
  });

  // tsBuild/ui/SettingsModal.js
  var require_SettingsModal = __commonJS({
    "tsBuild/ui/SettingsModal.js"(exports) {
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
      exports.openSettings = void 0;
      var React_1 = require_React();
      var getModule_1 = __importDefault(require_getModule());
      var Modal_1 = __importDefault(require_Modal());
      var i18n_1 = __importDefault(require_i18n());
      var Icons = __importStar(require_Icons());
      function byDisplayName(displayName) {
        return (0, getModule_1.default)(displayName)?.default;
      }
      var { openModal, elements: MEs } = Modal_1.default;
      var Flex = byDisplayName("Flex");
      var Text = byDisplayName("Text");
      var FormTitle = byDisplayName("FormTitle");
      var TabBar = byDisplayName("TabBar");
      var SwitchItem = byDisplayName("SwitchItem");
      var Tabs = React_1.React.memo((props) => {
        const { page, setPage } = props;
        return React_1.React.createElement(TabBar, { selectedItem: page, onItemSelect: (e) => {
          setPage(e);
        }, className: "Dr-Settings-TabBar" }, React_1.React.createElement(TabBar.Item, { id: 0 }, React_1.React.createElement(Icons.Settings, null)), React_1.React.createElement(TabBar.Item, { id: 1 }, React_1.React.createElement(Icons.Themes, null)), React_1.React.createElement(TabBar.Item, { id: 2 }, React_1.React.createElement(Icons.Plugins, null)));
      });
      var Collapsable = React_1.React.memo((props) => {
        const { title, children } = props;
        const [isOpen, setOpen] = React_1.React.useState(false);
        const ref = React_1.React.useRef();
        React_1.React.useEffect(() => {
          window.ref = ref.current;
          ref.offsetHeight;
        });
        return React_1.React.createElement("div", { className: `Dr-Settings-Collapsable${isOpen ? " Open" : ""}` }, React_1.React.createElement("div", { className: "Dr-Settings-Collapsable-Title-Wrapper", onClick: () => {
          setOpen(!isOpen);
        } }, React_1.React.createElement(Text, { className: "Dr-Settings-Collapsable-Title" }, title)), React_1.React.createElement("div", { className: "Dr-Settings-Collapsable-Children-Wrapper", style: {
          height: isOpen ? "auto" : 0,
          overflow: "hidden"
        } }, React_1.React.createElement("div", { className: "Dr-Settings-Collapsable-Children", ref }, children)));
      });
      var General = React_1.React.memo((props) => {
        const [isDeveloper, setIsDeveloper] = React_1.React.useState($Dr.isDeveloper);
        return React_1.React.createElement(React_1.React.Fragment, null, React_1.React.createElement(Collapsable, { title: "General" }, React_1.React.createElement(SwitchItem, { note: i18n_1.default.banWarnNote, value: isDeveloper, onChange: (e) => {
          setIsDeveloper(e);
          $Dr.isDeveloper = e;
        } }, i18n_1.default.enDevMode)));
      });
      var SettingsPage = React_1.React.memo((props) => {
        const { mProps, PAGE, reactElement } = props;
        const [page, setPage] = React_1.React.useState(PAGE);
        return React_1.React.createElement(MEs.ModalRoot, { ...mProps, className: "Dr-Settings-Modal", size: MEs.ModalSize.LARGE }, React_1.React.createElement(MEs.ModalHeader, { separator: false }, React_1.React.createElement(Flex, null, React_1.React.createElement(Flex.Child, null, React_1.React.createElement(Flex.Child, null, React_1.React.createElement(FormTitle, { tag: "h4" }, i18n_1.default.name)), React_1.React.createElement(Text, null, "v", i18n_1.default.vers), React_1.React.createElement(Flex.Child, null)), React_1.React.createElement(Flex.Child, null, React_1.React.createElement(Tabs, { page, setPage })), React_1.React.createElement(Flex.Child, null, React_1.React.createElement(MEs.ModalCloseButton, { onClick: mProps.onClose })))), React_1.React.createElement(MEs.ModalContent, null, page == 0 ? React_1.React.createElement(General, null) : page == 1 ? "1" : page == 2 ? "2" : "3"));
      });
      var openSettings = (PAGE = 0, reactElement) => openModal((mProps) => React_1.React.createElement(SettingsPage, { mProps, PAGE, reactElement }));
      exports.openSettings = openSettings;
      exports.default = SettingsPage;
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
      var Modal_1 = __importDefault(require_Modal());
      var SettingsModal_1 = __importDefault(require_SettingsModal());
      var PanelButton = (0, getModule_1.default)("PanelButton").default;
      var { openContextMenu, closeContextMenu } = (0, getModule_1.default)(["openContextMenu"]);
      var Menu = (0, getModule_1.default)(["MenuItem"]);
      var Discord = (0, getModule_1.default)("Discord").default;
      exports.Context = React_1.React.memo(() => {
        return React_1.React.createElement(Menu.default, { onClose: closeContextMenu, navId: "DrApi-context-menu" }, React_1.React.createElement(Menu.MenuItem, { id: "settings", label: i18n_1.default.settings }), React_1.React.createElement(Menu.MenuSeparator, null), React_1.React.createElement(Menu.MenuItem, { id: "misc", label: i18n_1.default.misc }));
      });
      exports.default = React_1.React.memo(() => {
        return React_1.React.createElement(PanelButton, { icon: () => React_1.React.createElement("svg", { width: "22", height: "22", viewBox: "0 0 22 22", fill: "currentColor" }, React_1.React.createElement("path", { d: "M11.1903 7.802C11.1903 8.426 11.1003 9.092 10.9203 9.8C10.7403 10.496 10.4883 11.192 10.1643 11.888C9.84032 12.572 9.43832 13.232 8.95832 13.868C8.49032 14.492 7.95632 15.044 7.35632 15.524C6.75632 15.992 6.09632 16.37 5.37632 16.658C4.66832 16.946 3.91232 17.09 3.10832 17.09C2.94032 17.09 2.77232 17.078 2.60432 17.054C2.43632 17.042 2.26832 17.024 2.10032 17C2.42432 15.344 2.74232 13.73 3.05432 12.158C3.17432 11.498 3.30032 10.814 3.43232 10.106C3.56432 9.386 3.69032 8.678 3.81032 7.982C3.93032 7.286 4.04432 6.62 4.15232 5.984C4.27232 5.348 4.36832 4.772 4.44032 4.256C4.95632 4.16 5.47832 4.07 6.00632 3.986C6.53432 3.902 7.07432 3.86 7.62632 3.86C8.27432 3.86 8.82032 3.962 9.26432 4.166C9.72032 4.37 10.0863 4.652 10.3623 5.012C10.6503 5.372 10.8603 5.792 10.9923 6.272C11.1243 6.752 11.1903 7.262 11.1903 7.802ZM6.94232 6.398C6.81032 7.106 6.67232 7.784 6.52832 8.432C6.38432 9.08 6.24032 9.734 6.09632 10.394C5.95232 11.054 5.80832 11.744 5.66432 12.464C5.52032 13.184 5.38232 13.97 5.25032 14.822C5.53832 14.63 5.81432 14.372 6.07832 14.048C6.35432 13.712 6.61232 13.328 6.85232 12.896C7.09232 12.464 7.30832 12.008 7.50032 11.528C7.70432 11.048 7.87832 10.58 8.02232 10.124C8.16632 9.668 8.27432 9.242 8.34632 8.846C8.43032 8.45 8.47232 8.108 8.47232 7.82C8.47232 7.376 8.34632 7.028 8.09432 6.776C7.85432 6.524 7.47032 6.398 6.94232 6.398ZM10.0456 17.018C10.3696 15.422 10.6816 13.862 10.9816 12.338C11.0896 11.69 11.2096 11.018 11.3416 10.322C11.4736 9.614 11.5936 8.918 11.7016 8.234C11.8216 7.538 11.9296 6.872 12.0256 6.236C12.1336 5.588 12.2176 5 12.2776 4.472C12.9616 4.256 13.6996 4.1 14.4916 4.004C15.2836 3.896 16.0696 3.842 16.8496 3.842C17.3176 3.842 17.7016 3.896 18.0016 4.004C18.3136 4.112 18.5536 4.268 18.7216 4.472C18.9016 4.664 19.0276 4.892 19.0996 5.156C19.1716 5.42 19.2076 5.714 19.2076 6.038C19.2076 6.518 19.1236 6.992 18.9556 7.46C18.7876 7.916 18.5596 8.354 18.2716 8.774C17.9956 9.182 17.6716 9.56 17.2996 9.908C16.9396 10.244 16.5496 10.52 16.1296 10.736C16.3456 11.216 16.5736 11.744 16.8136 12.32C17.0656 12.884 17.2996 13.424 17.5156 13.94C17.7556 14.54 18.0016 15.14 18.2536 15.74L15.4636 16.712C15.2236 15.944 15.0076 15.224 14.8156 14.552C14.7316 14.276 14.6476 13.994 14.5636 13.706C14.4796 13.406 14.4016 13.124 14.3296 12.86C14.2576 12.596 14.1976 12.362 14.1496 12.158C14.1016 11.942 14.0716 11.768 14.0596 11.636L13.8256 11.708C13.7536 12.092 13.6636 12.542 13.5556 13.058C13.4596 13.574 13.3696 14.072 13.2856 14.552C13.1776 15.116 13.0696 15.686 12.9616 16.262L10.0456 17.018ZM14.2756 9.206C14.5036 9.182 14.7796 9.086 15.1036 8.918C15.4396 8.75 15.7576 8.552 16.0576 8.324C16.3576 8.084 16.6156 7.838 16.8316 7.586C17.0476 7.334 17.1556 7.112 17.1556 6.92C17.1556 6.788 17.1136 6.686 17.0296 6.614C16.9456 6.53 16.8256 6.47 16.6696 6.434C16.5256 6.386 16.3636 6.356 16.1836 6.344C16.0036 6.332 15.8176 6.326 15.6256 6.326C15.4936 6.326 15.3556 6.332 15.2116 6.344C15.0796 6.344 14.9596 6.344 14.8516 6.344L14.2756 9.206Z" })), tooltipText: i18n_1.default.name, onContextMenu: (evt) => openContextMenu(evt, () => React_1.React.createElement(exports.Context, null)), onClick: () => Modal_1.default.openModal((mProps) => React_1.React.createElement(SettingsModal_1.default, { mProps, PAGE: 0 })) });
      });
    }
  });

  // tsBuild/ui/MonacoEditor.js
  var require_MonacoEditor = __commonJS({
    "tsBuild/ui/MonacoEditor.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      var React_1 = require_React();
      exports.default = React_1.React.memo((prop) => {
        const ref = React_1.React.useRef();
        React_1.React.useEffect(() => {
          const propKeys = Object.keys(prop).filter((key) => key !== "didMount");
          const props = {};
          for (const propKey of propKeys)
            props[propKey] = props[propKey];
          const editor = window.monaco.editor.create(ref.current, props);
          props.didMount?.(editor);
        });
        return React_1.React.createElement("div", { ref, style: { width: "100%", height: "100%" } });
      });
    }
  });

  // tsBuild/stylingApi.js
  var require_stylingApi = __commonJS({
    "tsBuild/stylingApi.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.Internal = exports.Plugins = exports.Themes = void 0;
      var DrHead = document.createElement("Dr-Head");
      document.head.appendChild(DrHead);
      var DrThemes = document.createElement("Dr-Themes");
      var DrPlugins = document.createElement("Dr-Plugins");
      var DrInternal = document.createElement("Dr-Internal");
      DrHead.append(DrInternal, DrPlugins, DrThemes);
      exports.Themes = {
        insert: (id, content) => {
          const Style = Object.assign(document.createElement("style"), {
            type: "text/css",
            innerHTML: content
          });
          Style.setAttribute("Dr-Theme-Style", id);
          DrThemes.appendChild(Style);
          return () => Style.remove();
        },
        clear: (id) => {
          const Style = document.querySelector(`[Dr-Theme-Style="${id}"]`);
          if (Style)
            Style.remove();
        }
      };
      exports.Plugins = {
        insert: (id, content) => {
          const Style = Object.assign(document.createElement("style"), {
            type: "text/css",
            innerHTML: content
          });
          Style.setAttribute("Dr-Plugin-Style", id);
          DrPlugins.appendChild(Style);
          return () => Style.remove();
        },
        clear: (id) => {
          const Style = document.querySelector(`[Dr-Plugin-Style="${id}"]`);
          if (Style)
            Style.remove();
        }
      };
      exports.Internal = {
        insert: (id, content) => {
          const Style = Object.assign(document.createElement("style"), {
            type: "text/css",
            innerHTML: content
          });
          Style.setAttribute("Dr-Internal-Style", id);
          DrInternal.appendChild(Style);
          return () => Style.remove();
        },
        clear: (id) => {
          const Style = document.querySelector(`[Dr-Internal-Style="${id}"]`);
          if (Style)
            Style.remove();
        }
      };
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
      var i18n_1 = __importDefault(require_i18n());
      var React_1 = require_React();
      var Util = __importStar(require_Util());
      var PanelButton_1 = __importDefault(require_PanelButton());
      var MonacoEditor_1 = __importDefault(require_MonacoEditor());
      var stylingApi_1 = require_stylingApi();
      var SettingsModal_1 = require_SettingsModal();
      var isDeveloper = Storage_1.InternalStorageApi.getData("isDeveloper", false);
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
        i18n: i18n_1.default,
        MonacoEditor: MonacoEditor_1.default,
        openSettingsModal: SettingsModal_1.openSettings
      };
      Object.defineProperty(window.$Dr, "isDeveloper", {
        get: () => isDeveloper,
        set: (value) => {
          isDeveloper = value;
          Storage_1.InternalStorageApi.setData("isDeveloper", value);
        }
      });
      window.DrApi = {
        Storage: Storage_1.StorageApi,
        getModule: getModule_1.default,
        ReactDOM: React_1.ReactDOM,
        React: React_1.React,
        Modal: Modal_1.default,
        patch: patch_1.default,
        Util,
        MonacoEditor: MonacoEditor_1.default,
        styling: stylingApi_1.Plugins
      };
      stylingApi_1.Internal.insert("Dr-Internal-Styling", `.Dr-Settings-TabBar {
  margin-bottom: 10px;
  margin-top: 2px;
  padding: 0;
  flex: unset;
  flex-direction: row;
} .Dr-Settings-TabBar .item-PXvHYJ {
  border-radius: 4px;
  margin: 1px 0 1px 6px;
  padding: 2px 8px;
} .Dr-Settings-TabBar .item-PXvHYJ svg {
  width: 16px;
  height: 16px;
  transform: translateY(2px)
} .Dr-Settings-Collapsable {
  margin-bottom: 10px;
  border-radius: 4px;
  background-color: var(--background-secondary);
}.Dr-Settings-Collapsable-Title-Wrapper  {
  cursor: pointer;
  padding: 8px;
  background-color: var(--background-tertiary);
  border-radius: 4px;
} .Dr-Settings-Collapsable-Children {
  padding: 8px;
  border-radius: 0 0 4px 4px;
}`);
      async function start() {
        const eleOI = Util.getOwnerInstance(await Util.waitFor(".panels-j1Uci_ > .container-3baos1"));
        (0, patch_1.default)("DrDiscordInternal-Panel-Patch", eleOI.__proto__, "render", (_, res) => {
          res.props.children[res.props.children.length - 1].props.children.unshift(React_1.React.createElement(PanelButton_1.default, null));
        });
        eleOI.forceUpdate();
        Object.defineProperty((0, getModule_1.default)(["isDeveloper"]), "isDeveloper", {
          get: () => isDeveloper,
          set: (value) => {
            isDeveloper = value;
            Storage_1.InternalStorageApi.setData("isDeveloper", value);
          }
        });
      }
      start();
    }
  });
  require_tsBuild();
})();
