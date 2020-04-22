export const state = () => ({
  settings: {
  },
  lists: [],
  completedItems: [],
});

export const mutations = {
  setLists (state, list) {
    state.lists = list;
  },
  setItems (state, list) {
    state.completedItems = list;
  },
  setAllSettings (state, obj) {
    state.settings = obj;
  },
  setHemi (state, param) {
    state.settings.hemisphere = param;
  },
};

export const actions = {
  changeLists (context, payload) {
    context.commit('setLists', payload);
  },
  changeItems (context, payload) {
    context.commit('setItems', payload);
  },
  changeSettings (context, payload) {
    context.commit('setAllSettings', payload);
  },
  changeHemi (context, payload) {
    context.commit('setHemi', payload);
  },
};
