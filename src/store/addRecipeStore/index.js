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
};

export default {
  namespaced: true,
  state: getState(),
  getters,
  actions,
  mutations,
};
