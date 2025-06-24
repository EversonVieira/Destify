"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.firstOrDefault = void 0;
const firstOrDefault = (value, defaultValue) => {
    if (Array.isArray(value)) {
        return (0, exports.firstOrDefault)(value[0], defaultValue);
    }
    if (value) {
        return value;
    }
    if (defaultValue) {
        return defaultValue;
    }
    return undefined;
};
exports.firstOrDefault = firstOrDefault;
