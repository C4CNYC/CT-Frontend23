"use strict";
// ----------------------------------------------------------------------
Object.defineProperty(exports, "__esModule", { value: true });
exports.flattenArray = void 0;
function flattenArray(list, key = "children") {
    let children = [];
    const flatten = list === null || list === void 0 ? void 0 : list.map((item) => {
        var _a;
        if ((_a = item[key]) === null || _a === void 0 ? void 0 : _a.length) {
            children = [...children, ...item[key]];
        }
        return item;
    });
    return flatten === null || flatten === void 0 ? void 0 : flatten.concat(children.length ? flattenArray(children, key) : children);
}
exports.flattenArray = flattenArray;
//# sourceMappingURL=flattenArray.js.map