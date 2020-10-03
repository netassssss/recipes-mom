import getters from './getters';

import Api from './api';

const getState = () => ({
  recipes: [],
});
const actions = {
  async init({ commit }) {
    const response = await Api.getRecipes();
    commit('SET_RECIPES', response.body.data);
  },
};
const mutations = {
  SET_RECIPES(state, data) {
    state.recipes = data;
  },
};

export default {
  namespaced: true,
  state: getState(),
  getters,
  actions,
  mutations,
};
