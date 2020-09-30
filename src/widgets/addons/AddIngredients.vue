<template>
  <ul class="ingredients-list-container"
      :style="{'max-height': `${modalSize}px`, 'height': `${modalSize}px`}">
    <li v-for="(item, index) in ingredients"
        :key="index"
        class="single-item">
      <div v-if="index > 0" class="separator-ing"></div>
      <div class="label-container">
        <label for="desc">Ingredient:</label>
        <mom-input id="desc"
                   :value="item.ing"
                   placeholder="Enter Ingredients"
                   @change="(value) => setIng(index, value, 'ing')"/>
        <mom-button v-if="index === 0"
                    @click="addNewLine"
                    class="ingredients-button">Add</mom-button>
      </div>
      <div class="label-container">
        <label for="amount">Amount:</label>
        <mom-input id="amount"
                   :value="item.amount"
                   placeholder="Enter Amount"
                   @change="(value) => setIng(index, value, 'amount')"/>
      </div>
      <div class="label-container">
        <label for="units">Units:</label>
        <mom-input id="units"
                   :value="item.units"
                   placeholder="Enter Units"
                   @change="(value) => setIng(index, value, 'units')"/>
        <mom-button v-if="index !== 0" @click="() => removeNewLine(index)"
                    class="ingredients-button">Remove</mom-button>
      </div>
    </li>
    <!--<textarea autofocus @change="getText"/>-->
  </ul>
</template>

<script>

import { mapGetters } from 'vuex';
import { STORE_NAME } from '../../store/addRecipeStore/const';
import { setIngredients, addNewIng, removeIng } from '../../store/addRecipeStore/actions';

import MomButton from '../../components/MomButton.vue';
import MomInput from '../../components/MomInput.vue';

export default {
  components: {
    MomInput,
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
      ingredients: `${STORE_NAME}/ingredients`,
    }),
  },
  methods: {
    setIng(index, value, key) {
      this.$store.dispatch(setIngredients, { key, value, index });
    },
    addNewLine() {
      this.$store.dispatch(addNewIng);
    },
    removeNewLine(index) {
      this.$store.dispatch(removeIng, { index });
    },
  },
};
</script>

<style scoped lang="scss">
  @import "../../styles/colors";
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
      .label-container {
        display: flex;
        width: 100%;
        height: 40px;
        align-items: center;
        position: relative;
        padding: 5px 0;
        label {
          width: 100px;
        }
        input {
          height: 30px;
        }
        .ingredients-button {
          padding-left: 60px;
        }
      }
    }
  }
</style>
