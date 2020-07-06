import myradio from './my_radio.vue'
const myRadio = {
    install: function (Vue) {
        // 注册并获取组件，然后在main.js中引用，在Vue.use()就可以了
        Vue.component('my-radio', myradio)
    }
}
export default myRadio