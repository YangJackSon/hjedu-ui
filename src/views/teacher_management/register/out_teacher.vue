<template>
    <div>
        <el-form :model="form" ref="form" :rules="rules" label-width="100px" class="demo-ruleForm">
            <p class="text-center color-333 m-b-20 font16 m-b-20">离退登记</p>

            <el-form-item label="离退原因" prop="cause">
                <el-input class="wid210-no" placeholder="请输入离退原因" v-model="form.cause"></el-input>
            </el-form-item>
            <el-form-item label="离退学期" prop="term">
                <el-select v-model="form.term" placeholder="请选择离退学期">
                    <el-option label="2020上半年" value="shanghai"></el-option>
                    <el-option label="2020下半年" value="beijing"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="离退日期">
                <el-date-picker
                        class="wid185-no"
                        v-model="form.date"
                        type="date"
                        placeholder="选择离退日期">
                </el-date-picker>
            </el-form-item>
            <el-form-item>


                        <el-button type="primary" @click="onSubmit('ruleForm')">保存</el-button>



            </el-form-item>
        </el-form>

    </div>
</template>
<script>
    import {getInfoById} from '@/api/teacher_management/register'
    import {getCodTree} from '@/api/base/dbcenter/code'

    export default {
        computed: {},
        props: {
            id: {
                type: String,
            },
            type: {
                type: Number,
                default: 1
            }
        },
        data() {
            return {
                isactive: 1,
                rules: {
                    cause: [{required: true, message: '请输入离退原因', trigger: 'blur'},
                        {min: 0, max: 10, message: '长度在 0 到 10 个字符', trigger: 'blur'}],
                    term: [{required: true, message: '请输入离退原因', trigger: 'blur'},
                        {min: 0, max: 10, message: '长度在 0 到 10 个字符', trigger: 'blur'}],
                    date: [{required: true, message: '请输入离退原因', trigger: 'blur'},
                        {min: 0, max: 10, message: '长度在 0 到 10 个字符', trigger: 'blur'}],

                },
                form: {
                    cause: '',
                    term: '',
                    date: '',
                }
            }
        },
        methods: {
            onSubmit() {
                // this.$emit('outSubmit')
                // CustomAPI.queryCert(16).then
                this.getInfo()
            },
            async getInfo() {
                let res = await getInfoById(16);
                if (res.code === 200) {
                    console.log(res.data);
                }
            },
            changeType(e) {
                this.isactive = e
            }
        }
    };
</script>

<style scoped>
    .maryActive {
        color: #5DD6C9;
        border-color: #cef3ef;
        background-color: #effbfa;
    }
</style>
