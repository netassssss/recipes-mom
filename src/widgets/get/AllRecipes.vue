<template>
  <div class="all-recipes-container">
    <div class="books-container">
      <mom-book :content="content"/>
    </div>
    <div class="pages-container">
      <mom-single-page @click="onRightHandlr"
                       class="page-left"/>
      <mom-single-page v-if="currentRecipeIndex"
                       right @click="onLeftHandlr"
                       class="page-right"/>
    </div>
  </div>
</template>

<script>

import { mapGetters } from 'vuex';
import { STORE_NAME } from '../../store/getRecipeStore/const';

import MomBook from '../../components/MomBook.vue';
import MomSinglePage from '../../components/SinglePage.vue';

export default {
  components: {
    MomBook,
    MomSinglePage,
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
  methods: {
    onRightHandlr() {
      if (this.allRecipes(this.currentRecipeIndex + 1)) this.currentRecipeIndex += 1;
    },
    onLeftHandlr() {
      if (this.currentRecipeIndex > 0) this.currentRecipeIndex -= 1;
    },
  },
};
</script>

<style scoped lang="scss">
.all-recipes-container {
  width: 100%;
  height: 100%;
  position: relative;
}
.books-container {
  width: 100%;
  height: calc(100% - 30px);
}
.pages-container {
  width: 100%;
  height: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: absolute;
  top: calc(50% - 10px);
  .page-left {
    left: 0;
  }
  .page-right {
    right: 0;
  }
}
</style>
