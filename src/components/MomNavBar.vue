<template>
  <div class="navbar-container" ref="navbar">
    <ul
        class="navbar-ul">
      <li v-for="(item, index) in items"
          :key="index"
          :style="{width: liWidth}"
          :class="{'selected': item === selectedItem}"
          @click="() => selectTab(item)">
        <slot :item="item" :index="index"/>
      </li>
    </ul>
    <div class="lang-cont">
<!--      <language />-->
    </div>
  </div>
</template>

<script>

/* eslint no-debugger:0 */
export default {
  props: {
    items: {
      type: Array,
      default: () => [],
    },
    selectedItem: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      liWidth: 0,
    };
  },
  methods: {
    selectTab(item) {
      this.$emit('select', item);
    },
    getWidth() {
      if (this.$refs.navbar) {
        const width = Math.round(this.$refs.navbar.clientWidth / (this.items.length || 1));
        return `${Math.min(200, width)}px`;
      }
      return '100%';
    },
  },
  watch: {
    items: {
      immediate: true,
      handler() {
        if (this.items.length) {
          this.$nextTick(() => {
            this.liWidth = this.getWidth();
          });
        }
      },
    },
  },
};
</script>

<style scoped lang="scss">
@import "../styles/colors";
.navbar-container {
  width: 100%;
  height: 60px;
  background: $tab-bar-base;
  position: fixed;
  left: 0;
  color: #000;
  font-size: 22px;
  z-index: 1;
  .navbar-ul {
    width: 100%;
    height: 100%;
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    align-items: center;
    li {
      height: 100%;
      margin-left: 50px;
      padding: 0 10px;
      cursor: pointer;
      display: flex;
      align-items: center;
      &:hover {
        background: $base-hover-color;
        color: #fff;
      }
    }
    .selected {
      background: $base-hover-color;
      color: #fff;
    }
  }
  .lang-cont {
    position: absolute;
    right: 10px;
    top: 10px;
  }
}

@media only screen and (min-width: 1000px) {
  .navbar-container {
    top: 0;
  }
}
@media only screen and (max-width: 1000px) {
  .navbar-container {
    bottom: 0;
    .navbar-ul {
      li {
        justify-content: center;
        margin: 0;
        padding: 0;
      }
    }
  }
}
</style>
