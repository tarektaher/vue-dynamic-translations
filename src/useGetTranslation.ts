let translations: Record<string, any> = {}; // Store translations dynamically
let translationsPath: string | null = null; // Store the path to translations.json

// Function to set the translations file path and load it
export const setTranslationsPath = async (path: string) => {
    const response = await fetch(path); // Fetch JSON from the relative path
    if (!response.ok) {
        throw new Error(`Failed to load translations from ${path}`);
    }
    translations = await response.json();
};


export function useGetTranslation() {
    const translate = (
        key: string,
        replacements: Record<string, string> = {},
        allowKeyDotSplitting: boolean = true
    ): string => {
        if (!translationsPath) {
            throw new Error("Translations path is not set. Call `setTranslationsPath` first.");
        }

        const lang = document.documentElement.lang || "en";
        const word = getAltValue(translations[lang], key, allowKeyDotSplitting) || key;

        return applyReplacements(word, replacements);
    };

    const getAltValue = (object: any, keys: string, allowKeyDotSplitting: boolean): any => {
        const path = allowKeyDotSplitting ? keys.split(".") : [keys];
        return path.reduce((o, k) => (o || {})[k], object);
    };

    const applyReplacements = (str: string, replacements: Record<string, string>): string => {
        return Object.entries(replacements).reduce(
            (result, [key, value]) => result.replace(new RegExp(`:${key}`, "g"), value),
            str
        );
    };

    return { translate };
}
