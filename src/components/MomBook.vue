<template>
  <div class="book-container">
    <div class="content-sides" :class="directionClass">
      <div class="content-left-side">
        <h1 :class="directionClass">{{ title }}</h1>
        <div v-for="(ingTitle, ind) in ingTitles"
             :key="ind">
          <div class="ing-title" :class="directionClass">{{ ingTitle }}</div>
          <ul v-for="(ing, index) in ingredients[ingTitle]"
              :key="index"
              class="ingredients-container">
            <li :class="directionClass">
              <div class="padding-right">{{ ing.ing }}</div>
              <div class="padding-right" v-if="ing.amount">{{ ing.amount }}</div>
              <div class="padding-right" v-if="ing.units">{{ ing.units }}</div>
            </li>
          </ul>
        </div>
      </div>
      <div class="content-right-side">
        <ul v-for="(desc, descInd) in description"
            :key="descInd"
            class="ingredients-container"
            :class="directionClass">
          <li>
            <textarea :class="directionClass" class="ing-textarea" :value="desc" readonly/>
          </li>
        </ul>
      </div>
      <div class="book-line">
        <div class="inner-book-separator"></div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  props: {
    content: {
      type: Object,
      default: () => {},
    },
  },
  computed: {
    title() {
      return this.content && this.content.title ? this.content.title : 'Nothing to Show yet...';
    },
    ingredients() {
      return this.content && this.content.ingredients ? this.content.ingredients : {};
    },
    ingTitles() {
      return Object.keys(this.ingredients);
    },
    description() {
      return this.content && this.content.description ? this.content.description : [];
    },
  },
  data() {
    return {
      height: 200,
      width: 200,
    };
  },
};
</script>

<style scoped lang="scss">
.book-container {
  width: 100%;
  height: 100%;
  padding-top: 60px;
  position: relative;
  .content-sides {
    width: 100%;
    display: flex;
    align-items: flex-start;
    max-height: 100%;
    overflow: auto;
    position: relative;
    .book-line {
      border: 1px solid #000;
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      .inner-book-separator {
        height: 100%;
        width: 10px;
        border-left: 1px solid #000;
        border-right: 1px solid #000;
        position: absolute;
        top: 0;
        left: calc(50% - 5px);
      }
    }
    .content-left-side {
      h1 {
        margin: 0;
      }
      width: calc(50% - 42px);
      padding: 20px 40px;
      .ing-title {
        font-size: 20px;
        padding: 20px 0;
      }
    }
    .content-right-side {
      @extend .content-left-side;
    }
    .ingredients-container {
      list-style: none;
      margin: 0;
      padding: 10px 0 0 0;
      width: 100%;
      li {
        width: 100%;
        display: flex;
        align-items: center;
        .padding-right {
          padding-right: 10px;
        }
      }
      .ing-textarea {
        width: 100%;
        border: none;
        font-size: 16px;
        overflow: auto;
        outline: none;
        resize: none;
        overflow: hidden;
      }
    }
  }
}
@media only screen and (max-width: 1200px) {
  .book-container {
    padding: 0 0 60px 0;
    .content-sides {
      flex-direction: column;
      justify-content: flex-end;
      .content-left-side {
        width: calc(100% - 80px);
        order: 1;
        padding: 20px 40px;
      }
      .content-right-side {
        width: calc(100% - 80px);
        order: 2;
      }
    }
  }
  .inner-book-separator {
    display: none;
  }
}
</style>
