// Function to set the translations file path and load it
export const setTranslations = (newTranslations) => {
    if (typeof newTranslations !== "object" || newTranslations === null || Array.isArray(newTranslations)) {
        throw new Error("Invalid translations object. Must be a valid JSON object.");
    }
    // Update the global translations object
    Object.keys(newTranslations).forEach((lang) => {
        translations[lang] = {
            ...(translations[lang] || {}),
            ...newTranslations[lang],
        };
    });
};
export function useGetTranslation() {
    const translate = (key, replacements = {}, allowKeyDotSplitting = true) => {
        const lang = document.documentElement.lang || "en";
        // Get the fallback locale from a meta tag
        const fallbackLocale = document.querySelector('meta[name="fallback_locale"]')?.content || "en";
        // Helper function to retrieve nested values
        const getAltValue = (object, keys) => {
            const path = allowKeyDotSplitting ? keys.split(".") : [keys];
            return path.reduce((o, k) => (o && o[k] !== undefined ? o[k] : undefined), object);
        };
        // Attempt to get the translation for the current language
        let word = getAltValue(translations[lang], key);
        // Fallback to the fallback locale if not found
        if (!word) {
            word = getAltValue(translations[fallbackLocale], key) || key;
        }
        // Apply replacements to the translation
        word = Object.entries(replacements).reduce((result, [placeholder, value]) => result.replace(new RegExp(`:${placeholder}`, "g"), value), word);
        // Return the translation or fallback to the key
        return word || key;
    };
    return { translate };
}
