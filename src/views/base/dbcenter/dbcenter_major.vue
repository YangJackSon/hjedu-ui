<template>
  <div class="font14 color-333">
    <el-row :gutter="25">
      <el-col :md="8" :lg="6" :sm="12">
        <el-card class="around-center card-info m-t-20">
          <img src="@/assets/slice/add1.png" @click="addItem" />
        </el-card>
      </el-col>
      <el-col :md="8" :lg="6" :sm="12" v-for="(item, index) in major" :key="index">
        <el-card class="card-info m-t-20">
          <div slot="header" class="clearfix">
            <span class="font-w6">{{item.name}}</span>
            <p style="float: right;" v-if="item.status == 1" class="card-tag font12">有效</p>
             <p style="float: right;" v-else class="card-tag1 font12 color-999">无效</p>
          </div>
          <div class="column_center p_both20">
            <div class="flex_mid font14 color-666 text-center">
              <div>
                <p>{{item.name}}</p>
                <p class="m-t-5">{{item.num}}</p>
              </div>
              <p class="split-line"></p>
              <p class="font-16">{{item.jc}}</p>
            </div>
            <div class="between-center wid_100 font14 color-9a m-t-20">
              <div>
                <p>更新时间</p>
                <p class="m-t-5">{{item.modifyTime}}</p>
              </div>
              <div>
                <img src="@/assets/slice/stop.png" v-if="item.status == 1" width="20" class="m-l-10" />
                <img src="@/assets/slice/start1.png" v-else width="22" class="m-l-10" />
                <img src="@/assets/slice/edit.png" class="m-l-10" @click="editItem(item.majorId)" />
              </div>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <!-- 编辑框 -->
    <my-drawer :visible="editdialog" size="400px" title="专业信息" direction="rtl">
      <div class="column_center wid_100">
        <div class="wid_80">
          <el-form
            label-width="80px"
            ref="majorForm"
            :rules="majorRules"
            :model="majorData"
          >
            <p class="text-center color-333 m-b-20 font16 m-t-30">专业信息</p>
            <el-form-item label="专业大类" prop="type">
                <el-select v-model="majorData.bigType"
                           filterable
                           placeholder="请选择专业大类"
                           @change="bigTypeChange">
                    <el-option
                            v-for="item in majorBigList"
                            :key="item.id"
                            :label="item.name"
                            :value="item">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="专业名称" prop="name">
                <el-select v-model="majorData.type"
                           filterable
                           :disabled="majorData.bigType ==''"
                           :placeholder=" majorData.bigType =='' ? '请先选择专业大类' : '请选择专业名称'"
                           @change="smallTypeChange">
                    <el-option
                            v-for="item in majorSmallList"
                            :key="item.id"
                            :label="item.name"
                            :value="item">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="专业简称" prop="name"
                         >
              <el-input v-model="majorData.name"
                        :disabled="majorData.type ==''"
                        :placeholder=" majorData.bigType == '' ? '请先选择专业大类' : majorData.type =='' ? '请先选择专业名称' : '请填写专业简称'"
              ></el-input>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <div slot="footer" class="column_center drawer-footer">
        <div class="flex_mid">
          <el-button type="info" size="small" @click="closeDialog()">取 消</el-button>
          <el-button type="primary" size="small" @click="saveData" style="margin-left:30px;">保 存</el-button>
        </div>
      </div>
    </my-drawer>
  </div>
</template>
<script>
  import {
    findOneMajor,
    findAllMajor,
    changeMajor,
    addMajor
  } from '@/api/base/dbcenter/code'
export default {
  name: "major",
  data() {
    return {
      submiType: 1,
      major: [
        {
          id: 1,
          dl: "学前",
          jc: "教育类",
          name: "学期教育",
          num: 11234,
          updataTime: "2020-06-09"
        }
      ],
      majorData: {
        bigType: '',
        type:'',
        name:'',
        bigTypeName:'',
        typeName:'',
      },
      majorRules: {
        type: [{ required: true, message: "请选择课程名称", trigger: "blur" }],
        bigType: [{ required: true, message: "请选择课程大类", trigger: "blur" }],
        name: [{ required: true, message: "请输入课程简称", trigger: "blur" }]
      },
      majorBigList: '',
      majorSmallList:'',
      // 显示编辑弹框
      editdialog: false,
      // 存放表单数据

      // 当前编辑数据的索引
      currentEditIndex: 0
    };
  },
  mounted(){
    this.findMajorList()
  },
  methods: {
    findMajorList(){
      findAllMajor().then( res => {
        if(res.code === "0"){
          this.major = res.data
          for(let item of this.major){
            item.modifyTime = item.modifyTime.substring(0,10)
          }
            // this.data = res.data
        }
      }).catch( res => {

      })
    },
    smallTypeChange(value){
      for(let item of this.majorSmallList){
        if(item.value == value ) {
          this.majorData.name = item.name
        }
      }
    },
    bigTypeChange(item){
      this.majorData.type = ''
      this.majorData.name = ''
      this.$code.childrenList(item.id).then(res => {
        if(res.code == 0){
          this.majorSmallList = res.data
        }
      })
    },
    majoryList(){
      this.$code.majoryList().then(res => {
        if(res.code == 0){
          this.majorBigList = res.data
        }
      })
    },
    closeDialog(){
      this.editdialog = false;
      this.$refs.majorForm.resetFields()

    },
    // 新增
    addItem() {
      this.submiType = 1;
      this.majoryList();
      this.editdialog = true;
    },
    // 编辑
    editItem(id) {
      this.majoryList();
      findOneMajor(id).then( res => {
        if(res.code === "0"){
            this.majorData = res.data
        }
      }).catch( res => {

      });
      this.submiType = 1
      this.editdialog = true;
    },
    // 保存数据
    saveData() {
      let params = this.majorData
      console.log(this.majorData)
      // for(let item of this.majorBigList){
      //   if(item.value = params.bigType){
      //     console.log(item,params.bigType)
      //
      //     // params.bigTypeName = item.name
      //   }
      // }
      // for(let item of this.majorBigList){
      //   if(item.value = params.type){
      //     // params.typeName = item.name
      //     console.log(item,params.type)
      //
      //   }
      // }
      console.log(params)
      // if(this.submiType == 1){
      //   addMajor(params).then( res => {
      //     if(res.code === "0"){
      //       this.$message({
      //         message: '添加成功',
      //         type: 'success'
      //       });
      //       this.findMajorList()
      //
      //     }else{
      //       this.$message.error(res.message);
      //     }
      //   }).catch( res => {
      //
      //   })
      //
      // }else{
      //   changeMajor(params).then( res => {
      //     if(res.code === "0"){
      //       this.$message({
      //         message: '修改成功',
      //         type: 'success'
      //       });
      //       this.findMajorList()
      //
      //     }else{
      //       this.$message.error(res.message);
      //     }
      //   }).catch( res => {
      //
      //   })
      //
      // }

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

</style>
