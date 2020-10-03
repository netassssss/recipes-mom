<template>
  <div></div>
</template>

<script>

import { init } from '../../store/getRecipeStore/actions';

export default {
  created() {
    this.$store.dispatch(init);
  },
};
</script>

<style scoped lang="scss">

</style>
