<template>
  <ingredients
    :modal-size="modalSize"
    :ingredients="ingredients"
    @setIngredients="setIng"
    @addNewIng="addNewLine"
    @removeIng="removeNewLine"/>
</template>

<script>

/* eslint no-debugger: 0 */
import { mapGetters } from 'vuex';
import { STORE_NAME } from '../../store/updateRecipeStore/const';
import {
  setIngredients, addNewIng, removeIng,
} from '../../store/addRecipeStore/actions';

import Ingredients from '../general/common/Ingredients.vue';

export default {
  components: {
    Ingredients,
  },
  props: {
    modalSize: {
      type: Number,
      default: 300,
    },
    step: {
      type: Number,
      default: 0,
    },
    titleNum: {
      type: Number,
      default: 0,
    },
  },
  computed: {
    ...mapGetters({
      getIngredients: `${STORE_NAME}/ingredients`,
    }),
    ingredients() {
      return this.getIngredients(this.titleNum - 1);
    },
  },
  methods: {
    setIng({ index, value, key }) {
      this.$store.dispatch(setIngredients, { key, value, index });
    },
    addNewLine() {
      this.$store.dispatch(addNewIng);
    },
    removeNewLine({ index }) {
      this.$store.dispatch(removeIng, { index });
    },
  },
};
</script>
