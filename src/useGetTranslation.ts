type Translations = Record<string, Record<string, string | undefined>>;

// Mutable global `translations` object
let translations: Translations = {};

// Function to update the global translations object
export const setTranslations = (newTranslations: Translations): void => {
    if (typeof newTranslations !== "object" || newTranslations === null || Array.isArray(newTranslations)) {
        throw new Error("Invalid translations object. Must be a valid JSON object.");
    }

    // Merge the new translations into the existing translations object
    Object.keys(newTranslations).forEach((lang) => {
        translations[lang] = {
            ...(translations[lang] || {}),
            ...newTranslations[lang],
        };
    });
};

export function useGetTranslation() {
    const translate = (
        key: string,
        replacements: Record<string, string> = {},
        allowKeyDotSplitting: boolean = true
    ): string => {
        const lang = document.documentElement.lang || "en";

        // Get the fallback locale from a meta tag
        const fallbackLocale = (document.querySelector('meta[name="fallback_locale"]') as HTMLMetaElement | null)?.content || "en";

        // Helper function to retrieve nested values
        const getAltValue = (object: Record<string, any>, keys: string): string | undefined => {
            const path = allowKeyDotSplitting ? keys.split(".") : [keys];
            return path.reduce(
                (o: any, k: string) => (o && typeof o === "object" && k in o ? o[k] : undefined),
                object
            );
        };

        // Attempt to get the translation for the current language
        let word = getAltValue(translations[lang], key);

        // Fallback to the fallback locale if not found
        if (!word) {
            word = getAltValue(translations[fallbackLocale], key) || key;
        }

        // Apply replacements to the translation
        word = Object.entries(replacements).reduce(
            (result, [placeholder, value]) =>
                result.replace(new RegExp(`:${placeholder}`, "g"), value),
            word
        );

        // Return the translation or fallback to the key
        return word || key;
    };

    return { translate };
}
