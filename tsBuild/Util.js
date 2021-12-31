"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.waitFor = exports.getOwnerInstance = exports.getReactInstance = exports.sleep = void 0;
const sleep = (time) => new Promise((resolve) => setTimeout(resolve, time));
exports.sleep = sleep;
const getReactInstance = (element) => {
    if (element.__reactInternalInstance$)
        return element.__reactInternalInstance$;
    const ReactKey = Object.keys(element).find(k => k.startsWith("__reactInternalInstance") || k.startsWith("__reactFiber"));
    return element[ReactKey] || null;
};
exports.getReactInstance = getReactInstance;
const getOwnerInstance = (element) => {
    const sn = element.__reactFiber$?.return?.stateNode;
    if (sn && sn.forceUpdate)
        return sn;
};
exports.getOwnerInstance = getOwnerInstance;
const waitFor = async (querySelector) => {
    let elem;
    while (!(elem = document.querySelector(querySelector)))
        await (0, exports.sleep)(1);
    return elem;
};
exports.waitFor = waitFor;
