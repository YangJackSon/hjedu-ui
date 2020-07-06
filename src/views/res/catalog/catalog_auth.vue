<template>
  <div class="font14 color-333">
    <div class="flex_stretch bg-fff" style="box-shadow:0px 3px 40px 0px rgba(130,168,168,0.27);">
      <div class="left-mune">
        <el-menu
          default-active="2"
          class="el-menu-vertical-demo"
          text-color="#333"
          active-text-color="#fff"
        >
          <el-menu-item :index="index.toString()" v-for="(item,index) in leftMenu" :key="index">
            <span :class="{'font-w6':index==0}">{{item.label}}</span>
            <span class="m-r-10" :class="{'font-w6':index==0}">({{item.num}}门)</span>
          </el-menu-item>
        </el-menu>
      </div>
      <div class="flex_1 m-b-30 m-r-30 course-table">
        <div class="m-t-20">
          <el-button size="small" type="primary" @click="openAuthDialogBatch(2)">批量设置管理人</el-button>
          <el-button size="small" type="primary" @click="openAuthDialogBatch(1)">批量设置审核人</el-button>
        </div>
        <el-table
          :data="tableData"
          style="width: 100%"
          class="m-t-10"
          border
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column prop="name" label="课程名称" width="180"></el-table-column>
          <el-table-column prop="fzr" label="负责人" width="150">
            <template slot-scope="scope">
              <el-tag class="m-t-5 m-l-5">{{scope.row.fzr}}</el-tag>
              <el-button icon="el-icon-edit" size="small" type="primary" style="margin-left:5px"></el-button>
            </template>
          </el-table-column>
          <el-table-column prop="glr" label="管理人" width="300">
            <template slot-scope="scope">
              <el-tag
                v-for="(item,index) in scope.row.glr"
                :key="index"
                class="m-t-5 m-l-5"
              >{{item.name}}</el-tag>
              <el-button
                icon="el-icon-edit"
                size="small"
                @click="openAuthDialog(scope.$index,scope.row,2)"
                type="primary"
                style="margin-left:5px"
              ></el-button>
            </template>
          </el-table-column>
          <el-table-column prop="shr" label="审核人" width="300">
            <template slot-scope="scope">
              <el-tag
                v-for="(item,index) in scope.row.shr"
                :key="index"
                class="m-t-5 m-l-5"
              >{{item.name}}</el-tag>
              <el-button
                icon="el-icon-edit"
                size="small"
                @click="openAuthDialog(scope.$index,scope.row,1)"
                type="primary"
                style="margin-left:5px"
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <!-- 课程信息 -->
    <my-drawer :visible="editdialog" size="400px" title="审核与管理权限" direction="rtl">
      <div class="column_center wid_100">
        <el-radio-group v-model="isSetAuth" size="medium" class="m-t-30" @change="changeSetAuth">
          <el-radio-button :label="false">{{setAuthType==1?'不审核':"不限管理"}}</el-radio-button>
          <el-radio-button :label="true">{{setAuthType==1?'选择审核人':"选择管理人"}}</el-radio-button>
        </el-radio-group>
        <div class="m-t-20 wid_100">
          <dept-tree
            ref="refDeptTree"
            :treeData="staffTrees"
            :treesProps="staffTreesProps"
            @getCheckData="getCheckTreeData"
          ></dept-tree>
        </div>
      </div>
      <div slot="footer" class="column_center drawer-footer">
        <div class="flex_mid">
          <el-button type="info" size="small" @click="editdialog=false">取 消</el-button>
          <el-button type="primary" size="small" @click="saveData" style="margin-left:30px;">保 存</el-button>
        </div>
      </div>
    </my-drawer>
  </div>
