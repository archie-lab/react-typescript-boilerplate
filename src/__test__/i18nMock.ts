import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import {initReactI18next} from "react-i18next";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: "en",

    // have a common namespace used around the full app
    ns: ["common"],
    defaultNS: "common",

    debug: false,

    interpolation: {
      escapeValue: false // not needed for react!!
    },
    resources: {
      en: {}
    }
  });
