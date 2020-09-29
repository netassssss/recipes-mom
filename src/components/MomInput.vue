<template>
  <div class="input-container">
    <input @input="setInput" :value="value" :placeholder="placeholder"/>
  </div>
</template>

<script>

import debounce from 'lodash.debounce';

export default {
  props: {
    placeholder: {
      type: String,
      default: '',
    },
    value: {
      type: String,
      default: '',
    },
  },
  methods: {
    setInput({ target }) {
      const invokeDebounce = debounce(() => {
        this.$emit('change', target.value);
      }, 200);
      invokeDebounce();
    },
  },
};
</script>

<style scoped lang="scss">
  @import "../styles/colors";
  .input-container {
    width: 200px;
    height: 40px;
    background: $big-base-color;
    input {
      width: 100%;
      height: 100%;
      background-color: inherit;
      padding: 0 10px;
      font-size: 18px;
      border-radius: 4px;
      border: 1px solid rgba(33, 33, 33, 0.8);
    }
  }
</style>
