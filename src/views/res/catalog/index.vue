<template>
  <div>
    <el-card class="m-t-10">
      <div>
        <el-steps :active="stepActive" align-center>
          <el-step title="库目录" @click.native="handleStep(0)" description="支持按人培方案、专业、素材等目录存储"></el-step>
          <el-step
            title="课程与资源类型"
            @click.native="handleStep(1)"
            description="支持专业课、公共课按教案、课件等类型管理资源"
          ></el-step>
          <el-step title="审核与管理权限" @click.native="handleStep(2)" description="选择参与资源建设与管理、审核的人员"></el-step>
        </el-steps>
      </div>
    </el-card>
    <div class="m-t-10">
      <catalog-directory v-show="stepActive==0"></catalog-directory>
      <catalog-course v-show="stepActive==1"></catalog-course>
      <catalog-auth v-show="stepActive==2"></catalog-auth>
    </div>
  </div>
</template>

<script>
import catalogDirectory from "./catalog_directory";
import catalogCourse from "./catalog_course";
import catalogAuth from "./catalog_auth";
export default {
  components: {
    catalogDirectory,
    catalogCourse,
    catalogAuth
  },
  computed: {},

  data() {
    return {
      // 当前激活的步骤index
      stepActive: 0
    };
  },
  methods: {
    // 改变模块
    handleStep(step) {
      this.stepActive = step;
    }
  },
  mounted() {
    if (this.$route.query.index) {
      this.stepActive = parseInt(this.$route.query.index);
    }
  }
};
</script>

<style scoped>
</style>
