<template lang="pug">
  .user-info
    .user-info__box
      h2.user-info__title {{title}}
      span.user-info__gender {{user.sex.label}},
      span.user-info__age {{user.age}} года
    img(:src="user.avatar").user-info__img

</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { ProfileUser } from '@/utils/models';

@Component
export default class UserInfo extends Vue {
  @Prop() public user!: ProfileUser;

  title = `${this.user.surname} ${this.user.name}`;
}
</script>

<style scoped lang="scss">
  .user-info {
    background-color: #fff;
    padding: 16px;
    display: flex;
    align-items: center;

    @include tablet() {
      padding: 0;
    }

    &__box {
      margin-right: 34px;

      @include tablet() {
        order: 1;
        margin-right: 0;
        margin-left: 32px;
      }
    }

    &__title {
      margin: 0;
      margin-bottom: 4px;
      font-size: 18px;
      color: $black-1;
      font-weight: bold;

      @include tablet() {
        font-size: 24px;
        margin-bottom: 7px;
      }
    }

    &__gender {
      font-size: 12px;
      color: $black-1;
      margin-right: 3px;

      @include tablet() {
        font-size: 14px;
      }
    }

    &__age {
      font-size: 12px;
      color: $black-1;

      @include tablet() {
        font-size: 14px;
      }
    }

    &__img {
      width: 60px;
      height: 60px;
      background-color: $grey-1;
      border-radius: 50%;

      @include tablet() {
        width: 100px;
        height: 100px;
      }
    }
  }
</style>
