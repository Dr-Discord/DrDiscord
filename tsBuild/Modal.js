"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const getModule_1 = __importDefault(require("./getModule"));
const React_1 = require("./React");
const Markdown = (0, getModule_1.default)((m) => m.default?.displayName === "Markdown" && m.default.rules).default;
const { Messages } = (0, getModule_1.default)(["Messages"], false)[1];
const ConfirmationModal = (0, getModule_1.default)("ConfirmModal").default;
const Button = (0, getModule_1.default)(["ButtonColors"]);
const { openModal, closeModal, closeAllModals } = (0, getModule_1.default)(["openModal", "openModalLazy"]);
const TextInput = (0, getModule_1.default)("TextInput").default;
const { SingleSelect } = (0, getModule_1.default)(["SingleSelect"]);
const TextArea = (0, getModule_1.default)("TextArea").default;
exports.default = {
    openModal, closeModal, closeAllModals,
    elements: (0, getModule_1.default)(["ModalRoot"]),
    /**
     * @name prompt
     * @param {string} title
     * @param {object} opts
     * @returns {string || null}
     */
    prompt: async (title, opts = {}) => {
        const { defaultValue = "", type = "input", options = [], ...other } = opts;
        let toReturn = defaultValue;
        return new Promise((resolve) => {
            openModal((props) => {
                if (props.transitionState === 2)
                    resolve(null);
                return (React_1.React.createElement(ConfirmationModal, { header: title, confirmButtonColor: Button.ButtonColors.BRAND, confirmText: Messages.OKAY, cancelText: Messages.CANCEL, onConfirm: () => resolve(toReturn), onCancel: () => resolve(null), ...props }, React_1.React.createElement(React_1.React.memo(() => {
                    const [value, setValue] = React_1.React.useState(defaultValue);
                    if (type.toLowerCase() === "input")
                        return (React_1.React.createElement(TextInput, { ...other, value: value, onInput: (ele) => {
                                setValue(ele.target.value);
                                toReturn = ele.target.value;
                            } }));
                    if (type.toLowerCase() === "textarea")
                        return (React_1.React.createElement(TextArea, { ...other, value: value, onChange: (val) => {
                                setValue(val);
                                toReturn = val;
                            } }));
                    if (type.toLowerCase() === "dropdown")
                        return (React_1.React.createElement(SingleSelect, { ...other, value: value, options: options, onChange: (val) => {
                                setValue(val);
                                toReturn = val;
                            } }));
                }))));
            });
        });
    },
    /**
     * @name showConfirmationModal
     * @param {string} title
     * @param {string || array} content
     * @param {object} options
     * @returns {string} modal key
     */
    showConfirmationModal: (title, content, options = {}) => {
        const emptyFunction = () => { };
        const { onConfirm = emptyFunction, onCancel = emptyFunction, confirmText = Messages.OKAY, cancelText = Messages.CANCEL, danger = false, key = undefined } = options;
        if (!Array.isArray(content))
            content = [content];
        content = content.map(c => typeof (c) === "string" ? React_1.React.createElement(Markdown, null, c) : c);
        return openModal((props) => {
            return (React_1.React.createElement(ConfirmationModal, { header: title, confirmButtonColor: danger ? Button.ButtonColors.DANGER : Button.ButtonColors.BRAND, confirmText: confirmText, cancelText: cancelText, onConfirm: onConfirm, onCancel: onCancel, ...props }, content));
        }, { modalKey: key });
    }
};
