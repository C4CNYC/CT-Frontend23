"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertDuration = void 0;
function convertDuration(duration) {
    let durationString = "";
    if (!duration)
        return null;
    if (duration.hours) {
        durationString = duration.hours + " H";
    }
    if (duration.minutes) {
        durationString = `${durationString ? durationString + " " : ""}${duration.minutes} M`;
    }
    return durationString;
}
exports.convertDuration = convertDuration;
//# sourceMappingURL=convertDuration.js.map