<template>
  <div class="update-ingredients-container">
    <div class="label-container">
      <label class="long-label"
      >Choose Ingredients or add new from here:</label>
      <mom-dropdown
        :items="titles"
        @select="selectTitleHndlr">
        <template slot="selectedItem">
          {{ selectedTitle }}
        </template>
        <template v-slot:default="slotProps">{{ slotProps.item }}</template>
      </mom-dropdown>
    </div>
  </div>
</template>

<script>

/* eslint no-debugger:0 */
import { mapGetters } from 'vuex';
import { STORE_NAME } from '@/store/addRecipeStore/const';
import { setUpdateTitle } from '../../store/addRecipeStore/actions';

import MomDropdown from '../../components/MomDropdown.vue';

const INITIAL_SELECTION = 'Select/Add Ingredient';
const ADD_NEW_INGREDIENTS = 'Add New';

export default {
  components: {
    MomDropdown,
  },
  computed: {
    ...mapGetters({
      innerTitle: `${STORE_NAME}/innerTitle`,
    }),
    titles() {
      return [...this.innerTitle, ADD_NEW_INGREDIENTS];
    },
  },
  data() {
    return {
      selectedTitle: INITIAL_SELECTION,
    };
  },
  methods: {
    selectTitleHndlr(title) {
      this.selectedTitle = title;
      if (title === ADD_NEW_INGREDIENTS) this.add();
      else this.update();
    },
    update() {
      this.$store.dispatch(setUpdateTitle, { title: this.selectedTitle });
    },
    add() {
      this.$store.dispatch(setUpdateTitle, { title: '' });
    },
  },
};
</script>

<style scoped lang="scss">
@import "src/styles/common";
.update-ingredients-container {
  width: 100%;
}
.update-title-button {
  padding-left: 60px;
}
@include label-and-button-container(calc(100% - 230px), 'space-between');
</style>
