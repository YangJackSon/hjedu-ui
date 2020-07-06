import mytabs from './my_tabs.vue'
const myTabs = {
    install: function (Vue) {
        // 注册并获取组件，然后在main.js中引用，在Vue.use()就可以了
        Vue.component('my-tabs', mytabs)
    }
}
export default myTabs