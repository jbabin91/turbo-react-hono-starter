import { config } from '@repo/configs';
import common from '@repo/locales/en/common.json';
import i18n, { type InitOptions } from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';
import { initReactI18next } from 'react-i18next';

export type { ParseKeys } from 'i18next';

// Set up i18n with hybrid preload and lazy loading strategy
const initOptions: InitOptions = {
  backend: {
    loadPath: '/locales/{{lng}}/{{ns}}.json',
  },
  debug: config.debug,
  defaultNS: 'common',
  fallbackLng: config.defaultLanguage,
  interpolation: {
    escapeValue: false,
  },
  load: 'languageOnly',
  ns: ['common'],
  react: {
    useSuspense: false,
  },
  resources: { en: { common } },
  supportedLngs: config.languages.map((lang) => lang.value),
};

// Init i18n instance
i18n.use(Backend).use(LanguageDetector).use(initReactI18next).init(initOptions);

export { default as i18n } from 'i18next';
