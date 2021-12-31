"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (() => {
    if (window.webpackChunkdiscord_app.getModule)
        return window.webpackChunkdiscord_app.getModule;
    else {
        let webpackExports = window.webpackChunkdiscord_app.push([["DrDiscord"], {}, (e) => e]);
        /**
         * @name getModule
         * @param {function || array || string} filter
         * @param {boolean} first
         * @returns {module || array || null}
         */
        function getModule(filter, first = true) {
            let modules = [];
            function byPropsAll(...props) {
                const norm = getModule((m) => props.every((prop) => typeof m[prop] !== "undefined"), false);
                let def = [];
                for (const module of getModule((m) => props.every((prop) => typeof m.default?.[prop] !== "undefined"), false))
                    def.push(module.default);
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
        }
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
