"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isJson = void 0;
function isJson(data) {
    try {
        JSON.parse(data);
        return true;
    }
    catch (e) {
        return false;
    }
}
exports.isJson = isJson;
//# sourceMappingURL=isJson.js.map