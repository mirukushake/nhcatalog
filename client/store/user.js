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
    const complete = list.map((c) => { c.completed = true; });
    state.completedItems = complete;
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
