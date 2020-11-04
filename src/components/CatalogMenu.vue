<template lang="pug">
  .catalog-menu(:style="{top: headerHeight + 'px'}")
    .catalog-menu__container
      div(:class="{'catalog-menu__container-primary--hidden': subMenuOpen}").catalog-menu__container-primary
        .catalog-menu__nav-wrapper
          .catalog-menu__nav
            button(type="button" v-for="(link, index) in links" :key="index" @click="menuLinkClick(link)" :class="{'catalog-menu__nav-link--active': link.isActive }").catalog-menu__nav-link
              span(v-if="link.icon === 'user'").catalog-menu__nav-link-icon
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18"><path d="M0 8.993c0 4.957 4.035 8.992 8.993 8.992 4.957 0 8.992-4.035 8.992-8.992C17.985 4.035 13.95 0 8.993 0 4.035 0 0 4.035 0 8.993zm3.759 6.16a24.676 24.676 0 012.803-1.638.59.59 0 00.332-.531v-1.13a.45.45 0 00-.063-.228 3.844 3.844 0 01-.468-1.38.449.449 0 00-.325-.364c-.044-.056-.17-.248-.328-.805-.126-.442-.126-.66-.115-.748a.452.452 0 00.425-.602 2.569 2.569 0 01-.063-1.538c.118-.501.387-.973.804-1.401.225-.24.483-.454.76-.627l.015-.011c.232-.163.472-.284.712-.366h.003c.203-.07.413-.107.638-.118.605-.051 1.147.06 1.623.343.524.288.734.664.734.664.074.14.214.233.37.244.003 0 .202.037.383.273.214.284.516 1.021.147 2.803-.04.203.06.406.24.494.015.07.033.284-.107.782-.125.443-.229.653-.291.749a.464.464 0 00-.236.03.456.456 0 00-.27.335 4.16 4.16 0 01-.343 1.107.447.447 0 00-.044.195v1.306a.58.58 0 00.332.531c.34.166 1.48.745 2.803 1.638a8.047 8.047 0 01-5.234 1.929 8.087 8.087 0 01-5.237-1.937zM8.993.902c4.459 0 8.089 3.63 8.089 8.09 0 2.132-.83 4.075-2.184 5.521a25.738 25.738 0 00-2.9-1.722v-1.01c.122-.266.222-.562.296-.875.361-.137.616-.557.856-1.402.217-.77.199-1.313-.06-1.623.27-1.479.148-2.57-.365-3.246a1.566 1.566 0 00-.789-.575 2.889 2.889 0 00-.966-.84c-.631-.373-1.354-.528-2.132-.462-.295.015-.587.07-.87.166h-.004a3.718 3.718 0 00-.926.472 4.97 4.97 0 00-.922.76c-.532.542-.878 1.154-1.03 1.807a3.45 3.45 0 00-.04 1.609.72.72 0 00-.137.129c-.265.32-.287.833-.066 1.619.148.52.34 1.055.671 1.302.1.498.259.952.476 1.35v.819c-.505.254-1.634.856-2.899 1.722a8.056 8.056 0 01-2.187-5.52c0-4.46 3.63-8.09 8.089-8.09z" fill="currentColor"/></svg>

              span(v-if="link.icon === 'users'").catalog-menu__nav-link-icon
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18"><path d="M15.879 13.432l-2.627-1.313a.724.724 0 01-.402-.65v-.93a6.292 6.292 0 001.01-1.857 1.09 1.09 0 00.64-.995v-1.1c0-.264-.099-.52-.275-.721V4.403c.015-.151.076-1.052-.575-1.794-.565-.645-1.482-.972-2.725-.972s-2.16.327-2.725.971c-.394.45-.527.958-.567 1.322-.472-.244-1.027-.368-1.658-.368-2.857 0-3.023 2.436-3.025 2.475v1.26c-.178.194-.275.418-.275.64v.95a.98.98 0 00.36.76c.227.856.785 1.502 1.003 1.73v.753a.598.598 0 01-.322.527l-1.83 1.148A2.179 2.179 0 00.75 15.718v1.044h16.5v-1.111c0-.946-.526-1.796-1.371-2.219zM4.6 15.597v.615H1.3v-.494c0-.596.326-1.145.864-1.439l1.83-1.147c.366-.2.593-.584.593-1.002v-.987L4.5 11.06c-.007-.006-.738-.697-.954-1.637l-.025-.11-.094-.06a.438.438 0 01-.202-.367v-.95c0-.099.067-.216.185-.322l.09-.082v-1.48c.004-.078.148-1.94 2.475-1.94.658 0 1.212.152 1.65.452v1.3a1.1 1.1 0 00-.275.723v1.1c0 .083.01.165.028.245.007.032.022.061.032.092.015.046.027.094.049.137v.002c.07.145.173.275.303.378l.004.015c.017.063.034.126.053.187l.022.072.013.038.028.089.054.152.027.065c.023.057.045.113.069.168l.016.04.016.035.021.046c.027.059.054.116.081.17l.013.028.052.1.088.161.042.074c.04.068.078.13.114.188l.024.037c.066.103.124.187.172.252l.034.047c.006.008.014.02.02.026v.91c0 .267-.145.51-.379.638l-.728.397-.126-.011-.052.109-1.547.844A2.48 2.48 0 004.6 15.596zm12.1.615H5.15v-.615a1.93 1.93 0 011.006-1.695l2.454-1.338c.41-.224.665-.654.665-1.121v-1.105h0l-.053-.064-.01-.013a.781.781 0 01-.046-.058l-.005-.006-.052-.07s0 0 0 0a4.868 4.868 0 01-.15-.22L8.955 9.9l-.085-.136-.006-.011A5.683 5.683 0 018.67 9.4s0 0 0 0a5.117 5.117 0 01-.104-.221h0l-.015-.032h0l-.045-.108L8.489 9l-.044-.115a5.755 5.755 0 01-.08-.233L8.35 8.6l-.005-.016a5.2 5.2 0 01-.072-.267l-.025-.109-.093-.06a.548.548 0 01-.255-.461v-1.1a.54.54 0 01.184-.406l.091-.082V4.29l-.007-.006c-.01-.198.002-.807.446-1.313.456-.52 1.233-.784 2.311-.784 1.074 0 1.85.262 2.306.778.536.605.447 1.38.446 1.386l-.002 1.75.09.081c.12.107.185.251.185.405v1.1c0 .24-.157.45-.391.523l-.137.042-.044.136a5.753 5.753 0 01-.78 1.571c-.081.116-.16.218-.23.297l-.068.078v1.134c0 .487.27.924.706 1.142l2.627 1.314a1.92 1.92 0 011.067 1.727v.561z" fill="currentColor" stroke="currentColor" stroke-width=".4"/></svg>

              span(v-if="link.icon === 'bag'").catalog-menu__nav-link-icon
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18"><g fill="currentColor" stroke="currentColor" stroke-width=".1" fill-rule="evenodd"><path fill-rule="nonzero" d="M15.855 15.571L14.821 3.92a.443.443 0 00-.446-.406h-2.18A3.522 3.522 0 008.679 0 3.524 3.524 0 005.16 3.514H2.98a.448.448 0 00-.446.406L1.5 15.57v.041c0 1.298 1.194 2.355 2.66 2.355h9.036c1.466 0 2.66-1.057 2.66-2.355v-.04zM8.678.893a2.628 2.628 0 012.625 2.621h-5.25A2.626 2.626 0 018.677.893zm4.518 16.177H4.16c-.967 0-1.755-.643-1.766-1.443l.996-11.22h1.77v1.566a.447.447 0 00.893 0V4.407h5.251v1.566a.447.447 0 00.893 0V4.407h1.77l.997 11.224c-.011.796-.8 1.44-1.767 1.44z"/><path d="M10.471 9.128l-2.633 2.633-1.075-1.074a.446.446 0 10-.632.632l1.391 1.39a.452.452 0 00.632 0l2.95-2.948a.45.45 0 000-.633.457.457 0 00-.633 0z"/></g></svg>

              span(v-if="link.icon === 'heart'").catalog-menu__nav-link-icon
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 22"><path d="M14.2 20.6C-9.601 8.946 7.612-5.544 14.2 4.215c6.588-9.759 23.802 4.73 0 16.385z" stroke="currentColor" stroke-width="2" fill="none" fill-rule="evenodd"/></svg>

              span.catalog-menu__nav-link-title {{link.title}}

      div(:class="{'catalog-menu__container-secondary--opened': subMenuOpen}" v-if="childMenu").catalog-menu__container-secondary
        .catalog-menu__sub-wrapper
          .catalog-menu__header
            button(type="button" @click="closeMenu").catalog-menu__back
            .catalog-menu__title {{childMenu.title}}
            button(type="button" @click="searchClick").catalog-menu__search
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path d="M15.804 14.864l-3.846-3.847A6.744 6.744 0 006.743 0a6.743 6.743 0 104.27 11.961l3.847 3.843a.667.667 0 00.944-.94zm-9.061-2.72a5.408 5.408 0 01-5.404-5.401 5.41 5.41 0 015.404-5.404 5.412 5.412 0 015.404 5.404c0 2.978-2.426 5.4-5.404 5.4z" fill="currentColor" fill-rule="evenodd" opacity=".8"/></svg>
          .catalog-menu__sub-inner
            .catalog-menu__sub-lists
              ul(v-if="childMenu.children && childMenu.children.length" v-for="childItem in childMenu.children").catalog-menu__sub-list
                li.catalog-menu__sub-item.catalog-menu__sub-item--main
                  router-link(:to="childItem.main.href").catalog-menu__sub-link.catalog-menu__sub-link--main {{childItem.main.title}}
                li(v-for="childLink in childItem.links").catalog-menu__sub-item
                  router-link(:to="childLink.href").catalog-menu__sub-link {{childLink.title}}
            ul(v-if="childMenu.brands && childMenu.brands.length").catalog-menu__brands
              li(v-for="brand in childMenu.brands")
                router-link(:to="brand.href" :title="brand.title")
                  img(:src="require('@/assets/' + brand.imageUrl + '')")

