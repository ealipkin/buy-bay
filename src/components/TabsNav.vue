<template lang="pug">
  .tabs-nav
    .tabs-nav__pane
      button(v-for="(tab, index) in tabs" :key="index" @click="selectTab(tab, index)" type="button" :class="{'tabs-nav__tab--active': isTabActive(tab)}").tabs-nav__tab {{tab.label}}

</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class TabsNav extends Vue {
  @Prop() public tabs!: any[];

  selectTab(tab, index) {
    if (tab.isActive) {
      return;
    }
    this.tabs.forEach((t) => t.isActive = false);
    tab.isActive = true;
    Vue.set(this.tabs, index, tab);
    this.$emit('change', tab.id);
  }

  isTabActive = (tab) => Boolean(tab.isActive)
}
</script>

<style scoped lang="scss">
  .tabs-nav {
    border-bottom: 2px solid #c9c9d4;

    &__tab {
      @include clearButton();
      cursor: pointer;
      font-size: 32px;
      font-weight: 600;
      color: #7b8197;
      outline: none;
      padding-bottom: 23px;
      padding-left: 42px;
      padding-right: 30px;

      &:first-child {
        padding-left: 0;
      }

      &--active {
        color: #222222;
        position: relative;

        &:after {
          content: '';
          display: block;
          height: 4px;
          width: 100%;
          position: absolute;
          bottom: -3px;
          left: 0;
          background: $blue;
        }
      }
    }

    &--small &__tab {
      font-size: 14px;
      padding-bottom: 10px;
      padding-left: 17px;
      padding-right: 4px;

      &:first-child {
        padding-left: 0;
      }

      @include tablet() {
        font-size: 18px;

        padding-left: 30px;
        padding-right: 4px;
        padding-bottom: 20px;
      }
    }

    &--inner {
      display: inline-block;
      margin-bottom: 28px;

      @include laptop() {
        margin-bottom: 21px;
      }
    }

    &--inner &__tab {
      font-size: 16px;
      padding: 0 8px 8px;

      @include laptop() {
        font-size: 18px;
        font-weight: bold;
        padding: 0 10px 10px;
      }

      &:first-child {
        padding-left: 0;
      }
    }
  }
</style>
