<template>
  <div>
    <div :class="{'mask2':ismini,'mask1':!ismini}" v-show="isShow">
      <div class="flex-end" style="height:100%">
        <div class="body_div flex_column" :style="{'width': width}">
          <div class="dialog_header">
            <div class="between-center" style="padding: 15px 15px 15px 20px;">
              <p class="flex_1 font16">资源上传</p>
              <i class="el-icon-copy-document font16 color-fff m_both20" @click="minimizeDialog"></i>
              <i class="el-icon-close color-fff font20" @click="closeDialog"></i>
            </div>
          </div>
          <div class="flex_1" style="overflow-y:hidden;height:200px;">
            <div class="is-scroll-left right_body_div">
              <div class="border-t-e1 wid_100" v-show="!ismini">
                <div class="column_center p-b-30 wid_100">
                  <div class="wid_80 between-center m-t-20">
                    <p>
                      <span>上传至：</span>
                      <span class="color-5DD6C9 m-l-10">
                        {{ majorObj.label}}-{{
                        courseObj.label}}
                      </span>
                    </p>
                    <router-link
                      :to="{name:'resCatalog',query:{index:2}}"
                      tag="p"
                      class="border-btn"
                    >目录与课程设置</router-link>
                  </div>
                  <div class="wid_80 between-center m-t-20">
                    <p>资源类型：</p>
                    <div class="flex_1">
                      <my-radio :list="allType" @radioChange="typeChange"></my-radio>
                    </div>
                  </div>
                  <div class="flex_mid m-t-10">
                    <p
                      class="color-999 font12 m-r-10 flex_wrap"
                    >支持视频、文档、图片格式，500M以上文件只能单个上传、批量上传总量不超过1G。</p>
                    <el-tooltip effect="light" content="Bottom Left 提示文字" placement="bottom-start">
                      <div slot="content" class="l-h-24 color-999">
                        <p class="color-333">
                          <span class="font36 m-r-5">.</span>支持上传的格式如下
                        </p>
                        <p>视频类：avi、flv、mp4、wmv、rmvb、rm、mov mpeg、mpg</p>
                        <p>图片类：bmp、jpeg、gif、png、jpg、tiff</p>
                        <p>文档类：ppt、pptx、doc、docx、xls、xlsx、txt</p>
                      </div>
                      <p class="border-btn font12">
                        具体文件格式
                        <i class="el-icon-warning-outline"></i>
                      </p>
                    </el-tooltip>
                  </div>
                  <div class="upload-div" v-show="isShowUploadArea">
                    <el-upload
                      :show-file-list="false"
                      drag
                      action
                      :on-change="handleUploadFile"
                      :auto-upload="false"
                      multiple
                    >
                      <i class="el-icon-upload"></i>
                      <div class="el-upload__text">
                        <p>可直接将文件拖拽到页面空白处等待上传</p>
                        <p class="upload-btn">选择文件</p>
                      </div>
                    </el-upload>
                  </div>
                  <div style="width:90%" v-show="uploadFileList.length>0">
                    <el-table :data="uploadFileList" style="width: 100%" class="m-t-20" border>
                      <el-table-column prop="name" label="文件名称">
                        <template slot-scope="scope">
                          <div>
                            <p>{{scope.row.name}}</p>
                            <p>0/{{scope.row.size}}</p>
                          </div>
                        </template>
                      </el-table-column>
                      <el-table-column prop="gs" label="格式"></el-table-column>
                      <el-table-column prop="type" label="应用类型">
                        <template slot-scope="scope">
                          <el-tag type="info" class="m-t-5 m-l-5">{{scope.row.type}}</el-tag>
                        </template>
                      </el-table-column>
                      <el-table-column prop="zt" label="状态">
                        <template slot-scope="scope">
                          <span :class="{'color-67C23A':scope.row.zt=='上传中'}">{{scope.row.zt}}</span>
                        </template>
                      </el-table-column>
                      <el-table-column label="操作" width="120" fixed="right">
                        <template slot-scope="scope">
                          <div class="font18">
                            <i class="el-icon-video-pause" v-show="scope.row.zt=='上传中'"></i>
                            <i class="el-icon-upload2" v-show="scope.row.zt!='上传中'"></i>
                            <i
                              class="el-icon-delete m-l-10"
                              @click="deleUploadFile(scope.$index,scope.row)"
                            ></i>
                          </div>
                        </template>
                      </el-table-column>
                    </el-table>
                    <div class="around-center">
                      <p class="upload-btn" @click="uploadFileServe">开始上传</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    width: {
      type: String,
      default: ""
    },
    title: {
      type: String,
      default: ""
    }
  },
  computed: {},

  data() {
    return {
      // 控制弹框显示
      isShow: false,
      // 最小化
      ismini: false,
      // 专业数据
      majorObj: {},
      // 课程数据
      courseObj: {},
      // 该课程所有的类型
      allType: [
        { name: "实训手册", value: "1" },
        { name: "技能竞赛", value: "2" },
        { name: "职业认证", value: "3" },
        { name: "职业认证", value: "4" }
      ],
      // 默认的资源类型
      defaultType: { name: "实训手册", value: "1" },
      // 上传的文件列表
      uploadFileList: [{ gs: "jpg", name: "54565665", zt: "上传中" }],
      // 待上传文件的大小
      uploadFileSize: 0,
      // 文件大小限制
      fileMinSize: 1024 * 1024 * 500,
      fileMaxSize: 1024 * 1024 * 1024,
      // 是否显示上传区域
      isShowUploadArea: true
    };
  },
  methods: {
    getData(data) {
      this.isShow = true;
      this.majorObj = data[0];
      this.courseObj = data[1];
      document.body.style.position = "fixed";
      document.body.style.overflow = "hidden";
    },
    // 关闭弹窗
    closeDialog() {
      this.isShow = false;
      document.body.style.position = "relative";
      document.body.style.overflow = "auto";
    },
    // 资源类型改变
    typeChange(item) {
      this.defaultType = item;
    },
    // 上传文件到列表
    handleUploadFile(file) {
      let fileObj = {};
      fileObj.type = this.defaultType;
      let index = file.name.lastIndexOf(".");
      fileObj.gs = file.name.substr(index + 1);
      fileObj.raw = file.raw;
      fileObj.name = file.name.substring(0, index);
      fileObj.size = this.convertByte(file.size);
      fileObj.percentage = file.percentage;
      fileObj.zt = "等待上传";
      this.uploadFileSize += file.size;
      if (this.fileMinSize <= file.size) {
        this.$alert("500M以上文件只能单个上传！", "提示", {
          confirmButtonText: "确定",
          type: "warning",
          callback: action => {
            this.isShowUploadArea = false;
          }
        });
      }
      if (this.fileMaxSize <= this.uploadFileSize) {
        this.$alert("批量上传总量不能超过1G！", "提示", {
          confirmButtonText: "确定",
          type: "warning",
          callback: action => {
            this.isShowUploadArea = false;
          }
        });
      }
      this.uploadFileList.push(fileObj);
    },
    // 删除上传文件
    deleUploadFile(index, row) {
      this.uploadFileList.splice(index, 1);
      if ((this.uploadFileList.length = 0)) {
        this.isShowUploadArea = true;
      }
    },
    // 上传文件到服务器
    uploadFileServe() {
      if (this.fileMaxSize <= this.uploadFileSize) {
        this.$alert("批量上传总量不能超过1G！", "提示", {
          confirmButtonText: "确定",
          type: "warning",
          callback: action => {
            this.isShowUploadArea = false;
          }
        });
      }
    },
    // 转换字节
    convertByte(limit) {
      let size = "";
      if (limit < 0.1 * 1024) {
        //小于0.1KB，则转化成B
        size = limit.toFixed(2) + "B";
      } else if (limit < 0.1 * 1024 * 1024) {
        //小于0.1MB，则转化成KB
        size = (limit / 1024).toFixed(2) + "KB";
      } else if (limit < 0.1 * 1024 * 1024 * 1024) {
        //小于0.1GB，则转化成MB
        size = (limit / (1024 * 1024)).toFixed(2) + "MB";
      } else {
        //其他转化成GB
        size = (limit / (1024 * 1024 * 1024)).toFixed(2) + "GB";
      }
      let sizeStr = size + ""; //转成字符串
      let index = sizeStr.indexOf("."); //获取小数点处的索引
      let dou = sizeStr.substr(index + 1, 2); //获取小数点后两位的值
      if (dou == "00") {
        //判断后两位是否为00，如果是则删除00
        return sizeStr.substring(0, index) + sizeStr.substr(index + 3, 2);
      }
      return size;
    },
    minimizeDialog() {
      this.ismini = !this.ismini;
      if (this.ismini) {
        document.body.style.position = "relative";
        document.body.style.overflow = "auto";
      } else {
        document.body.style.position = "fixed";
        document.body.style.overflow = "hidden";
      }
    }
  },
  mounted() {}
};
</script>
<style scoped>
.border-btn {
  color: var(--theme-color);
  border: 1px solid var(--theme-color);
  padding: 2px 5px;
  border-radius: 3px;
}

