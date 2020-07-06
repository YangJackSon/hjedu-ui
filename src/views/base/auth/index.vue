<template>
  <div>
    <el-card class="m-t-10">
      <div>
        <el-steps :active="stepActive" align-center>
          <el-step title="角色授权" @click.native="handleStep(0)" description="增减角色、授予角色菜单权限"></el-step>
          <el-step title="用户管理" @click.native="handleStep(1)" description="授予用户角色、重置密码"></el-step>
        </el-steps>
      </div>
    </el-card>
    <div class="m-t-10">
      <auth-role v-show="stepActive==0"></auth-role>
      <auth-account-r-role v-show="stepActive==1"></auth-account-r-role>
    </div>
  </div>
</template>
<script>
import myHeader from "@/components/my-header";
import authRole from "./auth_role";
import authAccountRRole from "./auth_account_r_role";

export default {
  computed: {},
  components: {
    myHeader,
    authRole,
    authAccountRRole
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
