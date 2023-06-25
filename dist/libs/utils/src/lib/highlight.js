"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const highlight_js_1 = tslib_1.__importDefault(require("highlight.js"));
require("highlight.js/styles/monokai-sublime.css");
highlight_js_1.default.configure({
    languages: ["javascript", "jsx", "sh", "bash", "html", "scss", "css", "json"],
});
if (typeof window !== "undefined") {
    window.hljs = highlight_js_1.default;
}
//# sourceMappingURL=highlight.js.map