<template>
  <el-container class="app-container">
    <el-header>
      <myHeader :menuData="menuData"></myHeader>
    </el-header>
    <el-main>
      <router-view></router-view>
    </el-main>
  </el-container>
</template>
<script>
import myHeader from "@/components/my-header";
export default {
  computed: {},
  components: {
    myHeader,
  },
  data() {
    return {
      menuData: [
        { label: "入职与教师管理", pathName: "register" },
        { label: "教师发展档案", pathName: "archive" }
      ],
      stepActive: 0
    };
  },
  methods: {
    
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
