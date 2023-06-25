"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fData = exports.fShortenNumber = exports.fPercent = exports.fCurrency = exports.fNumber = void 0;
const tslib_1 = require("tslib");
const numeral_1 = tslib_1.__importDefault(require("numeral"));
function fNumber(number) {
    return (0, numeral_1.default)(number).format();
}
exports.fNumber = fNumber;
function fCurrency(number) {
    const format = number ? (0, numeral_1.default)(number).format("$0,0.00") : "";
    return result(format, ".00");
}
exports.fCurrency = fCurrency;
function fPercent(number) {
    const format = number ? (0, numeral_1.default)(Number(number) / 100).format("0.0%") : "";
    return result(format, ".0");
}
exports.fPercent = fPercent;
function fShortenNumber(number) {
    const format = number ? (0, numeral_1.default)(number).format("0.00a") : "";
    return result(format, ".00");
}
exports.fShortenNumber = fShortenNumber;
function fData(number) {
    const format = number ? (0, numeral_1.default)(number).format("0.0 b") : "";
    return result(format, ".0");
}
exports.fData = fData;
function result(format, key = ".00") {
    const isInteger = format.includes(key);
    return isInteger ? format.replace(key, "") : format;
}
//# sourceMappingURL=formatNumber.js.map