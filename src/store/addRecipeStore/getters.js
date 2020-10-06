/* eslint no-debugger:0 */
export const getTitle = (state) => state.recipeProcess.title || '';
export const ingredients = (state) => (step) => state.ingredients[state.titles[step]]
  || [];
export const getDescription = (state) => (state.recipeProcess.title
  ? state.description[state.recipeProcess.title] : []);
export const innerTitle = (state) => state.titles;

// -- update -- //
export const getUpdateTitle = (state) => state.titleToUpdate;
export const documentId = (state) => state.documentId;

export default {
  getTitle,
  innerTitle,
  documentId,
  ingredients,
  getDescription,
  getUpdateTitle,
};
