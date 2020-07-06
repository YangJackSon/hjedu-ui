import mydrawer from './my_drawer.vue'
const myDrawer = {
    install: function (Vue) {
        // 注册并获取组件，然后在main.js中引用，在Vue.use()就可以了
        Vue.component('my-drawer', mydrawer)
    }
}
export default myDrawer