/* eslint no-debugger:0 */

export const steps = [
  {
    title: 'Choose recipe to update',
    features: ['Updatedropdown'],
    buttons: { okText: 'Next', cancelText: '' },
    created() {
      this.$store.dispatch('modal/resetData');
    },
    applyFunc() {
      if (this.$store.getters['modal/documentId']) this.step += 1;
    },
  },
  {
    title: 'Step 1 - Update recipe title',
    features: ['AddRecipe'],
    buttons: { okText: 'Next', cancelText: 'Back' },
    applyFunc() {
      const title = this.$store.getters['modal/getTitle'];
      if (title) this.step += 1;
      if (title) this.$store.dispatch('modal/setUpdateProcess', { key: 'title', value: title });
    },
  },
  {
    title: 'Step 2 - Choose an Ingredient or Add New One',
    features: ['UpdateTitle'],
    buttons: { okText: 'Next', cancelText: 'Back' },
    applyFunc() {
      const title = this.$store.getters['modal/getUpdateTitle'];
      const titles = this.$store.getters['modal/innerTitle'];
      if (title && title !== 'SkipThisPhase2345') {
        const index = titles.indexOf(title);
        this.titleNum = index;
        this.step += 1;
      } else if (title !== 'SkipThisPhase2345') {
        this.titleNum = titles.length;
        this.$store.dispatch('modal/addIngredientsByTitle', { step: this.titleNum - 1 });
        this.step += 1;
      } else {
        this.step = 6;
      }
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
