<template>
  <div class="add-container">
    <mom-input @change="setTitle" :value="title" placeholder="Enter Title"/>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { STORE_NAME } from '../../store/addRecipeStore/const';
import { setProcess } from '../../store/addRecipeStore/actions';

import MomInput from '../../components/MomInput.vue';

export default {
  components: {
    MomInput,
  },
  props: {
    step: {
      type: Number,
      default: 0,
    },
  },
  computed: {
    ...mapGetters({
      title: `${STORE_NAME}/getTitle`,
    }),
  },
  methods: {
    setTitle(value) {
      this.$store.dispatch(setProcess, { key: 'title', value });
    },
  },
};
</script>
