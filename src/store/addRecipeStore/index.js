import getters from './getters';
import Api from './api';

/* eslint no-debugger:0 */
const getState = () => ({
  recipeProcess: {},
  ingredients: {},
  description: {},
  titles: [],
  documentId: null,
  originalTitle: null,
  titleToUpdate: null,
});
const actions = {
  updateUiRecipe({ dispatch, commit }, {
    title, ingredients, description, documentId,
  }) {
    dispatch('setUpdateProcess', { key: 'title', value: title });
    Object.keys(ingredients)
      .forEach((currentTitle, index) => {
        dispatch('setIngredientsTitle', { key: currentTitle, step: index });
        ingredients[currentTitle]
          .forEach((ingItem, ingInd) => {
            if (ingInd === 0) dispatch('addIngredientsByTitle', { step: index });
            else dispatch('addNewIng');
            dispatch('setIngredients', { key: 'ing', value: ingItem.ing, index: ingInd });
            dispatch('setIngredients', { key: 'amount', value: ingItem.amount, index: ingInd });
            dispatch('setIngredients', { key: 'units', value: ingItem.units, index: ingInd });
          });
      });
    description
      .forEach((desc, index) => {
        dispatch('addDescription');
        dispatch('setDescription', { desc, index });
      });
    commit('SET_DOCUMENT_ID', documentId);
  },
  resetData({ commit }) {
    commit('RESET_ALL');
  },
  setUpdateProcess({ commit }, { key, value }) {
    commit('SET_UPDATE_PROCESS', { key, value });
  },
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
  updateIngredientsByTitle({ commit, state }, { step }) {
    const { ingredients, titles } = state;
    const ingKeys = Object.keys(ingredients);
    const currentTitle = ingKeys[step];
    if (ingredients[currentTitle]) {
      ingredients[titles[step]] = ingredients[currentTitle];
    } else {
      ingredients[titles[step]] = [{
        ing: '',
        amount: '',
        units: '',
      }];
    }
    commit('SET_INGREDIENTS', ingredients);
  },
  addDescription({ commit, state }) {
    const { recipeProcess } = state;
    const { title } = recipeProcess;
    commit('ADD_DESCRIPTION', { title });
  },
  setDescription({ commit, state }, { desc, index }) {
    const { description, recipeProcess } = state;
    if (description[recipeProcess.title]) description[recipeProcess.title][index] = desc;
    commit('SET_DESCRIPTION', description);
  },
  async saveRecipeToDB({ state }) {
    const { recipeProcess, ingredients, description } = state;
    const { title } = recipeProcess;
    const response = await Api.saveRecipe({
      ingredients, description: description[title], title, documentId: state.documentId,
    });
    return response;
  },
  setUpdateTitle({ commit }, { title }) {
    commit('SET_UPDATE_TITLE', title);
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
  ADD_DESCRIPTION(state, { title }) {
    const { description } = state;
    if (!description[title]) description[title] = [];
    description[title].push(`${description[title].length + 1}.`);
    state.description = { ...description };
  },
  SET_TITLES(state, { key, step }) {
    const { titles } = state;
    if (step < titles.length) titles[step] = key;
    else titles.push(key);
    state.titles = titles;
  },
  SET_DOCUMENT_ID(state, id) {
    state.documentId = id;
  },
  SET_UPDATE_PROCESS(state, { key, value }) {
    const recipe = {
      ...state.recipeProcess,
      [key]: value,
    };
    state.recipeProcess = recipe;
    state.description = {
      [recipe.title]: state.description[state.originalTitle],
    };
    state.originalTitle = recipe.title;
  },
  SET_UPDATE_TITLE(state, titleToUpdate) {
    state.titleToUpdate = titleToUpdate;
  },
  RESET_ALL(state) {
    state.recipeProcess = {};
    state.ingredients = {};
    state.description = {};
    state.titles = [];
    state.documentId = null;
    state.titleToUpdate = null;
  },
};

export default {
  namespaced: true,
  state: getState(),
  getters,
  actions,
  mutations,
};
