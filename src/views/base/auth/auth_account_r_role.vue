<template>
  <div>
    <el-row :gutter="5">
      <el-col :md="5" :lg="5" :sm="5">
        <!--<nav-menu-bar :menuList="menuData"></nav-menu-bar>-->
        <el-table
          :data="teacherData"
          style="width: 100%;margin-bottom: 20px;"
          row-key="userId"
          border
          :show-header="false"
          default-expand-all
          @row-click="handleMenuClick"
          :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
        >
          <el-table-column prop="username" label="名字"></el-table-column>
        </el-table>
      </el-col>
      <el-col :md="19" :lg="19" :sm="19">
        <el-form :inline="true" :model="userForm" size="mini" class="demo-form-inline">
          <el-form-item label="姓名">
            <el-input v-model="userForm.username" placeholder></el-input>
          </el-form-item>
          <el-form-item label="职务">
            <el-input v-model="userForm.post" placeholder></el-input>
          </el-form-item>
          <el-form-item label>
            <el-checkbox v-model="userForm.noRole" label="无角色" name="noRole"></el-checkbox>
            <el-checkbox v-model="userForm.class" label="班级" name="class"></el-checkbox>
          </el-form-item>
          <el-form-item>
            <el-button type="success" @click="handleSearch">查询</el-button>
          </el-form-item>
        </el-form>
        <div>
          <el-button size="mini" plain>重置密码</el-button>
          <el-button size="mini" @click="handleAppointRole" plain>指定角色</el-button>
        </div>
        <div style="margin-top: 1vw">
          <el-table
            ref="singleTable"
            :data="tableData"
            border
            highlight-current-row
            tooltip-effect="dark"
            @current-change="handleCurrentChange"
            @selection-change="handleSelectionChange"
            style="width: 100%"
          >
            <el-table-column type="selection" align="center" header-align="center" width="55"></el-table-column>
            <el-table-column
              type="index"
              label="序号"
              align="center"
              header-align="center"
              width="55"
            ></el-table-column>
            <el-table-column
              property="username"
              label="姓名"
              align="center"
              header-align="center"
              min-width="120"
            ></el-table-column>
            <el-table-column
              property="dept"
              label="部门"
              align="center"
              header-align="center"
              min-width="120"
            ></el-table-column>
            <el-table-column
              property="post"
              label="职务"
              align="center"
              header-align="center"
              min-width="120"
            ></el-table-column>
            <el-table-column
              property="mobile"
              label="电话"
              align="center"
              header-align="center"
              min-width="130"
            ></el-table-column>
            <el-table-column
              property="account"
              label="账号"
              align="center"
              header-align="center"
              min-width="120"
            ></el-table-column>
            <el-table-column
              property="password"
              label="密码"
              align="center"
              header-align="center"
              min-width="120"
            ></el-table-column>
            <el-table-column
              property="role"
              label="角色"
              align="center"
              header-align="center"
              min-width="120"
            ></el-table-column>
          </el-table>
        </div>
        <div style="margin-top: 1vw">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="4"
            :page-sizes="[100, 200, 300, 400]"
            :page-size="100"
            background
            layout="total, prev, pager, next, jumper"
            :total="1000"
          ></el-pagination>
        </div>
      </el-col>
    </el-row>

    <el-drawer :visible.sync="drawer" :with-header="false">
      <div style="margin-top: 6vw;text-align: center;">
        <h3>角色授权</h3>
        <br />
        <el-checkbox-group v-model="checkList" style="width: 60%;margin: 0 auto;text-align: left">
          <el-checkbox
            :label="role.roleId"
            v-for="(role, index) in roleList"
            :key="index"
          >{{role.name}}</el-checkbox>
        </el-checkbox-group>
        <div style="bottom: 2vw;margin: 0 auto;margin-top: 20%;">
          <el-button type="success" size="mini" @click="handleSubmit">保存</el-button>
        </div>
      </div>
    </el-drawer>
  </div>
</template>

