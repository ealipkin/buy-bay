<template lang="pug">
  div.rate
    template(v-if="list")
      ul.rate__list(v-if="rate")
        li(v-for="n in parseInt(rate, 10)").rate__item
          img(src="../assets/icons/star.svg")
    template(v-else)
      img(src="../assets/icons/star.svg")
      span {{parseFloat(rate).toFixed(1)}}
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({})
export default class Rate extends Vue {
  @Prop() public rate!: number;

  @Prop() public list!: boolean;
}

</script>

<style lang="scss" scoped>
  .rate {
    /*font-size: 14px;*/
    line-height: normal;
    color: #7b8197;

    display: flex;
    align-items: center;

    img {
      margin-right: 7px;
    }

    &--small-star {
      img {
        width: 8px;
      }
    }

    span {
      opacity: 0.9;
    }
    &__item {
      margin: 0 2px;
    }
    &__list {
      @include clearList();
      display: flex;
      justify-content: center;
      width: 100%;

      img {
        margin-right: 0;
        width: 10px;
      }
    }
  }
</style>
