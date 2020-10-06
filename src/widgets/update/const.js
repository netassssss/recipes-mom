/* eslint no-debugger:0 */

export const steps = [
  {
    title: 'Step 1 - Update recipe title',
    features: ['AddRecipe'],
    buttons: { okText: 'Next', cancelText: '' },
    applyFunc() {
      if (this.$store.getters['modal/getTitle']) this.step += 1;
    },
  },
  {
    title: 'Step 2 - Choose an Ingredient or Add New One',
    features: ['UpdateTitle'],
    buttons: { okText: 'Next', cancelText: 'Back' },
    applyFunc() {
      const title = this.$store.getters['modal/getUpdateTitle'];
      const titles = this.$store.getters['modal/innerTitle'];
      if (title) {
        const index = titles.indexOf(title);
        this.titleNum = index;
      } else {
        this.titleNum = titles.length;
        this.$store.dispatch('modal/addIngredientsByTitle', { step: this.titleNum - 1 });
      }
      this.step += 1;
    },
  },
  {
    title: 'Step 2 - Set ingredients\' title',
    features: ['AddIngredientsTitle'],
    props: ['titleNum'],
    buttons: { okText: 'Next', cancelText: 'Back' },
    applyFunc() {
      if (this.$store.getters['modal/innerTitle'].length > this.titleNum) {
        this.step += 1;
        this.titleNum += 1;
        this.$store.dispatch('modal/updateIngredientsByTitle', { step: this.titleNum - 1 });
      }
      this.$store.dispatch('modal/setUpdateTitle', { title: '' });
    },
    backFunc() {
      this.$store.dispatch('modal/setUpdateTitle', { title: '' });
      this.defaultBack();
    },
  },
  {
    title: 'Step 3 - Add ingredients',
    features: ['AddIngredients'],
    props: ['step', 'titleNum'],
    buttons: { okText: 'Next', cancelText: 'Back' },
    backFunc() { this.defaultBack(); this.titleNum -= 1; },
  },
  {
    title: 'Step 3 - Add Additional ingredients?',
    features: ['AdditionalStep'],
    props: ['additionalText'],
    buttons: { okText: 'Yes', cancelText: 'No' },
    applyFunc() {
      this.step = 1;
    },
    backFunc() { if (this.step < steps.length - 1) this.step += 1; },
  },
  {
    title: 'Step 4 - Steps to Make it Happen!',
    features: ['DescriptionStep'],
    buttons: { okText: 'Next', cancelText: 'Back' },
    backFunc() { this.step = 0; },
  },
  {
    title: 'Final Step - Save',
    features: ['SaveToDb'],
    buttons: { okText: 'Yes', cancelText: 'Back' },
    applyFunc() {
      this.$store.dispatch('modal/saveRecipeToDB');
      this.closeModalAndReset();
    },
  },
];

export default {
  steps,
};