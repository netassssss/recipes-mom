export const getDropdownData = (state) => state.recipes
  .map((recipe) => ({
    documentId: recipe.documentId,
    name: Object.keys(recipe).find((r) => r !== 'documentId' && r !== 'level'),
  }));

export const allRecipes = (state) => (index) => state.recipes[index];
export const getRecipes = (state) => state.recipes;
export const getTitles = (state) => state.titles;

export default {
  getTitles,
  getRecipes,
  allRecipes,
  getDropdownData,
};
