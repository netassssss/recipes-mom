<template>
  <div>
    <mom-book :content="content"/>
  </div>
</template>

<script>

import { mapGetters } from 'vuex';
import { STORE_NAME } from '../../store/getRecipeStore/const';

import MomBook from '../../components/MomBook.vue';

export default {
  components: {
    MomBook,
  },
  computed: {
    ...mapGetters({
      allRecipes: `${STORE_NAME}/allRecipes`,
    }),
    recipes() {
      return this.allRecipes(this.currentRecipeIndex);
    },
    content() {
      if (!this.recipes) return {};
      const title = Object.keys(this.recipes).find((r) => r !== 'level' && r !== 'documentId');
      return {
        title,
        ingredients: this.recipes[title].ingredients,
        description: this.recipes[title].description,
      };
    },
  },
  data() {
    return {
      currentRecipeIndex: 0,
    };
  },
};
</script>

<style scoped lang="scss">

</style>
