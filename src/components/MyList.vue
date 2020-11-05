<template lang="pug">
  ul.my-list
    li(v-for="order in myOrders").my-list__item
      img(:src="order.image").my-list__img
      span.my-list__content
        h3.my-list__title {{order.title}}
        MyParty(:users="order.users" :status="order.status" :maxUsers="order.maxUsers").my-list__party

        MyItemTimer(:time="order.time")
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import MyItemTimer from '@/components/MyItemTimer.vue';
import MyParty from '@/components/MyParty.vue';

@Component({
  components: {
    MyItemTimer,
    MyParty,
  },
})
export default class MyList extends Vue {
  @Prop() public myOrders!: object[];
}
</script>

<style lang="scss">
  .my-list {
    @include clearList();
    padding-bottom: 92px;

    &__item {
      display: flex;
      align-items: flex-start;
      padding-bottom: 28px;
      border-bottom: 1px solid $grey-4;
      margin-bottom: 20px;

      &:last-child {
        margin-bottom: 0;
        padding-bottom: 0;
        border-bottom: 0;
      }
    }

    &__img {
      margin-right: 16px;
      width: 90px;
      height: auto;
    }

    &__content {
      padding-right: 28px;
    }

    &__title {
      font-size: 14px;
      color: $black-1;
      margin: 0;
      margin-bottom: 7px;
      font-weight: 600;
    }

    &__party {
      margin-bottom: 13px;
    }
  }
</style>
