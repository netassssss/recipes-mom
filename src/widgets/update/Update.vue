<template>
  <div>
    <mom-dropwon :items="items"
                 :selected-item="selectedItem"
                 :search-input="searchInput"
                 @filter="changeSearch"
                 @select="setSelectedItem">
      <template slot="selectedItem">
        {{ selectedItem.name }}
      </template>
      <template v-slot:default="slotProps">
        <div>{{ slotProps.item.name }}</div>
      </template>
    </mom-dropwon>
  </div>
</template>

<script>

/* eslint no-debugger:0 */
import { mapGetters } from 'vuex';
import { getCurrentRecipeData } from '../../store/getRecipeStore/actions';
import { updateUiRecipe } from '../../store/addRecipeStore/actions';
import { STORE_NAME } from '../../store/getRecipeStore/const';

import MomDropwon from '../../components/MomDropdown.vue';

export default {
  components: {
    MomDropwon,
  },
  computed: {
    ...mapGetters({
      getItems: `${STORE_NAME}/getDropdownData`,
    }),
    items() {
      if (!this.getItems) return [];
      return this.getItems
        .filter(({ name }) => !this.searchInput || (name ? name.toLowerCase().indexOf(this.searchInput.toLowerCase()) > -1 : false));
    },
  },
  data() {
    return {
      searchInput: '',
      selectedItem: { name: 'Select Recipe' },
    };
  },
  methods: {
    async setSelectedItem(item) {
      if (!item) [this.selectedItem] = this.items;
      else this.selectedItem = item;
      const recipe = await this.$store.dispatch(getCurrentRecipeData, {
        title: this.selectedItem.name,
      });
      if (recipe) {
        this.$store.dispatch(updateUiRecipe, {
          title: this.selectedItem.name,
          ingredients: recipe[this.selectedItem.name].ingredients,
          description: recipe[this.selectedItem.name].description,
          documentId: recipe.documentId,
        });
        this.$emit('update');
      }
    },
    changeSearch(input) {
      this.searchInput = input;
    },
  },
};
</script>

<style scoped lang="scss">

</style>
