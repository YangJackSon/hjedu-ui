<template>
  <div class="my-menu-div" :class="{'menu-text-c':step==1}">
    <el-menu default-active="0" text-color="#333" active-text-color="#fff">
      <div v-for="(item,index) in data" :key="index">
        <el-menu-item :index="index.toString()" v-if="!item.chirden" @click="select(item,1)">
          <i class="el-icon-s-home" v-show="item.isAll"></i>
          <span>{{item.label}}200</span>
        </el-menu-item>
        <el-submenu
          :index="index.toString()"
          v-if="item.chirden&&step==2"
          @click.native.prevent="select(item,1)"
        >
          <template slot="title">
            <span>{{item.label}}32</span>
          </template>
          <el-menu-item
            :index="index+'-'+subIndex"
            v-for="(subItem,subIndex) in item.chirden"
            @click.native.stop="select(item,subItem,2)"
            :key="subIndex"
          >{{subItem.label}}43</el-menu-item>
        </el-submenu>
      </div>
    </el-menu>
  </div>
</template>
<script>
export default {
  props: {
    data: {
      type: Array,
      default: []
    },
    step: {
      type: Number,
      default: 2
    }
  },
  data() {
    return {};
  },
  methods: {
    select(item, subItem, type) {
      // type=1一级菜单，type=2二级菜单
      this.$emit("getSelect", type, [item,subItem]);
    }
  }
};
</script>
<style scoped>
.my-menu-div >>> .el-menu-item.is-active {
  background: var(--theme-color);
}
.my-menu-div >>> .el-menu {
  border-right: none;
}
.my-menu-div >>> .el-submenu__title,
.my-menu-div >>> .el-menu-item {
  border-bottom: 1px solid #e1e1e1;
}
.my-menu-div >>> .el-menu-item,
.my-menu-div >>> .el-submenu__title {
  height: 50px;
  line-height: 50px;
}
.menu-text-c >>> .el-menu-item,
.menu-text-c >>> .el-submenu__title {
  text-align: center;
}
</style>