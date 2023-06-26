"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.axios = void 0;
const tslib_1 = require("tslib");
const axios_1 = tslib_1.__importDefault(require("axios"));
// config
// ----------------------------------------------------------------------const 
exports.axios = axios_1.default.create({
    baseURL: process.env["NEXT_PUBLIC_API_URL"],
});
exports.axios.interceptors.response.use((response) => response, (error) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    yield Promise.reject((_b = (_a = error.response) === null || _a === void 0 ? void 0 : _a.data) !== null && _b !== void 0 ? _b : "Something went wrong");
}));
exports.axios.interceptors.request.use(function (config) {
    var _a;
    if (config.headers) {
        config.headers["x-tenant-id"] =
            (_a = localStorage.getItem("tenantName")) !== null && _a !== void 0 ? _a : "codetribe";
    }
    return config;
}, function (error) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        return yield Promise.reject(error);
    });
});
//# sourceMappingURL=axios.js.map