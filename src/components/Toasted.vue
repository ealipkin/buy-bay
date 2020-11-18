<template lang="pug">
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { successIcon } from '@/utils/svgIcons';

@Component({
  components: {
  },
})
export default class Toasted extends Vue {
  showSuccess() {
    this.$toasted.show('Ваши данные сохранены', {
      position: 'top-center',
      duration: 1500,
      className: ['my-toasted', 'my-toasted--success'],
      fitToScreen: true,
      fullWidth: true,
      iconPack: 'callback',
      icon: (el) => {
        el.innerHTML = successIcon;
        return el;
      },
    });
  }
}
</script>

<style lang="scss">
.my-toasted {
  font-size: 16px !important;
  font-weight: 600 !important;
  text-align: center !important;
  justify-content: center !important;
  border-radius: 2px !important;

  * {
    margin-right: 20px;
  }

  &--success {
    background-color: $green-1 !important;
    color: #fff !important;
  }
}
</style>
