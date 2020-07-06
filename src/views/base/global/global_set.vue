<template>
    <div>
        <el-row :gutter="12">
            <el-col :md="8" :lg="6" :sm="12">
                <el-card @click.native="handleEdit" style="margin-top: 1vw"
                         body-style="margin: 0 auto;text-align: center;height:200px; cursor: pointer;">
                    <i style="font-size: 68px;margin-top: 18%;color: #D3D3D3" class="el-icon-circle-plus-outline"></i>
                </el-card>
            </el-col>
            <el-col :md="8" :lg="6" :sm="12" v-for="(item, index) in apps" :key="index">
                <el-card style="margin-top: 1vw" body-style="height:142px">
                    <div slot="header">
                        <span class="header-title">{{item.systemName}}</span>
                        <el-tag v-if="item.status === '1'" type="success" size="small" style="float: right">有效</el-tag>
                        <el-tag v-else type="info" size="small" style="float: right">无效</el-tag>
                    </div>
                    <div style="">
                        <div>{{item.name}}</div>
                        <div class="content-p">{{item.account}}</div>
                        <div class="content-p">{{item.password}}</div>
                    </div>
                    <div style="padding-top: 1vw">
                        <div style="float: right">
                            <el-button icon="el-icon-s-custom" circle @click="findOrgTree(item.orgId)">

                            </el-button>
                            <el-button v-if="item.state === '0'" icon="el-icon-video-play" circle></el-button>
                            <el-button v-if="item.state === '1'" icon="el-icon-video-pause" circle
                                       @click="handleEdit(item.orgId,2)">
                            </el-button>
                            <el-button icon="el-icon-edit-outline" circle @click="handleEdit(item.orgId,2)"></el-button>
                        </div>
                    </div>

                </el-card>
            </el-col>
        </el-row>
        <el-drawer :visible.sync="schoolDrawer" :with-header="false">
            <div style="margin-top: 6vw;text-align: center;">
                <h3>学校信息</h3>
                <br>
                <el-form style="width: 70%;margin: 0 auto" :model="school" :rules="rules" ref="schoolForm" size="mini"
                         label-width="80px">
                    <el-form-item label="学校全称" prop="systemName">
                        <el-input v-model="school.systemName"></el-input>
                    </el-form-item>
                    <el-form-item label="学校名称" prop="name">
                        <el-input v-model="school.name"></el-input>
                    </el-form-item>
                    <el-form-item v-if = 'schoolType' label="账 号" prop="account">
                        <el-input v-model="school.account"></el-input>
                    </el-form-item>
                    <el-form-item v-if = 'schoolType' label="密 码" prop="password">
                        <el-input v-model="school.password" type="password"></el-input>
                    </el-form-item>
                </el-form>
                <el-upload
                        class="avatar-uploader"
                        action=""
                        :show-file-list="false"
                        :on-success="handleLogoSuccess"
                        :before-upload="beforeLogoUpload">
                    <img v-if="school.logo" :src="school.logo" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
                <p class="content-p">请上传学校LOGO</p>
                <div style="bottom: 2vw;margin: 0 auto;margin-top: 20%;">
                    <el-button type="info" size="mini" @click="clearSchool">重置</el-button>
                    <el-button type="success" size="mini" @click="handleSubmit">保存</el-button>
                </div>
            </div>
        </el-drawer>
        <el-drawer :visible.sync="authDrawer" :with-header="false" >
            <div style="margin-top: 6vw;text-align: center;">
                <h3>产品权限</h3>
                <br>
                <el-radio-group v-model="tabAuth" size="mini" style="margin-bottom: 30px;">
                    <el-radio-button label="0">PC权限</el-radio-button>
                    <el-radio-button label="1">移动权限</el-radio-button>
                </el-radio-group>
                <div>
                    <div v-if="tabAuth === '0'" style="margin-left: 20%;">
                        <el-tree
                                v-loading = 'treeloading'
                                ref="tree"
                                :data="pcAuthData"
                                show-checkbox
                                node-key="menuId"
                                default-expand-all
                                :default-checked-keys="oldTreeId"
                                :props="pcProps">
                        </el-tree>
                    </div>
                    <div v-if="tabAuth === '1'" style="margin-left: 20%;">
                        <el-tree
                                :data="appAuthData"
                                show-checkbox
                                node-key="authId"
                                default-expand-all
                                :default-checked-keys="[3,5]"
                                :props="appProps">
                        </el-tree>
                    </div>
                </div>
                <div style="bottom: 2vw;margin: 0 auto;margin-top: 20%;">
                    <el-button type="success" size="mini" @click="authSubmit">保存</el-button>
                </div>
            </div>
        </el-drawer>

    </div>
</template>

