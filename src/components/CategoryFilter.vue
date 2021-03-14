<template lang="pug">
  form(ref="form").category-filter
    div(v-if="selectedFilters.length").category-filter__top
      button(type="button" @click="resetFilters").category-filter__reset.link Сбросить
    .category-filter__wrapper
      button(type="button" @click="handleOpen").category-filter__open
      div(:class="{'category-filter__inner--open': !closed}").category-filter__inner
        .category-filter__main-header Фильтр
          button(type="button" @click="handleClose").close.category-filter__close
        .category-filter__content
          div
            div(v-for="(filter, index) in filters" v-if="filter.items && filter.items.length").category-filter__section
              div(@click="toggleHeader(filter, index)" :class="{'category-filter__header--open': filter.isOpen}").category-filter__header {{filter.label}}

              div(:class="{'category-filter__category-wrapper--open': filter.isOpen}").category-filter__category-wrapper
                div(v-if="filter.isSearch").category-filter__search
                  .input-search
                    .input-search__icon
                      include ../assets/icons/search.svg
                    input(type="search" v-on:input="$emit('input', {value: $event.target.value, filter, index})" placeholder="Поиск").category-filter__search-field.input-search__field

                div(v-if="filter.type === 'checkbox'").category-filter__block.category-filter__block--checkbox
                  Checkbox(
                    v-for="(item, i) in filteredItems(filter)"
                    :key="i"
                    :item="{...item, query: filter.query}"
                    :checked="item.selected"
                    :value="item.value"
                    :name="filter.query"
                    :label="item.label"
                    :count="item.count"
                    @change="handleFilterChange"
                  )
                  span(v-if="!filteredItems(filter).length").category-filter__empty Ничего не найдено

                // accordion
                div(v-if="filter.type === 'accordion'").category-filter__block.category-filter__block--accordion
                  .accordion.category-filter__accordion
                    div(
                      v-for="(accordion, index) in filteredItems(filter)"
                    ).accordion__item

                      div(@click="toggleAccordion(accordion, index, filter)" :class="{'accordion__header--open': accordion.expand}" v-if="accordion.items && accordion.items.length").accordion__header
                        button(type="button").accordion__header-button {{accordion.label}}
                        span.accordion__icon

                      button(
                        v-else
                        type="button"
                        :class="{'category-filter__accordion-item--active': accordion.href === $route.path}"
                        @click="accordionItemClick(accordion)"
                      ).category-filter__accordion-item {{accordion.label}}

                      div(:class="{'accordion__content--open': accordion.expand}").accordion__content.category-filter__accordion-items
                        button(
                          v-for="item in accordion.items"
                          type="button"
                          :class="{'category-filter__accordion-item--active': item.href === $route.path}"
                          @click="accordionItemClick(item)"
                        ).category-filter__accordion-item {{item.label}}
                    span(v-if="!filteredItems(filter).length").category-filter__empty Ничего не найдено

                // color
                div(v-if="filter.type === 'color'").category-filter__block.category-filter__block--color
                  ColorSelect(:colors="filter.items").category-filter__colors

                //radio
                div(v-if="filter.type === 'radio'").category-filter__block.category-filter__block--radio
                  Radio(
                    v-for="(item, i) in filteredItems(filter)"
                    :key="i"
                    :item="{...item, query: filter.query}"
                    :checked="item.selected"
                    :value="item.value"
                    :name="filter.query"
                    :label="item.label"
                    @change="handleFilterChange"
                  )
                  span(v-if="!filteredItems(filter).length").category-filter__empty Ничего не найдено

          button(type="button" @click="handleSubmit").button.category-filter__submit Применить

</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import ColorSelect from '@/components/ColorSelect.vue';
import Checkbox from '@/components/Checkbox.vue';
import Radio from '@/components/Radio.vue';
import { IFilter, IFilterItem } from '@/models/filters';
import { debounce } from 'vue-debounce';
import { disableBodyScroll, enableBodyScroll } from '@/utils/lockBody';
import { removeFiltersFromQuery } from '@/utils/filters';

@Component({
  components: { Radio, Checkbox, ColorSelect },
})
export default class CategoryFilter extends Vue {
  @Prop() public filters!: any[];

  closed = true;

  selectedFilters: IFilterItem[] = [];

  handleSearch(e) {
    const { value, filter, index }: { value: string; filter: IFilter; index: number } = e;
    filter.searchTerm = value && value.length ? value.trim() : null;
    Vue.set(this.filters, index, { ...filter });
  }

