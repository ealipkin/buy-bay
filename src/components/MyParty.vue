<template lang="pug">
  span(v-if="status === ORDER_STATUSES.SUCCESS").my-party
    img(v-for="user in users" :src="user.avatar").my-party__img
    span участников: {{users.length}} из {{maxUsers}}

  span(v-else).my-party.my-party--not
    img(src="@/assets/icons/my-group-failed.svg").my-party__img
    span Группа не сформирована
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { ORDER_STATUSES } from '@/utils/models';

@Component
export default class MyParty extends Vue {
  @Prop() public users!: object[];

  @Prop() public status!: string;

  @Prop() public maxUsers!: number;

  ORDER_STATUSES = ORDER_STATUSES;
}
</script>

<style lang="scss">
  .my-party {
    font-size: 12px;
    color: $grey-2;
    display: flex;

    &--not {
      color: $red-1;
      font-weight: bold;
    }

    &__img {
      width: 18px;
      height: auto;
      border-radius: 50%;
      border: 1px solid #fff;
      margin-right: -9px;
      position: relative;
      z-index: 2;

      &:nth-of-type(2) {
        z-index: 1;
      }

      &:last-of-type {
        margin-right: 8px;
        z-index: 0;
      }
    }
  }
</style>
