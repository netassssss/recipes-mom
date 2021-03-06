<template>
  <div v-if="isOpen" class="modal-container">
    <div class="modal-wrapper" :class="sizeClass" v-on-clickaway="closeModal">
      <div class="header-wrapper">
        <slot name="header"/>
        <img :src="xicon" v-if="!isDesktop" @click="closeModal"/>
      </div>
      <slot name="body"/>
      <div class="buttons-container" :class="{'single-button-container': !cancelText}">
        <mom-button @click="cancelAction" v-if="cancelText">{{ cancelText }}</mom-button>
        <mom-button @click="setAction">{{ okText }}</mom-button>
      </div>
    </div>
  </div>
</template>

<script>

import { directive as onClickaway } from 'vue-clickaway';
import MomButton from './MomButton.vue';
import xicon from '../../static/img/xIcon.svg';

import mixinScreen from '../mixins/screen';

const sizes = ['small', 'middle', 'big'];

export default {
  components: {
    MomButton,
  },
  directives: {
    onClickaway,
  },
  mixins: [mixinScreen],
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
    okText: {
      type: String,
      default: 'OK',
    },
    cancelText: {
      type: String,
      default: 'Cancel',
    },
  },
  computed: {
    sizeClass() {
      return `modal-wrapper-${this.modalSize}`;
    },
  },
  data() {
    return {
      xicon,
    };
  },
  methods: {
    closeModal() {
      this.$emit('close');
    },
    setAction() {
      this.$emit('apply');
    },
    cancelAction() {
      this.$emit('cancel');
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
    z-index: 2;
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
      .single-button-container {
        justify-content: flex-end;
      }
      .header-wrapper {
        width: 100%;
        height: 80px;
        box-shadow: 0px 2px 4px 0 rgba(33, 33, 33, 0.4);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 20px;
        font-weight: 500;
        img {
          height: 20px;
          width: 20px;
        }
      }
    }
  }
  @media only screen and (max-width: 798px) {
    .modal-container {
      position: relative;
      background: none;
      z-index: 0;
      .modal-wrapper {
        .header-wrapper {
          width: calc(100% - 40px);
          justify-content: space-between;
          padding: 0 20px;
        }
      }
    }
  }
</style>
