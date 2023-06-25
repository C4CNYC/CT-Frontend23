"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.randomGradient = void 0;
const HEX_STRING = "0123456789abcdef";
const randomGradient = () => {
    const colorOne = randomColor();
    const colorTwo = randomColor();
    const angle = Math.floor(Math.random() * 360);
    return `linear-gradient(${angle}deg, ${colorOne}, ${colorTwo})`;
};
exports.randomGradient = randomGradient;
const randomColor = () => {
    let hexCode = "#";
    for (let i = 0; i < 6; i++) {
        hexCode =
            hexCode + HEX_STRING[Math.floor(Math.random() * HEX_STRING.length)];
    }
    return hexCode;
};
//# sourceMappingURL=randomGradient.js.map