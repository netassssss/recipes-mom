<template>
  <div v-if="isOpen" class="modal-container">
    <div class="modal-wrapper" :class="sizeClass" v-on-clickaway="closeModal">
      <div class="header-wrapper">
        <slot name="header"/>
      </div>
      <slot name="body"/>
      <div class="buttons-container">
        <mom-button @click="closeModal">Cancel</mom-button>
        <mom-button @click="setAction">OK</mom-button>
      </div>
    </div>
  </div>
</template>

<script>

import { directive as onClickaway } from 'vue-clickaway';
import MomButton from '../MomButton.vue';

const sizes = ['small', 'middle', 'big'];

export default {
  components: {
    MomButton,
  },
  directives: {
    onClickaway,
  },
  props: {
    isOpen: {
      type: Boolean,
      default: false,
    },
    modalSize: {
      type: String,
      validaor: (size) => sizes.indexOf(size) > -1,
      default: 'big',
    },
  },
  computed: {
    sizeClass() {
      return `modal-wrapper-${this.modalSize}`;
    },
  },
  methods: {
    closeModal() {
      this.$emit('close');
    },
    setAction() {
      this.$emit('apply');
    },
  },
};
</script>

<style scoped lang="scss">
  .modal-container {
    position: fixed;
    top: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(203, 203, 203, 0.6);
    .modal-wrapper {
      background-color: #fff;
      border-radius: 4px;
      box-shadow: 0 0 4px 2px rgba(203, 203, 203, 0.8);
      position: relative;
      height: calc(100% - 50px);
      &-big {
        width: 600px;
        height: 500px;
      }
      &-middle {
        width: 500px;
        height: 400px;
      }
      &-small {
        width: 400px;
        height: 300px;
      }
      .buttons-container {
        height: 30px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        position: absolute;
        bottom: 10px;
        left: 10px;
        right: 10px;
      }
      .header-wrapper {
        width: 100%;
        height: 80px;
        box-shadow: 0px 2px 4px 0 rgba(33, 33, 33, 0.4);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 18px;
        font-weight: 300;
      }
    }
  }
</style>
