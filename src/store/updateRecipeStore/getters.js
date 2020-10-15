export const getDropdownData = (state) => state.recipes
  .map((recipe) => ({
    documentId: recipe.documentId,
    name: Object.keys(recipe).find((r) => r !== 'documentId' && r !== 'level'),
  }));

export const allRecipes = (state) => (index) => state.recipes[index];
export const documentId = (state) => state.documentId;
export const getTitle = (state) => state.recipeTitle || '';
export const getUpdateTitle = (state) => state.ingredientCurrentTitle;
export const innerTitle = (state) => state.titles;
export const ingredients = (state) => (step) => state.ingredients[state.titles[step]]
  || [];
export const getDescription = (state) => state.description;

export default {
  getTitle,
  documentId,
  allRecipes,
  innerTitle,
  ingredients,
  getDescription,
  getUpdateTitle,
  getDropdownData,
};
