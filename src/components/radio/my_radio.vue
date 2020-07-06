<!--
必要参数 list  radioChange
list: 包含value和code的数组，value为显示名称，code为传出id
radioChange：父组件接收的选中code的函数

-->


<template>
  <div class="list flex_mid flex_wrap">
    <div class="one " v-for="(item, index) of list" >
        <el-button :class="isactive === index ? 'maryActive' : ''" @click="maryClick(item,index)">{{item.name}}</el-button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    list: Array,
  },
  data() {
    return {
      isactive:0
    }
  },
  methods:{
    maryClick(item,index){
      this.isactive = index;
      this.$emit('radioChange', item)
    }
  }
}
</script>

<style scoped>
    .list{
        display: flex;
    }
    .one{
        margin-right: 10px;
        margin: 10px 10px 0px 0px;
    }
    .maryActive{
        color: #5DD6C9;
        border-color: #cef3ef;
        background-color: #effbfa;
    }
</style>
