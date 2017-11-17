<style lang="scss" scoped type="text/scss">
  @import "~variables";

  .btn {
    margin-right: 5px;
    margin-bottom: 5px;
  }
</style>

<template>
  <div>
    <div class="padding align-center">
      <h2>选择器</h2>
    </div>

    <div class="cell-group">
      <mt-cell class="cell-item" title="头像">
        <img src="/static/images/avatar.png" width="64" class="img-circle"/>
      </mt-cell>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'ui-selector',
    data: function () {
      return {
        checklistVal: [],
        checklistOpts: [
          {
            label: '被禁用',
            value: '值F',
            disabled: true
          },
          {
            label: '选中禁用',
            value: '选中禁用的值',
            disabled: true
          },
          {
            label: '选项A',
            value: '值A'
          },
          {
            label: '选项B',
            value: '值B'
          }
        ],

        radiolistVal: "",
        radiolistOpts: [
          {
            label: '被禁用',
            value: '值F',
            disabled: true
          },
          {
            label: '选项A',
            value: '值A'
          },
          {
            label: '选项B',
            value: '值B'
          }
        ]
      }
    }
  }
</script>
