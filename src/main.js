
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './index.css'
import '@/styles/global.css'
import '@/styles/lw.css'
import '@/styles/style.css'
import '@/styles/theme/index.css'
import '@/directives'
import myRadio from "@/components/radio/index";
import myTree from "@/components/tree/my_tree";
import deptTree from '@/components/tree/dept_tree/index'
import myDrawer from '@/components/drawer/index'
import myTabs from '@/components/tabs/index'
import subMenu from '@/components/nav/sub_menu/index'

import code from '@/api/code/code'

Vue.prototype.$code = code;
Vue.config.productionTip = false

Vue.use(ElementUI)
Vue.use(deptTree);
Vue.use(myRadio)
Vue.use(myDrawer)
Vue.use(myTree)
Vue.use(myTabs)
Vue.use(subMenu)

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
