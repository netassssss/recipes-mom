<template>
  <div class="navbar-container" ref="navbar">
    <ul
        class="navbar-ul">
      <li v-for="(item, index) in items"
          :key="index"
          :style="{width: liWidth}"
          @click="() => selectTab(item)">
        <slot :item="item" :index="index"/>
      </li>
    </ul>
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
  position: absolute;
  top: 0;
  left: 0;
  color: #000;
  font-size: 22px;
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
  }
}
</style>
