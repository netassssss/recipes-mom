/* eslint no-debugger:0 */
export const getTitle = (state) => state.recipeProcess.title || '';
export const ingredients = (state) => (step) => state.ingredients[state.titles[step]]
  || [];
export const getDescription = (state) => state.description;
export const innerTitle = (state) => state.titles;

export default {
  getTitle,
  innerTitle,
  ingredients,
  getDescription,
};
