<!--


-->


<template>
  <div >
      <el-tree :data="data" ref="radio" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
  </div>
</template>

<script>
export default {
  props: {
    list: Array,

  },
  data() {
    return {
      data: [{
        name: '成都天宇职业技术学院',
        children: [{
          name: '校长办公室',
          children: [{
            name: '秘书处'
          },{
            name: '行政处'
          }]
        },
          {
            name: '教务处',
            children: [{
              name: '秘书处'
            },{
              name: '行政处'
            }]
          },
          {
            name: '信息中心',
            children: [{
              name: '秘书处'
            },{
              name: '行政处'
            }]
          },
          {
            name: '财务处',
            children: [{
              name: '秘书处'
            },{
              name: '行政处'
            }]
          },
          {
            name: '后勤服务中心',
            children: [{
              name: '秘书处'
            },{
              name: '行政处'
            }]
          }]
      }],
      defaultProps: {
        children: 'children',
        name: 'name'
      }
    }
  },
  methods:{
    handleNodeClick(data,e) {
      if(e.parent.data.name === undefined){
        this.$message({
          message: '请选择部门',
          type: 'warning'
        });
      }else{
        this.$emit('getDepartment',data)
      }
    }
  }
}
</script>

<style scoped>

</style>
