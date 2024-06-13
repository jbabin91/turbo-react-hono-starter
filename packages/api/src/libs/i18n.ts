import { config } from '@repo/configs';
import enBackend from '@repo/locales/en/backend.json';
import enCommon from '@repo/locales/en/common.json';
import i18n, { type InitOptions } from 'i18next';
import { initReactI18next } from 'react-i18next';

// Set up i18n
const initOptions: InitOptions = {
  debug: config.debug,
  defaultNS: 'backend',
  fallbackLng: config.defaultLanguage,
  load: 'languageOnly',
  ns: ['backend'],
  resources: {
    en: { backend: enBackend, common: enCommon },
  },
  supportedLngs: config.languages.map((lng) => lng.value),
};

// Init i18n instance
i18n.use(initReactI18next).init(initOptions);

export { default as i18n } from 'i18next';
