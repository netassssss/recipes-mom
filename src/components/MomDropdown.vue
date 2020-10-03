<template>
  <div class="dropdown-container">
    <div v-if="!isOpen" class="selected-item">{{ selectedItem }}</div>
    <ul v-else class="ul-dropdown-container">
      <li v-for="(item, index) in items"
          :key="index"
          @click="($event) => selectHandler($event, item)">
        <div>{{ item }}</div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    selectedItem: {
      type: String,
      default: '',
    },
    items: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      isOpen: false,
    };
  },
  methods: {
    selectHandler(event, item) {
      if (event) {
        event.preventDefault();
        event.stopImmediatePropagation();
      }
      this.$emit('select', item);
    },
  },
};
</script>

<style scoped lang="scss">
  .dropdown-container {
    min-width: 160px;
    height: 30px;
    position: relative;
    .selected-item {
      position: absolute;
      top: 0;
      height: 30px;
      padding: 0 10px;
      font-size: 16px;
    }
    .ul-dropdown-container {
      list-style: none;
      margin: 0;
      padding: 0;
      height: 200px;
      max-height: 200px;
      overflow: auto;
      position: absolute;
      top: 0;
      left: 0;
    }
  }
</style>
