let translations = {}; // Store translations dynamically
let translationsPath = null; // Store the path to translations.json
// Function to set the translations file path and load it
export const setTranslationsPath = async (path) => {
    translationsPath = path;
    translations = await import(path).then((module) => module.default);
};
export function useGetTranslation() {
    const translate = (key, replacements = {}, allowKeyDotSplitting = true) => {
        if (!translationsPath) {
            throw new Error("Translations path is not set. Call `setTranslationsPath` first.");
        }
        const lang = document.documentElement.lang || "en";
        const word = getAltValue(translations[lang], key, allowKeyDotSplitting) || key;
        return applyReplacements(word, replacements);
    };
    const getAltValue = (object, keys, allowKeyDotSplitting) => {
        const path = allowKeyDotSplitting ? keys.split(".") : [keys];
        return path.reduce((o, k) => (o || {})[k], object);
    };
    const applyReplacements = (str, replacements) => {
        return Object.entries(replacements).reduce((result, [key, value]) => result.replace(new RegExp(`:${key}`, "g"), value), str);
    };
    return { translate };
}
