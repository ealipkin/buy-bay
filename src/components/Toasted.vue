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
  showSuccess(message) {
    this.$toasted.show(message, {
      position: 'top-center',
      duration: 1500,
      className: ['bb-toasted', 'bb-toasted--success'],
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
.bb-toasted {
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
