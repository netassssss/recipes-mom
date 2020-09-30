export const getTitle = (state) => state.recipeProcess.title || '';
export const ingredients = (state) => state.ingredients;
export const getIngredientsTitles = (state) => state.titles;

export default {
  getTitle,
  ingredients,
  getIngredientsTitles,
};
