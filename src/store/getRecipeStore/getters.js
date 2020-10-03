export const getDropdownData = (state) => state.recipes
  .map((recipe) => ({
    documentId: recipe.documentId,
    name: Object.keys(recipe).find((r) => r !== 'documentId' && r !== 'level'),
  }));

export default {
  getDropdownData,
};
