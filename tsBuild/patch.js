"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let patches = {};
function patch(name, module, funcName, callback, opts = {}) {
    if (!name)
        throw new Error("Name is required (First argument)");
    if (!module)
        throw new Error("Module is required (Second argument)");
    if (!funcName)
        throw new Error("FuncName is required (Third argument)");
    if (!callback)
        throw new Error("Callback is required (Fourth argument)");
    if (!module[funcName])
        throw new Error("Function doesnt exist in Module");
    const { type = "after" } = opts;
    const original = module[funcName];
    if (!module[funcName].__originalFunction)
        module[funcName].__originalFunction = original;
    if (!module[funcName].__patches)
        module[funcName].__patches = [];
    if (type === "after")
        module[funcName] = function () {
            const result = original.apply(this, arguments);
            callback.apply(this, [[...arguments], result, this]);
            return result;
        };
    else if (type === "before")
        module[funcName] = function () {
            callback.apply(this, [[...arguments], this]);
            return original.apply(this, arguments);
        };
    else if (type === "instead")
        module[funcName] = function () {
            return callback.apply(this, [[...arguments], original, this]);
        };
    else
        throw new Error(`Unknown patch type: ${type}`);
    if (Object.keys(original).length)
        for (const key of Object.keys(original))
            module[funcName][key] = original[key];
    const position = module[funcName].__patches.push([module, funcName, callback, type]) - 1;
    let didUnpatch = false;
    function unpatch() {
        if (didUnpatch)
            return;
        didUnpatch = true;
        delete patches[name];
        module[funcName] = module[funcName].__originalFunction;
        module[funcName].__patches.splice(position, 1);
        const oldPatches = module[funcName].__patches;
        module[funcName].__patches = [];
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
    before: (name, module, funcName, callback, opts = {}) => patch(name, module, funcName, callback, { ...opts, type: "before" }),
    after: (name, module, funcName, callback, opts = {}) => patch(name, module, funcName, callback, { ...opts, type: "after" }),
    instead: (name, module, funcName, callback, opts = {}) => patch(name, module, funcName, callback, { ...opts, type: "instead" }),
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
    quick: (module, funcName, callback, opts = {}) => {
        let id = (Math.random() * Date.now()).toString();
        const patched = patch(id, module, funcName, callback, opts);
        delete patches[id];
        return patched;
    }
});
exports.default = patch;
