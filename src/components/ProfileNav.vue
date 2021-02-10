<template lang="pug">
  ul.profile-nav
    li(v-for="item in filteredItems").profile-nav__item
      button(@click="handleClick(item)" :class="{'profile-nav__link--active': $route.path === item.href}").profile-nav__link
        template(v-if="item.icon === 'user'")
          include ../assets/icons/user.svg

        template(v-if="item.icon === 'users'")
          include ../assets/icons/users.svg

        template(v-if="item.icon === 'bag'")
          include ../assets/icons/bag.svg

        template(v-if="item.icon === 'heart'")
          include ../assets/icons/heart.svg

        template(v-if="item.icon === 'logout'")
          include ../assets/icons/logout.svg

        span {{item.title}}
        span(v-if="item.count").profile-nav__item-count ({{item.count}})

</template>

<script lang="ts">
import {
  Component, Vue, Prop, Watch,
} from 'vue-property-decorator';
import router from '@/router';
import { BaseMenuItem } from '@/models/menu';
import { mapGetters } from 'vuex';
import { PROFILE_NAV_TYPES } from '@/models/enums';
import $store from '@/store';
import { ProfileCounts } from '@/models/models';

@Component({
  computed: {
    ...mapGetters({
      profileCounts: 'app/getProfileCounts',
      favouritesCount: 'app/getFavouritesCount',
    }),
  },
})
export default class ProfileNav extends Vue {
  @Watch('profileCounts') onProfileCountsChange(counts: ProfileCounts) {
    const entries = Object.entries(counts);
    entries.forEach(entry => {
      const itemIndex = this.items.findIndex((item: BaseMenuItem) => item.type === entry[0]);
      const item = this.items[itemIndex];
      Vue.set(this.items, itemIndex, { ...item, count: entry[1] });
    })
  }

  @Watch('favouritesCount') onFavouritesCountChange(count) {
    const itemIndex = this.items.findIndex((item: BaseMenuItem) => item.type === this.NAV_TYPES.FAVOURITES);
    const item = this.items[itemIndex];
    Vue.set(this.items, itemIndex, { ...item, count });
  }

  @Prop() public items!: BaseMenuItem[];

  get isAuthorized() {
    return (this as any).$auth.check();
  }

  get filteredItems() {
    return this.items.filter((item: BaseMenuItem) => (item.type === 'logout' ? this.isAuthorized : true));
  }

  NAV_TYPES = PROFILE_NAV_TYPES;

  handleClick(item: BaseMenuItem) {
    if (item.href) {
      router.push({ path: item.href });
    }
    if (item.action) {
      switch (item.action) {
        case 'logout': {
          $store.dispatch('app/logout');
          break;
        }
        default: {
          console.log('default');
        }
      }
    }
  }
}
</script>

<style lang="scss">
  .profile-nav {
    @include clearList();
    background-color: #fff;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 2px 14px 0 rgba(30, 39, 51, 0.05);

    &__item {
      border-bottom: 1px solid $grey-5;
      position: relative;
      /*

          &::after {
            content: "";
            position: absolute;
            top: 50%;
            right: 22px;
            width: 7px;
            height: 7px;
            border: 1px solid $grey-2;
            border-top: none;
            border-left: none;
            transform: translate(0, -50%) rotate(-45deg);
          }
      */

      &:last-child {
        border-bottom: none;
      }
    }

    &__item-count {
      font-weight: 400;
      font-size: 14px;
      color: $grey-2;
      margin-left: 5px;
    }

    &__link {
      @include clearButton();
      font-size: 14px;
      width: 100%;
      color: $black-1;
      text-decoration: none;
      padding: 20px 32px;
      display: flex;
      align-items: center;
      cursor: pointer;

      svg {
        width: 18px;
        height: 18px;
        margin-right: 16px;
        color: $grey-2;
      }
    }

    &__link--active {
      font-weight: bold;

      svg {
        color: $blue;
      }
    }
  }

</style>
