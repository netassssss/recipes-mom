<template>
  <div>
    <ul class="ingredients-list-container"
        :style="{'max-height': `${modalSize}px`, 'height': `${modalSize}px`}">
      <li v-for="(item, index) in ingredients"
          :key="index"
          class="single-item">
        <div v-if="index > 0" class="separator-ing"></div>
        <div class="label-container">
          <label for="desc" v-if="isDesktop">Ingredient:</label>
          <mom-input id="desc"
                     :value="item.ing"
                     placeholder="Enter Ingredients"
                     @change="(value) => setIng(index, value, 'ing')"/>
          <mom-button v-if="index === 0"
                      @click="addNewLine"
                      class="ingredients-button">Add</mom-button>
        </div>
        <div class="label-container">
          <label for="amount" v-if="isDesktop">Amount:</label>
          <mom-input id="amount"
                     :value="item.amount"
                     placeholder="Enter Amount"
                     @change="(value) => setIng(index, value, 'amount')"/>
        </div>
        <div class="label-container">
          <label for="units" v-if="isDesktop">Units:</label>
          <mom-input id="units"
                     :value="item.units"
                     placeholder="Enter Units"
                     @change="(value) => setIng(index, value, 'units')"/>
          <mom-button v-if="index !== 0" @click="() => removeNewLine(index)"
                      class="ingredients-button">Remove</mom-button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>

/* eslint no-debugger: 0 */
import MomButton from '../../../components/MomButton.vue';
import MomInput from '../../../components/MomInput.vue';
import mixinScreen from '../../../mixins/screen';

export default {
  components: {
    MomInput,
    MomButton,
  },
  mixins: [mixinScreen],
  props: {
    modalSize: {
      type: Number,
      default: 300,
    },
    step: {
      type: Number,
      default: 0,
    },
    ingredients: {
      type: Array,
      default: () => [],
    },
  },
  // computed: {
  //   ...mapGetters({
  //     getIngredients: `${STORE_NAME}/ingredients`,
  //   }),
  //   ingredients() {
  //     return this.getIngredients(this.titleNum - 1);
  //   },
  // },
  methods: {
    setIng(index, value, key) {
      this.$emit('setIngredients', { key, value, index });
    },
    addNewLine() {
      this.$emit('addNewIng');
    },
    removeNewLine(index) {
      this.$emit('removeIng', { index });
    },
  },
};
</script>

<style scoped lang="scss">
@import "../../../styles/colors";
@import "../../../styles/common";
.ingredients-container {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
}
.ingredients-list-container {
  width: 100%;
  overflow: auto;
  position: relative;
  margin: 0;
  padding: 0;
  textarea {
    width: 100%;
    height: 100%;
    font-size: 18px;
  }
  .single-item {
    width: 100%;
    height: 165px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding-top: 10px;
    &:nth-child(1) {
      height: 152px;
    }
    .separator-ing {
      width: calc(100% - 80px);
      height: 0;
      border: 1px dashed $base-color;
      margin-bottom: 10px;
    }
  }
}
@include label-and-button-container(150px);
</style>
