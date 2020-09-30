import getters from './getters';

/* eslint no-debugger:0 */
const getState = () => ({
  recipeProcess: {},
  ingredients: [
    {
      ing: '',
      amount: '',
      units: '',
    },
  ],
  titles: {},
});
const actions = {
  setProcess({ commit }, { key, value }) {
    commit('SET_PROCESS', { key, value });
  },
  addNewIng({ commit, state }) {
    const ingredients = [...state.ingredients];
    ingredients.push({
      ing: '',
      amount: '',
      units: '',
    });
    commit('SET_INGREDIENTS', ingredients);
  },
  removeIng({ commit, state }, { index }) {
    const ingredients = [...state.ingredients];
    ingredients.splice(index, 1);
    commit('SET_INGREDIENTS', ingredients);
  },
  setIngredients({ commit, state }, { key, value, index }) {
    const ingredients = [...state.ingredients];
    if (index < ingredients.length) ingredients[index][key] = value;
    commit('SET_INGREDIENTS', ingredients);
  },
  setIngredientsTitle({ commit, state }, { title, key }) {
    const { titles } = state;
    titles[key] = title;
    commit('SET_TITLES', titles);
  },
};
const mutations = {
  SET_PROCESS(state, { key, value }) {
    const recipe = {
      ...state.recipeProcess,
      [key]: value,
    };
    state.recipeProcess = recipe;
  },
  SET_INGREDIENTS(state, ingredients) {
    state.ingredients = ingredients;
  },
  SET_TITLES(state, titles) {
    state.titles = titles;
  },
};

export default {
  namespaced: true,
  state: getState(),
  getters,
  actions,
  mutations,
};
