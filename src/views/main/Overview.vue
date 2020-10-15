<template>
  <div class="overview-container">
    <mom-nav-bar :items="navItems"
                 @select="selectTab"
                 :selected-item="selectedItem">
      <template v-slot:default="slotProp">
        <div class="button-container">
          <img :src="navIcons[slotProp.index]" class="overview-img"/>
          <div>{{ slotProp.item }}</div>
        </div>
      </template>
    </mom-nav-bar>
    <steps :is-modal-open="isModalOpen"
           @close="resetAndCloseTabs"
           :recipes="getRecipes"
           :update="isUpdate"/>
    <all-recipes v-if="showAllRecipes"/>
  </div>
</template>

<script>
/* eslint no-debugger:0 */
import { mapGetters } from 'vuex';

import MomNavBar from '../../components/MomNavBar.vue';
import addIcon from '../../../static/img/addIcon.svg';
import updateIcon from '../../../static/img/updateIcon.svg';
import recipesIcon from '../../../static/img/recipesIcon.svg';
import modalMixin from '../../mixins/modalMixin';

import Steps from '../../widgets/addons/Steps.vue';
import AllRecipes from '../../widgets/get/AllRecipes.vue';

import { init } from '../../store/getRecipeStore/actions';
import { STORE_NAME } from '../../store/getRecipeStore/const';

export default {
  mixins: [modalMixin],
  components: {
    Steps,
    MomNavBar,
    AllRecipes,
  },
  created() {
    this.$store.dispatch(init);
  },
  computed: {
    ...mapGetters({
      getRecipes: `${STORE_NAME}/getRecipes`,
    }),
  },
  data() {
    const navItems = ['All Recipes', 'Add Recipe', 'Update Recipe'];
    const selectedItem = navItems[0];
    return {
      showAllRecipes: true,
      isUpdate: false,
      navItems,
      selectedItem,
      navIcons: [recipesIcon, addIcon, updateIcon],
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
    resetTabs() {
      [this.selectedItem] = this.navItems;
      this.showAllRecipes = true;
    },
    resetAndCloseTabs() {
      this.closeModal();
      this.resetTabs();
    },
    selectTab(tab) {
      this.selectedItem = tab;
      this.showAllRecipes = false;
      if (tab === this.navItems[1]) this.openModalOnAdd();
      else if (tab === this.navItems[2]) this.openModalOnUpdate();
      else this.resetTabs();
    },
  },
};
</script>

<style scoped lang="scss">
  @import "../../styles/colors";
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
