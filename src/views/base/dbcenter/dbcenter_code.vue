<template>
  <div class="font14 color-333">
    <div class="flex_stretch bg-fff">
      <div class="depart-mune">
        <el-menu
          default-active="0"
          class="el-menu-vertical-demo"
          text-color="#333"
          active-text-color="#fff"
        >
          <div v-for="(item,index) in leftMune" :key="index">
            <el-menu-item :index="index.toString()" v-if="!item.chirden">{{item.label}}</el-menu-item>
            <el-submenu :index="index.toString()" v-if="item.chirden">
              <template slot="title">{{item.label}}</template>
              <el-menu-item
                :index="index+'-'+subIndex"
                v-for="(subItem,subIndex) in item.chirden"
                :key="subIndex"
              >{{subItem.label}}</el-menu-item>
            </el-submenu>
          </div>
        </el-menu>
      </div>
      <div class="flex_1 m-b-30 m-r-30">
        <p class="m-t-20 color-666">代码类型：资源类型（教学资源库）XXBZ_05</p>
        <p class="m-t-10 color-666">状态标示：允许启用、停用、增加、修改</p>
        <p class="m-t-10 color-666">标准说明：教学资源管理类业务数据字典</p>
        <el-table :data="tableData" border style="width: 100%" class="m-t-30">
          <el-table-column prop="date" label="代码名称" width="180"></el-table-column>
          <el-table-column prop="name" label="代码值" width="180"></el-table-column>
          <el-table-column prop="address" label="说明"></el-table-column>
          <el-table-column prop="address" label="父级"></el-table-column>
          <el-table-column prop="address" label="状态"></el-table-column>
          <el-table-column prop="address" label="操作">
            <template slot-scope="scope">
              <el-button size="mini" type="success">启用</el-button>
              <el-button size="mini" type="danger">停用</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CodeStandard",
  data() {
    return {
      // 菜单数据
      leftMune: [
        { label: "软件技术" },
        { label: "信息技术" },
        {
          label: "园林园艺",
          chirden: [
            {
              label: "园林园艺1"
            },
            {
              label: "园林园艺1"
            }
          ]
        }
      ],

      tableData: [
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-08",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-06",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-07",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        }
      ]
    };
  },
  methods: {}
};
</script>

<style scoped>
.card-tag {
  padding: 2px 10px;
  border: 1px solid rgba(93, 214, 201, 1);
  border-radius: 3px;
  color: var(--theme-color);
}
.card-tag1 {
  padding: 2px 10px;
  border: 1px solid rgba(225, 225, 225, 1);
  border-radius: 3px;
}
.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}
.card-info {
  height: 200px;
}

.depart-mune {
  margin-right: 20px;
  background: #ffffff;
  width: 18vw;
  border: 1px solid #e1e1e1;
  min-width: 200px;
}
.depart-mune >>> .el-menu-item.is-active {
  background: var(--theme-color);
}
.depart-mune >>> .el-menu {
  border-right: none;
}
.depart-mune >>> .el-submenu__title,
.depart-mune >>> .el-menu-item {
  border-bottom: 1px solid #e1e1e1;
}
.changInputWidth {
  width: 100%;
}
</style>
