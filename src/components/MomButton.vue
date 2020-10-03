<template>
  <div>
    <button class="btn" @click="onClick" :class="buttonType">
      <slot />
    </button>
  </div>
</template>

<script>

const types = ['default', 'info'];

export default {
  props: {
    styleType: {
      type: String,
      validator: (type) => types.indexOf(type) > -1,
      default: 'default',
    },
  },
  computed: {
    buttonType() {
      return `btn-${this.styleType}`;
    },
  },
  methods: {
    onClick() {
      this.$emit('click');
    },
  },
};
</script>

<style scoped lang="scss">
  @import "../styles/colors";
  .btn {
    background-color: $base-color;
    color: $base-font;
    padding: 10px;
    cursor: pointer;
    box-shadow: none;
    border-radius: 4px;
    border: none;
    font-size: 16px;
    min-width: 100px;
    &:hover {
      background-color: $base-hover-color;
    }
    &:focus, &:active {
      border: none;
    }
    &-default {
      background-color: $base-color;
      color: $base-font;
    }
    &-info {
      background-color: $big-base-color;
      color: #000;
    }
  }
</style>
