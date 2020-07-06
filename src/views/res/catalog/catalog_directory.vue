<template>
  <div>
    <el-card class="directory-table m-t-10">
      <div>
        <el-button size="small" type="primary" @click="openEditDialog({},'添加目录')">增加</el-button>
      </div>
      <el-table :data="catalogDataList" style="width: 100%" class="m-t-10" border>
        <el-table-column type="index" width="50" label="序号"></el-table-column>
        <el-table-column prop="name" label="目录" width="180"></el-table-column>
        <el-table-column prop="createUser" label="创建人" width="180"></el-table-column>
        <el-table-column prop="remark" label="用途说明" width="180"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="openEditDialog(scope.row,'修改目录')">修改</el-button>
            <el-button size="mini" type="danger" @click="deleRow(scope.$index, scope.row)">删除</el-button>

            <el-dropdown class="m-l-10" @command="handleCommand($event, scope.$index, scope.row)">
              <el-button type="info" size="mini">
                排序
                <i class="el-icon-arrow-down el-icon--right"></i>
              </el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="1">置顶</el-dropdown-item>
                <el-dropdown-item command="2">上移</el-dropdown-item>
                <el-dropdown-item command="3">下移</el-dropdown-item>
                <el-dropdown-item command="4">置底</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <!-- 编辑框 -->
    <my-drawer
      :visible="editdialog"
      size="400px"
      :title="dialogTitle"
      direction="rtl"
      @close="editdialog=false"
    >
      <div class="column_center wid_100">
        <div class="wid_80">
          <el-form label-width="80px" ref="refForm" :rules="formInputRules" :model="formObj">
            <p class="text-center color-333 m-b-20 font16 m-t-30">库目录信息</p>
            <el-form-item label="目录名称" prop="name">
              <el-input v-model="formObj.name"></el-input>
            </el-form-item>
            <el-form-item label="用途说明">
              <el-input type="textarea" :rows="2" placeholder="请输入用途说明" v-model="formObj.remark"></el-input>
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
import catalogAPI from "@/api/res/catalog/code";
export default {
  computed: {},

  data() {
    return {
      // table数据
      catalogDataList: [],
      // 表单验证
      formInputRules: {
        name: [{ required: true, message: "请输入目录名称", trigger: "blur" }]
      },
      // 显示编辑弹框
      editdialog: false,
      // 编辑弹框title
      dialogTitle: "添加目录",
      // 存放表单数据
      formObj: {}
    };
  },
  methods: {
    // 获取目录列表
    getCatalogList() {
      catalogAPI
        .getCatalogList()
        .then(res => {
          if (res.code === "0") {
            this.catalogDataList = res.data;
          } else {
            this.$message.error(res.message);
          }
        })
        .catch(res => {});
    },
    // 删除表格数据row
    deleRow(index, row) {
      this.$confirm("是否确定删除？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          catalogAPI
            .deleCatalog(row.id)
            .then(res => {
              if (res.code === "0") {
                this.$message.success("删除成功！");
                this.getCatalogList();
              } else {
                this.$message.error(res.message);
              }
            })
            .catch(res => {});
        })
        .catch(() => {});
    },
    // 打开目录模态框
    openEditDialog(row, title) {
      this.formObj = { ...row };
      this.dialogTitle = title;
      this.editdialog = true;
    },
    // 保存数据
    saveData() {
      this.$refs.refForm.validate(valid => {
        if (valid) {
          if (this.formObj.id > 0) {
            // 编辑
            catalogAPI
              .updataCatalog(this.formObj)
              .then(res => {
                if (res.code === "0") {
                  this.$message.success("修改成功！");
                  this.getCatalogList();
                } else {
                  this.$message.error(res.message);
                }
              })
              .catch(res => {});
          } else {
            // 新增
            catalogAPI
              .addCatalog(this.formObj)
              .then(res => {
                if (res.code === "0") {
                  this.$message.success("添加成功！");
                  this.getCatalogList();
                } else {
                  this.$message.error(res.message);
                }
              })
              .catch(res => {});
          }
          this.editdialog = false;
        } else {
          return false;
        }
      });
    },
    // table数据改变排序
    handleCommand(command, index, row) {
      if (command == 1) {
        this.catalogDataList.splice(index, 1);
        this.catalogDataList.unshift(row);
      } else if (command == 2) {
        this.catalogDataList.splice(index, 1);
        this.catalogDataList.splice(index - 1, 0, row);
      } else if (command == 3) {
        this.catalogDataList.splice(index, 1);
        this.catalogDataList.splice(index + 1, 0, row);
      } else if (command == 4) {
        this.catalogDataList.splice(index, 1);
        this.catalogDataList.push(row);
      }
    }
  },
  mounted() {
    this.getCatalogList();
  }
};
</script>

<style scoped>
.directory-table >>> .el-table th {
  background-color: #f2f2f2;
}
</style>
