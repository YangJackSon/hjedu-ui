<template>
  <div class="font14 color-333">
    <div class="flex_stretch bg-fff">
      <div class="left-content">
        <sub-menu :data="leftMune" :step="2" @getSelect="getSelectMenu"></sub-menu>
      </div>
      <div class="flex_1 m-b-30 m-r-30">
        <div>
          <el-button size="small" @click="openUploadDialog">上传</el-button>
          <el-button size="small" @click="openBatchEditDialog">批量修改属性</el-button>
          <el-button size="small" @click="batchDele">删除</el-button>
          <el-button size="small">还原</el-button>
        </div>
        <el-table
          :data="tableData"
          border
          style="width: 100%"
          @selection-change="handleSelectionChange"
          class="m-t-10"
          fixed
        >
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column prop="date" label="资源" width="110">
            <template slot-scope="scope">
              <img
                width="80"
                height="50"
                src=" http://img3.imgtn.bdimg.com/it/u=1708454255,4048223294&fm=26&gp=0.jpg"
                alt
              />
            </template>
          </el-table-column>
          <el-table-column prop="name" label="课程" width="180">
            <template slot-scope="scope">
              <p class="color-27">大学英语六级语法词汇翻译</p>
              <p class="color-6a m-t-5">视觉传达设计专业</p>
              <p class="color-6b">视觉传达设计专业</p>
            </template>
          </el-table-column>
          <el-table-column prop="address" label="格式/类型">
            <template slot-scope="scope">
              <div class="text-center">
                <p class="color-6b m-b-10">教学录像</p>
                <el-tag type="info">mp4</el-tag>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="address" label="上传" width="120">
            <div class="text-center color-6b">
              <p>李丽丽老师</p>
              <p class="m-t-10">2019.02.09</p>
            </div>
          </el-table-column>
          <el-table-column prop="address" label="审批" width="120">
            <div class="text-center color-6b">
              <p>王华老师</p>
              <p class="m-t-10">2019.02.09</p>
            </div>
          </el-table-column>
          <el-table-column prop="address" label="访问" width="120">
            <div class="text-center color-6b">
              <p>
                <i class="el-icon-view"></i>
                <span class="m-l-5">800000次</span>
              </p>
              <p>
                <i class="el-icon-bottom"></i>
                <span class="m-l-5">800000次</span>
              </p>
            </div>
          </el-table-column>
          <el-table-column prop="address" label="标签">
            <template slot-scope="scope">
              <div class="text-center color-6b">
                <p>第324章</p>
                <p class="m-t-10">第128节</p>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="address" label="状态" width="90">
            <template slot-scope="scope">
              <el-button size="mini" v-if="scope.row.statu==1">待审核</el-button>
              <el-button size="mini" type="danger" v-if="scope.row.statu==0">不通过</el-button>
              <el-button size="mini" type="info" v-if="scope.row.statu==2">已删除</el-button>
              <el-button size="mini" type="primary" v-if="scope.row.statu==3">已发布</el-button>
            </template>
          </el-table-column>
          <el-table-column prop="address" label="操作" fixed="right" width="150">
            <template slot-scope="scope">
              <i class="el-icon-edit-outline font20"></i>
              <i class="el-icon-refresh-left font20 m_both10"></i>
              <i class="el-icon-delete font20"></i>
            </template>
          </el-table-column>
        </el-table>
        <div class="m-t-20 around-center">
          <el-pagination    
            @current-change="handleCurrentChange"
            :current-page="nowPage"
            :page-size="pageSize"
             background
            layout="total,  prev, pager, next, jumper"
            :total="rowTotal"
          ></el-pagination>
        </div>
      </div>
    </div>
    <!-- 资源上传 -->
    <resource-upload-dialog ref="refUploadDialog" width="65%" title="资源上传"></resource-upload-dialog>
    <!-- 批量修改属性 -->
    <my-drawer :visible="editdialog" size="400px" title="批量修改属性" direction="rtl">
      <div class="column_center wid_100">
        <div class="wid_80">
          <el-form
            label-width="80px"
            ref="refBatchForm"
            :rules="formInputRules"
            :model="batchEditObj"
          >
            <p class="text-center color-333 m-b-20 font16 m-t-30">批量修改属性</p>
            <el-form-item label="目录">
              <el-select v-model="batchEditObj.ml" class="changInputWidth" @change="$forceUpdate()">
                <el-option
                  v-for="item in options"
                  :label="item.label"
                  :key="item.id"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="课程">
              <el-select v-model="batchEditObj.kc" class="changInputWidth" @change="$forceUpdate()">
                <el-option
                  v-for="item in options"
                  :label="item.label"
                  :key="item.id"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="类型" prop="type">
              <el-select
                v-model="batchEditObj.type"
                class="changInputWidth"
                @change="$forceUpdate()"
              >
                <el-option
                  v-for="item in options"
                  :label="item.label"
                  :key="item.id"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <div slot="footer" class="column_center drawer-footer">
        <div class="flex_mid">
          <el-button type="info" size="small" @click="editdialog=false">取 消</el-button>
          <el-button
            type="primary"
            size="small"
            @click="saveBatchEditData"
            style="margin-left:30px;"
          >保 存</el-button>
        </div>
      </div>
    </my-drawer>
  </div>
