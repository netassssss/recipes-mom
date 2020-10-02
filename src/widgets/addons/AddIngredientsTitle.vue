<template>
  <div class="label-container">
    <label for="title" class="long-label"
    >Ingredients Title:</label>
    <mom-input id="title"
               :value="innerTitle[titleNum]"
               placeholder="Enter Ingredients' Title"
               @change="setTitle"/>
  </div>
</template>

<script>

import { mapGetters } from 'vuex';
import MomInput from '../../components/MomInput.vue';
import { setIngredientsTitle } from '../../store/addRecipeStore/actions';
import { STORE_NAME } from '../../store/addRecipeStore/const';

export default {
  components: {
    MomInput,
  },
  props: {
    titleNum: {
      type: Number,
      default: 0,
    },
  },
  computed: {
    ...mapGetters({
      innerTitle: `${STORE_NAME}/innerTitle`,
    }),
  },
  methods: {
    setTitle(key) {
      this.$store.dispatch(setIngredientsTitle, { key, step: this.titleNum });
    },
  },
};
</script>

<style scoped lang="scss">
  .label-container {
    display: flex;
    width: 100%;
    height: 40px;
    align-items: center;
    position: relative;
    padding: 5px 0;
    .long-label {
      width: 150px;
    }
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
</style>
