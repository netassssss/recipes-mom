<template>
  <div class="overview-container">
    <mom-button style-type="info" @click="openModal">
      <div class="button-container">
        <img :src="recipeIcon" class="overview-img"/>
        <div>Add recipe</div>
      </div>
    </mom-button>
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
import MomButton from '../../components/MomButton.vue';
import modalMixin from '../../mixins/modalMixin';
import recipeIcon from '../../../static/img/recipeIcon.png';

import ModalContent from '../../components/addons/ModalContent.vue';
import AddRecipe from '../../widgets/addons/AddRecipeContent.vue';

import { steps } from './const';

export default {
  components: {
    AddRecipe,
    MomButton,
    ModalContent,
  },
  mixins: [modalMixin],
  data() {
    return {
      steps,
      step: 0,
      recipeIcon,
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
      this.closeModal();
    },
  },
};
</script>

<style scoped lang="scss">
  .overview-container {
    width: 100%;
    height: 100%;
    .button-container {
      display: grid;
      grid-template-columns: 20px calc(100% - 20px);
      grid-column-gap: 10px;
      padding-right: 10px;
      align-items: center;
    }
    .overview-img {
      width: 20px;
      height: 20px;
    }
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
