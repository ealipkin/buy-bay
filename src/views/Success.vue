<template lang="pug">
  .success-page
    div(v-if="loaded").success-page__wrapper
      .success-page__info
        span.success-page__nice Ура!
        h1(v-if="isGroup").success-page__title Группа покупки создана
        h1(v-if="!isGroup").success-page__title Заказ оплачен
        p(v-if="isGroup").success-page__text Теперь зовите друзей в группу и они получат супер-цену на данный товар. Достаточно 1 друга, чтобы товар был отправлен.
        p(v-if="!isGroup").success-page__text Ориентировочная дата доставки {{new Date(orderData.delivery.from) | dateFormat('DD MMMM YYYY')}}. Следите за изменениями статуса в разделе&nbsp;
          router-link(to="/profile/orders").link «Мои заказы»
      template(v-if="isGroup")
        hr.success-page__hr

        .success-page__share-box
          Timer(:leftTime="groupTimer" v-if="isGroup").success-page__timer

          SocialList(:socials="socials").success-page__social-list

          Share(:link="product.short_link")
    Loader(v-else)
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Timer from '@/components/Timer.vue';
import SocialList from '@/components/SocialList.vue';
import Share from '@/components/Share.vue';

import { SHARE_TIMER } from '@/utils/constants';
import Loader from '@/components/Loader.vue';
import router from '@/router';
import { createRequest } from '@/services/http.service';
import { endpoints } from '@/config';
import { OrderPaymentResponse } from '@/models/responses';
import { OrderData, Product } from '@/models/order';
import { sharingUtils } from '@/utils/sharing';
import { millisToMinutesAndSeconds } from '@/utils/common';

@Component({
  components: {
    Loader,
    Timer,
    SocialList,
    Share,
  },
})
export default class Success extends Vue {
  loaded = false;

  orderId: string | null = null;

  orderData: OrderData | null = null;

  groupTimer: any = null;

  get isGroup() {
    return this.orderData && this.orderData.order && this.orderData.order.is_group;
  }

  get socials() {
    const product: Product = this.product as Product;
    return product ? [
      {
        href: sharingUtils.tgLink(product.short_link, product.title),
        icon: 'socials/telegram.svg',
        type: 'telegram',
        title: 'Telegram',
      },
      {
        href: sharingUtils.whatsapp(product.short_link, product.title),
        icon: 'socials/whatsapp.svg',
        type: 'whatsapp',
        title: 'Whatsapp',
      },
      {
        href: sharingUtils.viber(product.short_link, product.title),
        icon: 'socials/viber.svg',
        type: 'viber',
        title: 'Viber',
      },

      {
        href: sharingUtils.vk(product.short_link, product.title),
        icon: 'socials/vk.svg',
        type: 'vk',
        title: 'VK',
      },
      {
        href: sharingUtils.fb(product.short_link, product.title),
        icon: 'socials/facebook.svg',
        type: 'facebook',
        title: 'Facebook',
      },
      {
        href: sharingUtils.ok(product.short_link, product.title, product.images.preview),
        icon: 'socials/odnoklassniki.svg',
        type: 'ok',
        title: 'OK',
      },
    ] : [];
  }

  get product(): Product | {} {
    return this.orderData && this.orderData.orderItems && this.orderData.orderItems.length ? this.orderData.orderItems[0].product : {};
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
        console.log(res);
        this.orderData = res.data.data;
        this.loaded = true;
        const groupTimer = this.orderData.group && this.orderData.group.time;
        if (groupTimer) {
          this.groupTimer = groupTimer;
        }
      })
      .catch((err) => {
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
