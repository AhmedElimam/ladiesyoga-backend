"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getTimeStemp = () => {
    return new Date().toISOString();
};
const info = (newspace, message, object) => {
    if (object) {
        console.log(`[${getTimeStemp()}] [INFO] [${newspace}] ${message}`, object);
    }
    else {
        console.log(`[${getTimeStemp()}] [INFO] [${newspace}] ${message}`);
    }
};
const warn = (newspace, message, object) => {
    if (object) {
        console.log(`[${getTimeStemp()}] [WARN] [${newspace}] ${message}`, object);
    }
    else {
        console.log(`[${getTimeStemp()}] [WARN] [${newspace}] ${message}`);
    }
};
const error = (newspace, message, object) => {
    if (object) {
        console.log(`[${getTimeStemp()}] [ERROR] [${newspace}] ${message}`, object);
    }
    else {
        console.log(`[${getTimeStemp()}] [ERROR] [${newspace}] ${message}`);
    }
};
const debug = (newspace, message, object) => {
    if (object) {
        console.log(`[${getTimeStemp()}] [DEBUG] [${newspace}] ${message}`, object);
    }
    else {
        console.log(`[${getTimeStemp()}] [DEBUG] [${newspace}] ${message}`);
    }
};
exports.default = {
    info,
    error,
    debug,
    warn
};
