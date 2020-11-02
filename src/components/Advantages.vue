<template lang="pug">
  section.advantages
    .container
      ul.advantages__list
        li(v-for="item in advantagesList").advantages__item
          span(v-bind:class=`'advantages__icon--'+ item.type`).advantages__icon
          div.advantages__inner
            h3.advantages__title {{ item.title }}
            p.advantages__text {{ item.text }}

</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class Advantages extends Vue {
  @Prop() public advantagesList!: any[];

}
</script>

<style scoped lang="scss">
  .advantages {
    padding-left: 10px;
    padding-right: 10px;
    background: white;
    padding-top: 20px;
    padding-bottom: 7px;
    margin-bottom: 14px;

    @include desktop() {
      order: 1;
      margin-top: 50px;
      padding-top: 64px;
      padding-bottom: 27px;
    }

    &__icon {
      width: 70px;
      min-height: 55px;
      margin-top: 4px;
      margin-right: 19px;
      box-sizing: border-box;
      margin-left: 7px;
      flex-shrink: 0;
      background: transparent no-repeat left center;
      @include tablet() {
        background-size: contain;
        margin: 0;
        margin-bottom: 15px;
        background-position: center;
      }
      @include laptop() {
        width: 110px;
        height: 100px;
      }

      @include desktop() {
        width: 110px;
        height: 110px;
      }

      &--cart {
        background-image: url(../assets/advantages/advantage-mobile-01.svg);
        @include tablet() {
          background-image: url(../assets/advantages/advantage-01.svg);
        }
      }

      &--group {
        background-image: url(../assets/advantages/advantage-mobile-02.svg);
        @include tablet() {
          background-image: url(../assets/advantages/advantage-02.svg);
        }
      }

      &--warranty {
        background-image: url(../assets/advantages/advantage-mobile-03.svg);
        @include tablet() {
          background-image: url(../assets/advantages/advantage-03.svg);
        }
      }
    }

    &__list {
      @include clearList();

      @include tablet() {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
    }

    &__item {
      display: flex;
      margin-bottom: 24px;
      align-items: center;

      @include tablet() {
        width: 33%;
        flex-direction: column;
        justify-content: flex-start;
        text-align: center;
      }
      @include laptop() {
        flex-direction: row;
        text-align: left;
        padding-left: 6px;
        align-items: center;
        width: 30%;
      }
    }

    &__img {
      margin-right: 35px;
    }

    &__inner {
      @include laptop() {
        margin-left: 39px;
        margin-top: -23px;
      }
    }

    &__title {
      font-size: 14px;
      font-weight: 600;
      color: #222222;
      margin: 0;
      margin-bottom: 6px;
      @include laptop() {
        font-size: 18px;
      }
    }

    &__text {
      margin: 0;
      font-size: 12px;
      color: #222222;
      padding-right: 15px;

      @include laptop() {
        padding: 0;
        font-size: 14px;
      }
    }
  }
</style>
