<template lang="pug">
  .tabs-nav
    .tabs-nav__pane
      button(v-for="tab in tabs" @click="selectTab(tab)" type="button" :class="{'tabs-nav__tab--active': isTabActive(tab)}").tabs-nav__tab {{tab.label}}

</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class TabsNav extends Vue {
  @Prop() public tabs!: any[];

  selectTab(tab) {
    console.log('selectTab');
    if (tab.isActive) {
      return;
    }
    this.tabs.forEach(tab => tab.isActive = false);
    tab.isActive = true;
    this.$emit('change', tab.id)
  }

  isTabActive(tab) {
    return Boolean(tab.isActive);
  }
}
</script>

<style scoped lang="scss">
  .tabs-nav {
    border-bottom: 2px solid #c9c9d4;

    &__tab {
      @include clearButton();
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
  }
</style>
