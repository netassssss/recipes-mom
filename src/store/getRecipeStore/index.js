import getters from './getters';

import Api from './api';

/* eslint no-debugger:0 */
const getState = () => ({
  recipes: [],
});
const actions = {
  async init({ commit }) {
    const response = await Api.getRecipes();
    commit('SET_RECIPES', response.body.data);
  },
  getCurrentRecipeData({ state }, { title }) {
    const { recipes } = state;
    const item = recipes
      .find((recipe) => Object.keys(recipe).find((r) => r !== 'documentId' && r !== 'level' && r === title));
    return item;
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
