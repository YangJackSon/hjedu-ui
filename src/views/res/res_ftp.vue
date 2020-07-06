<template>
  <div>
    <el-card class="ftp-card around-center">
      <el-form
        label-width="100px"
        ref="refForm"
        :rules="termDataRules"
        :model="ftpDataForm"
        style="width:500px"
      >
        <p class="text-center color-333 m-b-20 font16">FTP存储配置</p>
        <el-form-item label="IP地址" prop="ip">
          <el-input v-model="ftpDataForm.ip"></el-input>
        </el-form-item>
        <el-form-item label="端口号" prop="port">
          <el-input v-model="ftpDataForm.port"></el-input>
        </el-form-item>
        <el-form-item label="账 号" prop="account">
          <el-input v-model="ftpDataForm.account"></el-input>
        </el-form-item>
        <el-form-item label="密 码" prop="password">
          <el-input v-model="ftpDataForm.password"></el-input>
        </el-form-item>
        <el-form-item label="存储目录" prop="savelib">
          <el-input v-model="ftpDataForm.savelib"></el-input>
        </el-form-item>
        <el-form-item label="应用服务器" prop="applyserve">
          <el-input v-model="ftpDataForm.applyserve"></el-input>
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="ftpDataForm.defaultmethod">设为默认存储方式</el-checkbox>
        </el-form-item>
        <el-form-item class="around-center">
          <div class="flex_mid">
            <p class="cancle-btn" @click="resetForm()">重 置</p>
            <p class="ok-btn m-l-30" @click="saveData">保 存</p>
          </div>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  computed: {},

  data() {
    return {
      termDataRules: {
        ip: [
          {
            required: true,
            message: "请输入ip",
            trigger: "blur"
          }
        ],
        port: [
          {
            required: true,
            message: "请输入端口号",
            trigger: "blur"
          }
        ],
        account: [
          {
            required: true,
            message: "请输入账号",
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            message: "请输入密码",
            trigger: "blur"
          }
        ],
        savelib: [
          {
            required: true,
            message: "请输入存储目录",
            trigger: "blur"
          }
        ],
        applyserve: [
          {
            required: true,
            message: "请输入应用服务器",
            trigger: "blur"
          }
        ]
      },
      // 存放表单数据
      ftpDataForm: {}
    };
  },
  methods: {
    // 保存数据
    saveData() {
      this.$refs.refForm.validate(valid => {
        if (valid) {
        } else {
          return false;
        }
      });
    },
    // 重置表单
    resetForm() {
      this.$refs.refForm.resetFields();
    }
  }
};
</script>

<style scoped>
.app-container >>> .el-header {
  padding: 0 2vw;
  background: #fff;
}

.app-container >>> .el-main {
  padding: 20px 2vw;
}

.ftp-card {
  padding: 50px 0px 70px 0px;
}
</style>
