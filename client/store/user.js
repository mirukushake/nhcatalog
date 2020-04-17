export const state = () => ({
  lists: [],
});

export const mutations = {
  setLists (state, list) {
    state.lists = list;
  },
};

export const actions = {
  changeLists (context, payload) {
    context.commit('setLists', payload);
  },
};
