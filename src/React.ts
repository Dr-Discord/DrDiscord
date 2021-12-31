import getModule from "./getModule"

export const React = getModule(["createElement", "Fragment"])
export const ReactDOM = getModule(["hydrate", "render"])