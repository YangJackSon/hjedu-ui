<template>
  <div>
    <!-- 无数据时显示 -->
    <el-card v-if="noData" class="no-data">
      <div class="text-center">
        <img src="@/assets/slice/add1.png" />
        <p class="font13 color-666 m-t-15">请设置学校的部门</p>
      </div>
    </el-card>
    <!-- 有数据时显示 -->
    <el-card v-if="!noData">
      <div class="tree around-center" >
        <el-tree
          v-loading="treeLoading"
          :data="data"
          node-key="sort"
          default-expand-all
          draggable
          :expand-on-click-node="false"
          @node-drop="handleDrop"
          :allow-drop="allowDrop"
        >
          <div slot-scope="{ node, data }" class="flex_mid">
            <div style="width:300px">
              <span v-show="data.$parentId == -1||data.deptId != changeId">{{data.name}}</span>
              <el-input
                placeholder="请输入名称"
                v-model="changeDatas.name"
                size="small"
                class="input-with-select"
                v-show="data.deptId == changeId"
              >
                <el-select v-model="changeDatas.type" slot="prepend" placeholder="请选择">
                  <el-option label="校区" :value="1"></el-option>
                  <el-option label="部门" :value="2"></el-option>
                </el-select>
              </el-input>
            </div>

            <div class="m-l-20">
                <el-tooltip content="添加下一级部门" placement="top" effect="light">
                    <img src="@/assets/slice/add.png" alt @click="append( data)" class="m-l-10" v-show="data.deptId != changeId" />
                </el-tooltip>
              <img
                src="@/assets/slice/edit.png"
                alt
                @click="edit( data)"
                class="m-l-10"
                width="18"
                v-show="data.parentId != -1&& data.deptId != changeId"
              />
              <img
                src="@/assets/slice/save.png"
                alt
                @click="changeData( data)"
                class="m-l-10"
                v-show="data.deptId == changeId"
              />
              <img
                src="@/assets/slice/ok.png"
                v-show="data.status != 1 && data.deptId != changeId"
                alt
                @click="save( data)"
                class="m-l-10"
              />
                <img
                src="@/assets/slice/back.png"
                v-show="data.deptId == changeId"
                alt
                @click="back( data)"
                class="m-l-10"
                />
              <img
                src="@/assets/slice/pause.png"
                v-show="data.status == 1 && data.deptId != changeId"
                alt
                @click="save( data)"
                class="m-l-10"
              />
            </div>
          </div>
        </el-tree>
      </div>
    </el-card>

      <el-dialog title="添加部门"
                 :visible.sync="deptDialog"
      >
          <el-input
                  placeholder="请输入部门名称"
                  v-model="addData.name"
                  class="input-with-select"
          >
              <el-select v-model="addData.type" slot="prepend" placeholder="请选择">
                  <el-option label="学校" :value="1"></el-option>
                  <el-option label="部门" :value="2"></el-option>
              </el-select>
          </el-input>
          <div slot="footer" class="dialog-footer">
              <el-button @click="deptDialog = false">取 消</el-button>
              <el-button type="primary" @click="addCode">确 定</el-button>
          </div>
      </el-dialog>
  </div>
</template>

<script>
  import {
    getCodTree,
    addCode,
    changeData
  } from '@/api/base/dbcenter/code'
export default {
  name: "Department",
  data() {

    return {
      treeLoading:false,
      modal:false,
      deptDialog:false,
      parentId:'',
      addData: {
        name:'',
        type:1,
      },
      changeId:'',
      changeDatas:'',
      noData: false,
      // 部门数据
      departmentData: [],
      data: "",
      rootNode:''
    };
  },
  mounted(){
    this.findCodeTree()
  },
  methods: {
    findCodeTree(){
      this.treeLoading = true
      getCodTree().then( res => {
        if(res.code === "0"){
            this.data = res.data
            this.rootNode = this.data[0].name
          this.treeLoading = false
        }
      }).catch( res => {

      })
    },
    //  编辑节点
    edit(data) {
      this.changeDatas = JSON.parse(JSON.stringify(data));
      this.changeId = data.deptId;
    },
    addCode(){
      let params = this.addData;
      params.parentId = this.parentId
      addCode(params).then( res => {
        if(res.code === "0"){
          // this.data = res.data
          this.$message({
            message: '添加成功',
            type: 'success'
          });
          this.deptDialog = false
          this.findCodeTree()
        }
      }).catch( res => {

      })
    },
    changeData(data){
      let params = data;
      params.name = this.changeDatas.name;
      params.type = this.changeDatas.type;
      changeData(params).then( res => {
        if(res.code === "0"){
          this.$message({
            message: '修改成功',
            type: 'success'
          });
          this.changeId = '';
          this.findCodeTree()

        }else{
          this.$message.error(res.message);

        }
      }).catch( res => {

      })
    },
    append(data) {
      this.deptDialog = true;
      this.parentId = data.deptId


    },
    back(){
      this.changeId = '';

    },
    save(data) {
      data.isEdit = false;
    },
    // 节点拖拽
    handleDrop(draggingNode, dropNode, dropType){
      this.treeLoading = true

      const draggingData = draggingNode.data;
      const dropData = dropNode.data;
      const type = dropType;
      switch(type){
        case  'before':
          draggingData.sort = dropData.sort - 1;
          draggingData.parentId = dropData.parentId;
          this.handleSubmit(draggingData)
          break;
        case  'after':
          draggingData.sort = dropData.sort + 1;
          draggingData.parentId = dropData.parentId;
          this.handleSubmit(draggingData)
          break;
        case  'inner':
          draggingData.parentId = dropData.deptId;
          draggingData.sort = 0;
          this.handleSubmit(draggingData)
          break;
      }
    },
    // 拖拽后提交
    handleSubmit(params){
      changeData(params).then( res => {
        if(res.code === "0"){

          this.findCodeTree()

        }else{
          this.$message.error(res.message);

        }
      }).catch( res => {

      })
    },
    // 不能拖拽到根目录
    allowDrop(draggingNode, dropNode, type) {
      if (dropNode.data.name === this.rootNode) {
        return type == 'after'|| type == 'before';
      } else {
        return true;
      }
    },
  }
};
</script>

<style scoped>
.no-data {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50vh;
}

.tree >>> .el-tree-node__content {
  height: 40px;
}

>>> .el-select > .el-input {
  width: 100px;
}
>>> .input-with-select .el-input-group__prepend {
  background-color: #fff;
  color: #333333;
}
</style>
