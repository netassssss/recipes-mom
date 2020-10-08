export const getDropdownData = (state) => state.recipes
  .map((recipe) => ({
    documentId: recipe.documentId,
    name: Object.keys(recipe).find((r) => r !== 'documentId' && r !== 'level'),
  }));

export const allRecipes = (state) => (index) => state.recipes[index];

export default {
  allRecipes,
  getDropdownData,
};
