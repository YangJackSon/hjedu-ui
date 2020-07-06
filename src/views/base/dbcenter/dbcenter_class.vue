<template>
  <div class="font14 color-333">
    <div class="flex_stretch">
      <div class="depart-mune">
        <el-menu
          default-active="2"
          class="el-menu-vertical-demo"
          text-color="#333"
          active-text-color="#fff"
        >
          <el-menu-item :index="index.toString()" v-for="(item,index) in departMenu" :key="index">
            <span :class="{'font-w6':index==0}">{{item.label}}</span>
            <span class="m-r-10" :class="{'font-w6':index==0}">({{item.num}})</span>
          </el-menu-item>
        </el-menu>
      </div>
      <div class="flex_1">
        <div class="m-t-20">
          <el-date-picker v-model="sraechYear" type="year" placeholder="建班年份"></el-date-picker>
          <el-select v-model="sraechTerm" placeholder="建班学期" class="m-l-25">
            <el-option label="第一学期" value="第一学期"></el-option>
            <el-option label="第二学期" value="第二学期"></el-option>
            <el-option label="第三学期" value="第三学期"></el-option>
          </el-select>
        </div>
        <el-row :gutter="25">
          <el-col :md="12" :lg="8" :sm="24">
            <el-card class="around-center card-info m-t-20">
              <img src="@/assets/slice/add1.png" @click="addItem" />
            </el-card>
          </el-col>
          <el-col :md="12" :lg="8" :sm="24" v-for="(item, index) in classInfoData" :key="index">
            <el-card class="card-info m-t-20">
              <div slot="header" class="clearfix">
                <span class="font-w6">{{item.name}}</span>
                <p style="float: right;" class="card-tag font12">有效</p>
                <!-- <p style="float: right;" class="card-tag1 font12 color-999">无效</p> -->
              </div>
              <div class="color-65">
                <p v-if="item.bzrname">
                  {{item.bzrname}}
                  <span class="m-l-10">班主任</span>
                </p>
                <p v-if="!item.bzrname" class="color-F46B6B">无班主任</p>
                <p class="m-t-15">
                  <span>{{item.dl}}</span>
                  <span class="m-l-10">{{item.rxnf}}</span>
                  <span class="m-l-10">{{item.name}}</span>
                </p>
              </div>
              <div class="flex_end font14 color-9a m-t-20">
                <img src="@/assets/slice/stop.png" width="20" class="m-l-10" />
                <img src="@/assets/slice/start1.png" width="22" class="m-l-10" />
                <img src="@/assets/slice/edit.png" class="m-l-10" @click="editItem(index,item)" />
              </div>
            </el-card>
          </el-col>
        </el-row>
      </div>
    </div>
    <!-- 编辑框 -->
    <my-drawer :visible="editdialog" size="400px" title="班级信息" direction="rtl">
      <div class="column_center wid_100">
        <div class="wid_80">
          <el-form
            label-width="80px"
            ref="refForm"
            :rules="classInfoDataRules"
            :model="classInfoDataForm"
          >
            <p class="text-center color-333 m-b-20 font16 m-t-30">班级信息</p>
            <el-form-item label="专业简称">
              <el-select
                v-model="classInfoDataForm.dl"
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
            <el-form-item label="入学学期">
              <el-select
                v-model="classInfoDataForm.ruxq"
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
            <el-form-item label="入学日期">
              <el-date-picker class="changInputWidth" v-model="classInfoDataForm.rxrq" type="date"></el-date-picker>
            </el-form-item>
            <el-form-item label="班级名称" prop="className">
              <el-input v-model="classInfoDataForm.className"></el-input>
            </el-form-item>
            <el-form-item label="班主任">
              <el-select
                v-model="classInfoDataForm.bzrname"
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
            <el-form-item label="学制">
              <el-select
                v-model="classInfoDataForm.xz"
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
  name: "departClass",
  data() {
    return {
      // 专业菜单数据
      departMenu: [
        { label: "全部", num: 20 },
        { label: "软件技术", num: 2 },
        { label: "信息技术", num: 5 },
        { label: "园林园艺", num: 5 }
      ],

      // 按照年份筛选
      sraechYear: "",
      // 按照学期筛选
      sraechTerm: "",
      classInfoData: [
        {
          id: 1,
          dl: "学前",
          className: "学前 2020秋1班",
          rxnf: "2018",
          bzrname: "baiyi",
          xz: "三年",
          rxrq: "2020-06-09"
        },
        {
          id: 1,
          dl: "学前",
          className: "学前 2020秋1班",
          rxnf: "2018",
          xz: "三年",
          bzrname: "baiyi",
          rxrq: "2020-06-09"
        },
        {
          id: 1,
          dl: "学前",
          className: "学前 2020秋1班",
          rxnf: "2018",
          xz: "三年",
          bzrname: "",
          rxrq: "2020-06-09"
        },
        {
          id: 1,
          dl: "学前",
          name: "学前 2020秋1班",
          rxnf: "2018",
          rxrq: "2020-06-09"
        }
      ],
      classInfoDataRules: {
        className: [
          { required: true, message: "请输入班级名称", trigger: "blur" }
        ]
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
      classInfoDataForm: {},
      // 当前编辑数据的索引
      currentEditIndex: 0
    };
  },
  methods: {
    // 新增
    addItem() {
      this.classInfoDataForm = {};
      this.editdialog = true;
    },
    // 编辑
    editItem(index, item) {
      this.classInfoDataForm = { ...item };
      this.currentEditIndex = index;
      this.editdialog = true;
    },
    // 保存数据
    saveData() {
      this.$refs.refForm.validate(valid => {
        if (valid) {
          if (this.classInfoDataForm.id > 0) {
            // 编辑
            this.classInfoData.splice(
              this.currentEditIndex,
              1,
              this.classInfoDataForm
            );
          } else {
            // 新增
            this.classInfoData.push(this.classInfoDataForm);
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
  height: 200px;
}

.depart-mune {
  margin-top: 20px;
  margin-right: 20px;
  background: #ffffff;
  width: 18vw;
  min-width: 200px;
}
.depart-mune {
  margin-right: 30px;
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
  text-align: center;
}
.changInputWidth {
  width: 100%;
}
</style>
