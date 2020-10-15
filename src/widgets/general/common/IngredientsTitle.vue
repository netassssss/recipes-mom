<template>
  <div class="label-container">
    <label for="title" class="long-label"
           v-if="isDesktop"
    >Ingredients Title:</label>
    <mom-input id="title"
               :value="innerTitle[titleNum]"
               :placeholder="placeholder"
               @change="setTitle"/>
  </div>
</template>

<script>

/* eslint no-debugger:0 */
import MomInput from '../../../components/MomInput.vue';
import mixinScreen from '../../../mixins/screen';

export default {
  components: {
    MomInput,
  },
  mixins: [mixinScreen],
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
  computed: {
    placeholder() {
      return this.isDesktop ? 'Enter Ingredients\' Title' : 'Ingredients Title';
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
