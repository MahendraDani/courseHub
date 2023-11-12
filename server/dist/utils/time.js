"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTime = void 0;
const getTime = () => {
    const dateObj = new Date();
    const hours = dateObj.getHours();
    const minutes = dateObj.getMinutes();
    const seconds = dateObj.getSeconds();
    const currentTime = `${hours}:${minutes}:${seconds}`;
    return currentTime;
};
exports.getTime = getTime;
