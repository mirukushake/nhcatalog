export default function ({ $axios, app }) {
  const i18n = app.i18n;
  const currentLocale = i18n.getLocaleCookie();

  $axios.onRequest((config) => {
    config.params = config.params || {};
    config.params.locale = currentLocale;
    return config;
  });
}
