"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createEmotionCache = void 0;
const tslib_1 = require("tslib");
const cache_1 = tslib_1.__importDefault(require("@emotion/cache"));
// ----------------------------------------------------------------------
const isBrowser = typeof document !== "undefined";
function createEmotionCache() {
    let insertionPoint;
    if (isBrowser) {
        const emotionInsertionPoint = document.querySelector('meta[name="emotion-insertion-point"]');
        insertionPoint = emotionInsertionPoint !== null && emotionInsertionPoint !== void 0 ? emotionInsertionPoint : undefined;
    }
    return (0, cache_1.default)({ key: "css", insertionPoint });
}
exports.createEmotionCache = createEmotionCache;
//# sourceMappingURL=createEmotionCache.js.map