<template lang="pug">
  .item-groups
    .item-groups__title.content-title Вступайте в группу
    .item-groups__text Покупайте совместно с моментальной доставкой по&nbsp;самой выгодной цене.

    Slick(ref="slick" :options="sliderSettings").item-groups__slider
      div(v-for="(group, index) in visibleSliderGroups" :class="{'item-groups__item--hide-desktop': ((index+1) > visibleListGroups)}").item-groups__slide
        GroupItem(
          :group="group"
          :class="{'item-groups__item--hide-desktop': ((index+1) > visibleListGroups)}"
        ).item-groups__item
    .item-groups__footer
      button(type="button" v-if="groups.length" @click="showModal").item-groups__show-all Всего {{groups.length}} групп

    modal(name="group-modal" @closed="modalClose" :height="modalHeight" :adaptive="true" :classes="'groups-modal'")
      .modal.item-groups__modal
        button(type="button" @click="closeModal").modal__close.close
        .modal__header
          .modal__title Всего {{groups.length}}  групп
            span._hide-mobile  на покупку товара
          .modal__text Покупайте совместно с моментальной доставкой по самой выгодной цене.
        .modal__content.item-groups__modal-content
          GroupItem(v-for="(group, index) in groups" :key="index" :group="group").item-groups__item.item-groups__item--modal
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Group } from '@/utils/models';
import Slick from 'vue-slick';
import GroupItem from '@/components/GroupItem.vue';

const SLIDER_VISIBLE_GROUPS = 10;
const LIST_VISIBLE_GROUPS = 3;

@Component({
  components: {
    Slick,
    GroupItem,
  },
})
export default class ItemGroups extends Vue {
  @Prop() public groups!: Group[];

  showMobile = false;

  get visibleSliderGroups(): Group[] {
    return this.groups.length > SLIDER_VISIBLE_GROUPS ? this.groups.slice(0, SLIDER_VISIBLE_GROUPS) : this.groups;
  }

  get visibleListGroups(): number {
    return LIST_VISIBLE_GROUPS;
  }

  get modalHeight(): number {
    return window.innerWidth < 768 ? 500 : 745;
  }

  showModal() {
    console.log('show');
    this.$modal.show('group-modal');
    document.body.classList.add('_hidden');
  }

  closeModal() {
    this.$modal.hide('group-modal');
    this.modalClose();
  }

  modalClose() {
    document.body.classList.remove('_hidden');
  }

  sliderSettings = {
    slidesToShow: 2,
    slidesToScroll: 1,
    swipeToSlide: true,
    mobileFirst: true,
    arrows: false,
    dots: true,
    responsive: [
      {
        breakpoint: '767',
        settings: 'unslick',
      },
    ],
  };

  mounted() {
  }
}

</script>

<style lang="scss">
  .groups-modal {
    max-width: calc(100% - 10px);
    background: white;
    left: 0 !important;
    margin: 0 auto;

    @include laptop() {
      max-width: 570px;
    }

    .modal__header {
      padding-left: 5px;

      @include laptop() {
        padding-left: 0;
      }
    }

    .group-item__info {
      padding-left: 11px;
      @include laptop() {
        padding-left: 0;
        max-width: 167px;
      }
    }

    .group-item__button {
      @include laptop() {
        width: 170px;
        margin-top: 10px;
        margin-left: 17px;
      }
    }
  }
</style>
<style lang="scss" scoped>
  .item-groups {
    background: white;
    padding: 16px 15px;

    @include tablet() {
      border-radius: 8px;
      border: solid 1px #dfdfdf;
      overflow: hidden;
      padding: 23px 31px;
    }

    &__title {
      margin-bottom: 16px;
    }

    &__text {
      font-size: 14px;
      line-height: 1.57;
      letter-spacing: normal;
      color: #222222;
      margin-bottom: 24px;

      @include tablet() {
        margin-bottom: 31px;
      }
    }

    &__modal-content {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
    }

    &__item {
      &--modal {
        width: 48%;
        margin-bottom: 19px;
        @include laptop() {
          width: 100%;
        }

        &:last-child {
          border-bottom: none;
        }
      }

      &--hide-desktop {
        @include tablet() {
          display: none;
        }
      }

      @include tablet() {
        padding-bottom: 14px;
        border-bottom: 1px solid #e9e5e5;
        margin-bottom: 24px;
      }
    }

    &__slide {
      padding: 0 10px;

      @include tablet() {
        padding: 0;
      }
    }

    &__slide:nth-child(3) &__item {
      @include tablet() {
        border-bottom: none;
        margin-bottom: 0;
      }

    }

    &__footer {
      text-align: center;
      margin-top: 50px;

      @include tablet() {
        margin-top: 4px;
        margin-bottom: 14px;
      }
    }

    &__show-all {
      text-align: center;
      padding: 0;
      text-decoration: underline;
      color: $blue;
      margin: 0 auto;
      display: inline-block;
      background: none;
      border: none;
      font-size: 14px;
    }

    &__modal {
      padding: 16px 11px 0;

      @include laptop() {
        padding: 39px 50px 0;
      }
    }
  }
</style>