</template>

<script>
import resourceUploadDialog from "./resource_upload_dialog";
export default {
  components: {
    resourceUploadDialog
  },
  data() {
    return {
      // 每页数据条数
      pageSize:10,
      // 当前页数
      nowPage:1,
      // 数据总条数
      rowTotal:30,
      // 菜单数据
      leftMune: [
        { label: "全部", isAll: true },
        {
          label: "园林园艺",
          chirden: [
            {
              label: "园林园艺1"
            },
            {
              label: "园林园艺2"
            }
          ]
        },
        {
          label: "软件技术",
          chirden: [
            {
              label: "软件技术1"
            },
            {
              label: "软件技术2"
            }
          ]
        }
      ],

      tableData: [
        {
          date: "2016-05-03",
          name: "王小虎",
          statu: 1,
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-02",
          name: "王小虎",
          statu: 2,
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          statu: 0,
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          statu: 3,
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-08",
          name: "王小虎",
          statu: 1,
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-06",
          name: "王小虎",
          statu: 1,
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-07",
          name: "王小虎",
          statu: 1,
          address: "上海市普陀区金沙江路 1518 弄"
        }
      ],
      // 判断是否选中了专业下的课程，选中课程才能上传
      isSeletClass: false,
      // 选中的专业名称加课程的数据
      selectMajorData: [],
      // 批量选中数据的Id
      multipleSelectionIds: [],
      // 批量修改属性弹框
      editdialog: false,
      // 批量修改表单
      batchEditObj: {},
      // 表单验证
      formInputRules: {
        type: [{ required: true, message: "请选中类型", trigger: "blur" }]
      },
      // 下拉选项
      options: [
        {
          label: "学前",
          id: 1
        },
        {
          label: "小学",
          id: 2
        },
        {
          label: "中学",
          id: 3
        },
        {
          label: "高中",
          id: 4
        },
        {
          label: "大学",
          id: 5
        }
      ]
    };
  },
  methods: {
    // 获取选中的左侧专业课程菜单数据
    getSelectMenu(type, data) {
      this.selectMajorData = data;
      if (type == 2) {
        this.isSeletClass = true;
      } else if (type == 1) {
        this.isSeletClass = false;
      }
    },
    // 批量选择表格
    handleSelectionChange(rows) {
      rows.forEach(item => {
        this.multipleSelectionIds.push(item.id);
      });
    },
    // 打开上传资源模块
    openUploadDialog() {
      if (this.isSeletClass) {
        setTimeout(() => {
          this.$refs.refUploadDialog.getData(this.selectMajorData);
        }, 0);
      } else {
        this.$alert("请先选中课程之后上传", "提示", {
          confirmButtonText: "确定",
          type: "warning",
          callback: action => {}
        });
      }
    },
    // 批量删除
    batchDele() {
      if (this.multipleSelectionIds.length > 0) {
        this.$confirm("确定删除选中的资源吗？", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            //  删除操作
          })
          .catch(() => {});
      } else {
        this.$alert("请选中数据后操作", "提示", {
          confirmButtonText: "确定",
          type: "warning",
          callback: action => {}
        });
      }
    },

    // 打开批量修改属性弹框
    openBatchEditDialog() {
      if (this.multipleSelectionIds.length > 0) {
        this.editdialog = true;
        this.batchEditObj = {};
      } else {
        this.$alert("请选中数据后操作", "提示", {
          confirmButtonText: "确定",
          type: "warning",
          callback: action => {}
        });
      }
    },
    // 保存批量修改数据
    saveBatchEditData() {
      this.$refs.refBatchForm.validate(valid => {
        if (valid) {
          this.editdialog = false;
        } else {
          return false;
        }
      });
    },
    // 分页改变数据
    handleCurrentChange(val){
      
    }
  }
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

.changInputWidth {
  width: 100%;
}
.left-content {
  margin-right: 20px;
  background: #ffffff;
  width: 18vw;
  border: 1px solid #e1e1e1;
  min-width: 200px;
}
</style>
