import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enLocale from "./locales/en/en.json"
import viLocale from "./locales/vi/vi.json"

i18n
  .use(initReactI18next)
  .init({
    compatibilityJSON: 'v3',
    lng: 'en', // Ngôn ngữ mặc định
    fallbackLng: 'en', // Ngôn ngữ dự fallback nếu không tìm thấy ngôn ngữ hiện tại,
    resources: {
      en: {
        translation: enLocale,
      },
      vi: {
        translation: viLocale,
      },
    },
    backend: {
      loadPath: './locales' + '/{{lng}}/{{ns}}.json', // Đường dẫn đến các tệp ngôn ngữ
    },
    react: {
      useSuspense: false,
    },
  });

export default i18n;
