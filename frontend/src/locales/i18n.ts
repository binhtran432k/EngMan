import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import en from "./en";
import vi from "./vi";

const resources = {
  en,
  vi,
} as const;
const defaultLng: keyof typeof resources = "vi";
const fallbackLng: keyof typeof resources = "en";
const defaultNS: keyof typeof en = "common";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    lng: defaultLng,
    fallbackLng: fallbackLng,
    defaultNS,
    resources,
    interpolation: {
      skipOnVariables: false,
    },
  });

export { defaultNS, resources, defaultLng };

export default i18n;
