export declare const firstOrDefault: <T, TDefault extends T | undefined>(value: T | T[] | undefined | null, defaultValue?: TDefault) => TDefault extends undefined ? T | undefined : T;
