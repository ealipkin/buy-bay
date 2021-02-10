<template lang="pug">
  .orders.profile-page
    .page.page--aside-tablet
      .page__layout
        .page__aside.orders__aside
          h1.page__title Мои заказы
          ProfileNav(:items="profileMenuItems")

        div(v-if="loaded").page__content
          TabsNav(:tabs="tabs" @change="selectTab").tabs-nav--inner
          div(:class="{'hidden': selectedTab === 2}")
            div(v-if="activeOrders && activeOrders.length")
              ul.orders__list
                OrderItem(
                  v-for="order in activeOrders"
                  :order="order"
                  :key="order.id"
                  :link="'/profile/orders/' + order.order.oid"
                  :hideButton="true"
                ).orders__item
              div(v-if="showActiveOrdersPagination").category__pagination
                Pagination(:paginationInfo="activePagination" @page="activeOrdersPageChange" @more="showMoreActiveOrders")
            div(v-else).empty-message Нет активных заказов

          div(:class="{'hidden': selectedTab === 1}")
            div(v-if="inactiveOrders && inactiveOrders.length")
              ul.orders__list
                OrderItem(
                  v-for="order in inactiveOrders"
                  :order="order"
                  :key="order.id"
                  :link="'/profile/orders/' + order.order.oid"
                  :hideButton="true"
                  buttonText="Купить одному"
                ).orders__item
              div(v-if="showInActiveOrdersPagination").category__pagination
                Pagination(:paginationInfo="activePagination" @page="inActiveOrdersPageChange" @more="showMoreInActiveOrders")
            div(v-else).empty-message Нет завершенных заказов
        Loader(v-else)

</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import ProfileNav from '@/components/ProfileNav.vue';
import TabsNav from '@/components/TabsNav.vue';
import OrderItem from '@/components/OrderItem.vue';
import Pagination from '@/components/Pagination.vue';
import { PROFILE_MENU_ITEMS } from '@/utils/constants';

import { Action } from 'vuex-class';
import { OrdersResponse, PaginationInfo } from '@/models/responses';
import { createRequest } from '@/services/http.service';
import { DEFAULT_PAGINATE_PAGE, endpoints } from '@/config';
import { SORT_PARAMS } from '@/models/enums';
import { OrderData } from '@/models/order';
import $store from '@/store';
import Loader from '@/components/Loader.vue';

const PAGE_TITLE = 'Мои заказы';
const DEFAULT_SORT = SORT_PARAMS.POPULAR;

@Component({
  components: {
    Loader,
    ProfileNav,
    TabsNav,
    OrderItem,
    Pagination,
  },
})
export default class Orders extends Vue {
  @Action('app/setProfilePage') setProfilePage;

  profileMenuItems = PROFILE_MENU_ITEMS;

  selectedTab = 1;

  activePagination: PaginationInfo | undefined;

  activePage: number = DEFAULT_PAGINATE_PAGE;

  activeSort: SORT_PARAMS = DEFAULT_SORT;

  inActivePage: number = DEFAULT_PAGINATE_PAGE;

  inActiveSort: SORT_PARAMS = DEFAULT_SORT;

  inActivePagination: PaginationInfo | undefined;

  loaded = false

  tabs = [
    {
      id: 1,
      label: 'Активные',
      isActive: true,
    },
    {
      id: 2,
      label: 'Завершенные',
    },
  ];

  activeOrders: OrderData[] = [];

  inactiveOrders: OrderData[] = []

  get isAuthorized() {
    return (this as any).$auth.check();
  }

  get showActiveOrdersPagination() {
    if (!this.activePagination) {
      return false;
    }
    if (this.activeOrders.length === Number(this.activePagination.total)) {
      return false;
    }
    return Number(this.activePagination.total) > Number(this.activePagination.perPage);
  }

  get showInActiveOrdersPagination() {
    if (!this.inActivePagination) {
      return false;
    }
    if (this.inactiveOrders.length === Number(this.inActivePagination.total)) {
      return false;
    }
    return Number(this.inActivePagination.total) > Number(this.inActivePagination.perPage);
  }

  async mounted() {
    this.setProfilePage(PAGE_TITLE);
    if (this.isAuthorized) {
      $store.dispatch('app/updateProfileCounts');
      this.init();
    } else {
      this.$root.$emit('show-login-modal');
    }
  }

  selectTab(tabId) {
    this.selectedTab = tabId;
  }

  init() {
    Promise
      .all([this.loadActiveOrders(), this.loadInActiveOrders()])
      .then((res) => {
        this.loaded = true;
      })
      .catch((err) => {
        this.loaded = true;
      });
  }

  async loadActiveOrders() {
    await this.loadActiveOrdersRequest().then(this.updateActiveOrders);
  }

  async loadActiveOrdersRequest(): Promise<OrdersResponse> {
    return createRequest('GET', endpoints.orders.active({
      page: this.activePage,
      sort: this.activeSort,
    }));
  }

  updateActiveOrders(res: OrdersResponse) {
    const { data } = res.data;
    this.activeOrders = data.data;
    this.activePagination = data.paginationInfo;
  }

  async loadInActiveOrders() {
    await this.loadInActiveOrdersRequest().then(this.updateInActiveOrders);
  }

  async loadInActiveOrdersRequest(): Promise<OrdersResponse> {
    return createRequest('GET', endpoints.orders.inactive({
      page: this.inActivePage,
      sort: this.inActiveSort,
    }));
  }

  updateInActiveOrders(res: OrdersResponse) {
    const { data } = res.data;
    this.inactiveOrders = data.data;
    this.inActivePagination = data.paginationInfo;
  }

  beforeDestroy() {
    this.setProfilePage(null);
  }

  async activeOrdersPageChange(page) {
    this.loaded = true;
    this.activePage = page;
    this.loadActiveOrders().then(() => {
      this.loaded = false;
    });
  }

  async inActiveOrdersPageChange(page) {
    this.loaded = true;
    this.inActivePage = page;
    this.loadInActiveOrders().then(() => {
      this.loaded = false;
    });
  }

  showMoreActiveOrders() {
    this.activePage += 1;
    this.loadActiveOrdersRequest()
      .then((res: OrdersResponse) => {
        const { data } = res.data;
        this.activeOrders.push(...data.data);
        if (this.activePagination) {
          this.activePagination = {
            ...this.activePagination,
            currentPage: this.activePage,
          };
        }
      });
  }

  showMoreInActiveOrders() {
    this.inActivePage += 1;
    this.loadInActiveOrdersRequest()
      .then((res: OrdersResponse) => {
        const { data } = res.data;
        this.inactiveOrders.push(...data.data);
        if (this.inActivePagination) {
          this.inActivePagination = {
            ...this.inActivePagination,
            currentPage: this.inActivePage,
          };
        }
      });
  }
}
</script>

<style lang="scss" scoped>
.orders {
  @include container();
  padding-top: 16px;
  padding-bottom: 10px;
  background-color: #fff;

  @include laptop() {
    padding-top: 0;
    background-color: $grey-3;
    padding-bottom: 155px;
  }

  &__aside {
    display: none;

    @include tablet() {
      display: block;
    }
  }

  &__list {
    @include clearList();
    margin-bottom: 92px;
  }

  &__item {
    margin-bottom: 20px;

    @include laptop() {
      margin-bottom: 16px;
    }

    &:last-child {
      margin-bottom: 0;
      padding-bottom: 0;
      border-bottom: 0;
    }
  }

  &__pagination {
    display: none;

    @include laptop() {
      display: flex;
    }
  }
}

</style>
