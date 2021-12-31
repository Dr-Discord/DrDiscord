"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReactDOM = exports.React = void 0;
const getModule_1 = __importDefault(require("./getModule"));
exports.React = (0, getModule_1.default)(["createElement", "Fragment"]);
exports.ReactDOM = (0, getModule_1.default)(["hydrate", "render"]);
