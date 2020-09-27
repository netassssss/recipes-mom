<template>
  <div class="overview-container">
    <mom-button style-type="info">
      <div class="button-container">
        <img :src="recipeIcon" class="overview-img"/>
        <div>Add recipe</div>
      </div>
    </mom-button>
  </div>
</template>

<script>
import MomButton from '../components/MomButton.vue';
import modalMixin from '../mixins/modalMixin';
import recipeIcon from '../../static/img/recipeIcon.png';

export default {
  components: {
    MomButton,
  },
  mixins: [modalMixin],
  data() {
    return {
      recipeIcon,
    };
  },
};
</script>

<style scoped lang="scss">
  .overview-container {
    width: 100%;
    height: 100%;
    position: absolute;
    .button-container {
      display: grid;
      grid-template-columns: 20px calc(100% - 20px);
      grid-column-gap: 10px;
      padding-right: 10px;
      align-items: center;
    }
    .overview-img {
      width: 20px;
      height: 20px;
    }
  }
</style>
