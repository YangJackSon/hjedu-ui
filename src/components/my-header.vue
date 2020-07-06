
<template>
  <div class="between-center hgt_100" style="min-width:960px;">
    <div class="flex_mid">
      <img src="../assets/slice/logo.jpg" width="26" />
      <p class="m-l-15 color-5DD6C9 font18">应用支撑平台</p>
    </div>
    <div class="flex_mid font16 color-333 flex_1 m-l-20 hgt_100">
      <router-link
        :to="{name: item.pathName}"
        tag="div"
        v-for="(item,index) in menuData"
        class="relative m_both20 cursor hgt_100 l-h-60"
        :key="index"
      >{{item.label}}</router-link>
    </div>

    <div class="flex_mid hgt_100 m-r-20">
      <img src="../assets/slice/bell.jpg" width="16" class="m_both20" />
      <!--<img src="../assets/slice/board.jpg" width="16" class="m_both20" />-->
      <img src="../assets/slice/kz.jpg" width="14" class="m_both20" />
      <el-dropdown trigger="click" class="m_both20">
        <span class="el-dropdown-link">
          慧教
          <i class="el-icon-caret-bottom el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item class="clearfix">个人中心</el-dropdown-item>
          <el-dropdown-item class="clearfix">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    menuData: {
      type: Array
    }
  },
  computed: {},
  methods: {}
};
</script>

<style  scoped>
.router-link-active::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background: var(--theme-color);
}
</style>
