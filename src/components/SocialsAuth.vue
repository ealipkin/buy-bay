<template lang="pug">
  .socials-auth
    .socials-auth__title {{title}}
    ul.socials-auth__list
      li.socials-auth__item
        a(href="#").socials-auth__link.socials-auth__link--vk
          include ../assets/socials/auth/vk.svg
      li.socials-auth__item
        a(href="#").socials-auth__link.socials-auth__link--fb
          include ../assets/socials/auth/fb.svg
      li.socials-auth__item
        a(href="#").socials-auth__link.socials-auth__link--ok
          include ../assets/socials/auth/ok.svg
      li.socials-auth__item
        a(href="#").socials-auth__link.socials-auth__link--mail
          include ../assets/socials/auth/mail.svg
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class SocialsAuth extends Vue {
  @Prop() public title!: any;
}
</script>

<style scoped lang="scss">
  .socials-auth {
    background-color: #f5f5f5;
    padding: 16px 24px 29px;
    @include tablet() {
      padding: 20px 40px 46px;
    }
    &__list {
      @include clearList();
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    &__title {
      font-size: 12px;
      text-align: center;
      color: #7b8197;
      margin-bottom: 24px;
      padding: 0 15px;

      @include tablet() {
        font-size: 14px;
        margin-bottom: 30px;
      }
    }

    &__link {
      color: #C9C9D4;
      width: 40px;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: white;
      border-radius: 8px;
      transition: color 0.5s ease;
      svg {
        @include tablet() {
          transform: scale(1.3);
        }
      }
      &--vk:hover {
        color: $vkColor;
      }

      &--fb:hover {
        color: $facebookColor;
      }

      &--ok:hover {
        color: $okColor;
      }

      &--mail:hover {
        color: $mailColor;
      }

      @include tablet() {
        width: 82px;
        height: 50px;
      }
    }
  }
</style>
