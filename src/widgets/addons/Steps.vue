<template>
  <div class="steps-container">
    <modal-content :is-open="isModalOpen"
                   @close="closeModalAndReset"
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
          <component :is="comp"/>
        </div>
      </template>
    </modal-content>
  </div>
</template>

<script>

import ModalContent from '../../components/ModalContent.vue';
import AddRecipe from './AddRecipeContent.vue';
import AddIngredients from './AddIngredients.vue';

import { steps } from './const';

export default {
  components: {
    AddRecipe,
    ModalContent,
    AddIngredients,
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
  },
  methods: {
    nextStep() {
      this.step += 1;
    },
    closeModalAndReset() {
      this.step = 0;
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
