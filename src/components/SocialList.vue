<template lang="pug">
  div
    h4.social-list__title Зови друзей скорее
    ul.social-list
      li(v-for="(social, i) in socials" :key="i").social-list__item
        router-link(:to="social.href" :title="social.title").social-list__link
          img(:src="require('@/assets/' + social.icon + '')").social-list__icon
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { SocialLink } from '@/utils/models';

@Component
export default class SocialList extends Vue {
  @Prop() public socials!: SocialLink[];
}
</script>

<style lang="scss">
  .social-list {
    display: flex;
    justify-content: center;

    &__title {
      font-size: 14px;
      color: $black-1;
      font-weight: bold;
      display: block;
      margin-bottom: 16px;
      text-align: center;
    }

    &__item {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      background-color: #ccc;
      margin-right: 19px;
      display: flex;

      @include tablet() {
        width: 40px;
        height: 40px;
        margin-right: 24px;
      }

      &:last-child {
        margin-right: 0;
      }
    }

    &__icon {
      max-width: 100%;
      height: auto;
    }
  }
</style>
