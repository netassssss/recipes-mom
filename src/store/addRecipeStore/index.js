import getters from './getters';

/* eslint no-debugger:0 */
const getState = () => ({
  recipeProcess: {},
  ingredients: {},
  description: {},
  titles: [],
});
const actions = {
  setProcess({ commit }, { key, value }) {
    commit('SET_PROCESS', { key, value });
  },
  addNewIng({ commit, state }, { title }) {
    const { ingredients } = state;
    if (!ingredients[title]) {
      ingredients[title] = [];
    }
    ingredients[title].push({
      ing: '',
      amount: '',
      units: '',
    });
    commit('SET_INGREDIENTS', ingredients);
  },
  removeIng({ commit, state }, { title, index }) {
    const { ingredients } = state;
    if (ingredients[title]) ingredients[title].splice(index, 1);
    commit('SET_INGREDIENTS', ingredients);
  },
  setIngredients({ commit, state }, {
    title, key, value, index,
  }) {
    const { ingredients } = state;
    if (ingredients[title] && index < ingredients[title].length) {
      ingredients[title][index][key] = value;
    }
    commit('SET_INGREDIENTS', ingredients);
  },
  setIngredientsTitle({ commit }, { key, step }) {
    commit('SET_TITLES', { key, step });
  },
  addIngredientsByTitle({ commit, state }) {
    const { ingredients, titles } = state;
    ingredients[titles[titles.length - 1]] = [{
      ing: '',
      amount: '',
      units: '',
    }];
    commit('SET_INGREDIENTS', ingredients);
  },
  addDescription({ commit, state }, { title }) {
    const { description } = state;
    if (!description[title]) description[title] = [];
    description[title].push(`${description[title].length + 1}.`);
    commit('SET_DESCRIPTION', description);
  },
  setDescription({ commit, state }, { title, desc, index }) {
    const { description } = state;
    if (description[title]) description[title][index] = desc;
    commit('SET_DESCRIPTION', description);
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
  SET_DESCRIPTION(state, description) {
    state.description = description;
  },
  SET_TITLES(state, { key, step }) {
    const { titles } = state;
    if (step < titles.length) titles[step] = key;
    else titles.push(key);
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
