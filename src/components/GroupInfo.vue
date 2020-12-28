<template lang="pug">
  .group-info
    .group-info__header
      h2.group-info__title Нужно еще {{needUsersCount}} человека
      button(type="button").group-info__link.link Покинуть группу
    CustomScrollWrapper.custom-scroll-wrapper--mobile-only
      UsersList(:users="usersToRender").group-info__users
    hr.group-info__hr
    SocialList(:socials="socials").group-info__social
    Share(:link="shareLink")
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { SOCIALS, SHARE_LINK } from '@/utils/constants';
import { generateDefaultUsers } from '@/utils/data';
import UsersList from '@/components/UsersList.vue';
import SocialList from '@/components/SocialList.vue';
import Share from '@/components/Share.vue';
import CustomScrollWrapper from '@/components/CustomScrollWrapper.vue';

@Component({
  components: {
    UsersList,
    SocialList,
    Share,
    CustomScrollWrapper,
  },
})
export default class GroupInfo extends Vue {
  @Prop() public users!: object[];

  socials = SOCIALS;

  shareLink = SHARE_LINK;

  needUsersCount = 2;

  usersToRender = Array(0).concat(this.users).concat(generateDefaultUsers(this.needUsersCount));
}
</script>

<style scoped lang="scss">
  .group-info {
    background-color: #fff;
    padding: 13px 16px 32px;

    @include tablet() {
      padding: 40px 50px 60px;
    }

    &__header {
      margin-bottom: 25px;
      display: flex;
      justify-content: space-between;

      @include tablet() {
        margin-bottom: 36px;
      }
    }

    &__title {
      font-weight: bold;
      font-size: 14px;
      color: $black-1;
      margin: 0;
      max-width: 90px;

      @include tablet() {
        font-size: 16px;
        max-width: initial;
      }
    }

    &__users {
      margin-bottom: 24px;
      @include tablet() {
        margin-bottom: 41px;
      }
    }

    &__hr {
      width: 100%;
      height: 1px;
      background-color: $grey-7;
      border: none;
      margin: 0;
      margin-bottom: 17px;

      @include tablet() {
        margin-bottom: 32px;
      }
    }

    &__social {
      margin-bottom: 32px;
    }
  }
</style>
