import Api from '@/store/updateRecipeStore/api';
import getters from './getters';

/* eslint no-debugger:0 */
const getState = () => ({
  recipeTitle: '',
  ingredients: {},
  description: [],
  titles: [],
  documentId: null,
  originalTitle: null,
  ingredientCurrentTitle: null,
});
const actions = {
  updateUiRecipe({ dispatch, commit }, {
    title, ingredients, description, documentId,
  }) {
    dispatch('setRecipeTitle', { title });
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
    dispatch('addDescription', { description });
    commit('SET_DOCUMENT_ID', documentId);
  },
  setUpdateTitle({ commit }, { title }) {
    commit('SET_UPDATE_TITLE', title);
  },
  setRecipeTitle({ commit }, { title }) {
    commit('SET_UPDATE_PROCESS', { title });
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
  addNewIng({ commit, state }) {
    const { ingredients } = state;
    const ingKeys = Object.keys(ingredients);
    const title = ingKeys[ingKeys.length - 1];
    commit('SET_NEW_INGREDIENTS', { title });
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
  addDescription({ commit }, { description }) {
    commit('SET_DESCRIPTION', description);
  },
  setDescription({ commit, state }, { desc, index }) {
    const { description } = state;
    if (description && description.length < index) description[index] = desc;
    commit('SET_DESCRIPTION', description);
  },
  resetData({ commit }) {
    commit('RESET_ALL');
  },
  updateIngredientsByTitle({ commit, state }, { step }) {
    const { ingredients, titles } = state;
    const ingKeys = Object.keys(ingredients);
    const currentTitle = ingKeys[step];
    if (ingredients[currentTitle]) {
      ingredients[titles[step]] = ingredients[currentTitle];
      if (currentTitle !== titles[step]) delete ingredients[currentTitle];
    } else {
      ingredients[titles[step]] = [{
        ing: '',
        amount: '',
        units: '',
      }];
    }
    commit('SET_INGREDIENTS', ingredients);
  },
  async saveRecipeToDB({ state }) {
    const { recipeTitle, ingredients, description } = state;
    const response = await Api.saveRecipe({
      ingredients, description, title: recipeTitle, documentId: state.documentId,
    });
    return response;
  },
};

const mutations = {
  SET_UPDATE_TITLE(state, titleToUpdate) {
    state.ingredientCurrentTitle = titleToUpdate;
  },
  SET_UPDATE_PROCESS(state, { title }) {
    state.recipeTitle = title;
    state.originalTitle = title;
  },
  SET_TITLES(state, { key, step }) {
    const { titles } = state;
    if (step < titles.length) titles[step] = key;
    else titles.push(key);
    state.titles = titles;
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
  ADD_DESCRIPTION(state) {
    let { description } = state;
    if (!description || !description.length) description = [];
    description.push(`${description.length + 1}.`);
    state.description = [...description];
  },
  SET_DESCRIPTION(state, description) {
    state.description = [...description];
  },
  RESET_ALL(state) {
    state.recipeTitle = '';
    state.ingredients = {};
    state.description = [];
    state.titles = [];
    state.documentId = null;
    state.ingredientCurrentTitle = null;
  },
  SET_DOCUMENT_ID(state, id) {
    state.documentId = id;
  },
};

export default {
  namespaced: true,
  state: getState(),
  getters,
  actions,
  mutations,
};
