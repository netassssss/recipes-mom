export const steps = [
  { title: 'Step 1 - Insert recipe title', features: ['AddRecipe'], buttons: { okText: 'Next', cancelText: '' } },
  {
    title: 'Step 2 - Add ingredients', features: ['AddIngredients'], props: ['step'], buttons: { okText: 'Next', cancelText: 'Back' },
  },
  {
    title: 'Step 3 - Add Additional ingredients?',
    features: ['AdditionalStep'],
    props: ['additionalText'],
    buttons: { okText: 'Yes', cancelText: 'No' },
    applyFunc() { this.step -= 1; },
    backFunc() { this.defaultApply(); },
  },
];

export default {
  steps,
};