.upload-btn {
  cursor: pointer;
  display: inline-block;
  background: var(--theme-color);
  color: #ffffff;
  border-radius: 3px;
  padding: 5px 30px;
  margin-top: 60px;
}

.upload-div >>> .el-upload-dragger {
  height: auto;
  border: none;
}

.mask1 {
  position: fixed;
  z-index: 2000;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0px;
  background: rgba(0, 0, 0, 0.5);
}
.mask2 {
  position: fixed;
  z-index: 2000;
  width: 400px;
  height: 50px;
  right: 0px;
  bottom: 0px;
}

.body_div {
  position: relative;
  width: 60%;
  height: 100%;
  background: #ffffff;
  border-radius: 2px;
  -webkit-box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  display: flex !important;
  display: -webkit-box !important;
  display: -webkit-flex !important;
  flex-direction: column;
  -webkit-flex-direction: column;
  overflow-y: hidden;
}

.flex-end {
  display: flex;
  display: -webkit-flex;
  align-items: flex-start;
  -webkit-align-items: flex-start;
  justify-content: flex-end;
  -webkit-justify-content: flex-end;
}

.closePopupIcon {
  display: block;
  width: 40px;
  height: 40px;
  line-height: 40px;
  text-align: center;
  color: #303133;
  background: #e0e3ea;
  font-size: 18px;
  margin-right: 1px;
}
.closePopupIcon:hover {
  color: #2e77f8;
  cursor: pointer;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
.dialog_header {
  width: 100%;
  background: var(--theme-color);
  color: #ffffff;
}
.right_body_div {
  width: 100%;
  height: 100%;
  overflow-y: scroll;
}
.is-scroll-right::-webkit-scrollbar,
.is-scroll-left::-webkit-scrollbar,
.el-scrollbar::-webkit-scrollbar {
  width: 4px;
  height: 8px !important;
}
/*滚动条的背景区域的内阴影*/
.el-scrollbar::-webkit-scrollbar-track {
  box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.3) inset;
  /*滚动条的背景区域的圆角*/
  border-radius: 10px;
  /*滚动条的背景颜色*/
  background-color: #ddd;
}
/*滑块 滚动条的内阴影*/
.is-scroll-right::-webkit-scrollbar-thumb,
.is-scroll-left::-webkit-scrollbar-thumb,
.el-scrollbar::-webkit-scrollbar-thumb {
  box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.3) inset;
  background-color: var(--theme-color);
  border-radius: 4px;
}
::-webkit-scrollbar:horizontal {
  width: 0;
  height: 10px !important;
}
::-webkit-scrollbar-track:horizontal {
  background-color: #fff;
}
</style>
