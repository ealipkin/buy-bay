<template lang="pug">
  .avatar-edit
    .avatar-edit__container
      img(v-if="!selectedImage" src="@/assets/empty-avatar.jpg").avatar-edit__empty-image
      img(v-else :src="selectedImage").avatar-edit__selected-image
    label.avatar-edit__edit-button
      include ../assets/icons/edit.svg
      ImageUploader(:preview="true" :className="['visually-hidden', { 'fileinput--loaded': selectedImage }]" capture="environment" :debug="1" doNotResize="gif" :autoRotate="true" outputFormat="verbose" @input="setImage")
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

import ImageUploader from 'vue-image-upload-resize';

@Component({ components: { ImageUploader } })
export default class Main extends Vue {
  @Prop() public selectedImage!: string | null;

  setImage(output) {
    this.selectedImage = output.dataUrl;
    console.log(output);
    console.log('setImage');
  }
}
</script>

<style lang="scss">
  .avatar-edit {
    .img-preview {
      display: none;
    }
  }
</style>
<style scoped lang="scss">
  .avatar-edit {
    margin: 0 auto;
    position: relative;
    width: 120px;

    &__edit-button {
      position: absolute;
      right: 0;
      bottom: 0;

      svg {
        display: block;
      }
    }

    &__container {
      position: relative;
      width: 120px;
      height: 120px;
      overflow: hidden;
      border-radius: 50%;
    }

    &__empty-image {
      max-width: 100%;
    }

    &__selected-image {
      position: absolute;
      height: 100%;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    }

  }
</style>
