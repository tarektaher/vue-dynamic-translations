let translations: Record<string, any> = {}; // Store translations dynamically

// Function to set the translations file path and load it
export const setTranslations = (newTranslations: object) => {
    if (typeof newTranslations !== "object" || newTranslations === null) {
        throw new Error("Invalid translations object. Must be a valid JSON object.");
    }
    translations = newTranslations; // Update the global translations variable
};

export function useGetTranslation() {
    const translate = (
        key: string,
        replacements: Record<string, string> = {},
        allowKeyDotSplitting: boolean = true
    ): string => {
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
