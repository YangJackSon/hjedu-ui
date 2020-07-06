<template>
  <div class="font14 color-333">
    <div>
      <div class="flex_stretch bg-fff">
        <div class="depart-mune">
          <el-menu
            default-active="0"
            class="el-menu-vertical-demo"
            text-color="#333"
            active-text-color="#fff"
          >
          <div v-for="(item,index) in leftMune" :key="index"> 
            <el-menu-item :index="index.toString()"  v-if="!item.chirden">{{item.label}}</el-menu-item>
            <el-submenu :index="index.toString()"  v-if="item.chirden">
              <template slot="title">{{item.label}}</template>
              <el-menu-item :index="index+'-'+subIndex"  v-for="(subItem,subIndex) in item.chirden" :key="subIndex" >{{subItem.label}}</el-menu-item>          
            </el-submenu>
          </div>           
          </el-menu>
        </div>
        <div class="flex_1 m-b-30 m-r-20">
            <!-- 列表-->
            <div class="p-b-20">
                <el-form :inline="true" :model="searchData" class="demo-form-inline">
                    <el-form-item label="姓名">
                        <el-input v-model="searchData.name" placeholder="姓名"></el-input>
                    </el-form-item>
                    <el-form-item label="来校日期">
                        <el-date-picker
                                v-model="searchData.date"
                                type="date"
                                placeholder="选择日期">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="职务">
                        <el-input v-model="searchData.zhiwu" placeholder="职务"></el-input>
                    </el-form-item>
                    <el-form-item label="联系电话">
                        <el-input v-model="searchData.phone" placeholder="联系电话"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="search">查询</el-button>
                    </el-form-item>
                </el-form>
                双师型老师<el-switch
                        class="m-l-10 m-r-35"
                        v-model="value1"
                        active-color="#5DD6C9"
                        inactive-color="#9E9E9E">
                </el-switch>
                兼职老师<el-switch
                    class="m-l-10 m-r-35"
                    v-model="value2"
                    active-color="#5DD6C9"
                    inactive-color="#9E9E9E">
                </el-switch>
                外聘老师<el-switch
                    class="m-l-10 m-r-35"
                    v-model="value3"
                    active-color="#5DD6C9"
                    inactive-color="#9E9E9E">
                </el-switch>
            </div>
            <div>
                <div class="border-eee border-b-no p-l-20 between-end">
                    <div class="m-t-20 p-b-20">
                        <el-button class="bg-theme" type="success" @click="add()">增加</el-button>
                        <el-button class="bg-theme" type="success" @click="changeSection()">批量更改部门</el-button>
                        <el-button class="bg-theme" type="success" @click="start()">导入</el-button>
                        <el-button class="bg-theme" type="success" @click="start()">导出</el-button>
                    </div>

                    <div class="border-ccc border-b-no border-r-no radius5">
                        <el-button :class="isactive === 1 ? 'bg-theme' : 'color-999' " class="bg-fff m-l-no border0 " type="success"
                                   @click="changeType(1)">全部</el-button>
                        <el-button :class="isactive === 2 ? 'bg-theme' : 'color-999' " class="bg-fff m-l-no border0 " type="success"
                                   @click="changeType(2)">在职</el-button>
                        <el-button :class="isactive === 3 ? 'bg-theme' : 'color-999' " class="bg-fff m-l-no border0 " type="success"
                                   @click="changeType(3)">离职</el-button>
                        <el-button :class="isactive === 4 ? 'bg-theme' : 'color-999' " class="bg-fff m-l-no border0 " type="success"
                                   @click="changeType(4)">退休</el-button>
                    </div>

                </div>
                <el-table :data="tableData"
                          border
                          style="width: 100%"
                          ref="table"
                          @selection-change="handleSelectionChange"
                          @row-click="handleRowClick">
                    <el-table-column
                            type="selection"
                            width="40">
                    </el-table-column>
                    <el-table-column prop="date" label="基本信息" width="260">
                        <template slot-scope="scope">
                            <div class="flex_dom">
                                <!--<img :src="scope.row.img"/>-->
                                <div style="width: 75px;height: 90px">
                                    <img width="100%" height="100%" src="../../../assets/timg.jpg"/>
                                </div>
                                <div class=" l-h-30 m-l-10 color-666">
                                    <p>
                                        {{scope.row.name}}<span class="m-l-10"></span>{{scope.row.sex}}<span class="m-l-10"></span>
                                        <span class="border-theme p-min font12">在职</span>
                                    </p>
                                    <p>
                                        {{scope.row.dp}}
                                    </p>
                                    <p>
                                        {{scope.row.id}}
                                    </p>
                                </div>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="name" label="部门/职务/工号" width="130">
                        <template slot-scope="scope">
                            <div class="l-h-30 m-l-10 color-666">
                                <p>
                                    {{scope.row.gzlx}}
                                </p>
                                <p>
                                    {{scope.row.gzgw}}
                                </p>
                                <p>
                                    {{scope.row.date}}
                                </p>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="address" label="联系方式" min-width="280">
                        <template slot-scope="scope">
                            <div class="color-666">
                                <p>{{scope.row.phone}}</p>
                                <p>{{scope.row.address}}</p>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="address" label="从教年月" width="130">
                        <template slot-scope="scope">
                            <div class="l-h-30 m-l-10 color-666">
                                <p>
                                    {{scope.row.ny}}从教
                                </p>
                                <p>
                                    {{scope.row.ny}}工作
                                </p>
                                <p>
                                    {{scope.row.ny}}入职
                                </p>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="address" label="其他"  width="140">
                        <template slot-scope="scope">
                            <div class="wid120 hgt30 l-h-30 border-eee m-b-10"
                                 style="text-align: center;border-radius: 5px;background: #F9FAFC">
                                {{scope.row.other}}
                            </div>
                            <div class="wid120 hgt30 l-h-30 border-eee "
                                 style="text-align: center;border-radius: 5px;background: #F9FAFC">
                                {{scope.row.other}}
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="address" fixed="right" label="操作" width="150">
                        <template slot-scope="scope">
                            <el-button class="bg-theme" size="mini" type="success" @click="start(scope.row)">编辑</el-button>
                            <el-button size="mini" type="danger" @click="out(scope.row)">离退</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <!-- 分页-->
            <div  class="column_center m-t-30">
                <el-pagination
                        background
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        layout="total, prev, pager, next, jumper"
                        :total="total">
                </el-pagination>
            </div>

        </div>
      </div>

    </div>
    <!-- 新增修改弹框-->
    <my-drawer
              :visible.sync="teacherDialog"
              direction="rtl"
              custom-class="demo-drawer overflow-drawer"
              size="900px"
              :close-on-press-escape="false"
              :wrapperClosable="false"
              :title="operateTitle"
      >
          <div class="demo-drawer__content">
                <op-teacher :id="teacherId" :type="dialogType" @teacherSubmit="closeTeacherDialog"></op-teacher>
          </div>
        <div slot="footer" class="column_center drawer-footer">
            <div class="flex_mid">
                <el-button type="info" size="small" @click="editdialog=false">取 消</el-button>
                <el-button type="primary" size="small" @click="saveData" style="margin-left:30px;">保 存</el-button>
            </div>
        </div>
      </my-drawer>
    <!-- 离退弹框-->
      <el-drawer
              :visible.sync="outDialog"
              direction="rtl"
              custom-class="demo-drawer overflow-drawer"
              size="500px"
              :close-on-press-escape="false"
              :wrapperClosable="false"

      >
          <div class="demo-drawer__content">
              <out-teacher :id="teacherId" @outSubmit="closeOutDialog"></out-teacher>
          </div>

      </el-drawer>
    <!-- 批量更改部门-->
      <el-drawer
              :visible.sync="sectionDialog"
              direction="rtl"
              custom-class="demo-drawer overflow-drawer"
              size="500px"
              :close-on-press-escape="false"
              :wrapperClosable="false"
      >
          <div class="demo-drawer__content">
              <my_tree @getDepartment="getDepartment"></my_tree>
          </div>
      </el-drawer>
  </div>
