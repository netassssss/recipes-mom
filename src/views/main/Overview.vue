<template>
  <div class="overview-container">
    <mom-nav-bar :items="navItems" @select="selectTab"/>
<!--    <mom-button style-type="info" @click="openModalOnAdd">-->
<!--      <div class="button-container">-->
<!--        <img :src="recipeIcon" class="overview-img"/>-->
<!--        <div>Add recipe</div>-->
<!--      </div>-->
<!--    </mom-button>-->
<!--    <update @update="openModalOnUpdate" v-if="isUpdate"/>-->
    <steps :is-modal-open="isModalOpen"
           @close="closeModal"
           :update="isUpdate"/>
  </div>
</template>

<script>
import MomNavBar from '../../components/MomNavBar.vue';
import recipeIcon from '../../../static/img/recipeIcon.png';
import modalMixin from '../../mixins/modalMixin';

import Steps from '../../widgets/addons/Steps.vue';

export default {
  mixins: [modalMixin],
  components: {
    Steps,
    MomNavBar,
  },
  data() {
    return {
      isUpdate: false,
      recipeIcon,
      navItems: ['Add Recipe', 'Update Recipe'],
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
    selectTab(tab) {
      if (tab === this.navItems[0]) this.openModalOnAdd();
      else this.openModalOnUpdate();
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
