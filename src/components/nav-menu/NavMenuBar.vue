<template>
    <div>
        <el-menu
                mode="vertical"
                default-active="1-2-3">
            <nav-menu-item v-for="menu in menuList" :key="menu.index" :item="menu"></nav-menu-item>
        </el-menu>
    </div>
</template>

<script>
    import NavMenuItem from './NavMenuItem'

    export default {
        name: "NavMenBar",
        components: {
            NavMenuItem
        },
        props: {
            menuList: {
                type: Array,
                require: true
            }
        }
    }
</script>

<style scoped>

</style>
