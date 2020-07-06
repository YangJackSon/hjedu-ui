
<template>
  <div>
    <el-card class="m-t-10">
      <div>
        <el-steps :active="stepActive" align-center>
          <el-step title="部门" @click.native="handleStep(0)"></el-step>
          <el-step title="专业" @click.native="handleStep(1)"></el-step>
          <el-step title="班级" @click.native="handleStep(2)"></el-step>
          <el-step title="学年学期" @click.native="handleStep(3)"></el-step>
          <el-step title="代码标准" @click.native="handleStep(4)"></el-step>
        </el-steps>
      </div>
    </el-card>
    <div class="m-t-10">
      <dbcenter-dept v-show="stepActive==0"></dbcenter-dept>
      <dbcenter-major v-show="stepActive==1"></dbcenter-major>
      <dbcenter-class v-show="stepActive==2"></dbcenter-class>
      <dbcenter-term v-show="stepActive==3"></dbcenter-term>
      <dbcenter-code v-show="stepActive==4"></dbcenter-code>
    </div>
    <dbcenter-dict :isShowDialog="false"></dbcenter-dict>
  </div>
</template>
<script>
import myHeader from "@/components/my-header";
import dbcenterDept from "./dbcenter_dept";
import dbcenterMajor from "./dbcenter_major";
import dbcenterClass from "./dbcenter_class";
import dbcenterTerm from "./dbcenter_term";
import dbcenterCode from "./dbcenter_code";
import dbcenterDict from "./dbcenter_dict";

export default {
  computed: {},
  components: {
    myHeader,
    dbcenterDept,
    dbcenterMajor,
    dbcenterClass,
    dbcenterTerm,
    dbcenterCode,
    dbcenterDict
  },
  data() {
    return {
      menuData: [
        { label: "统一权限", pathName: "baseAuth" },
        { label: "数据中心", pathName: "baseDbcenter" },
        { label: "全局设置", pathName: "baseGlobal" }
      ],
      stepActive: 0
    };
  },
  methods: {
    handleStep(step) {
      this.stepActive = step;
    }
  }
};
</script>

<style  scoped>
.app-container >>> .el-header {
  padding: 0 2vw;
  background: #fff;
}

.app-container >>> .el-main {
  padding: 20px 2vw;
}
.app-container >>> .el-step {
  cursor: pointer;
}

.app-container >>> .el-step__head.is-finish {
  color: #9e9e9e;
  border-color: #9e9e9e;
}
.app-container >>> .is-process .el-step__icon {
  background: var(--theme-color);
}

.app-container >>> .el-step__head.is-process {
  color: white;
  border-color: var(--theme-color);
}

.app-container >>> .el-step__title.is-process,
.app-container >>> .el-step__title.is-wait,
.app-container >>> .el-step__title.is-finish {
  color: #6a6a6a;
}

.app-container >>> .app-container .el-step__description.is-process,
.app-container >>> .el-step__description.is-finish {
  color: #c1c1c1;
}
</style>
