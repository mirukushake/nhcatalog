export const state = () => ({
  settings: {
    subtitle: false,
    hemisphere: 'north',
  },
});

export const mutations = {
  setAllSettings (state, obj) {
    state.settings = obj;
  },
  setHemi (state, param) {
    state.settings.hemisphere = param;
  },
};

export const actions = {
  changeSettings (context, payload) {
    context.commit('setAllSettings', payload);
  },
  changeHemi (context, payload) {
    context.commit('setHemi', payload);
  },
};
