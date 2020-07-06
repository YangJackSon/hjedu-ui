import depttree from './dept_tree.vue'
const deptTree = {
    install: function(Vue) {
        // 注册并获取组件，然后在main.js中引用，在Vue.use()就可以了
        Vue.component('dept-tree', depttree)
    }
}
export default deptTree