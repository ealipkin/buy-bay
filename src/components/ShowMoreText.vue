<template lang="pug">
  div( v-bind:style="additionalContainerCss").show-more
    div(ref="detail" v-bind:class="{'show-more__default': !expanded, 'show-more__expanded': expanded}" v-bind:style="`--lines: ${lines}`")
      div(v-bind:style="additionalCss" v-html="text")
    button(type="button" v-if="hasMore && triggerShowMore" :style="additionalAnchorCss" @click="onClick").show-more__anchor.button.button--disabled {{ moreText }}
    button(v-if="hasMore && expanded" :style="additionalAnchorCss" @click="onClick").show-more__anchor.button.button--disabled {{ lessText }}
</template>

<script>

export default {
  name: 'ShowMoreText',
  props: {
    lines: {
      type: Number,
      default: 3,
    },
    text: {
      type: String,
      default: '',
    },
    additionalContainerCss: {
      type: String,
      default: '',
    },
    additionalContentCss: {
      type: String,
      default: '',
    },
    additionalContentExpandedCss: {
      type: String,
      default: '',
    },
    hasMore: {
      type: Boolean,
      default: true,
    },
    moreText: {
      type: String,
      default: 'Show more',
    },
    lessText: {
      type: String,
      default: 'Show less',
    },
    additionalAnchorCss: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      expanded: false,
      triggerShowMore: false,
    };
  },
  computed: {
    additionalCss: function () {
      if (this.expanded) {
        return this.additionalContentCss;
      } else {
        return this.additionalContentExpandedCss;
      }
    }
  },
  mounted() {
    this.$nextTick(function () {
      this.determineShowMore();
    });
  },
  updated() {
    this.$nextTick(function () {
      this.determineShowMore();
    });
  },
  methods: {
    onClick() {
      this.expanded = !this.expanded;
      this.$emit('click', this.expanded);
    },
    determineShowMore() {
      this.triggerShowMore = this.$refs.detail &&
        this.$refs.detail.offsetHeight < this.$refs.detail.scrollHeight;
    },
  },
};
</script>
<style lang="scss">
  .show-more {
    &__default {
      --lines: 3;
      white-space: pre-line;
      display: -webkit-box;
      max-width: 100%;
      -webkit-line-clamp: var(--lines);
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    &__expanded {
      display: block;
      display: -webkit-box;
      white-space: pre-line;
    }

    &__anchor {
      margin-top: 14px;
    }
  }
</style>
