<template>
  <div class="table-of-contents-container" :class="directionClass">
    <div class="book-line">
      <div class="inner-book-separator"></div>
    </div>
    <ul class="table-of-contents-right-side-ul">
      <li v-for="(item, index) in titles[0]"
          :key="index"
          @click="() => getRecipe(item)"
          class="table-of-contents-li">
        <div>{{ item.title }}</div>
      </li>
    </ul>
    <ul class="table-of-contents-left-side-ul">
      <li v-for="(item, index) in titles[1]"
          :key="index"
          @click="() => getRecipe(item)"
          class="table-of-contents-li">
        <div>{{ item.title }}</div>
      </li>
    </ul>
  </div>
</template>

<script>

export default {
  props: {
    titles: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    getRecipe(item) {
      this.$emit('recipe', item);
    },
  },
};
</script>

<style scoped lang="scss">
@import "../../styles/colors";
.table-of-contents-container {
  width: 100%;
  height: 100%;
  margin-top: 60px;
  display: flex;
  align-items: center;
  position: relative;
  overflow: auto;
  @media only screen and (max-width: 1200px) {
    flex-direction: column;
  }
  .table-of-contents-li {
    height: 40px;
    width: calc(100% - 30px);
    display: flex;
    justify-content: center;
    align-items: center;
    background: $big-base-color;
    border: 1px solid #000;
    margin-top: 20px;
    cursor: pointer;
    &:hover {
      background: #ffd5cd;
      color: #726a95;
    }
  }
  .table-of-contents-right-side-ul {
    list-style: none;
    width: calc(50% - 40px);
    z-index: 1;
    @media only screen and (max-width: 798px) {
      width: 100%;
    }
  }
  .table-of-contents-left-side-ul {
    list-style: none;
    width: calc(50% - 40px);
    z-index: 1;
    @media only screen and (max-width: 798px) {
      width: 100%;
    }
  }
  .book-line {
    border: 1px solid #000;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 0;
    .inner-book-separator {
      height: 100%;
      width: 10px;
      border-left: 1px solid #000;
      border-right: 1px solid #000;
      position: absolute;
      top: 0;
      left: calc(50% - 5px);
      @media only screen and (max-width: 1200px) {
        display: none;
      }
    }
  }
}
</style>
