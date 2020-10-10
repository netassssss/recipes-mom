<template>
  <div class="pagination-container" @click="onClickHandler">
    <div :class="arrowClass"></div>
  </div>
</template>

<script>
export default {
  props: {
    right: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    arrowClass() {
      return `arrow-${this.right ? 'right' : 'left'}`;
    },
  },
  methods: {
    onClickHandler() {
      this.$emit('click', this.right);
    },
  },
};
</script>

<style scoped lang="scss">
.pagination-container {
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  .arrow-right {
    height: 0;
    border-top: 20px solid transparent;
    border-bottom: 20px solid transparent;

    border-left: 20px solid #000;
  }
  .arrow-left {
    width: 0;
    height: 0;
    border-top: 20px solid transparent;
    border-bottom: 20px solid transparent;

    border-right: 20px solid #000;
  }
}
</style>
