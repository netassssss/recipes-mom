<template>
  <div class="overview-container">
    <mom-nav-bar :items="navItems" @select="selectTab">
      <template v-slot:default="slotProp">
        <div class="button-container">
          <img :src="navIcons[slotProp.index]" class="overview-img"/>
          <div>{{ slotProp.item }}</div>
        </div>
      </template>
    </mom-nav-bar>
    <steps :is-modal-open="isModalOpen"
           @close="closeModal"
           :update="isUpdate"/>
  </div>
</template>

<script>
import MomNavBar from '../../components/MomNavBar.vue';
import addIcon from '../../../static/img/addIcon.svg';
import updateIcon from '../../../static/img/updateIcon.png';
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
      navItems: ['Add Recipe', 'Update Recipe'],
      navIcons: [addIcon, updateIcon],
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
      grid-template-columns: 30px calc(100% - 30px);
      grid-column-gap: 10px;
      padding-right: 10px;
      align-items: center;
    }
    .overview-img {
      width: 30px;
      height: 30px;
    }
  }
</style>
