<template lang="pug">
  .success-page
    div(v-if="loaded").success-page__wrapper
      .success-page__info
        span.success-page__nice Ура!
        h1(v-if="isGroup").success-page__title {{title}}
        p(v-if="isGroup").success-page__text Теперь зовите друзей в группу и они получат супер-цену на данный товар. Достаточно 1 друга, чтобы товар был отправлен.
        p(v-if="!isGroup").success-page__text Ориентировочная дата доставки {{new Date(orderData.delivery.from) | dateFormat('DD MMMM YYYY')}}. Следите за изменениями статуса в разделе&nbsp;
          router-link(to="/profile/orders").link «Мои заказы»
      template(v-if="isGroup")
        hr.success-page__hr

        .success-page__share-box
          Timer(:leftTime="groupTimer" v-if="isGroup").success-page__timer

          SocialList(:socials="socials").success-page__social-list

          Share(v-if="product" :link="product.short_link")
    SeoBlock(v-if="seo" :block="seo")
    Loader(v-else)
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Timer from '@/components/Timer.vue';
import SocialList from '@/components/SocialList.vue';
import Share from '@/components/Share.vue';

import Loader from '@/components/Loader.vue';
import router from '@/router';
import { createRequest } from '@/services/http.service';
import { endpoints } from '@/config';
import { OrderPaymentResponse } from '@/models/responses';
import { Group, OrderData, Product } from '@/models/order';
import { createSharingLinks } from '@/utils/sharing';
import { ISeoBlock, IShareData } from '@/models/models';
import SeoBlock from '@/components/SeoBlock.vue';

@Component({
  components: {
    SeoBlock,
    Loader,
    Timer,
    SocialList,
    Share,
  },
})
export default class Success extends Vue {
  loaded = false;

  orderId: string | null = null;

  seo: ISeoBlock | null = null;

  orderData: OrderData | null = null;

  groupTimer: any = null;

  get title() {
    if (!this.orderData) {
      return '';
    }
    return this.isGroup ? 'Группа покупки создана' : 'Заказ оплачен';
  }

  get isGroup() {
    return this.orderData && this.orderData.order && this.orderData.order.is_group;
  }

  get socials() {
    const product: Product = this.product as Product;
    const group: Group = this.group as Group;
    if (!product && !this.group) {
      return [];
    }
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

  get group(): Group | null {
    return this.orderData && this.orderData.group ? this.orderData.group : null;
  }

  get isAuthorized() {
    return (this as any).$auth.check();
  }

  mounted() {
    this.orderId = this.$route.query.oid as string;
    if (!this.isAuthorized || !this.orderId) {
      router.push({ path: '/' });
    }
    this.getOrder()
      .then((res) => {
        this.orderData = res.data.data;
        this.loaded = true;
        const groupTimer = this.orderData.group && this.orderData.group.time;
        if (groupTimer) {
          this.groupTimer = groupTimer;
        }

        this.seo = {
          meta_title: this.title,
        };
      })
      .catch(() => {
        router.push({ path: '/' });
      });
  }

  getOrder(): Promise<OrderPaymentResponse> {
    return createRequest('GET', endpoints.order.get(this.orderId));
  }
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
      margin-bottom: 46px;

      @include tablet() {
        margin-bottom: 51px;
      }
    }
  }
</style>
