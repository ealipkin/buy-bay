<template lang="pug">
  .top-categories(v-if="groupedCategories")
    .top-categories__pane
      .top-categories__list
        div(v-for="group in groupedCategories").top-categories__col
          router-link(v-for="(item, index) in group" :key="index" to="#" v-bind:class="'top-categories__link--'+item.type +''" ).top-categories__link
            p.top-categories__title {{ item.title }}
            span(
              v-bind:class="'top-categories__img-wrapper--'+item.position +' top-categories__img-wrapper--'+ item.color +'  top-categories__img-wrapper--mobile-'+ item.positionMobile + ''"
              :style="{backgroundImage: 'url('+item.src+')'}"
            ).top-categories__img-wrapper
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class TopCategories extends Vue {
  @Prop() public categories!: any[];

  get groupedCategories() {
    return this.categories.reduce((result, value, index, array) => {
      if (index % 2 === 0) result.push(array.slice(index, index + 2));
      return result;
    }, []);
  }
}
</script>

<style scoped lang="scss">
  .top-categories {
    overflow: hidden;
    margin-top: -6px;
    @include laptop() {
      @include container();
    }
    @include desktop() {
      overflow: auto;
    }

    &__pane {
      margin-bottom: -30px;

      @include desktop() {
        margin-bottom: 0;
      }
    }

    &__list {
      display: flex;
      flex-wrap: nowrap;
      list-style-type: none;
      margin: 0;
      padding: 0;
      padding-bottom: 30px;
      overflow: auto;

      @include desktop() {
        overflow: visible;
        padding-bottom: 0;
        justify-content: space-between;
      }
    }

    &__col {
      padding-left: 12px;

      & + & {
        padding-left: 9px;
      }

      &:last-child {
        padding-right: 12px;
      }

      @include tablet() {
        display: flex;
        flex-shrink: 0;
        padding: 0;

        & + & {
          padding: 0;
        }

        &:last-child {
          padding-right: 10px;
        }
        &:first-child {
          padding-left: 10px;
        }
      }

      @include desktop() {
        padding: 0;
        &:last-child,
        &:first-child {
          padding: 0;
        }

        &:nth-child(1n+4) {
          display: none;
        }

        &:nth-child(3n) .top-categories__link:last-child {
          display: none;
        }
      }
    }

    &__link {
      display: flex;
      text-decoration: none;
      align-items: center;
      text-align: left;
      width: 140px;
      color: white;
      height: 60px;
      font-size: 12px;
      font-weight: 600;
      font-stretch: normal;
      font-style: normal;
      line-height: 1.17;
      letter-spacing: normal;
      border-radius: 4px;
      overflow: hidden;
      position: relative;

      padding: 0 13px;
      margin-bottom: 8px;

      &--red {
        background-image: linear-gradient(66deg, #ad3a81 4%, #ff4545 93%);
      }

      &--brown {
        background-image: linear-gradient(66deg, #d89351 4%, #ffbd83 93%);
      }

      &--blue {
        background-image: linear-gradient(245deg, #0ebeb2 98%, #0787c8 9%);
      }

      &--light-blue {
        background-image: linear-gradient(66deg, #3a67ad 4%, #458fff 92%);
      }

      @include tablet() {
        background-image: none;
        width: auto;
        max-width: 210px;
        font-size: 18px;
        font-weight: bold;
        color: #222222;
        padding: 0;
        flex-direction: row-reverse;
        margin-right: 19px;
      }
    }

    &__title {
      margin: 0;
      max-width: 60%;

      @include tablet() {
        margin-left: 15px;
        max-width: none;
      }
    }

    &__img-wrapper {
      height: 100%;
      width: 30%;
      position: absolute;
      right: 0;
      top: 50%;
      transform: translateY(-50%);
      background-size: 80%;
      background-repeat: no-repeat;

      &--mobile-right-center {
        background-position: right center;
      }

      &--mobile-center-bottom {
        background-position: center bottom;
      }

      &--mobile-right-top {
        background-position: right top;
      }

      &--bottom {
        @include laptop() {
          background-position: center bottom;
        }
      }

      @include tablet() {
        position: static;
        transform: none;
        width: 60px;
        height: 60px;
        border-radius: 20px;
        display: block;
        flex-shrink: 0;
        background-size: 50%;

        &--pink {
          background-color: #fe8787;
        }
        &--cyan {
          background-color: #925aca;
        }
        &--yellow {
          background-color: #ffe091;
        }
      }
    }

    &__img {
      max-width: 30px;
      /*
      &.bottom {
        margin-top: auto;
      }

      &.top {
        margin-bottom: auto;
        margin-left: auto;
      }

      &.center {
        margin-top: auto;
        margin-left: auto;
        margin-right: auto;
      }
      */
    }
  }

</style>
