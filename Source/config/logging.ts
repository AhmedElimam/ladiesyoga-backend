const getTimeStemp = (): string => {
    return new Date().toISOString();
};

const info = (newspace: string, message: string, object?: any) => {
    if (object) {
        console.log(`[${getTimeStemp()}] [INFO] [${newspace}] ${message}`, object);
    } else {
        console.log(`[${getTimeStemp()}] [INFO] [${newspace}] ${message}`);
    }
};

const warn = (newspace: string, message: string, object?: any) => {
    if (object) {
        console.log(`[${getTimeStemp()}] [WARN] [${newspace}] ${message}`, object);
    } else {
        console.log(`[${getTimeStemp()}] [WARN] [${newspace}] ${message}`);
    }
};

const error = (newspace: string, message: string, object?: any) => {
    if (object) {
        console.log(`[${getTimeStemp()}] [ERROR] [${newspace}] ${message}`, object);
    } else {
        console.log(`[${getTimeStemp()}] [ERROR] [${newspace}] ${message}`);
    }
};

const debug = (newspace: string, message: string, object?: any) => {
    if (object) {
        console.log(`[${getTimeStemp()}] [DEBUG] [${newspace}] ${message}`, object);
    } else {
        console.log(`[${getTimeStemp()}] [DEBUG] [${newspace}] ${message}`);
    }
};

export default {
    info,
    error,
    debug,
    warn
};
