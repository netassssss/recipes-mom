<template>
  <div class="desc-container">
    <mom-button @click="addNewLine"
                class="desc-add-button">Add Step</mom-button>
    <ul class="ingredients-list-container"
        :style="{'max-height': `${modalSize}px`, 'height': `${modalSize}px`}">
      <li v-for="(desc, index) in description"
          :key="index"
          class="single-item">
        <textarea @change="setDescription" :value="desc"/>
      </li>
    </ul>
  </div>
</template>

<script>

import { mapGetters } from 'vuex';
import { STORE_NAME } from '../../store/addRecipeStore/const';
import { setDescription, addDescription } from '../../store/addRecipeStore/actions';

import MomButton from '../../components/MomButton.vue';

export default {
  components: {
    MomButton,
  },
  props: {
    modalSize: {
      type: Number,
      default: 300,
    },
  },
  computed: {
    ...mapGetters({
      description: `${STORE_NAME}/getDescription`,
    }),
  },
  methods: {
    setDescription({ target }) {
      this.$store.dispatch(setDescription, { desc: target.value });
    },
    addNewLine() {
      this.$store.dispatch(addDescription);
    },
  },
};
</script>

<style scoped lang="scss">
  .desc-container {
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    /*align-items: center;*/
  }
  .desc-add-button {
  }
  .ingredients-list-container {
    width: calc(100% - 35px);
    overflow: auto;
    position: relative;
    margin: 0;
    list-style: none;
    padding: 0;
    textarea {
      width: 100%;
      height: 100px;
      font-size: 18px;
    }
    .single-item {
      width: calc(100% - 10px);
      height: 165px;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      padding-top: 10px;
      &:nth-child(1) {
        height: 152px;
      }
    }
  }
</style>
