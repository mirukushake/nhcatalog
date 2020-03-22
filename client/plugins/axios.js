import { cacheAdapterEnhancer, throttleAdapterEnhancer } from 'axios-extensions';

export default function ({ $axios, app, store }) {
  const i18n = app.i18n;
  const currentLocale = i18n.getLocaleCookie();

  $axios.defaults.adapter = cacheAdapterEnhancer($axios.defaults.adapter);
  $axios.defaults.adapter = throttleAdapterEnhancer($axios.defaults.adapter);

  $axios.onRequest((config) => {
    if (store.state.usersettings.settings.subtitle) {
      config.params = config.params || {};
      config.params.locale = currentLocale;
      const subLocale = (currentLocale === 'en') ? 'ja' : 'en';
      config.params.subtitle = subLocale;
      config.params.locale = currentLocale;
    } else {
      config.params = config.params || {};
      config.params.locale = currentLocale;
    }
    return config;
  });
}
