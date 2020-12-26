import getters from './getters';

import Api from './api';

/* eslint no-debugger:0 */
const getState = () => ({
  recipes: [],
  titles: [],
  currentRecipeIndex: 0,
});

const validateRecipeDoesnotExist = (recipes, recipe) => {
  const name = Object.keys(recipe).find((r) => r !== 'documentId');
  return !recipes.find((r) => Object.keys(r).indexOf(name) > -1);
};

const actions = {
  async init() {
    // const response = await Api.getRecipes();
    // commit('SET_RECIPES', response.body.data);
  },
  getCurrentRecipeData({ state }, { title }) {
    const { recipes } = state;
    const item = recipes
      .find((recipe) => Object.keys(recipe).find((r) => r !== 'documentId' && r !== 'level' && r === title));
    return item;
  },
  async setTitles({ commit }) {
    const response = await Api.getTitles();
    commit('SET_TITLES', response.body.data);
  },
  async getRecipe({ commit, state }, { item }) {
    const { documentId } = item;
    const response = await Api.getRecipe({ documentId });
    commit('SET_RECIPES', response.body.data);
    commit('SET_CURRENT_INDEX', state.recipes.length - 1);
  },
  saveRecipes({ commit }, { recipes }) {
    commit('SET_RECIPES', recipes);
  },
  setCurrentIndex({ commit }, { index }) {
    commit('SET_CURRENT_INDEX', index);
  },
};

const mutations = {
  SET_RECIPES(state, data) {
    if (validateRecipeDoesnotExist(state.recipes, data)) state.recipes.push(data);
  },
  SET_TITLES(state, titles) {
    state.titles = titles;
  },
  SET_CURRENT_INDEX(state, index) {
    state.currentRecipeIndex = index;
  },
};

export default {
  namespaced: true,
  state: getState(),
  getters,
  actions,
  mutations,
};
