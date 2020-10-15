/* eslint no-debugger:0 */

export const steps = [
  {
    title: 'Choose recipe to update',
    features: ['Updatedropdown'],
    buttons: { okText: 'Next', cancelText: '' },
    created() {
      this.$store.dispatch('updateRecipes/resetData');
    },
    applyFunc() {
      if (this.$store.getters['updateRecipes/documentId']) this.step += 1;
    },
  },
  {
    title: 'Step 1 - Update recipe title',
    features: ['UpdateRecipeContent'],
    buttons: { okText: 'Next', cancelText: 'Back' },
    applyFunc() {
      const title = this.$store.getters['updateRecipes/getTitle'];
      if (title) this.step += 1;
    },
  },
  {
    title: 'Step 2 - Choose an Ingredient or Add New One',
    features: ['UpdateTitle'],
    buttons: { okText: 'Next', cancelText: 'Back' },
    applyFunc() {
      const title = this.$store.getters['updateRecipes/getUpdateTitle'];
      const titles = this.$store.getters['updateRecipes/innerTitle'];
      if (title && title !== 'SkipThisPhase2345') {
        const index = titles.indexOf(title);
        this.titleNum = index;
        this.step += 1;
      } else if (title !== 'SkipThisPhase2345') {
        this.titleNum = titles.length;
        this.$store.dispatch('updateRecipes/addIngredientsByTitle', { step: this.titleNum - 1 });
        this.step += 1;
      } else {
        this.step = 6;
      }
    },
  },
  {
    title: 'Step 3 - Set ingredients\' title',
    features: ['UpdateIngredientTitle'],
    props: ['titleNum'],
    buttons: { okText: 'Next', cancelText: 'Back' },
    applyFunc() {
      if (this.$store.getters['updateRecipes/innerTitle'].length > this.titleNum) {
        this.step += 1;
        this.titleNum += 1;
        this.$store.dispatch('updateRecipes/updateIngredientsByTitle', { step: this.titleNum - 1 });
      }
      this.$store.dispatch('updateRecipes/setUpdateTitle', { title: '' });
    },
    backFunc() {
      this.$store.dispatch('updateRecipes/setUpdateTitle', { title: '' });
      this.defaultBack();
    },
  },
  {
    title: 'Step 3 - Add ingredients',
    features: ['UpdateIngredients'],
    props: ['step', 'titleNum'],
    buttons: { okText: 'Next', cancelText: 'Back' },
    backFunc() { this.defaultBack(); this.titleNum -= 1; },
  },
  {
    title: 'Step 4 - Add Additional ingredients?',
    features: ['AdditionalStep'],
    props: ['additionalText'],
    buttons: { okText: 'Yes', cancelText: 'No' },
    applyFunc() {
      this.step = 1;
    },
    backFunc() { if (this.step < steps.length - 1) this.step += 1; },
  },
  {
    title: 'Step 5 - Steps to Make it Happen!',
    features: ['UpdateDescription'],
    buttons: { okText: 'Next', cancelText: 'Back' },
    backFunc() { this.step = 0; },
  },
  {
    title: 'Final Step - Save',
    features: ['SaveToDb'],
    buttons: { okText: 'Yes', cancelText: 'Back' },
    async applyFunc() {
      const response = await this.$store.dispatch('updateRecipes/saveRecipeToDB');
      this.$store.dispatch('recipes/saveRecipes', { recipes: response.body.data });
      this.closeModalAndReset();
    },
  },
];

export default {
  steps,
};
