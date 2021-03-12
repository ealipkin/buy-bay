<template lang="pug">
  .group-info
    .group-info__header
      h2(v-if="group").group-info__title {{title}}
      button(type="button" @click="handleLeaveGroup" v-if="!group.is_complete").group-info__link.link Покинуть группу
    CustomScrollWrapper.custom-scroll-wrapper--mobile-only
      UsersList(v-if="group" :group="group").group-info__users
    hr.group-info__hr
    SocialList(:socials="socials").group-info__social
    Share(v-if="product" :link="product.short_link")
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import UsersList from '@/components/UsersList.vue';
import SocialList from '@/components/SocialList.vue';
import Share from '@/components/Share.vue';
import CustomScrollWrapper from '@/components/CustomScrollWrapper.vue';
import { createSharingLinks } from '@/utils/sharing';
import { Group, OrderData, Product } from '@/models/order';
import { declOfNum } from '@/utils/common';
import { IShareData } from '@/models/models';

@Component({
  components: {
    UsersList,
    SocialList,
    Share,
    CustomScrollWrapper,
  },
})
export default class GroupInfo extends Vue {
  @Prop() public orderData!: OrderData;

  @Prop() public group!: Group;

  get userDelta() {
    return this.group.allUsers - this.group.joinedUsers.length;
  }

  get socials() {
    const product: Product = this.product as Product;
    const { group } = this;
    const shareData: IShareData = {
      link: product.short_link,
      groupPrice: product.groupPrice,
      productName: product.title,
      image: product.images.preview,
      leftUsers: group.allUsers - group.joinedUsers.length,
    };
    return product ? createSharingLinks(shareData) : [];
  }

  get product(): Product | null {
    return this.orderData && this.orderData.orderItems && this.orderData.orderItems.length ? this.orderData.orderItems[0].product : null;
  }

  get title() {
    return `${declOfNum(this.userDelta, ['Нужен', 'Нужно', 'Нужны'])} еще ${this.userDelta} ${this.userDeclension(this.userDelta)}`;
  }

  userDeclension(number) {
    return declOfNum(number, ['человек', 'человека', 'человек']);
  }

  handleLeaveGroup() {
    this.$emit('leave');
  }
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

    &--hide-leave & {
      &__link {
        display: none;
      }
    }
  }
</style>