</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { MenuItem } from '@/utils/models';

@Component
export default class CatalogMenu extends Vue {
  @Prop() public links!: MenuItem[];

  headerHeight = 0;

  childMenu: MenuItem | null = null;

  header: any;

  subMenuOpen = false;

  mounted() {
    this.header = document.querySelector('.header');
    this.headerHeight = this.header.offsetHeight;
    this.childMenu = this.links[0];
    window.addEventListener('resize', () => {
      this.headerHeight = this.header.offsetHeight;
    });
  }

  menuLinkClick(link) {
    this.childMenu = link;
    this.subMenuOpen = true;
  }

  closeMenu() {
    this.subMenuOpen = false;
  }

  searchClick = () => {
    console.log('searchClick');
  }
}
</script>

<style scoped lang="scss">
  .catalog-menu {

    background: white;
    width: 100%;
    top: 83px;
    left: 0;
    position: absolute;
    max-height: calc(100vh - 82px);
    overflow: auto;
    height: auto;
    z-index: 20;

    @include laptop() {
      top: 175px;
      height: 100%;
      max-height: calc(100vh - 30%);
      overflow: visible;
    }

    @include desktop() {
      height: 100vh;
      max-height: 659px;
    }

    &__nav-link {
      @include clearButton();
      outline: none;
      border-bottom: 1px solid #ededed;
      display: flex;
      align-items: center;
      padding: 16px 20px 13px;
      box-sizing: border-box;
      width: 100%;
      position: relative;
      cursor: pointer;

      &:hover {
        background-color: #ededed;
      }

      @include laptop() {
        padding-left: 12px;
      }

      &:after {
        content: '';
        width: 6px;
        height: 6px;
        position: absolute;
        top: 50%;
        right: 24px;
        border: 1px solid black;
        border-bottom: none;
        border-left: none;
        transform: translateY(-50%) rotate(45deg);
        margin-top: 1px;
      }

      &-title {
        font-size: 14px;
        color: #222222;
      }

      &-icon {
        color: $iconGray;
        margin-right: 20px;
        width: 18px;
      }

      &--active &-icon {
        color: $blue;
      }

    }

    &__brands {
      display: none;
      @include clearList();

      img {
        max-width: 100%;
        max-height: 76px;
        display: block;
        margin: 0 auto;
      }

      a {
        display: block;
      }

      li {
        margin-bottom: 9px;
      }

      @include desktop() {
        display: block;
        width: 154px;
        margin-left: auto;
        margin-right: 24px;
        margin-top: -4px;

      }
    }

    &__container {
      position: relative;

      @include laptop() {
        @include container();
        display: flex;
        padding-left: 0;
        padding-right: 0;
        height: 100%;
      }
    }

    &__container-primary {
      &--hidden {
        display: none;

        @include laptop() {
          display: block;
        }
      }

      @include laptop() {
        width: 100%;
        overflow: auto;
        max-width: 236px;
        border-right: 1px solid #ededed;
      }
    }

    &__container-secondary {
      background: white;
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      max-height: 100vh;
      display: none;

      &--opened {
        display: block;
      }

      @include laptop() {
        display: block;
        position: relative;
        width: auto;
        height: auto;
        flex: 1;
        padding: 20px 40px;
        overflow: auto;
      }
    }

    &__header {
      display: flex;
      align-items: center;
      padding: 14px 14px 14px;
      box-shadow: 0 2px 4px 0 #00000033, inset 0 -1px 0 0 #00000014;

      @include laptop() {
        box-shadow: none;
        padding: 0;
        margin-bottom: 30px;
      }
    }

    &__back {
      @include clearButton();
      width: 21px;
      height: 16px;
      background-size: cover;
      margin-right: 28px;
      position: relative;
      top: 3px;
      background: url(../assets/icons/menu-back.svg) no-repeat center;
      @include laptop() {
        display: none;
      }
    }

    &__search {
      @include clearButton();
      color: $blue;

      margin-left: auto;
      margin-right: 4px;
      width: 17px;
      position: relative;
      top: 2px;

      @include laptop() {
        display: none;
      }
    }

    &__title {
      font-size: 16px;
      font-weight: 600;
      font-stretch: normal;
      font-style: normal;
      line-height: normal;
      letter-spacing: normal;
      color: #222222;

      @include laptop() {
        font-size: 32px;
      }
    }

    &__sub-list {
      @include clearList();
      padding: 22px 19px 15px;

      @include laptop() {
        padding: 0;
        width: 50%;
        margin-bottom: 42px;
      }
    }

    &__sub-wrapper {
      display: flex;
      flex-direction: column;
      height: 100%;
    }

    &__sub-inner {
      flex: 1;
      overflow: auto;

      @include laptop() {
        display: flex;
        overflow: visible;
      }
    }

    &__sub-lists {
      flex: 1;
      @include laptop() {
        display: flex;
        flex-wrap: wrap;
        max-width: 640px;
        align-content: flex-start;
      }
    }

    &__sub-link {
      font-size: 14px;
      line-height: 2.29;
      text-decoration: none;
      color: #222222;

      &--main {
        font-weight: bold;
        margin-bottom: 10px;
        display: block;
      }
    }
  }
</style>
