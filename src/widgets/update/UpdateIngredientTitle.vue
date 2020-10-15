<template>
  <ingredients-title :inner-title="innerTitle"
                     :title-num="titleNum"
                     @set="setTitle"/>
</template>

<script>

import { mapGetters } from 'vuex';
import IngredientsTitle from '../general/common/IngredientsTitle.vue';
import { setIngredientsTitle } from '../../store/updateRecipeStore/actions';
import { STORE_NAME } from '../../store/updateRecipeStore/const';

export default {
  components: {
    IngredientsTitle,
  },
  props: {
    titleNum: {
      type: Number,
      default: 0,
    },
  },
  computed: {
    ...mapGetters({
      innerTitle: `${STORE_NAME}/innerTitle`,
    }),
  },
  methods: {
    setTitle({ key, step }) {
      this.$store.dispatch(setIngredientsTitle, { key, step });
    },
  },
};
</script>

<style scoped lang="scss">
@import "src/styles/common";
@include label-and-button-container(150px);
</style>
