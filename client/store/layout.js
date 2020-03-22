/* eslint-disable arrow-parens */
export const state = () => ({
  menuItems: [],
});

export const mutations = {
  setItems (state, list) {
    state.menuItems = list;
  },
};

export const actions = {
  getItems (context, payload) {
    context.commit('setItems', payload);
  },
};

export const getters = {
  getInfo: (state) => slug => {
    return state.menuItems.find(cat => cat.name === slug);
  },
};
