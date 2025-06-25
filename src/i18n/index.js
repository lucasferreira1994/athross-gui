import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import enJson from "./translations/en.json";
import esJson from "./translations/es.json";
import ptBRJson from "./translations/ptBR.json";

i18n.use(initReactI18next).init({
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
  resources: {
    en: enJson,
    es: esJson,
    ptBR: ptBRJson,
  },
});

export default i18n;
