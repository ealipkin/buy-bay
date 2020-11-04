<template lang="pug">
  ul.success-page__social.social
    li.social__item fb
    li.social__item fb
    li.social__item fb
    li.social__item fb
    li.social__item fb
    li.social__item fb
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Social extends Vue {

}
</script>

<style lang="scss">
  .social {
    padding: 0;
    list-style: none;
    display: flex;
    justify-content: center;

    &__item {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      background-color: #ccc;
      margin-right: 19px;

      @include tablet() {
        width: 40px;
        height: 40px;
        margin-right: 24px;
      }

      &:last-child {
        margin-right: 0;
      }
    }
  }
</style>
