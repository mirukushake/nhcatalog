/* eslint-disable arrow-parens */
export const state = () => ({
  menuItems: [],
  menuList: [],
  searchTerm: '',
  languages: [],
});

export const mutations = {
  setItems (state, list) {
    state.menuItems = list.editflat;
    state.menuList = list.editlist;
  },
  setSearch (state, string) {
    state.searchTerm = string;
  },
  setLangs (state, list) {
    state.languages = list;
  },
};

export const actions = {
  getItems (context, payload) {
    context.commit('setItems', payload);
  },
  getSearch (context, payload) {
    context.commit('setSearch', payload);
  },
  getLangs (context, payload) {
    context.commit('setLangs', payload);
  },
};

export const getters = {
  getInfo: (state) => slug => {
    return state.menuItems.find(cat => cat.name === slug);
  },
};
