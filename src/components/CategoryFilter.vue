<template lang="pug">
  .category-filter
    button(type="button" @click="handleOpen").category-filter__open
    div(:class="{'category-filter__inner--open': !closed}").category-filter__inner
      .category-filter__main-header Фильтр
        button(type="button" @click="handleClose").close.category-filter__close

      .category-filter__content
        div(v-for="(filter, index) in filters").category-filter__section
          div(@click="toggleHeader(filter, index)" :class="{'category-filter__header--open': filter.isOpen}").category-filter__header {{filter.label}}

          div(:class="{'category-filter__category-wrapper--open': filter.isOpen}").category-filter__category-wrapper
            div(v-if="filter.isSearch").category-filter__search
              .input.input--search
                .input__icon.input__icon--search
                  include ../assets/icons/search.svg
                input(type="search" @input="handleSearch" placeholder="Поиск").category-filter__search-field.input__field

            div(v-if="filter.type === 'checkbox'").category-filter__block.category-filter__block--checkbox
              label(v-for="item in filter.items").checkbox
                input(type="checkbox" :checked="item.selected" :value="item.value").visually-hidden
                span.checkbox__icon
                span.checkbox__text {{item.label}}
                span.checkbox__count {{item.count}}

            div(v-if="filter.type === 'accordion'").category-filter__block.category-filter__block--accordion
              .accordion.category-filter__accordion
                div(v-for="(accordion, index) in filter.items").accordion__item
                  div(@click="toggleAccordion(accordion, index, filter)" :class="{'accordion__header--open': accordion.isOpen}").accordion__header {{accordion.label}}
                    span.accordion__icon
                  div(:class="{'accordion__content--open': accordion.isOpen}").accordion__content.category-filter__accordion-items
                    button(v-for="item in accordion.items" type="button").category-filter__accordion-item {{item.label}}

            div(v-if="filter.type === 'color'").category-filter__block.category-filter__block--color
              ColorSelect(:colors="filter.items").category-filter__colors

            div(v-if="filter.type === 'radio'").category-filter__block.category-filter__block--radio
              label(v-for="item in filter.items").radio
                input(type="radio" :checked="item.selected" :value="item.value" :name="filter.name").visually-hidden
                span.radio__icon
                span.radio__text {{item.label}}

        button(type="button" @click="handleSumbit").button.category-filter__submit Применить

</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import ColorSelect from '@/components/ColorSelect.vue';

@Component({
  components: { ColorSelect },
})
export default class CategoryFilter extends Vue {
  @Prop() public filters!: any[];

  closed = true;

  handleSearch() {

  }

  toggleAccordion(accordion, index, filter) {
    accordion.isOpen = !accordion.isOpen;
    Vue.set(filter.items, index, accordion);
  }

  toggleHeader(filter, index) {
    filter.isOpen = !filter.isOpen;
    Vue.set(this.filters, index, filter);
  }

  handleClose() {
    this.closed = true;
  }

  handleOpen() {
    this.closed = false;
  }

  handleSumbit() {
    this.closed = true;
  }
}
</script>

<style lang="scss">
  .category-filter {
    .radio {
      margin-bottom: 20px;

      &:last-child {
        margin-bottom: 20px;
      }
    }
  }
</style>

<style scoped lang="scss">
  .category-filter {
    border-radius: 8px;
    box-shadow: 0 2px 14px 0 #1e27330c;
    background-color: #ffffff;

    &__section {
      border-bottom: 1px solid #ededed;
    }

    &__header {
      font-size: 18px;
      font-weight: bold;
      color: #222222;
      padding: 11px 41px 13px 24px;
      border-bottom: 1px solid #ededed;
      position: relative;
      background: white;

      &:after {
        content: '';
        position: absolute;
        right: 23px;
        top: 50%;
        transform: translateY(-50%) rotate(180deg);
        background: url(../assets/icons/filter-header-arrow.svg) no-repeat;
        width: 14px;
        height: 13px;
        margin-top: 0;

        @include laptop() {
          display: none;
        }
      }

      &--open:after {;
        margin-top: 3px;
        transform: translateY(-50%);
      }
    }

    &__category-wrapper {
      display: none;

      &--open {
        display: block;
      }

      @include laptop() {
        display: block;
      }
    }

    &__main-header {
      border-radius: 2px;
      box-shadow: 0 2px 2px 0 #0000001c;
      margin-bottom: 8px;
      background: white;
      position: relative;
      text-align: center;
      font-size: 18px;
      font-weight: 600;
      color: #222222;
      padding: 13px 0;

      @include laptop() {
        display: none;
      }
    }

    &__content {
      background: white;
      border-radius: 8px;
      padding-bottom: 90px;
      box-sizing: border-box;
      flex: 1;

      @include laptop() {
        height: auto;
        padding-bottom: 0;
      }
    }

    &__inner {
      display: none;
      background-color: #f5f5f5;
      position: fixed;
      width: 100%;
      height: 100%;
      left: 0;
      top: 0;
      z-index: 10;
      overflow: auto;
      border-radius: 8px;

      &--open {
        display: flex;
        flex-direction: column;
      }

      @include laptop() {
        position: relative;
        display: block;
        background: white;
      }
    }

    &__search {
      padding: 20px 25px 0 21px;
    }

    &__close {
      position: absolute;
      right: 16px;
      top: 50%;
      transform: translateY(-50%);

      &:after, &:before {
        background: black;
        height: 1px;
      }
    }

    &__open {
      @include clearButton();
      width: 60px;
      height: 70px;
      position: fixed;
      bottom: 30px;
      right: 30px;
      z-index: 10;
      background-size: contain;
      background: url(../assets/icons/filter-btn.svg) no-repeat center;
      @include laptop() {
        display: none;
      }
    }

    &__block {
      background: white;

      &--checkbox {
        padding: 19px 24px 0;
        max-height: 280px;
        overflow: auto;
        margin-bottom: 27px;
      }

      .checkbox {
        margin-bottom: 20px;
      }

      &--color {
        padding-top: 19px;
        padding-bottom: 24px;
      }

      &--radio {
        padding: 21px 25px 0;
      }
    }

    &__accordion-item {
      @include clearButton();
      background: #f9f9f9;
      display: flex;
      width: 100%;
      font-size: 14px;
      color: #222222;
      position: relative;
      border-bottom: 1px solid #ededed;
      align-items: center;
      padding: 15px 0 16px 40px;

      &:before {
        content: '';
        flex-shrink: 0;
        display: block;
        width: 4px;
        height: 4px;
        border-radius: 6px;
        background-color: #496cff;
        margin-right: 12px;
      }
    }

    &__submit {
      position: fixed;
      bottom: 20px;
      width: calc(100% - 32px);
      margin: 0 16px;
      font-size: 18px;
      height: 60px;

      @include laptop() {
        display: none;
      }
    }

  }
</style>
