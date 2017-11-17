<style scoped lang="scss" type="text/scss">
  @import "~variables";

  .v-cell {
    padding: rem(16px) 0;
    @include border(bottom);

    .cell-icon {
      max-width: rem(50px);
    }

    .cell-title{
      font-size: $font-size;
      color: $font-primary;
    }

    .cell-value {
      max-width: 75%;
      text-align: right;
      @extend %text-wrapper;
      color: $font-title;
    }

    .flex-right{
      color: $font-lighter;
      padding-left: rem(5px);

      i{
        font-size: $font-size-l;
      }
    }
  }
</style>

<template>
<div class="v-cell">
  <div class="flex">
    <div class="flex-item">
      <div class="flex">
        <div class="cell-icon">
          <slot name="icon"></slot>
        </div>
        <div class="flex-item">
          <slot name="title"><span class="cell-title">{{ title }}</span></slot>
        </div>
      </div>
    </div>

    <div class="cell-value">
      <slot>{{ value }}</slot>
    </div>

    <div class="flex-right" v-show="isLink"> <i class="fa fa-angle-right"></i> </div>
  </div>
</div>
</template>

<script>
    export default{
      name: "v-cell",
      props: ["title", "value", "isLink"]
    }
</script>
