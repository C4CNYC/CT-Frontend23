"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRandomColor = exports.getLinearGradient = void 0;
const system_1 = require("@mui/system");
const getLinearGradient = (coverColor) => {
    const baseColor = (0, system_1.alpha)(coverColor, 0.6);
    const gradient = `linear-gradient(75deg, ${coverColor} 22% , ${baseColor} 34% , ${baseColor} 58%, ${coverColor} 90%)`;
    return gradient;
};
exports.getLinearGradient = getLinearGradient;
const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
};
exports.getRandomColor = getRandomColor;
//# sourceMappingURL=getLinearGradient.js.map