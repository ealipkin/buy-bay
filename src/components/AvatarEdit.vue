<template lang="pug">
  .avatar-edit
    .avatar-edit__container
      img(v-if="visibleImage" :src="visibleImage").avatar-edit__selected-image
      img(v-else src="@/assets/empty-avatar.jpg").avatar-edit__empty-image
    label.avatar-edit__edit-button
      include ../assets/icons/edit.svg
      ImageUploader(:preview="true" :className="['visually-hidden', { 'fileinput--loaded': selectedImage }]" :debug="1" doNotResize="gif" :autoRotate="false" outputFormat="file" @input="setImage")
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

import ImageUploader from 'vue-image-upload-resize';

@Component({ components: { ImageUploader } })
export default class Main extends Vue {
  @Prop() public selectedImage!: string | null;

  uploadedImage: string | ArrayBuffer | null = null;

  get visibleImage() {
    return this.uploadedImage;
  }

  setImage(file: File) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.uploadedImage = reader.result;
    };
    this.$emit('input', file);
  }

  mounted() {
    if (this.selectedImage) {
      this.uploadedImage = this.selectedImage;
    }
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
      cursor: pointer;

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
