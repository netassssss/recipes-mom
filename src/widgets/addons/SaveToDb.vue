<template>
  <div>Save {{ title }}?</div>
</template>

<script>

import { mapGetters } from 'vuex';
import { STORE_NAME } from '../../store/addRecipeStore/const';

export default {
  computed: {
    ...mapGetters({
      title: `${STORE_NAME}/getTitle`,
    }),
  },
};
</script>

<style scoped lang="scss">

</style>