<script>
// import NavMenuBar from '@/components/nav-menu/NavMenuBar'

export default {
  name: "UserList",
  data() {
    return {
      drawer: false,
      userForm: {
        username: "",
        post: "",
        noRole: false,
        class: ""
      },
      roleList: [],
      checkList: [1, 4, 5, 9],
      teacherData: [
        {
          userId: 1,
          username: "全校老师",
          children: [
            {
              userId: 2,
              username: "校办",
              children: [
                {
                  userId: 6,
                  username: "李校"
                },
                {
                  userId: 7,
                  username: "王校"
                }
              ]
            },
            {
              userId: 3,
              username: "教务科",
              children: [
                {
                  userId: 8,
                  username: "李科长"
                },
                {
                  userId: 9,
                  username: "胡老师"
                }
              ]
            },
            {
              userId: 4,
              username: "信息中心"
            },
            {
              userId: 5,
              username: "招生办"
            }
          ]
        }
      ],
      tableData: [
        {
          username: "王鑫",
          dept: "教务科",
          post: "科长",
          mobile: "13888888888",
          account: "账号",
          password: "密码",
          role: "角色"
        },
        {
          username: "王鑫",
          dept: "教务科",
          post: "科长",
          mobile: "13888888888",
          account: "账号",
          password: "密码",
          role: "角色"
        },
        {
          username: "王鑫",
          dept: "教务科",
          post: "科长",
          mobile: "13888888888",
          account: "账号",
          password: "密码",
          role: "角色"
        },
        {
          username: "王鑫",
          dept: "教务科",
          post: "科长",
          mobile: "13888888888",
          account: "账号",
          password: "密码",
          role: "角色"
        },
        {
          username: "王鑫",
          dept: "教务科",
          post: "科长",
          mobile: "13888888888",
          account: "账号",
          password: "密码",
          role: "角色"
        },
        {
          username: "王鑫",
          dept: "教务科",
          post: "科长",
          mobile: "13888888888",
          account: "账号",
          password: "密码",
          role: "角色"
        },
        {
          username: "王鑫",
          dept: "教务科",
          post: "科长",
          mobile: "13888888888",
          account: "账号",
          password: "密码",
          role: "角色"
        },
        {
          username: "王鑫",
          dept: "教务科",
          post: "科长",
          mobile: "13888888888",
          account: "账号",
          password: "密码",
          role: "角色"
        }
      ],
      multipleSelection: []
    };
  },
  components: {
    // NavMenuBar
  },
  methods: {
    handleSearch() {},
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    handleMenuClick(row) {
      console.log(row);
    },
    handleAppointRole() {
      this.drawer = true;
    },
    handleSubmit() {}
  },
  created() {
    for (let i = 0; i < 10; i++) {
      this.roleList.push({ roleId: i, name: "角色" + i });
    }
  }
};
</script>

<style>
.el-button--success:focus,
.el-button--success:hover {
  background: var(--theme-color);
  border-color: var(--theme-color);
  color: #fff;
}

.el-button--success {
  color: #fff;
  background-color: var(--theme-color);
  border-color: var(--theme-color);
}

.el-table__expand-icon {
  float: right;
}

.el-pager li.active {
  color: var(--theme-color);
}

.el-pager li:hover {
  color: var(--theme-color);
}

.el-pagination.is-background .el-pager li:not(.disabled).active {
  background-color: var(--theme-color);
}

.el-button.is-plain {
  color: var(--theme-color);
  background: #ffffff;
  border-color: var(--theme-color);
}

.el-button.is-plain:hover,
.el-button.is-plain:focus {
  color: #fff;
  background-color: var(--theme-color);
  border-color: var(--theme-color);
}

.el-checkbox__input.is-checked + .el-checkbox__label {
  color: var(--theme-color);
}

.el-checkbox__input.is-checked .el-checkbox__inner,
.el-checkbox__input.is-indeterminate .el-checkbox__inner {
  background-color: var(--theme-color);
  border-color: var(--theme-color);
}
</style>
