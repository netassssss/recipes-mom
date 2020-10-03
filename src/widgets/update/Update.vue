<template>
  <div>
    <mom-dropwon :items="items"
                 :selected-item="selectedItem"
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
import { init } from '../../store/getRecipeStore/actions';
import { STORE_NAME } from '../../store/getRecipeStore/const';

import MomDropwon from '../../components/MomDropdown.vue';

export default {
  components: {
    MomDropwon,
  },
  created() {
    this.$store.dispatch(init);
  },
  computed: {
    ...mapGetters({
      items: `${STORE_NAME}/getDropdownData`,
    }),
  },
  data() {
    return {
      selectedItem: { name: 'Select Recipe' },
    };
  },
  methods: {
    setSelectedItem(item) {
      if (!item) [this.selectedItem] = this.items;
      else this.selectedItem = item;
    },
  },
};
</script>

<style scoped lang="scss">

</style>
