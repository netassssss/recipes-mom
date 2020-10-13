<template>
  <div class="dropdown-container">
    <div v-if="!isOpen" class="selected-item"
         @click="toggleDropdownSelection">
      <slot name="selectedItem"/>
      <div class="arrow-down"></div>
    </div>
    <ul v-else class="ul-dropdown-container" v-on-clickaway="closeDropdown">
      <mom-input placeholder="Search..."
                 :value="searchInput"
                 width="100%"
                 @change="changeInput"/>
      <li v-for="(item, index) in items"
          :key="index"
          class="li-item"
          @click="($event) => selectHandler($event, item)">
        <slot :item="item"/>
      </li>
    </ul>
  </div>
</template>

<script>

import { directive as onClickaway } from 'vue-clickaway';
import MomInput from './MomInput.vue';

export default {
  components: {
    MomInput,
  },
  directives: {
    onClickaway,
  },
  props: {
    items: {
      type: Array,
      default: () => [],
    },
    searchInput: {
      type: String,
      default: '',
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
      this.closeDropdown();
    },
    toggleDropdownSelection() {
      this.isOpen = !this.isOpen;
    },
    closeDropdown() {
      this.isOpen = false;
    },
    changeInput(value) {
      this.$emit('filter', value);
    },
  },
};
</script>

<style scoped lang="scss">
  @import "../styles/colors";
  @mixin mom-item($width) {
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: $width;
    height: 30px;
    padding: 0 10px;
    font-size: 16px;
    border: 1px solid #000;
    border-radius: 4px;
    max-width: $width;
    overflow-x: auto;
    text-overflow: ellipsis;
    white-space: nowrap;
    background-color: $big-base-color;
    &:hover {
      background-color: $base-hover-color;
    }
  }
  .dropdown-container {
    min-width: 182px;
    height: 30px;
    position: relative;
    .selected-item {
      @include mom-item(160px);
    }
    .arrow-down {
      width: 0;
      height: 0;
      border-left: 8px solid transparent;
      border-right: 8px solid transparent;

      border-top: 8px solid #000;
    }
    .ul-dropdown-container {
      list-style: none;
      margin: 0;
      padding: 0;
      max-height: 200px;
      min-width: 180px;
      overflow: auto;
      position: absolute;
      top: 0;
      left: 0;
      border-radius: 4px;
      border: 1px solid #000;
      box-shadow: 0px 2px 4px 0 rgba(33, 33, 33, 0.4);
    }
    .li-item {
      @include mom-item(100%);
      border-radius: 0;
    }
  }
</style>
