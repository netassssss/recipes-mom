<template>
  <div class="add-container">
    <input @input="setTitle" :value="title" placeholder="Enter Title"/>
  </div>
</template>

<script>
import debounce from 'lodash.debounce';
import { mapGetters } from 'vuex';
import { STORE_NAME } from '../../store/modalStore/const';
import { setProcess } from '../../store/modalStore/actions';

export default {
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
    setTitle({ target }) {
      const invokeDebounce = debounce(() => {
        this.$store.dispatch(setProcess, { key: 'title', value: target.value });
      }, 200);
      invokeDebounce();
    },
  },
};
</script>

<style scoped lang="scss">
  @import "../../styles/colors";
  .add-container {
    width: 200px;
    height: 40px;
    background: $big-base-color;
    input {
      width: 100%;
      height: 100%;
      background-color: inherit;
      padding: 0 10px;
      font-size: 18px;
    }
  }
</style>
