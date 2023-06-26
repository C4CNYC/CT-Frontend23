"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCountTakingElment = void 0;
const getCountTakingElment = (itemCount, take) => {
    if (!itemCount || !take)
        return 0;
    return itemCount > take
        ? itemCount - take
        : 10 - (take - itemCount);
};
exports.getCountTakingElment = getCountTakingElment;
//# sourceMappingURL=countTakingElments.js.map