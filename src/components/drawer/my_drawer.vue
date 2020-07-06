
<template>
  <div class="my-drawer">
    <el-drawer
      :title="title"
      :visible.sync="visible"
      :direction="direction"
      destroyOnClose
      :modal="false"
      :show-close="false"
      @closeDrawer="closeDialog"
      :wrapperClosable="false"
      :size="size"
    >
      <div class="drawer-body">
        <div class="flex_1">
          <div class="is-scroll-right drawer-content">
            <slot>body</slot>
          </div>
        </div>
        <slot name="footer"></slot>
      </div>
    </el-drawer>
  </div>
</template>

<script>
export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    size: {
      type: String,
      default: ""
    },
    direction: {
      type: String,
      default: ""
    },
    title: {
      type: String,
      default: ""
    }
  },
  data() {
    return {};
  },
  methods: {
    closeDialog() {
      console.log('44')
      this.$emit("close");
    }
  },
  watch: {}
};
</script>

<style scoped>
.my-drawer >>> .el-drawer__header {
  align-items: center;
  display: flex;
  margin-bottom: 0px;
  padding: 15px 15px 15px 20px;
  background: var(--theme-color);
  color: #ffffff;
  outline: none;
}
.my-drawer >>> .el-drawer__header > :first-child,
.my-drawer >>> .el-drawer__close-btn {
  outline: none;
  appearance: none;
  -webkit-appearance: none;
  border: 0;
}
.my-drawer >>> .el-drawer__body {
  width: 100%;
  overflow-y: hidden;
}
.drawer-body {
  height: 100%;
  width: 100%;
  display: flex !important;
  display: -webkit-box !important;
  display: -webkit-flex !important;
  flex-direction: column;
  -webkit-flex-direction: column;
  overflow-y: hidden;
}
.flex_1 {
  flex: 1;
  -webkit-flex: 1;
  display: block;
  min-width: 0;
  overflow: hidden;
  height: 100%;
  width: 100%;
}
.drawer-content {
  overflow-y: scroll;
  height: 100%;
}

.is-scroll-right::-webkit-scrollbar,
.is-scroll-left::-webkit-scrollbar,
.el-scrollbar::-webkit-scrollbar {
  width: 4px;
  height: 8px !important;
}
/*滚动条的背景区域的内阴影*/
.el-scrollbar::-webkit-scrollbar-track {
  box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.3) inset;
  /*滚动条的背景区域的圆角*/
  border-radius: 10px;
  /*滚动条的背景颜色*/
  background-color: #ddd;
}
/*滑块 滚动条的内阴影*/
.is-scroll-right::-webkit-scrollbar-thumb,
.is-scroll-left::-webkit-scrollbar-thumb,
.el-scrollbar::-webkit-scrollbar-thumb {
  box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.3) inset;
  background-color: var(--theme-color);
  border-radius: 4px;
}
::-webkit-scrollbar:horizontal {
  width: 0;
  height: 10px !important;
}
::-webkit-scrollbar-track:horizontal {
  background-color: #fff;
}
</style>
<style>
.drawer-footer {
  width: 100%;
  padding: 25px 0px;
}
</style>
