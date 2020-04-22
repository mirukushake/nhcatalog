import { cacheAdapterEnhancer, throttleAdapterEnhancer } from 'axios-extensions';

export default function ({ $axios, app, store }) {
  $axios.setBaseURL(process.env.API_URL);

  $axios.defaults.adapter = cacheAdapterEnhancer($axios.defaults.adapter);
  $axios.defaults.adapter = throttleAdapterEnhancer($axios.defaults.adapter);

  $axios.onRequest((config) => {
    const currentLocale = store.state.user.settings.textLang;
    const subtitles = store.state.user.settings.subtitleLang;
    if (subtitles) {
      config.params = config.params || {};
      config.params.locale = currentLocale;
      config.params.subtitle = subtitles;
      config.params.locale = currentLocale;
    } else {
      config.params = config.params || {};
      config.params.locale = currentLocale;
    }
    return config;
  });
}
