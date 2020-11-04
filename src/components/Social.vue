<template lang="pug">
  ul.success-page__social.social
    li(v-for="(social, i) in socials" :key="i").social__item
      a(:href="social.href" :title="social.title").social__link
        img(:src="require('@/assets/' + social.icon + '')").social__icon
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { SocialLink } from '@/utils/models';

@Component
export default class Social extends Vue {
  @Prop() public socials!: SocialLink[];
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