<script>
  import {
    addSchool,
    findSchool,
    findOneSchool,
    putSchool,
    findTree,
    findOrgTree,
    bindOrg
  } from '@/api/base/global/code'

  export default {
        name: "GlobalSet",
        data() {
            return {
                treeloading: true,
                schoolType: true,
                schoolDrawer: false,
                authDrawer: false,
                tabAuth: '0',
                oldTreeId:[],// 已授权限
                school: {
                    systemName: '',
                    name: '',
                    account: '',
                    password: '',
                    logo: '',
                },
                rules: {
                  systemName: [
                    { required: true, message: '请输入学校全称', trigger: 'blur' },
                  ],
                  name: [
                    { required: true, message: '请输入学校名称', trigger: 'blur' },
                  ],
                  account: [
                    { required: true, message: '请输入账号', trigger: 'blur' },
                  ],
                  password: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                  ],
                },
                pcProps: {
                    label: 'name',
                    children: 'children'
                },
                appProps: {
                    label: 'name',
                    children: 'children'
                },
                apps: [
                    // {
                    //     title: '智慧校园系统',
                    //     state: '1',
                    //     logo: '',
                    //     name: '重庆女子职中',
                    //     account: 'admin',
                    //     password: '123456'
                    // }
                ],
                pcAuthData: [

                ],
                appAuthData: [

                ],

            }
        },
        mounted(){
          this.findSchool()
        },
        methods: {
            findSchool(){
              let params = {
                page: 1,
                size: 20
              };
              findSchool(params).then( res => {
                if(res.code === "0"){
                    this.apps = res.data.records
                }
              }).catch( res => {

              })
            },
            handleEdit(id,num) {
                if(num === 2){
                  this.schoolType = false;
                  this.findOneSchool(id)
                }else{
                  this.school = {
                    systemName: '',
                    name: '',
                    account: '',
                    password: '',
                    logo: '',
                  };
                  this.schoolType = true;
                  this.schoolDrawer = true
                }
            },
            findOneSchool(id){
                findOneSchool(id).then( res => {
                  if(res.code === "0"){
                    this.schoolDrawer = true
                    this.school = res.data
                  }else{
                    this.$message.error(res.message);
                  }
                }).catch( res => {

                })
            },
            findTree(id){
              findTree(this.tabAuth).then( res => {
                if(res.code === "0"){
                  this.pcAuthData = res.data
                  this.pcAuthData.orgId = id
                  this.treeloading = false
                }else{
                  this.$message.error(res.message);
                }
              }).catch( res => {

              })
            },
            findOrgTree(id){
              this.authDrawer = true;
              findOrgTree(id).then( res => {
                if(res.code === "0"){
                  this.oldTreeId = res.data
                  this.findTree(id)

                }else{
                  this.$message.error(res.message);
                }
              }).catch( res => {

              })
            },
            authSubmit(){
              let params = {
                orgId: this.pcAuthData.orgId,
                menuIds: this.$refs.tree.getCheckedKeys().join(",")
              }
              bindOrg(params).then( res => {
                if(res.code === "0"){
                  this.authDrawer = false
                  this.$message({
                    message: '授权成功',
                    type: 'success'
                  });
                }else{
                  this.$message.error(res.message);
                }
              }).catch( res => {

              })
            },
            handleSubmit(){
              let params = this.school;
              if(this.schoolType){
                addSchool(params).then( res => {
                  if(res.code === "0"){
                    this.schoolDrawer = false;
                    this.findSchool();
                    this.$message({
                      message: '添加学校成功',
                      type: 'success'
                    });
                  }else{
                    this.$message.error(res.message);
                  }
                }).catch( res => {

                })
              }else{
                putSchool(params).then( res => {
                  if(res.code === "0"){
                    this.schoolDrawer = false;
                    this.findSchool();
                    this.$message({
                      message: '修改学校成功',
                      type: 'success'
                    });
                  }else{
                    this.$message.error(res.message);
                  }
                }).catch( res => {

                })
              }

            },
            clearSchool(){
              this.$refs.schoolForm.resetFields();

            },
            handleLogoSuccess(res, file) {
                this.school.logo = URL.createObjectURL(file.raw);
            },
            beforeLogoUpload(file) {
                this.school.logo = URL.createObjectURL(file.raw);

                // const isJPG = file.type === 'image/jpeg';
                // const isLt2M = file.size / 1024 / 1024 < 2;
                //
                // if (!isJPG) {
                //     this.$message.error('上传头像图片只能是 JPG 格式!');
                // }
                // if (!isLt2M) {
                //     this.$message.error('上传头像图片大小不能超过 2MB!');
                // }
                // return isJPG && isLt2M;
            }
        }
    }
</script>

<style>
    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
    }
    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 138px;
        height: 138px;
        line-height: 138px;
        text-align: center;
    }
    .avatar {
        width: 138px;
        height: 138px;
        display: block;
    }
    .header-title {
        color: var(--theme-color);
    }

    .content-p {
        color: #A2A2A2;
        margin-top: 0.5vw;
    }
    .el-radio-button:focus:not(.is-focus):not(:active):not(.is-disabled) {
        box-shadow: none;
    }

</style>
