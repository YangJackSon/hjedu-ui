<template>
  <div class="font14 color-333">
    <el-row :gutter="25">
      <el-col :md="8" :lg="6" :sm="12">
        <el-card class="around-center card-info m-t-20">
          <img src="@/assets/slice/add1.png" @click="addItem" />
        </el-card>
      </el-col>
      <el-col :md="8" :lg="6" :sm="12" v-for="(item, index) in termData" :key="index">
        <el-card class="card-info m-t-20">
          <div slot="header" class="clearfix">
            <span class="font-w6">{{item.name}}</span>
            <p style="float: right;" class="card-tag font12">有效</p>
            <!-- <p style="float: right;" class="card-tag1 font12 color-999">无效</p> -->
          </div>
          <div class="color-65">
            <p>{{item.qsdata}}</p>
            <p class="m-t-15">
              <span>{{item.xn}}</span>
              <span class="m-l-10">{{item.xqdm}}</span>
            </p>
          </div>
          <div class="between-center wid_100 font14 color-9a m-t-20">
            <p class="m-t-5">默认学期</p>
            <div>
              <img src="@/assets/slice/stop.png" width="20" class="m-l-10" />
              <img src="@/assets/slice/start1.png" width="22" class="m-l-10" />
              <img src="@/assets/slice/edit.png" class="m-l-10" @click="editItem(index,item)" />
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <!-- 编辑框 -->
    <my-drawer :visible="editdialog" size="400px" title="学年学期信息" direction="rtl">
      <div class="column_center wid_100">
        <div class="wid_80">
          <el-form label-width="80px" ref="refForm" :rules="termDataRules" :model="termDataForm">
            <p class="text-center color-333 m-b-20 font16 m-t-30">学年学期信息</p>
            <el-form-item label="学年" prop="xn">
              <el-select v-model="termDataForm.xn" class="changInputWidth" @change="$forceUpdate()">
                <el-option
                  v-for="item in departjc"
                  :label="item.label"
                  :key="item.id"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="学期代码" prop="xqdm">
              <el-select
                v-model="termDataForm.xqdm"
                class="changInputWidth"
                @change="$forceUpdate()"
              >
                <el-option
                  v-for="item in departjc"
                  :label="item.label"
                  :key="item.id"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="学期名称" prop="name">
              <el-input v-model="termDataForm.name"></el-input>
            </el-form-item>
            <el-form-item label="起止日期" prop="qsdata">
              <el-date-picker
                v-model="termDataForm.qsdata"
                type="daterange"
                class="changInputWidth"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              ></el-date-picker>
            </el-form-item>
            <el-form-item>
              <el-checkbox v-model="termDataForm.statu">默认为当前学期</el-checkbox>
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
  name: "term",
  data() {
    return {
      termData: [
        {
          id: 1,
          xn: "2018",
          xqdm: "春季学期",
          name: "2018第二学期",
          qsdata: "2020-06-09-2021-06-09"
        },
        {
          id: 1,
          xn: "2018",
          xqdm: "春季学期",
          name: "2018第二学期",
          qsdata: "2020-06-09-2021-06-09"
        },
        {
          id: 1,
          xn: "2018",
          xqdm: "春季学期",
          name: "2018第二学期",
          qsdata: "2020-06-09-2021-06-09"
        },
        {
          id: 1,
          xn: "2018",
          xqdm: "春季学期",
          name: "2018第二学期",
          qsdata: "2020-06-09-2021-06-09"
        }
      ],
      termDataRules: {
        name: [{ required: true, message: "请输入学期名称", trigger: "blur" }],
        xn: [{ required: true, message: "请选择学年", trigger: "blur" }],
        xqdm: [{ required: true, message: "请选择学期代码", trigger: "blur" }],
        qsdata: [{ required: true, message: "请输入起止日期", trigger: "blur" }]
      },
      // 专业简称
      departjc: [
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
      ],
      // 显示编辑弹框
      editdialog: false,
      // 存放表单数据
      termDataForm: {},
      // 当前编辑数据的索引
      currentEditIndex: 0
    };
  },
  methods: {
    // 新增
    addItem() {
      this.termDataForm = {};
      this.editdialog = true;
    },
    // 编辑
    editItem(index, item) {
      this.termDataForm = { ...item };
      this.currentEditIndex = index;
      this.editdialog = true;
    },
    // 保存数据
    saveData() {
      this.$refs.refForm.validate(valid => {
        if (valid) {
          if (this.termDataForm.id > 0) {
            // 编辑
            this.termData.splice(this.currentEditIndex, 1, this.termDataForm);
          } else {
            // 新增
            this.termData.push(this.termDataForm);
          }
          this.editdialog = false;
        } else {
          return false;
        }
      });
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
  height: 220px;
}
.split-line {
  width: 2px;
  height: 24px;
  margin: 0 35px;
  background: #9a9a9a;
}

.changInputWidth {
  width: 100%;
}
</style>
