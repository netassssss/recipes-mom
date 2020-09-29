export const getTitle = (state) => state.recipeProcess.title || '';
export const ingredients = (state) => state.ingredients;

export default {
  getTitle,
  ingredients,
};
