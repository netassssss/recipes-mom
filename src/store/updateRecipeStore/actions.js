import { STORE_NAME } from './const';

export const init = `${STORE_NAME}/init`;
export const saveRecipeToDB = `${STORE_NAME}/saveRecipeToDB`;
export const setUpdateTitle = `${STORE_NAME}/setUpdateTitle`;
export const updateUiRecipe = `${STORE_NAME}/updateUiRecipe`;
export const addDescription = `${STORE_NAME}/addDescription`;
export const setDescription = `${STORE_NAME}/setDescription`;
export const setRecipeTitle = `${STORE_NAME}/setRecipeTitle`;
export const setIngredientsTitle = `${STORE_NAME}/setIngredientsTitle`;
export const getCurrentRecipeData = `${STORE_NAME}/getCurrentRecipeData`;

export default {
  init,
  setUpdateTitle,
  addDescription,
  setDescription,
  saveRecipeToDB,
  updateUiRecipe,
  setRecipeTitle,
  setIngredientsTitle,
  getCurrentRecipeData,
};
