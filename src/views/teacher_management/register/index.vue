<template>
    <div>
    <my-tabs :activeTabIndex="0" :data="tabsData" @changeTab="activeChange"></my-tabs>
    <div class="border-eee bg-fff p-t-20">
      <all-teacher v-show="activeTab==0"></all-teacher>
    </div>
  </div>
</template>
<script>
import allTeacher from "./allTeacher";
// import register from "./register/index";
export default {
  computed: {},
  components: {
    allTeacher
  },
  data() {
    return {
      activeTab: 0,
      tabsData:[
        {
          label:'全部教师管理'
        },
        {
          label:'教师入职管理'
        },
      ]
    };
  },
  methods: {
    activeChange(e) {
      this.activeTab = e;
    }
  },
  mounted(){
  
  }
};
</script>

<style scoped>
    .isactive{
        border-bottom: 2px solid var(--theme-color);
    }
    .choice{
        margin: 0 40px;
    }
    .isactive{
        border-bottom: 2px solid var(--theme-color);
    }
    .choice{
        margin: 0 40px;
    }
/*.app-container >>> .el-header {*/
  /*padding: 0 2vw;*/
  /*background: #fff;*/
/*}*/

/*.app-container >>> .el-main {*/
  /*padding: 20px 2vw;*/
/*}*/
/*.app-container >>> .el-step {*/
  /*cursor: pointer;*/
/*}*/

/*.app-container >>> .el-step__head.is-finish {*/
  /*color: #9e9e9e;*/
  /*border-color: #9e9e9e;*/
/*}*/
/*.app-container >>> .is-process .el-step__icon {*/
  /*background: var(--theme-color);*/
/*}*/

/*.app-container >>> .el-step__head.is-process {*/
  /*color: white;*/
  /*border-color: var(--theme-color);*/
/*}*/

/*.app-container >>> .el-step__title.is-process,*/
/*.app-container >>> .el-step__title.is-wait,*/
/*.app-container >>> .el-step__title.is-finish {*/
  /*color: #6a6a6a;*/
/*}*/

/*.app-container >>> .app-container .el-step__description.is-process,*/
/*.app-container >>> .el-step__description.is-finish {*/
  /*color: #c1c1c1;*/
/*}*/
.isactive {
  border-bottom: 2px solid var(--theme-color);
}
.choice {
  margin: 0 40px;
}
</style>
