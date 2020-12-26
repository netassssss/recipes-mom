import { STORE_NAME } from './const';

export const init = `${STORE_NAME}/init`;
export const setTitles = `${STORE_NAME}/setTitles`;
export const getRecipe = `${STORE_NAME}/getRecipe`;
export const saveRecipes = `${STORE_NAME}/saveRecipes`;
export const setCurrentIndex = `${STORE_NAME}/setCurrentIndex`;
export const getCurrentRecipeData = `${STORE_NAME}/getCurrentRecipeData`;

export default {
  init,
  setTitles,
  getRecipe,
  saveRecipes,
  setCurrentIndex,
  getCurrentRecipeData,
};
