"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fToNow = exports.fTimestamp = exports.fDateTime = exports.fDate = void 0;
const date_fns_1 = require("date-fns");
function fDate(date, newFormat) {
    const fm = newFormat !== null && newFormat !== void 0 ? newFormat : "dd MMM yyyy";
    return date ? (0, date_fns_1.format)(new Date(date), fm) : "";
}
exports.fDate = fDate;
function fDateTime(date, newFormat) {
    const fm = newFormat !== null && newFormat !== void 0 ? newFormat : "dd MMM yyyy p";
    return date ? (0, date_fns_1.format)(new Date(date), fm) : "";
}
exports.fDateTime = fDateTime;
function fTimestamp(date) {
    return date ? (0, date_fns_1.getTime)(new Date(date)) : "";
}
exports.fTimestamp = fTimestamp;
function fToNow(date) {
    return date
        ? (0, date_fns_1.formatDistanceToNow)(new Date(date), {
            addSuffix: true,
        })
        : "";
}
exports.fToNow = fToNow;
//# sourceMappingURL=formatTime.js.map