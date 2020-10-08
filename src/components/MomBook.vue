<template>
  <div class="book-container">
    <div class="book-bg">
      <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
           viewBox="0 0 200 200" xml:space="preserve">
<g>
  <g>
    <path d="M0 0 l100 0 l -2 0 l 0 200 l 2 0 l 0 -200 l 98 0 l0 200 l-200 0 l0 -200"
          fill="transparent"
          stroke="#000"
          stroke-width="0.3"/>
	</g>
</g>
    </svg>
    </div>
    <div class="content-sides" :class="getCustomDirectionClass">
      <div class="content-left-side">
        <h1 :class="getCustomDirectionClass">{{ title }}</h1>
        <div v-for="(ingTitle, ind) in ingTitles"
             :key="ind">
          <div class="ing-title" :class="getCustomDirectionClass">{{ ingTitle }}</div>
          <ul v-for="(ing, index) in ingredients[ingTitle]"
              :key="index"
              class="ingredients-container">
            <li :class="getCustomDirectionClass">
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
            class="ingredients-container">
          <li :class="getCustomDirectionClass">
            <div>{{ desc }}</div>
          </li>
        </ul>
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
};
</script>

<style scoped lang="scss">
.book-container {
  width: 100%;
  height: 100%;
  padding-top: 60px;
  position: relative;
  .book-bg {
    position: absolute;
    top: 60px;
    bottom: 0;
    left: 0;
    right: 0;
  }
  img {
    width: 100%;
    height: 100%;
  }
  .content-sides {
    width: calc(100% - 40px);
    display: flex;
    align-items: flex-start;
    max-height: 100%;
    overflow: auto;
    .content-left-side {
      h1 {
        margin: 0;
      }
      width: calc(50% - 42px);
      padding: 20px;
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
      padding: 0;
      width: 100%;
      li {
        width: 100%;
        height: 30px;
        display: flex;
        align-items: center;
        .padding-right {
          padding-right: 10px;
        }
      }
    }
  }
}
</style>
