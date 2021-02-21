<template lang="pug">
  .item-groups
    .item-groups__title.content-title Вступайте в группу
    .item-groups__text Покупайте совместно с моментальной доставкой по&nbsp;самой выгодной цене.

    Slick(ref="slick" :options="sliderSettings").item-groups__slider
      div(v-for="(group) in visibleSliderGroups").item-groups__slide
        GroupItem(:group="group" @join="handleJoin" :disabled="disabled").item-groups__item

</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import Slick from 'vue-slick';
import GroupItem from '@/components/GroupItem.vue';
import { Group } from '@/models/order';

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

  @Prop() public disabled!: boolean;

  showMobile = false;

  get visibleSliderGroups(): Group[] {
    // return this.groups.length > SLIDER_VISIBLE_GROUPS ? this.groups.slice(0, SLIDER_VISIBLE_GROUPS) : this.groups;
    return this.groups;
  }

  get visibleListGroups(): number {
    return LIST_VISIBLE_GROUPS;
  }

  get modalHeight(): number {
    return window.innerWidth < 768 ? 500 : 745;
  }

  showModal() {
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

  handleJoin(group: Group) {
    this.$emit('join', group);
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

  .item-groups__slide:last-child .item-groups__item {
    margin-bottom: 0;
    border-bottom: none;
  }
</style>
<style lang="scss" scoped>
  .item-groups {
    max-height: 500px;
    background: white;
    padding: 16px 15px;

    @include tablet() {
      border-radius: 8px;
      border: solid 1px #dfdfdf;
      padding: 23px 31px;
      display: flex;
      flex-direction: column;
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

    &__slider {
      @include laptop() {
        overflow: auto;
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
