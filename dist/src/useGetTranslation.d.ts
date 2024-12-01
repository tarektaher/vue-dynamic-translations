export declare const setTranslationsPath: (path: string) => Promise<void>;
export declare function useGetTranslation(): {
    translate: (key: string, replacements?: Record<string, string>, allowKeyDotSplitting?: boolean) => string;
};
