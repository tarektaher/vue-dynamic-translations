export declare const setTranslations: (newTranslations: object) => void;
export declare function useGetTranslation(): {
    translate: (key: string, replacements?: Record<string, string>, allowKeyDotSplitting?: boolean) => string;
};
