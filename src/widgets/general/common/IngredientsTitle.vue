<template>
  <div class="label-container">
    <label for="title" class="long-label"
    >Ingredients Title:</label>
    <mom-input id="title"
               :value="innerTitle[titleNum]"
               placeholder="Enter Ingredients' Title"
               @change="setTitle"/>
  </div>
</template>

<script>

import MomInput from '../../../components/MomInput.vue';

export default {
  components: {
    MomInput,
  },
  props: {
    titleNum: {
      type: Number,
      default: 0,
    },
    innerTitle: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    setTitle(key) {
      this.$emit('set', { key, step: this.titleNum });
    },
  },
};
</script>

<style scoped lang="scss">
@import "src/styles/common";
@include label-and-button-container(150px);
</style>
