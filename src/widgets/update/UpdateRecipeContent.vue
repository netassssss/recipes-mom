<template>
  <recipe-content :title="title" @set="setTitle"/>
</template>

<script>
import { mapGetters } from 'vuex';
import { STORE_NAME } from '../../store/updateRecipeStore/const';
import { setRecipeTitle } from '../../store/updateRecipeStore/actions';

import RecipeContent from '../general/common/RecipeContent.vue';

export default {
  components: {
    RecipeContent,
  },
  props: {
    step: {
      type: Number,
      default: 0,
    },
  },
  computed: {
    ...mapGetters({
      title: `${STORE_NAME}/getTitle`,
    }),
  },
  methods: {
    setTitle(title) {
      this.$store.dispatch(setRecipeTitle, { title });
    },
  },
};
</script>
