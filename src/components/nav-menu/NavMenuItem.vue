<template>
    <div v-if="item.children">
        <template v-if="item.children.left == 0">
            <el-menu-item :index="String(item.index)">
                {{item.name}}
            </el-menu-item>
        </template>

        <el-submenu v-else :index="String(item.index)">
            <template slot="title">
                {{item.name}}
            </template>
            <template v-for="child in item.children">
                <nav-menu-item v-if="child.children && child.children.length > 0" :item="child" :key="child.index">

                </nav-menu-item>
                <el-menu-item v-else :key="child.index" :index="String(child.index)">
                    {{child.name}}
                </el-menu-item>
            </template>
        </el-submenu>
    </div>
</template>

<script>
    export default {
        name: "NavMenuItem",
        props: {
            item: {
                type: Object,
                require: true

            }
        }
    }
</script>

<style>
    .el-submenu{
        border-color: #EDEDED;
    }

</style>
