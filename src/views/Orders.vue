<template lang="pug">
  .orders.profile-page
    .page.page--aside-tablet
      .page__layout
        .page__aside.orders__aside
          h1.page__title Мои заказы
          ProfileNav(:items="profileMenuItems")
        template(v-if="isAuthorized")
          div(v-if="loaded").page__content
            TabsNav(:tabs="tabs" @change="selectTab").tabs-nav--inner
            div(:class="{'hidden': selectedTab === 2}")
              div(v-if="activeOrders && activeOrders.length")
                ul(v-if="pageSettings.page === 'orders'").orders__list
                  OrderItem(
                    v-for="order in activeOrders"
                    :order="order"
                    :key="order.id"
                    :link="pageSettings.detailLink + order.order.oid"
                    :hideButton="true"
                  ).orders__item

                ul(v-else).orders__list
                  OrderItem(
                    v-for="order in activeOrders"
                    v-if="order.group"
                    :order="order.orderInfo"
                    :key="order.orderInfo.order.id"
                    :link="pageSettings.detailLink + order.group.id"
                    :hideButton="false"
                    button-text="Пригласить друзей"
                    @button-click="selectGroup(order)"
                  ).orders__item
                div(v-if="showActiveOrdersPagination").category__pagination
                  Pagination(:paginationInfo="activePagination" @page="activeOrdersPageChange" @more="showMoreActiveOrders")
              div(v-else).empty-message Нет активных {{pageSettings.kindLabel}}

            div(:class="{'hidden': selectedTab === 1}")
              div(v-if="inactiveOrders && inactiveOrders.length")
                ul(v-if="pageSettings.page === 'orders'").orders__list
                  OrderItem(
                    v-for="order in inactiveOrders"
                    :order="order"
                    :key="order.id"
                    :link="pageSettings.detailLink + order.order.oid"
                    :hideButton="true"
                  ).orders__item

                ul(v-else).orders__list
                  OrderItem(
                    v-for="order in inactiveOrders"
                    v-if="order.group"
                    :order="order.orderInfo"
                    :key="order.orderInfo.order.id"
                    :link="pageSettings.detailLink + order.group.id"
                    :hideButton="false"
                    button-text="Пригласить друзей"
                    @button-click="selectGroup(order)"
                  ).orders__item
                div(v-if="showInActiveOrdersPagination").category__pagination
                  Pagination(:paginationInfo="activePagination" @page="inActiveOrdersPageChange" @more="showMoreInActiveOrders")
              div(v-else).empty-message Нет завершенных {{pageSettings.kindLabel}}
          Loader(v-else)
      SeoBlock(v-if="seo" :block="seo")
      GroupInfoModal(:orderData="selectedOrder" ref="groupModal")

</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';

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
import GroupInfoModal from '@/components/GroupInfoModal.vue';
import SeoBlock from '@/components/SeoBlock.vue';
import { ISeoBlock } from '@/models/models';

interface PageSettings {
  title: string;
  activeOrderUrl: string;
  inActiveOrderUrl: string;
  detailLink: string;
  kindLabel: string;
  page: string;
}

const PAGE_SETTINGS = {
  Orders: {
    title: 'Мои заказы',
    activeOrderUrl: endpoints.orders.active,
    inActiveOrderUrl: endpoints.orders.inactive,
    detailLink: '/profile/orders/',
    kindLabel: 'заказов',
    page: 'orders',
  },
  Groups: {
    title: 'Мои группы',
    activeOrderUrl: endpoints.groups.active,
    inActiveOrderUrl: endpoints.groups.inactive,
    detailLink: '/profile/groups/',
    kindLabel: 'групп',
    page: 'groups',
  },
};
const DEFAULT_SORT = SORT_PARAMS.POPULAR;
const TABS = [
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
@Component({
  components: {
    SeoBlock,
    GroupInfoModal,
    Loader,
    ProfileNav,
    TabsNav,
    OrderItem,
    Pagination,
  },
})
export default class Orders extends Vue {
  @Action('app/setProfilePage') setProfilePage;

  @Watch('$route') onRouteChange() {
    this.loaded = false;
    this.activeOrders = [];
    this.inactiveOrders = [];
    this.seo = null;
    this.init();
  }

  profileMenuItems = PROFILE_MENU_ITEMS;

  selectedTab = 1;

  seo: ISeoBlock | null = null;

  activePagination: PaginationInfo | undefined;

  activePage: number = DEFAULT_PAGINATE_PAGE;

  activeSort: SORT_PARAMS = DEFAULT_SORT;

  inActivePage: number = DEFAULT_PAGINATE_PAGE;

  inActiveSort: SORT_PARAMS = DEFAULT_SORT;

  inActivePagination: PaginationInfo | undefined;

  loaded = false

  activeOrders: OrderData[] = [];

  inactiveOrders: OrderData[] = [];

  selectedOrder: OrderData | null = null;

  pageSettings: PageSettings = {
    title: '', activeOrderUrl: '', inActiveOrderUrl: '', detailLink: '', kindLabel: '', page: '',
  };

  tabs = TABS;

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

  async init() {
    if (this.$route.name) {
      this.pageSettings = PAGE_SETTINGS[this.$route.name];
      this.setProfilePage(this.pageSettings.title);
      if (this.isAuthorized) {
        $store.dispatch('app/updateProfileCounts');
        this.initLoad();
      } else {
        this.$root.$emit('show-login-modal');
      }
      this.selectTab(1);
    }
  }

  async mounted() {
    await this.init();
  }

  selectTab(tabId) {
    const tabIndex = this.tabs.findIndex((tab) => tab.id === tabId);
    const tab = this.tabs[tabIndex];
    this.tabs.forEach((t) => t.isActive = false);
    tab.isActive = true;
    this.selectedTab = tabId;
    Vue.set(this.tabs, tabIndex, tab);
  }

  initLoad() {
    Promise
      .all([this.loadActiveOrders(), this.loadInActiveOrders()])
      .then(() => {
        this.loaded = true;
      })
      .catch(() => {
        this.loaded = true;
      });
  }

  loadActiveOrders() {
    return this.loadActiveOrdersRequest().then(this.updateActiveOrders);
  }

  async loadActiveOrdersRequest(): Promise<OrdersResponse> {
    const endpoint: any = this.pageSettings.activeOrderUrl;
    const url = endpoint({ page: this.activePage, sort: this.activeSort });
    return createRequest('GET', url);
  }

  updateActiveOrders(res: OrdersResponse) {
    const { data } = res.data;
    if (!this.seo) {
      this.seo = data.seo_block;
    }
    this.activeOrders = data.data;
    this.activePagination = data.paginationInfo;
  }

  loadInActiveOrders() {
    return this.loadInActiveOrdersRequest().then(this.updateInActiveOrders);
  }

  async loadInActiveOrdersRequest(): Promise<OrdersResponse> {
    const endpoint: any = this.pageSettings.inActiveOrderUrl;
    const url = endpoint({
      page: this.inActivePage,
      sort: this.inActiveSort,
    });
    return createRequest('GET', url);
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

  selectGroup(order: OrderData) {
    this.selectedOrder = order;
    this.openGroupModal();
  }

  openGroupModal() {
    const modalComponent: any = this.$refs.groupModal;
    modalComponent.openModal();
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
