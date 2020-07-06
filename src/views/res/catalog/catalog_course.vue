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
          <el-button size="small" type="primary" @click="addRow">增加</el-button>
        </div>
        <el-table :data="tableData" style="width: 100%" class="m-t-10" border>
          <el-table-column prop="name" label="课程名称" width="180"></el-table-column>
          <el-table-column prop="crateperson" label="创建人" width="100"></el-table-column>
          <el-table-column prop="type" label="资源类型" width="200">
            <template slot-scope="scope">
              <el-tag
                v-for="(item,index) in scope.row.type"
                :key="index"
                class="m-t-5 m-l-5"
              >{{item}}</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="200">
            <template slot-scope="scope">
              <el-button size="mini" type="primary" @click="editRow(scope.$index, scope.row)">修改</el-button>
              <el-button size="mini" type="danger" @click="deleRow(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <!-- 课程信息 -->
    <my-drawer :visible="editdialog" size="400px" title="库目录信息" direction="rtl">
      <div class="column_center wid_100">
        <div class="wid_80">
          <el-form label-width="80px" ref="refForm" :rules="formInputRules" :model="formObj">
            <p class="text-center color-333 m-b-20 font16 m-t-30">库目录信息</p>
            <el-form-item label="课程名称" prop="name">
              <el-input v-model="formObj.name"></el-input>
            </el-form-item>
            <el-form-item label="资源类型">
              <el-tag
                v-for="(tag,index) in formObj.type"
                :key="index"
                closable
                class="m-t-5 m-l-5"
                :disable-transitions="false"
                @click="editClassTag(tag,index)"
                @close="deleClassTag(tag)"
              >
                <span v-if="index!=currentEditTagIndex">{{tag}}</span>
                <input
                  class="bg-fff inputDefault"
                  type="text"
                  v-model="editClassTagVal"
                  v-if="index==currentEditTagIndex"
                  ref="editInput"
                  @keyup.enter="saveEditClassTag(tag,index)"
                  @blur="saveEditClassTag(tag,index)"
                />
              </el-tag>
              <el-input
                v-show="isShowTagInput"
                v-model="addClassTagVal"
                size="small"
                @keyup.enter.native="saveAddClassTag"
                @blur="saveAddClassTag"
              ></el-input>
              <el-button
                v-show="!isShowTagInput"
                size="small"
                @click="isShowTagInput=true"
                style="margin-left:5px"
              >+ 请添加</el-button>
            </el-form-item>
          </el-form>
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
          type: ["实训手册", "技能竞赛", "职业认证", "职业认证"]
        },
        {
          id: 1,
          name: "图形图像处理",
          crateperson: "baiyi",
          type: ["实训手册", "技能竞赛", "教材", "职业认证"]
        },
        {
          id: 1,
          name: "图形图像处理",
          crateperson: "baiyi",
          type: ["实训手册", "微课", "职业认证", "职业认证"]
        }
      ],
      // 表单验证
      formInputRules: {
        name: [{ required: true, message: "请输入目录名称", trigger: "blur" }]
      },
      // 显示编辑弹框
      editdialog: false,
      // 存放表单数据
      formObj: {},
      // 当前编辑数据的索引
      currentEditIndex: 0,
      // 显示tag的编辑框
      isShowTagInput: false,
      // 当前编辑的tag索引
      currentEditTagIndex: -1,
      // 当前编辑tag的值
      editClassTagVal: "",
      // 新增tag的值
      addClassTagVal: ""
    };
  },
  methods: {
    // 改变模块
    handleStep(step) {
      this.stepActive = step;
    },
    // 删除表格数据row
    deleRow(index, row) {
      // 判断是该目录下是否有课程
      if (row.isHasBook) {
        this.$alert("对不起，不能删除，目录下有课程。", "提示", {
          confirmButtonText: "确定",
          type: "warning",
          callback: action => {}
        });
      } else {
        this.$confirm("是否确定删除？", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            //  删除操作
          })
          .catch(() => {});
      }
    },
    // 新增
    addRow() {
      this.formObj = {};
      this.formObj.type = [];
      this.editdialog = true;
    },
    // 编辑
    editRow(index, row) {
      // 深拷贝
      this.formObj = JSON.parse(JSON.stringify(row));
      // 添加tag是否编辑属性
      this.currentEditIndex = index;
      this.editdialog = true;
    },
    // 保存数据
    saveData() {
      this.$refs.refForm.validate(valid => {
        if (valid) {
          if (this.formObj.id > 0) {
            // 编辑
            this.tableData.splice(this.currentEditIndex, 1, this.formObj);
          } else {
            // 新增
            this.tableData.push(this.formObj);
          }
          this.editdialog = false;
        } else {
          return false;
        }
      });
    },
    // 删除课程类型的tag标签数据
    deleClassTag(tag, index) {
      this.formObj.type.splice(index, 1);
    },
    editClassTag(tag, index) {
      this.currentEditTagIndex = index;
      this.editClassTagVal = tag;
    },
    // 保存添加的tag
    saveAddClassTag() {
      if (this.addClassTagVal) {
        this.formObj.type.push(this.addClassTagVal);
      }
      this.isShowTagInput = false;
      this.addClassTagVal = "";
    },
    // 保存编辑的tag
    saveEditClassTag(tag, index) {
      if (this.editClassTagVal) {
        this.formObj.type[index] = this.editClassTagVal;
      }
      this.editClassTagVal = "";
      this.currentEditTagIndex = -1;
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
