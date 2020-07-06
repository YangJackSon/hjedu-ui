<template>
    <div>
        <el-row :gutter="12">
            <el-col :md="8" :lg="6" :sm="12">
                <el-card @click.native="handleEdit" style="margin-top: 1vw" body-style="margin: 0 auto;text-align: center;height:200px; cursor: pointer;">
                    <i style="font-size: 68px;margin-top: 18%;color: #D3D3D3" class="el-icon-circle-plus-outline"></i>
                </el-card>
            </el-col>
            <el-col :md="8" :lg="6" :sm="12" v-for="(item, index) in roles" :key="index">
                <el-card style="margin-top: 1vw" body-style="text-align: center;height:142px">
                    <div slot="header">
                        <span>{{item.name}}</span>
                    </div>
                    <div style="padding: 14px;margin-left: 20%">
                        <el-breadcrumb separator="|">
                            <el-breadcrumb-item>
                                <span v-if="item.userCount > 0">用户 {{item.userCount}}</span>
                                <span class="no-count" v-else>无用户</span>
                            </el-breadcrumb-item>
                            <el-breadcrumb-item>
                                <span v-if="item.userCount > 0">PC应用 {{item.pcCount}}</span>
                                <span class="no-count" v-else>无PC应用</span>
                            </el-breadcrumb-item>
                            <el-breadcrumb-item>
                                <span v-if="item.appCount > 0">移动应用 {{item.appCount}}</span>
                                <span class="no-count" v-else>无移动应用</span>
                            </el-breadcrumb-item>
                        </el-breadcrumb>
                    </div>
                    <div style="padding-top: 3vw">
                        <div style="float: right">
                            <el-button icon="el-icon-delete" circle @click="handleDelete"></el-button>
                            <el-button icon="el-icon-edit-outline" circle @click="handleEdit"></el-button>
                        </div>
                    </div>

                </el-card>
            </el-col>
        </el-row>

        <el-drawer :visible.sync="drawer" :with-header="false">
            <div style="margin-top: 6vw;text-align: center;">
                <h3>角色授权</h3>
                <br>
                <el-form style="width: 90%" :model="roleForm" :rules="rules" ref="roleForm" size="mini"
                         label-width="60px">
                    <el-form-item label="角色" prop="name">
                        <el-input v-model="roleForm.name"></el-input>
                    </el-form-item>
                </el-form>
                <el-radio-group v-model="tabAuth" size="mini" style="margin-bottom: 30px;">
                    <el-radio-button label="pc">PC权限</el-radio-button>
                    <el-radio-button label="app">应用权限</el-radio-button>
                    <el-radio-button label="user">用户权限</el-radio-button>
                </el-radio-group>
                <div>
                    <div v-if="tabAuth === 'pc'" style="margin-left: 20%;">
                        <el-tree
                                :data="pcAuthData"
                                show-checkbox
                                node-key="authId"
                                default-expand-all
                                :default-checked-keys="[3,5]"
                                :props="pcProps">
                        </el-tree>
                    </div>
                    <div v-if="tabAuth === 'app'" style="margin-left: 20%;">
                        <el-tree
                                :data="appAuthData"
                                show-checkbox
                                node-key="authId"
                                default-expand-all
                                :default-checked-keys="[3,5]"
                                :props="appProps">
                        </el-tree>
                    </div>
                    <div v-if="tabAuth === 'user'">
                        <el-input size="mini" style="width: 50%"
                                  placeholder="请输入教师名字"
                                  v-model="userAuthFilter">
                        </el-input>

                        <el-tree style="margin-left: 20%"
                                :data="userAuthData"
                                :props="userProps"
                                show-checkbox
                                node-key="userId"
                                default-expand-all
                                :filter-node-method="filterNode"
                                ref="userAuthTree">
                        </el-tree>
                    </div>
                </div>
                <div style="bottom: 2vw;margin: 0 auto;margin-top: 20%;">
                    <el-button type="info" size="mini">重置</el-button>
                    <el-button type="success" size="mini" @click="handleSubmit">保存</el-button>
                </div>
            </div>
        </el-drawer>
    </div>
</template>

