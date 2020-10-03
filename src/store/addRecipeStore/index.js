import getters from './getters';
import Api from './api';

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
  addIngredientsByTitle({ commit, state }, { step }) {
    const { ingredients, titles } = state;
    const ingKeys = Object.keys(ingredients);
    const currentTitle = ingKeys[step];
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
  addDescription({ commit, state }) {
    const { description, recipeProcess } = state;
    const { title } = recipeProcess;
    if (!description[title]) description[title] = [];
    description[title].push(`${description[title].length + 1}.`);
    commit('SET_DESCRIPTION', description);
  },
  setDescription({ commit, state }, { desc, index }) {
    const { description, recipeProcess } = state;
    if (description[recipeProcess.title]) description[recipeProcess.title][index] = desc;
    commit('SET_DESCRIPTION', description);
  },
  async saveRecipeToDB({ state }) {
    const { recipeProcess, ingredients, description } = state;
    const { title } = recipeProcess;
    await Api.saveRecipe({
      ingredients, description: description[title], title, insert: true,
    });
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
    state.description = { ...description };
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
