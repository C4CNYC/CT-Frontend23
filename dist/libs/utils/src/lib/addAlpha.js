"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addAlpha = void 0;
const addAlpha = (color, opacity) => {
    const _opacity = Math.round(Math.min(Math.max(opacity || 1, 0), 1) * 255);
    return color + _opacity.toString(16).toUpperCase();
};
exports.addAlpha = addAlpha;
//# sourceMappingURL=addAlpha.js.map