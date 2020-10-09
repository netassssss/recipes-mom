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
import SaveToDb from './SaveToDb.vue';

import Updatedropdown from '../update/Update.vue';
import UpdateTitle from '../update/UpdateIngredientsTitle.vue';

import { steps as addSteps } from './const';
import { steps as updateSteps } from '../update/const';

/* eslint no-debugger:0 */
export default {
  components: {
    SaveToDb,
    AddRecipe,
    UpdateTitle,
    ModalContent,
    AdditionalStep,
    AddIngredients,
    Updatedropdown,
    DescriptionStep,
    AddIngredientsTitle,
  },
  created() {
    if (this.steps[this.step] && this.steps[this.step].created) {
      this.steps[this.step].created.call(this);
    }
  },
  props: {
    isModalOpen: {
      type: Boolean,
      default: false,
    },
    update: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      step: 0,
      titleNum: 0,
      additionalText: 'Add Additional Ingredients?',
    };
  },
  computed: {
    steps() {
      return this.update ? updateSteps : addSteps;
    },
    title() {
      return this.steps[this.step] ? this.steps[this.step].title : '';
    },
    currentComponents() {
      return this.steps[this.step] ? this.steps[this.step].features : [];
    },
    currentButtons() {
      return this.steps[this.step] ? this.steps[this.step].buttons : { okText: '', cancelText: '' };
    },
    currentProps() {
      return this.steps[this.step] && this.steps[this.step].props
        ? this.steps[this.step].props.reduce((acc, prop) => ({ ...acc, [prop]: this[prop] }), {})
        : {};
    },
  },
  methods: {
    defaultApply() {
      if (this.step < this.steps.length - 1) this.step += 1;
    },
    nextStep() {
      if (this.steps[this.step] && this.steps[this.step].applyFunc) {
        this.steps[this.step].applyFunc.call(this);
      } else this.defaultApply();
    },
    resetModal() {
      this.step = 0;
    },
    defaultBack() {
      if (this.step > 1) this.step -= 1;
      else this.resetModal();
    },
    backStep() {
      if (this.steps[this.step] && this.steps[this.step].backFunc) {
        this.steps[this.step].backFunc.call(this);
      } else this.defaultBack();
    },
    closeModalAndReset() {
      this.resetModal();
      this.$emit('close');
    },
  },
  watch: {
    isModalOpen: {
      immediate: true,
      handler() {
        if (this.steps[this.step].created) this.steps[this.step].created.call(this);
      },
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
