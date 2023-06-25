"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hideScrollbarX = exports.hideScrollbarY = exports.filterStyles = exports.textGradient = exports.bgGradient = exports.bgBlur = void 0;
// @mui
const styles_1 = require("@mui/material/styles");
function bgBlur(props) {
    var _a, _b, _c;
    const color = (_a = props === null || props === void 0 ? void 0 : props.color) !== null && _a !== void 0 ? _a : "#000000";
    const blur = (_b = props === null || props === void 0 ? void 0 : props.blur) !== null && _b !== void 0 ? _b : 6;
    const opacity = (_c = props === null || props === void 0 ? void 0 : props.opacity) !== null && _c !== void 0 ? _c : 0.8;
    const imgUrl = props === null || props === void 0 ? void 0 : props.imgUrl;
    if (imgUrl) {
        return {
            position: "relative",
            backgroundImage: `url(${imgUrl})`,
            "&:before": {
                position: "absolute",
                top: 0,
                left: 0,
                zIndex: 9,
                content: '""',
                width: "100%",
                height: "100%",
                backdropFilter: `blur(${blur}px)`,
                WebkitBackdropFilter: `blur(${blur}px)`,
                backgroundColor: (0, styles_1.alpha)(color, opacity),
            },
        };
    }
    return {
        backdropFilter: `blur(${blur}px)`,
        WebkitBackdropFilter: `blur(${blur}px)`,
        backgroundColor: (0, styles_1.alpha)(color, opacity),
    };
}
exports.bgBlur = bgBlur;
function bgGradient(props) {
    var _a, _b, _c;
    const direction = (_a = props === null || props === void 0 ? void 0 : props.direction) !== null && _a !== void 0 ? _a : "to bottom";
    const startColor = props === null || props === void 0 ? void 0 : props.startColor;
    const endColor = props === null || props === void 0 ? void 0 : props.endColor;
    const imgUrl = props === null || props === void 0 ? void 0 : props.imgUrl;
    const color = props === null || props === void 0 ? void 0 : props.color;
    if (imgUrl) {
        return {
            background: `linear-gradient(${direction}, ${(_b = startColor !== null && startColor !== void 0 ? startColor : color) !== null && _b !== void 0 ? _b : ""}, ${(_c = endColor !== null && endColor !== void 0 ? endColor : color) !== null && _c !== void 0 ? _c : ""}), url(${imgUrl})`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center center",
        };
    }
    return {
        background: `linear-gradient(${direction}, ${startColor !== null && startColor !== void 0 ? startColor : ""}, ${endColor !== null && endColor !== void 0 ? endColor : ""})`,
    };
}
exports.bgGradient = bgGradient;
// ----------------------------------------------------------------------
function textGradient(value) {
    return {
        background: `-webkit-linear-gradient(${value})`,
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
    };
}
exports.textGradient = textGradient;
// ----------------------------------------------------------------------
function filterStyles(value) {
    return {
        filter: value,
        WebkitFilter: value,
        MozFilter: value,
    };
}
exports.filterStyles = filterStyles;
// ----------------------------------------------------------------------
exports.hideScrollbarY = {
    msOverflowStyle: "none",
    scrollbarWidth: "none",
    overflowY: "scroll",
    "&::-webkit-scrollbar": {
        display: "none",
    },
};
// ----------------------------------------------------------------------
exports.hideScrollbarX = {
    msOverflowStyle: "none",
    scrollbarWidth: "none",
    overflowX: "scroll",
    "&::-webkit-scrollbar": {
        display: "none",
    },
};
//# sourceMappingURL=cssStyles.js.map