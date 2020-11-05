<template lang="pug">
  .success-page
    .success-page__wrapper
      .success-page__info
        span.success-page__nice Ура!
        h1.success-page__title Группа покупки создана
        p.success-page__text Теперь зовите друзей в группу и они получат супер-цену на данный товар. Достаточно 1 друга, чтобы товар был отправлен.

      hr.success-page__hr

      .success-page__share-box
        Timer(:time="shareTimer").success-page__timer

        SocialList(:socials="socials").success-page__social-list

        Share(:link="shareLink")

</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Timer from '@/components/Timer.vue';
import SocialList from '@/components/SocialList.vue';
import Share from '@/components/Share.vue';

import { SOCIALS, SHARE_TIMER, SHARE_LINK } from '@/utils/constants';

@Component({
  components: {
    Timer,
    SocialList,
    Share,
  },
})
export default class Success extends Vue {
  socials = SOCIALS;

  shareTimer = SHARE_TIMER;

  shareLink = SHARE_LINK;
}
</script>

<style lang="scss" scoped>
  .success-page {
    background-color: #fff;
    background-image: url("../assets/success-background-mobile.png");
    background-repeat: no-repeat;
    background-position: center -215px;

    @include tablet() {
      padding: 34px 0 112px;
      background-color: $grey-3;
      background-image: url("../assets/success-background.png");
      background-repeat: no-repeat;
      background-position: center -300px;
    }

    &__wrapper {
      @include tablet() {
        max-width: 884px;
        margin: 0 auto;
        border-radius: 8px;
        padding: 38px 150px 52px;
        background-color: #fff;
      }
    }

    &__info {
      margin: 0 auto;
      padding: 40px 16px 22px;

      @include tablet() {
        max-width: 571px;
        padding-bottom: 40px;
      }
    }

    &__nice {
      display: block;
      margin-bottom: 6px;
      color: $blue;
      font-size: 36px;
      font-weight: 600;
      text-align: center;

      @include tablet() {
        font-size: 48px;
        margin-bottom: 8px;
      }
    }

    &__title {
      margin: 0;
      margin-bottom: 24px;
      font-weight: bold;
      font-size: 18px;
      color: $black-1;
      text-align: center;

      @include tablet() {
        font-size: 32px;
        margin-bottom: 16px;
      }
    }

    &__text {
      margin: 0;
      color: $black-1;
      font-size: 12px;
      text-align: center;

      @include tablet() {
        font-size: 14px;
        line-height: 24px;;
      }
    }

    &__hr {
      height: 12px;
      background-color: $grey-1;
      border: none;
      margin: 0;

      @include tablet() {
        display: none;
      }
    }

    &__share-box {
      margin: 0 auto;
      padding: 16px 16px 46px;

      @include tablet() {
        max-width: 571px;
        border: 1px solid $blue;
        border-radius: 8px;
        padding: 44px;
        padding-top: 24px;
      }
    }

    &__timer {
      margin: 0;
      margin-bottom: 19px;

      @include tablet() {
        margin-bottom: 37px;
      }
    }

    &__social-list {
    @include clearList();
    margin-bottom: 46px;

      @include tablet() {
        margin-bottom: 51px;
      }
    }
  }
</style>
