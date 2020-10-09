<template>
  <div class="language-container">
    <mom-button class="padding-right" @click="() => setLang(false)">English</mom-button>
    <mom-button @click="() => setLang(true)">עברית</mom-button>
  </div>
</template>

<script>

import MomButton from '../../components/MomButton.vue';

export default {
  components: {
    MomButton,
  },
  methods: {
    setLang(isRtl) {
      this.changeDirection(isRtl);
    },
  },
};
</script>

<style scoped lang="scss">
.language-container {
  width: 100%;
  display: flex;
  align-items: center;
  .padding-right {
    padding-right: 10px;
  }
}
</style>
