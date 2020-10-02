export const getTitle = (state) => state.recipeProcess.title || '';
export const ingredients = (state) => state.ingredients;
export const getDescription = (state) => state.description;
export const innerTitle = (state) => state.titles;

export default {
  getTitle,
  innerTitle,
  ingredients,
  getDescription,
};
