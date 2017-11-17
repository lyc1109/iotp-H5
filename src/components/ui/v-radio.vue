<style scoped lang="scss" type="text/scss">
  @import "~variables";
</style>

<template>
  <div class="div">
    <mt-radio :options="options" :title="title" :align="align" :value="value" v-model="inputVal" @change="radioChange(inputVal)"></mt-radio>
  </div>
</template>

<script>
  export default {
    name: 'v-radio',
    props: {
      // 单选框title
      title: String,
      // 单选框对齐方式
      align: String,
      // 单选框绑定值
      value: String,
      // 单选项数据数组
      options: Array
    },
    data () {
        return {
          radioVal: ''
        }
    },
    computed: {
      inputVal: {
        get(){
          if(this.radioVal === ''){
            return this.options[0].value
          }else{
            return this.radioVal
          }
        },
        set(val){
          this.radioVal = val
        }
      }
    },
    methods: {
      radioChange(val){
        this.$emit('radio',val)
      }
    }
  }
</script>
