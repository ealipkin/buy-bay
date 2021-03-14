<template lang="pug">
  modal(name="group-modal" @closed="closeModal" :adaptive="true" :classes="'login-modal'" width="90%" :minWidth="290" :maxWidth="700" height="auto")
    .modal.group-info-modal
      button(type="button" @click="closeModal").modal__close.close
      .modal__content.group-info-modal__content
        GroupInfo(v-if="orderData" :orderData="orderData.orderInfo" :group="orderData.group").group-info--hide-leave.group-detail__info.group-detail__item

</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { OrderData } from '@/models/order';
import GroupInfo from '@/components/GroupInfo.vue';

@Component({
  components: { GroupInfo },
})
export default class GroupInfoModal extends Vue {
  @Prop() public orderData!: OrderData;

  openModal() {
    this.$modal.show('group-modal');
    // document.body.classList.add('_hidden');
  }

  closeModal() {
    this.$modal.hide('group-modal');
    document.body.classList.remove('_hidden');
  }
}
</script>

<style scoped lang="scss">
  .group-info-modal {
  }

  .group-info {
    padding: 0;
  }
</style>
