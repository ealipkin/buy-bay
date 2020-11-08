<template lang="pug">
  ul.profile-nav
    li(v-for="item in items").profile-nav__item
      router-link(:to="item.href").profile-nav__link.profile-nav__link--active
        template(v-if="item.icon === 'user'")
          include ../assets/icons/user.svg

        template(v-if="item.icon === 'users'")
          include ../assets/icons/users.svg

        template(v-if="item.icon === 'bag'")
          include ../assets/icons/bag.svg

        template(v-if="item.icon === 'heart'")
          include ../assets/icons/heart.svg

        template(v-if="item.icon === 'settings'")
          include ../assets/icons/settings.svg

        span {{item.title}}

</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component
export default class ProfileNav extends Vue {
  @Prop() public items!: object[];
}
</script>

<style lang="scss">

.profile-nav {
  @include clearList();
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 14px 0 rgba(30, 39, 51, 0.05);

  &__item {
    border-bottom: 1px solid $grey-5;

    &:last-child {
      border-bottom: none;
    }
  }

  &__link {
    font-size: 14px;
    color: $black-1;
    text-decoration: none;
    padding: 20px 32px;
    display: flex;
    align-items: center;

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
