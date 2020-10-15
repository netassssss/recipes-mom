<template>
  <div class="add-container">
    <mom-input @change="setTitle" :value="title" placeholder="Enter Title"/>
  </div>
</template>

<script>

import MomInput from '../../../components/MomInput.vue';

export default {
  components: {
    MomInput,
  },
  props: {
    title: {
      type: String,
      default: '',
    },
  },
  methods: {
    setTitle(value) {
      this.$emit('set', value);
    },
  },
};
</script>
