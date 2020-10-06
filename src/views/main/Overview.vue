<template>
  <div class="overview-container">
    <mom-button style-type="info" @click="openModalOnAdd">
      <div class="button-container">
        <img :src="recipeIcon" class="overview-img"/>
        <div>Add recipe</div>
      </div>
    </mom-button>
    <update @update="openModalOnUpdate"/>
    <steps :is-modal-open="isModalOpen"
           @close="closeModal"
           :update="isUpdate"/>
  </div>
</template>

<script>
import MomButton from '../../components/MomButton.vue';
import recipeIcon from '../../../static/img/recipeIcon.png';
import modalMixin from '../../mixins/modalMixin';

import Update from '../../widgets/update/Update.vue';
import Steps from '../../widgets/addons/Steps.vue';

export default {
  mixins: [modalMixin],
  components: {
    Steps,
    Update,
    MomButton,
  },
  data() {
    return {
      isUpdate: false,
      recipeIcon,
    };
  },
  methods: {
    openModalOnAdd() {
      this.isUpdate = false;
      this.openModal();
    },
    openModalOnUpdate() {
      this.isUpdate = true;
      this.openModal();
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
  }
</style>