  filteredItems(filter: IFilter) {
    const term = filter.searchTerm && filter.searchTerm.toLowerCase().trim();
    return filter.items.filter((item: IFilterItem) => (term ? item.label.toLowerCase().includes(term) : true));
  }

  toggleAccordion(accordion, index, filter) {
    accordion.expand = !accordion.expand;
    Vue.set(filter.items, index, accordion);
  }

  toggleHeader(filter, index) {
    filter.isOpen = !filter.isOpen;
    Vue.set(this.filters, index, filter);
  }

  handleClose() {
    this.closed = true;
    enableBodyScroll();
    this.resetFilters();
  }

  handleOpen() {
    this.closed = false;
    const filter = this.$el.querySelector('.category-filter__content');
    disableBodyScroll(filter);
  }

  handleSubmit() {
    this.closed = true;
  }

  mounted() {
    this.selectedFilters = this.filters
      .filter((f) => f.items.length)
      .map(
        (f) => f.items.filter((item) => item.selected).map((item) => ({ ...item, query: f.query })),
      ).flat();
    this.filters.forEach((f) => f.isOpen = true);
    this.$on('input', this.handleSearch.bind(this));
    this.$on('filterChange', debounce(this.filterChange.bind(this), 1000));
    window.addEventListener('resize', () => {
      if (window.innerWidth > 1024) {
        enableBodyScroll();
      }
    });
  }

  handleFilterChange(filterItem: { checked: boolean; item: IFilterItem }) {
    if (filterItem.checked) {
      this.selectedFilters.push(filterItem.item);
    } else {
      const selectedIndex = this.selectedFilters.findIndex((sItem) => sItem.id === filterItem.item.id);
      const fItem: IFilterItem = filterItem.item;
      if (fItem) {
        removeFiltersFromQuery(this.$route, fItem);
        if (selectedIndex !== 1) {
          this.selectedFilters.splice((selectedIndex as number), 1);
        }
      }
    }
    this.$emit('filterChange');
  }

  filterChange() {
    const { form } = this.$refs;
    const formData = new FormData(form as any);
    const filter = {};
    /* eslint-disable-next-line */
    for (const key of formData.keys()) {
      filter[key] = formData.getAll(key);
    }
    this.$emit('change', filter);
  }

  resetFilters() {
    const { form } = this.$refs;
    (form as any).reset();
    this.$emit('change', {});
    this.selectedFilters.forEach((fItem: IFilterItem) => removeFiltersFromQuery(this.$route, fItem));
    this.selectedFilters = [];
  }

  accordionItemClick(item: IFilterItem) {
    this.$emit('categoryChange', item);
  }
}
</script>

<style lang="scss">
  .category-filter {
    .radio {
      display: flex;
      margin-bottom: 20px;

      &:last-child {
        margin-bottom: 20px;
      }
    }
  }
</style>

<style scoped lang="scss">
  .category-filter {

    &__reset {
      @include clearButton;
    }

    &__wrapper {
      border-radius: 8px;
      box-shadow: 0 2px 14px 0 #1e27330c;
      background-color: #ffffff;
    }

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
      overflow: auto;

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
      //overflow: auto;
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
      bottom: 50px;
      right: 20px;
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

    &__section:last-child &__block {
      margin-bottom: 0;
    }

    &__accordion-item {
      @include clearButton();
      cursor: pointer;
      outline: none;
      background: #f9f9f9;
      display: flex;
      width: 100%;
      font-size: 14px;
      color: #222222;
      position: relative;
      border-bottom: 1px solid #ededed;
      align-items: center;
      padding: 15px 5px 16px 40px;
      text-align: left;

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

      &--active {
        cursor: default;
        opacity: 0.7;
      }
    }

    &__submit {
      position: fixed;
      bottom: 20px;
      width: calc(100% - 32px);
      margin: 0 16px;
      font-size: 18px;
      height: 60px;
      border-radius: 8px;

      @include laptop() {
        display: none;
      }
    }

    &__colors {
      padding: 0 20px;

      @include laptop() {
        padding: 0;
      }
    }

    &__top {
      margin-bottom: 10px;
      text-align: right;
      position: absolute;
      top: -35px;
      right: 0;
      display: none;

      @include laptop {
        display: block;
      }
    }

  }
</style>
