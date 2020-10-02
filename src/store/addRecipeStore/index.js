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
  addNewIng({ commit, state }) {
    const { ingredients } = state;
    const ingKeys = Object.keys(ingredients);
    const title = ingKeys[ingKeys.length - 1];
    commit('SET_NEW_INGREDIENTS', { title });
  },
  removeIng({ commit, state }, { index }) {
    const { ingredients } = state;
    const ingKeys = Object.keys(ingredients);
    const title = ingKeys[ingKeys.length - 1];
    commit('REMOVE_INGREDIENTS', { title, index });
  },
  setIngredients({ commit, state }, {
    key, value, index,
  }) {
    const { ingredients } = state;
    const ingKeys = Object.keys(ingredients);
    const title = ingKeys[ingKeys.length - 1];
    if (ingredients[title] && index < ingredients[title].length) {
      commit('UPDATE_INGREDIENTS', {
        index, key, value, title,
      });
    }
  },
  setIngredientsTitle({ commit }, { key, step }) {
    commit('SET_TITLES', { key, step });
  },
  addIngredientsByTitle({ commit, state }) {
    const { ingredients, titles } = state;
    const ingKeys = Object.keys(ingredients);
    const currentTitle = ingKeys[ingKeys.length - 1];
    if (ingredients[currentTitle]) {
      ingredients[titles[titles.length - 1]] = ingredients[currentTitle];
    } else {
      ingredients[titles[titles.length - 1]] = [{
        ing: '',
        amount: '',
        units: '',
      }];
    }
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
    state.ingredients = { ...ingredients };
  },
  SET_NEW_INGREDIENTS(state, { title }) {
    const { ingredients } = state;
    if (!ingredients[title]) {
      ingredients[title] = [];
    }
    ingredients[title].push({
      ing: '',
      amount: '',
      units: '',
    });
    state.ingredients = { ...ingredients };
  },
  UPDATE_INGREDIENTS(state, {
    index, key, value, title,
  }) {
    const { ingredients } = state;
    ingredients[title][index][key] = value;
    state.ingredients = { ...ingredients };
  },
  REMOVE_INGREDIENTS(state, { title, index }) {
    const { ingredients } = state;
    if (ingredients[title]) ingredients[title].splice(index, 1);
    state.ingredients = { ...ingredients };
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