<script>
    export default {
        name: "RoleList",
        data() {
            return {
                roles: [
                    {
                        name: '班主任',
                        userCount: 15,
                        pcCount: 3,
                        appCount: 4
                    },
                    {
                        name: '老师',
                        userCount: 15,
                        pcCount: 3,
                        appCount: 4
                    },
                    {
                        name: '老师',
                        userCount: 0,
                        pcCount: 0,
                        appCount: 0
                    },
                    {
                        name: '班主任',
                        userCount: 15,
                        pcCount: 3,
                        appCount: 4
                    },
                    {
                        name: '老师',
                        userCount: 15,
                        pcCount: 3,
                        appCount: 4
                    },
                    {
                        name: '老师',
                        userCount: 0,
                        pcCount: 0,
                        appCount: 0
                    }
                ],
                drawer: false,
                roleForm: {
                    name: '',
                    pcAuth: '',
                    appAuth: '',
                    userAuth: ''
                },
                rules: {
                    name: [
                        {required: true, message: '请输入角色名称', trigger: 'blur'},
                    ]
                },
                pcProps: {
                    label: 'name',
                    children: 'children'
                },
                appProps: {
                    label: 'name',
                    children: 'children'
                },
                userProps: {
                    label: 'username',
                    children: 'children'
                },
                tabAuth: 'pc',
                pcAuthData: [
                    {
                        authId: 1,
                        name: '应用支撑平台',
                        children: [
                            {
                                authId: 3,
                                name: '统一数据',
                            },
                            {
                                authId: 4,
                                name: '统一权限',
                            }
                        ]
                    },
                    {
                        authId: 2,
                        name: '招生平台',
                        children: [
                            {
                                authId: 5,
                                name: '基础设置',
                            },
                            {
                                authId: 6,
                                name: '欣新生录入',
                            },
                            {
                                authId: 7,
                                name: '新生录取',
                            }
                        ]
                    }
                ],
                appAuthData: [
                    {
                        authId: 1,
                        name: '应用支撑平台',
                        children: [
                            {
                                authId: 3,
                                name: '统一数据',
                            },
                            {
                                authId: 4,
                                name: '统一权限',
                            }
                        ]
                    },
                    {
                        authId: 2,
                        name: '招生平台',
                        children: [
                            {
                                authId: 5,
                                name: '基础设置',
                            },
                            {
                                authId: 6,
                                name: '欣新生录入',
                            },
                            {
                                authId: 7,
                                name: '新生录取',
                            }
                        ]
                    }
                ],
                userAuthData: [
                    {
                        userId: 1,
                        username: '全校老师',
                        children: [
                            {
                                userId: 2,
                                username: '校办',
                                children: [
                                    {
                                        userId: 6,
                                        username: '李校',
                                    },
                                    {
                                        userId: 7,
                                        username: '王校',
                                    }
                                ]
                            },
                            {
                                userId: 3,
                                username: '教务科',
                                children: [
                                    {
                                        userId: 8,
                                        username: '李科长',
                                    },
                                    {
                                        userId: 9,
                                        username: '胡老师',
                                    }
                                ]
                            },
                            {
                                userId: 4,
                                username: '信息中心',
                            },
                            {
                                userId: 5,
                                username: '招生办',
                            }
                        ]
                    },
                ],
                userAuthFilter: ''
            }
        },
        watch: {
            userAuthFilter(val) {
                this.$refs.userAuthTree.filter(val);
            }
        },
        methods: {
            handleDelete() {

            },
            filterNode(value, data) {
                if (!value) {
                    return true
                }
                return data.username.indexOf(value) !== -1
            },
            handleEdit() {
                this.drawer = true
            },
            handleSubmit(){

            }
        }
    }
</script>

<style>
    .no-count {
        color: red;
    }

    .el-radio-button__orig-radio:checked + .el-radio-button__inner {
        color: #FFF;
        background-color: var(--theme-color);
        border-color: var(--theme-color);
        box-shadow: -1px 0 0 0 var(--theme-color);
    }

    .el-button--success:focus, .el-button--success:hover {
        background: var(--theme-color);
        border-color: var(--theme-color);
        color: #FFF;
    }
     .el-button--success {
         color: #FFF;
         background-color: var(--theme-color);
         border-color: var(--theme-color);
     }
    /*!*.el-radio-button__orig-radio:hover + .el-radio-button__inner {*!*/
    /*color: var(--theme-color);*/
    /*}*/

</style>
