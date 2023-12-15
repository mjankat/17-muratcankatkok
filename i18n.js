import { initReactI18next } from "react-i18next";
import expoLanguageDetector from "./plugins/expoLanguageDetector";
import { en, tr } from "./locales";
import i18n from "i18next";

const resources = {
  en: {
    translation: en,
  },
  tr: {
    translation: tr,
  },
};

i18n
  .use(initReactI18next)
  .use(expoLanguageDetector)
  .init({
    compatibilityJSON: "v3",
    resources: resources,
    interpolation: {
      escapeValue: false,
    },
    react: {
      bindI18nStore: "added",
    },
  });

export function addResources(localizations) {
  i18n.addResourceBundle(
    expoLanguageDetector.detect(),
    "translation",
    localizations,
    true,
    true
  );
}

export default i18n;
