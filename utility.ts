const debounce = <T extends (...args: any[]) => void>(func: T, wait: number): (...args: Parameters<T>) => void => {
    let timeout: NodeJS.Timeout;
    return (...args: Parameters<T>): void => {
        clearTimeout(timeout);
        timeout = setTimeout(() => func(...args), wait);
    };
};


const throttle = <T extends (...args: any[]) => void>(func: T, limit: number): (...args: Parameters<T>) => void => {
    let inThrottle: boolean;
    return (...args: Parameters<T>): void => {
        if (!inThrottle) {
            func(...args);
            inThrottle = true;
            setTimeout(() => (inThrottle = false), limit);
        }
    };
};

const deepClone = <T>(obj: T): T => {
    return JSON.parse(JSON.stringify(obj));
};

const isEmpty = (value: any): boolean => {
    if (value == null) return true;
    if (Array.isArray(value)) return value.length === 0;
    if (typeof value === 'object') return Object.keys(value).length === 0;
    return false;
};

const objectIsEmpty = (obj: object): boolean => {
    return Object.keys(obj).length === 0;
};


const deleteKeyFromObject = <T extends object, K extends keyof T>(obj: T, key: K): Omit<T, K> => {
    const { [key]: _, ...rest } = obj;
    return rest as Omit<T, K>;
};

const capitalize = (str: string): string => {
    if (!str) return str;
    return str.charAt(0).toUpperCase() + str.slice(1);
};

const randomId = (length: number = 8): string => {
    return Math.random().toString(36).substr(2, length);
};
const formatDate = (date: Date, format: string): string => {
    const map: { [key: string]: string } = {
        'MM': ('0' + (date.getMonth() + 1)).slice(-2),
        'DD': ('0' + date.getDate()).slice(-2),
        'YYYY': date.getFullYear().toString(),
        'HH': ('0' + date.getHours()).slice(-2),
        'mm': ('0' + date.getMinutes()).slice(-2),
        'ss': ('0' + date.getSeconds()).slice(-2)
    };

    return format.replace(/MM|DD|YYYY|HH|mm|ss/gi, matched => map[matched]);
};

const sleep = (ms: number): Promise<void> => {
    return new Promise(resolve => setTimeout(resolve, ms));
};

const mergeDeep = <T>(target: T, source: any): T => {
    const isObject = (obj: any) => obj && typeof obj === 'object';

    if (!isObject(target) || !isObject(source)) {
        return source as T;
    }

    Object.keys(source).forEach(key => {
        const targetValue = (target as any)[key];
        const sourceValue = source[key];

        if (Array.isArray(targetValue) && Array.isArray(sourceValue)) {
            (target as any)[key] = targetValue.concat(sourceValue);
        } else if (isObject(targetValue) && isObject(sourceValue)) {
            (target as any)[key] = mergeDeep({ ...targetValue }, sourceValue);
        } else {
            (target as any)[key] = sourceValue;
        }
    });

    return target;
};

const flattenArray = <T>(arr: T[]): T[] => {
    return arr.reduce((flat, toFlatten) => flat.concat(Array.isArray(toFlatten) ? flattenArray(toFlatten) : toFlatten), []);
};


const uniqueArray = <T>(arr: T[]): T[] => {
    return Array.from(new Set(arr));
};

const getQueryParams = (url: string): { [key: string]: string } => {
    const queryParams: { [key: string]: string } = {};
    const urlSearchParams = new URLSearchParams(new URL(url).search);
    urlSearchParams.forEach((value, key) => {
        queryParams[key] = value;
    });
    return queryParams;
};


const isEmailValid = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

const isURLValid = (url: string): boolean => {
    try {
        new URL(url);
        return true;
    } catch (_) {
        return false;
    }
};

const objectToQueryString = (obj: { [key: string]: any }): string => {
    return Object.keys(obj)
        .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]))
        .join('&');
};
