<template>
  <div class="update-ingredients-container">
    <div class="label-container label-container-mobile {">
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
    <mom-button @click="skipHandlr">Skip This Phase</mom-button>
  </div>
</template>

<script>

/* eslint no-debugger:0 */
import { mapGetters } from 'vuex';
import { STORE_NAME, SkipThisPhase2345 } from '@/store/updateRecipeStore/const';
import { setUpdateTitle } from '../../store/updateRecipeStore/actions';

import MomDropdown from '../../components/MomDropdown.vue';
import MomButton from '../../components/MomButton.vue';

const INITIAL_SELECTION = 'Select/Add Ingredient';
const ADD_NEW_INGREDIENTS = 'Add New';

export default {
  components: {
    MomButton,
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
    skipHandlr() {
      this.$store.dispatch(setUpdateTitle, { title: SkipThisPhase2345 });
      this.$emit('nextStep');
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
@media only screen and (max-width: 798px) {
  .update-ingredients-container {
    .label-container-mobile {
      flex-direction: column;
      height: 100px;
      .long-label {
        padding-bottom: 10px;
        width: 100%;
      }
    }
  }
}
</style>
