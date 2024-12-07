type Translations = Record<string, Record<string, string | undefined>>;
export declare const setTranslations: (newTranslations: Translations) => void;
export declare function useGetTranslation(): {
    translate: (key: string, replacements?: Record<string, string>, allowKeyDotSplitting?: boolean) => string;
};
export {};
