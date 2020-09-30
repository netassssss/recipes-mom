<template>
  <div class="additional-container">
    {{ additionalText }}
  </div>
</template>

<script>
export default {
  props: {
    additionalText: {
      type: String,
      default: '',
    },
  },
};
</script>

<style scoped lang="scss">
  .additional-container {
    width: 100%;
    height: 200px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
  }
</style>
