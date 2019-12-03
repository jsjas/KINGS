import Vue from 'vue'
import App from './App.vue'

import moment from 'moment'
// console.log( moment('2012-12-12 12:12:12').format('YYYY-MM-DD HH:mm:ss') )
// console.log( moment('2012-12-12 12:12:12').format('YYYY-MM-DD') )
// 导入路由对象
import router from './router/router.js'

import Vant from 'vant'
import 'vant/lib/index.css'

Vue.use(Vant)

// 关闭生成模式的提示信息
Vue.config.productionTip = false

// 定义全局时间转换过滤器
Vue.filter('dateFormat', function (dateStr, pattern = 'YYYY-MM-DD') {
  return moment(dateStr).format(pattern)
})

new Vue({
  // el: "#app",
  router, // 挂载app根组件，用于识别hash路由的变化
  render: h => h(App)
}).$mount('#app')
