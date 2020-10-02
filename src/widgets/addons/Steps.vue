<template>
  <div class="steps-container">
    <modal-content :is-open="isModalOpen"
                   @close="closeModalAndReset"
                   @cancel="backStep"
                   @apply="nextStep"
                   :ok-text="currentButtons.okText"
                   :cancel-text="currentButtons.cancelText">
      <template slot="header">
        <div>{{ title }}</div>
      </template>
      <template slot="body">
        <div v-for="(comp, index) in currentComponents"
             :key="index"
             class="components-container">
          <component :is="comp"
                     v-bind="currentProps"/>
        </div>
      </template>
    </modal-content>
  </div>
</template>

<script>

import ModalContent from '../../components/ModalContent.vue';
import AddRecipe from './AddRecipeContent.vue';
import AddIngredients from './AddIngredients.vue';
import AdditionalStep from './AdditionalStep.vue';
import DescriptionStep from './Description.vue';
import AddIngredientsTitle from './AddIngredientsTitle.vue';

import { steps } from './const';

export default {
  components: {
    AddRecipe,
    ModalContent,
    AdditionalStep,
    AddIngredients,
    DescriptionStep,
    AddIngredientsTitle,
  },
  props: {
    isModalOpen: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      steps,
      step: 0,
      titleNum: 0,
      additionalText: 'Add Additional Ingredients?',
    };
  },
  computed: {
    title() {
      return steps[this.step] ? steps[this.step].title : '';
    },
    currentComponents() {
      return steps[this.step] ? steps[this.step].features : [];
    },
    currentButtons() {
      return steps[this.step] ? steps[this.step].buttons : { okText: '', cancelText: '' };
    },
    currentProps() {
      return steps[this.step] && steps[this.step].props
        ? steps[this.step].props.reduce((acc, prop) => ({ ...acc, [prop]: this[prop] }), {})
        : {};
    },
  },
  methods: {
    defaultApply() {
      if (this.step < steps.length - 1) this.step += 1;
    },
    nextStep() {
      if (steps[this.step] && steps[this.step].applyFunc) steps[this.step].applyFunc.call(this);
      else this.defaultApply();
    },
    resetModal() {
      this.step = 0;
    },
    defaultBack() {
      if (this.step > 1) this.step -= 1;
      else this.resetModal();
    },
    backStep() {
      if (steps[this.step] && steps[this.step].backFunc) steps[this.step].backFunc.call(this);
      else this.defaultBack();
    },
    closeModalAndReset() {
      this.resetModal();
      this.$emit('close');
    },
  },
};
</script>

<style scoped lang="scss">
  .steps-container {
    width: 100%;
    height: 100%;
    .components-container {
      padding: 20px;
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
    }
  }
</style>
