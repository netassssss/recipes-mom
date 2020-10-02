/* eslint no-debugger:0 */
export const steps = [
  {
    title: 'Step 1 - Insert recipe title',
    features: ['AddRecipe'],
    buttons: { okText: 'Next', cancelText: '' },
    applyFunc() {
      if (this.$store.getters['modal/getTitle']) this.step += 1;
    },
  },
  {
    title: 'Step 2 - Add ingredients\' title',
    features: ['AddIngredientsTitle'],
    props: ['titleNum'],
    buttons: { okText: 'Next', cancelText: 'Back' },
    applyFunc() {
      if (this.$store.getters['modal/innerTitle'].length > this.titleNum) {
        this.step += 1;
        this.titleNum += 1;
        this.$store.dispatch('modal/addIngredientsByTitle');
      }
    },
  },
  {
    title: 'Step 3 - Add ingredients',
    features: ['AddIngredients'],
    props: ['step'],
    buttons: { okText: 'Next', cancelText: 'Back' },
    backFunc() { this.defaultBack(); this.titleNum -= 1; },
  },
  {
    title: 'Step 3 - Add Additional ingredients?',
    features: ['AdditionalStep'],
    props: ['additionalText'],
    buttons: { okText: 'Yes', cancelText: 'No' },
    applyFunc() { this.step -= 1; },
    backFunc() { if (this.step < steps.length - 1) this.step += 1; },
  },
  {
    title: 'Step 4 - Steps to Make it Happen!',
    features: ['DescriptionStep'],
    buttons: { okText: 'Next', cancelText: '' },
  },
];

export default {
  steps,
};