</template>
<script>
export default {
  computed: {},

  data() {
    return {
      // 左侧菜单数据-（实际用于右侧的数据分类）
      leftMenu: [
        { label: "全部", num: 20 },
        { label: "计算机专业", num: 2 },
        { label: "公共课", num: 5 },
        { label: "园林园艺", num: 5 }
      ],
      // table数据
      tableData: [
        {
          id: 1,
          name: "图形图像处理",
          crateperson: "baiyi",
          fzr: "baiyi",
          fzrId: 1,
          glr: [
            {
              id: 7,
              name: "玉书"
            },
            {
              id: 8,
              name: "东方"
            }
          ],
          shr: [
            {
              id: 9,
              name: "小婉"
            },
            {
              id: 10,
              name: "小王"
            }
          ]
        },
        {
          id: 2,
          name: "图形图像处理",
          crateperson: "baiyi",
          fzr: "baiyi",
          fzrId: 1,
          glr: [
            {
              id: 9,
              name: "小婉"
            },
            {
              id: 10,
              name: "小王"
            }
          ],
          shr: [
            {
              id: 7,
              name: "玉书"
            },
            {
              id: 8,
              name: "东方"
            }
          ]
        },
        {
          id: 3,
          name: "图形图像处理",
          crateperson: "baiyi",
          fzr: "baiyi",
          fzrId: 1,
          glr: [
            {
              id: 9,
              name: "小婉"
            },
            {
              id: 10,
              name: "小王"
            }
          ],
          shr: [
            {
              id: 7,
              name: "玉书"
            },
            {
              id: 8,
              name: "东方"
            }
          ]
        }
      ],
      // 显示编辑弹框
      editdialog: false,
      // 存放表单数据
      formObj: {},
      // 当前编辑数据的索引
      currentEditIndex: 0,
      // 员工tree
      staffTrees: [
        {
          id: 12,
          name: "全部",
          children: [
            {
              id: 1,
              name: "开发部",
              children: [
                {
                  id: 4,
                  name: "语文老师",
                  children: [
                    {
                      id: 9,
                      name: "小婉"
                    },
                    {
                      id: 10,
                      name: "小王"
                    }
                  ]
                },
                {
                  id: 11,
                  name: "小李子"
                }
              ]
            },
            {
              id: 2,
              name: "数学老师",
              children: [
                {
                  id: 5,
                  name: "小杜"
                },
                {
                  id: 6,
                  name: "大白"
                }
              ]
            },
            {
              id: 3,
              name: "设计",
              children: [
                {
                  id: 7,
                  name: "玉书"
                },
                {
                  id: 8,
                  name: "东方"
                }
              ]
            }
          ]
        }
      ],
      // 员工tree属性配置
      staffTreesProps: {
        children: "children",
        label: "name"
      },
      // 是否设置审核人或者管理人
      isSetAuth: true,
      // 设置审核人1,者管理人2
      setAuthType: 1,
      // 选中的设置权限或者管理的人
      checkAuthArr: [],
      // 是否批量设置
      isBatchSetAuth: false,
      // 批量选择的课程数据
      multipleSelectionIds: []
    };
  },
  methods: {
    // 打开审核与管理权限设置模态框
    openAuthDialog(index, row, type) {
      this.isSetAuth = true;
      // 深拷贝
      this.formObj = JSON.parse(JSON.stringify(row));
      // 添加tag是否编辑属性
      this.currentEditIndex = index;
      this.editdialog = true;
      this.setAuthType = type;
      this.isBatchSetAuth = false;
      setTimeout(() => {
        if (type == 1) {
          this.$refs.refDeptTree.getData(this.formObj.shr);
        } else if (type == 2) {
          this.$refs.refDeptTree.getData(this.formObj.glr);
        }
      }, 0);
    },
    // 打开审核与管理权限设置模态框-批量设置
    openAuthDialogBatch(type) {
      if (this.multipleSelectionIds.length == 0) {
        this.$alert("请选择数据后操作。", "提示", {
          confirmButtonText: "确定",
          type: "warning",
          callback: action => {}
        });
        return false;
      }
      this.isSetAuth = true;
      this.editdialog = true;
      this.setAuthType = type;
      this.isBatchSetAuth = true;
      setTimeout(() => {
        this.$refs.refDeptTree.getData([]);
      }, 0);
    },
    // 获取得到的选中的人
    getCheckTreeData(data) {
      this.checkAuthArr = [...data];
    },
    // 批量选择表格
    handleSelectionChange(rows) {
      rows.forEach(item => {
        this.multipleSelectionIds.push(item.id);
      });
    },
    // 保存数据
    saveData() {
      if (this.isBatchSetAuth) {
        this.tableData.forEach((item, index) => {
          this.multipleSelectionIds.forEach(id => {
            if (item.id == id && this.setAuthType == 1) {
              item.shr = this.checkAuthArr;
            } else if (item.id == id && this.setAuthType == 2) {
              item.glr = this.checkAuthArr;
            }
          });
        });
        console.log(this.tableData);
      } else {
        if (this.setAuthType == 1) {
          this.formObj.shr = this.checkAuthArr;
        } else if (this.setAuthType == 2) {
          this.formObj.glr = this.checkAuthArr;
        }
        this.tableData.splice(this.currentEditIndex, 1, this.formObj);
      }
      this.editdialog = false;
    },
    // 改变是否设置权限
    changeSetAuth(val) {
      if (!val) {
        this.$refs.refDeptTree.resetChecked();
      }
    }
  }
};
</script>

<style scoped>
.course-table >>> .el-table th {
  background-color: #f2f2f2;
}
.left-mune {
  margin-right: 20px;
  background: #ffffff;
  width: 18vw;
  min-width: 200px;
}
.left-mune {
  margin-right: 30px;
  background: #ffffff;
  width: 18vw;
  border: 1px solid #e1e1e1;
  min-width: 200px;
}
.left-mune >>> .el-menu-item.is-active {
  background: var(--theme-color);
}
.left-mune >>> .el-menu {
  border-right: none;
}
.left-mune >>> .el-submenu__title,
.left-mune >>> .el-menu-item {
  border-bottom: 1px solid #e1e1e1;
  text-align: center;
}
</style>