</template>

<script>
  import opTeacher from "./operate_teacher";
  import outTeacher from "./out_teacher";
  import My_tree from "../../../components/tree/my_tree";
export default {
  name: "",
  components: {
    My_tree,
    opTeacher,
    outTeacher
  },
  data() {
    return {
      teacherId:'',
      operateTitle:'',
      teacherDialog:false,
      outDialog:false,
      sectionDialog:false,
      value1:false,
      value2:false,
      value3:false,
      isactive: 1,
      total: 100,
      searchData:{
        name:'',
        date:'',
        zhiwu:'',
        phone:'',
      },
      // 菜单数据
      leftMune: [
        { label: "成都天宇职业技术学校(109)", },
        { label: "校长办公室（3）",
            chirden: [
                {
                    label: "秘书处",

                },
                {
                    label: "行政处"
                },
                {
                    label: "行政处二",
                  chirden: [
                    {
                      label: "教务处1"
                    },
                    {
                      label: "教务处2"
                    },
                  ]
                }
            ]},
        {
          label: "教务处（79）",
          chirden: [
            {
              label: "教务处1"
            },
            {
              label: "教务处2"
            },
          ]
        },
        {
          label: "教务处（79）",
          chirden: [
              {
                  label: "教务处1"
              },
              {
                  label: "教务处2"
              },
          ]
        }
      ],

      tableData: [
        {
          date: "2016-05-03",
          name: "王小虎",
          id:'513213198812121212',
          sex:'女',
          dp:'中国共产党',
          gzlx:'校长办公室',
          gzgw:'校长助理',
          phone:'15301230000',
          ny:'2016-05',
          other:'双师型老师',
          other2:'双师型老师',
          address: "四川省成都市成华区理工大学电 建地产美立方成立东区锦里富力 花园蓝光金沙180号-附属209号",
          img:'',
          lz: false
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          id:'513213198812121212',
          sex:'女',
          dp:'中国共产党',
          gzlx:'校长办公室',
          gzgw:'校长助理',
          phone:'15301230000',
          ny:'2016-05',
          other:'双师型老师',
          other2:'双师型老师',
          address: "四川省成都市成华区理工大学电 建地产美立方成立东区锦里富力 花园蓝光金沙180号-附属209号",
          img:'',
          lz: false
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          id:'513213198812121212',
          sex:'女',
          dp:'中国共产党',
          gzlx:'校长办公室',
          gzgw:'校长助理',
          phone:'15301230000',
          ny:'2016-05',
          other:'双师型老师',
          other2:'双师型老师',
          address: "四川省成都市成华区理工大学电 建地产美立方成立东区锦里富力 花园蓝光金沙180号-附属209号",
          img:'',
          lz: false
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          id:'513213198812121212',
          sex:'女',
          dp:'中国共产党',
          gzlx:'校长办公室',
          gzgw:'校长助理',
          phone:'15301230000',
          ny:'2016-05',
          other:'双师型老师',
          other2:'双师型老师',
          address: "四川省成都市成华区理工大学电 建地产美立方成立东区锦里富力 花园蓝光金沙180号-附属209号",
          img:'',
          lz: false
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          id:'513213198812121212',
          sex:'女',
          dp:'中国共产党',
          gzlx:'校长办公室',
          gzgw:'校长助理',
          phone:'15301230000',
          ny:'2016-05',
          other:'双师型老师',
          other2:'双师型老师',
          address: "四川省成都市成华区理工大学电 建地产美立方成立东区锦里富力 花园蓝光金沙180号-附属209号",
          img:'',
          lz: false
        },

      ]
    };
  },
  methods: {
    getDepartment(data){
      console.log(data)
    },
    changeSection(){
      this.sectionDialog = true
    },
    closeTeacherDialog(){
      this.teacherDialog = false
    },
    closeOutDialog(){
      this.outDialog = false

    },
    search(){

    },
    changeType(e){
      this.isactive = e
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    start(e){
      this.operateTitle = '修改'
      this.teacherDialog = true
    },
    add(){
      this.operateTitle = '增加'
      this.teacherDialog = true

    },
    out(e){
      this.outDialog = true
    },

    //复选框点击
    handleSelectionChange(){

    },
    //点击行触发，选中或不选中复选框
    handleRowClick(row, column, event){
      this.$refs.table.toggleRowSelection(row);
    }

  }
};
</script>

<style scoped>

    .el-drawer{
        overflow-y: scroll;
    }
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
