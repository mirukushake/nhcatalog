/* eslint-disable arrow-parens */
export const state = () => ({
  menuItems: [],
  searchTerm: '',
});

export const mutations = {
  setItems (state, list) {
    state.menuItems = list;
  },
  setSearch (state, string) {
    state.searchTerm = string;
  },
};

export const actions = {
  getItems (context, payload) {
    context.commit('setItems', payload);
  },
  getSearch (context, payload) {
    context.commit('setSearch', payload);
  },
};

export const getters = {
  getInfo: (state) => slug => {
    return state.menuItems.find(cat => cat.name === slug);
  },
};
