<template>
  <div>
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <div class="flex_dom">
        <div>
          <div class="flex_dom">
            <el-form-item label="姓名" prop="name">
              <el-input class="wid210-no" placeholder="请输入姓名" v-model="ruleForm.name"></el-input>
            </el-form-item>
            <div class="m-t-10 m-l-20">
              <el-radio v-model="ruleForm.sex" label="1">男</el-radio>
              <el-radio v-model="ruleForm.sex" label="2">女</el-radio>
            </div>
          </div>

          <el-form-item label="出生日期" prop="date">
            <el-date-picker
              class="wid185-no"
              v-model="ruleForm.date"
              type="date"
              placeholder="选择日期"
            ></el-date-picker>
          </el-form-item>

          <el-form-item label="身份证件号" prop="idcard">
            <el-input
              placeholder="请输入身份证号"
              v-model="ruleForm.idcard"
              class="input-with-select wid340"
            >
              <el-select
                v-model="ruleForm.idType"
                class="wid150-no"
                slot="prepend"
                placeholder="身份证类型"
              >
                <el-option label="身份证" value="1"></el-option>
                <el-option label="港澳台通信证" value="2"></el-option>
              </el-select>
            </el-input>
          </el-form-item>
        </div>
        <div class="m-l-40">
          <el-upload
            class="avatar-uploader"
            action="#"
            :auto-upload="false"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="imageUrl" :src="imageUrl" width="120px" height="160px" />
            <!--<i v-else class="wid120 hgt160"></i>-->
            <img v-else width="120px" height="160px" src="@/assets/imgs/timg.jpg" />
          </el-upload>
        </div>
      </div>
      <div class="m-b-40"></div>

      <el-form-item label="所属机构">
        <el-input class="wid400" placeholder="请输机构名" v-model="ruleForm.jigou"></el-input>
      </el-form-item>

      <el-form-item label="职务/工号">
        <el-input class="wid190 m-r-20" placeholder="请输职务" v-model="ruleForm.zhiwu"></el-input>
        <el-input class="wid190" placeholder="请输工号" v-model="ruleForm.gonghao"></el-input>
      </el-form-item>

      <el-form-item label="联系方式">
        <el-input class="wid190 m-r-20" placeholder="请输手机号" v-model="ruleForm.phone"></el-input>
        <el-input class="wid190" placeholder="请输其他联系方式" v-model="ruleForm.ather"></el-input>
      </el-form-item>

      <el-form-item label="现住址">
        <el-input class="wid400" placeholder="请输现住址" v-model="ruleForm.xianzhuzhi"></el-input>
      </el-form-item>

      <el-form-item label="双师型老师">
        <el-switch
          class="m-r-35"
          v-model="ruleForm.value1"
          active-color="#5DD6C9"
          inactive-color="#9E9E9E"
        ></el-switch>兼职老师
        <el-switch
          class="m-l-10 m-r-35"
          v-model="ruleForm.value2"
          active-color="#5DD6C9"
          inactive-color="#9E9E9E"
        ></el-switch>外聘老师
        <el-switch
          class="m-l-10 m-r-35"
          v-model="ruleForm.value3"
          active-color="#5DD6C9"
          inactive-color="#9E9E9E"
        ></el-switch>
      </el-form-item>
      <div class="m-b-40"></div>

      <el-form-item label="到校日期">
        <el-date-picker class="wid185-no" v-model="ruleForm.dxrq" type="date" placeholder="选择日期"></el-date-picker>
      </el-form-item>

      <el-form-item label="从教年月">
        <el-date-picker class="wid185-no" v-model="ruleForm.cjny" type="date" placeholder="选择日期"></el-date-picker>
      </el-form-item>

      <el-form-item label="参加工作年月">
        <el-date-picker class="wid185-no" v-model="ruleForm.gzny" type="date" placeholder="选择日期"></el-date-picker>
      </el-form-item>

      <div class="m-b-40"></div>

      <el-form-item label="名族">
        <el-select v-model="ruleForm.mz" placeholder="请选择名族">
          <el-option label="汉族" value="shanghai"></el-option>
          <el-option label="维吾尔族" value="beijing"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="政治面貌">
        <el-select v-model="ruleForm.zzmm" placeholder="请选择政治面貌">
          <el-option label="党员" value="shanghai"></el-option>
          <el-option label="团员" value="beijing"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="婚姻状况">
        <my-radio :list="hyList" @radioChange="hyClick"></my-radio>
      </el-form-item>

      <el-form-item label="健康状况">
        <my-radio :list="jkList" @radioChange="jkClick"></my-radio>
      </el-form-item>

      <el-form-item label="证件上传"></el-form-item>
      <el-upload
        class="upload-demo"
        drag
        action="#"
        :limit="2"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :file-list="fileList"
        :auto-upload="false"
        multiple
      >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">
          将文件拖到此处，或
          <em>点击上传</em>
        </div>
        <div class="el-upload__tip" slot="tip">请上传身份证头像面，国徽面两张图片</div>
      </el-upload>

      <div class="m-b-40"></div>

      <el-form-item>
        <el-button type="primary" @click="onSubmit('ruleForm')">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  computed: {},
  props: {
    id: {
      type: String
    },
    type: {
      default: 1
    }
  },
  data() {
    return {
      hyList: [
        { name: "未婚", value: "1" },
        { name: "已婚", value: "2" },
        { name: "离异", value: "3" },
        { name: "其他未说明的婚姻状况", value: "4" }
      ],
      jkList: [
        { name: "健康或良好", value: "1" },
        { name: "一般或较弱", value: "2" },
        { name: "有慢性病", value: "3" },
        { name: "残疾", value: "4" }
      ],
      fileList: [],
      rules: {
        name: [
          { required: true, message: "请输入姓名", trigger: "blur" },
          { min: 0, max: 10, message: "长度在 0 到 10 个字符", trigger: "blur" }
        ],
        date: [{ required: true, message: "请选择时间", trigger: "blur" }],
        idcard: [
          { required: true, message: "请输入身份证号", trigger: "blur" },
          { min: 0, max: 18, message: "长度在 0 到 18 个字符", trigger: "blur" }
        ],
        region: [
          { required: true, message: "请选择活动区域", trigger: "change" }
        ],
        date1: [
          {
            type: "date",
            required: true,
            message: "请选择日期",
            trigger: "change"
          }
        ],
        date2: [
          {
            type: "date",
            required: true,
            message: "请选择时间",
            trigger: "change"
          }
        ],
        type: [
          {
            type: "array",
            required: true,
            message: "请至少选择一个活动性质",
            trigger: "change"
          }
        ],
        resource: [
          { required: true, message: "请选择活动资源", trigger: "change" }
        ],
        desc: [{ required: true, message: "请填写活动形式", trigger: "blur" }]
      },
      ruleForm: {
        name: "",
        sex: "",
        date: "",
        idcard: "",
        idType: "",
        jigou: "",
        zhiwu: "",
        gonghao: "",
        phone: "",
        ather: "",
        xianzhuzhi: "",
        value1: "",
        value2: "",
        value3: "",
        dxrq: "",
        cjny: "",
        gzny: "",
        mz: "",
        zzmm: "",
        isactive: 1,
        isactive2: 1
      },
      imageUrl: ""
    };
  },
  methods: {
    jkClick(item) {
      console.log(item);
    },
    hyClick(item) {},
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    maryClick(e) {
      this.ruleForm.isactive = e;
    },
    maryClick2(e) {
      this.ruleForm.isactive2 = e;
    },
    onSubmit() {
      this.$emit("teacherSubmit");
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
      console.log(this.imageUrl);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    }
  }
};
</script>

<style scoped>
.maryActive {
  color: #5dd6c9;
  border-color: #cef3ef;
  background-color: #effbfa;
}
</style>
