<template lang="pug">
  ul.users-list
    li(v-for="user in users").users-list__item
      img(:src="user.avatar").users-list__img
      span.users-list__name {{user.name}}

</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class UsersList extends Vue {
  @Prop() public users!: object[];
}
</script>

<style scoped lang="scss">
  .users-list {
    @include clearList();
    display: flex;
    flex-wrap: wrap;
    justify-content: center;

    &__item {
      margin-right: 15px;

      @include tablet() {
        margin-right: 24px;
      }

      &:last-child {
        margin-right: 0;
      }

    }

    &__img {
      width: 60px;
      border-radius: 50%;
      display: block;
      margin-bottom: 10px;

      @include tablet() {
        width: 70px;
        margin-bottom: 8px;
      }
    }

    &__name {
      font-size: 12px;
      color: $black-1;
      text-align: center;
      width: 100%;
      display: block;

      @include tablet() {
        font-size: 14px;
      }
    }
  }
</style>
