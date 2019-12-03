
// 引入Vue
import Vue from 'vue'

// 引入路由
import Router from 'vue-router'

// 把路由安装到Vue身上
Vue.use(Router)

// 引入我们的组件
// import login from '../components/login.vue'
// import register from '../components/register.vue'
// @ 代表src目录
import login from '@/components/login.vue'
import register from '@/components/register.vue'
import home from '@/components/tabbar/home.vue'
import shopcar from '@/components/tabbar/shopcar.vue'
import person from '@/components/tabbar/person.vue'
import newslist from '@/components/news/newslist.vue'
import newsdetail from '@/components/news/newsdetail.vue'
import goodslist from '@/components/goods/goodslist.vue'
import goodsdetail from '@/components/goods/goodsdetail.vue'

const routes = [
  { 'path': '/', redirect: '/home' },
  { 'path': '/login', 'component': login },
  { 'path': '/register', 'component': register },
  { 'path': '/home', 'component': home },
  { 'path': '/shopcar', 'component': shopcar },
  { 'path': '/person', 'component': person },
  { 'path': '/newslist', 'component': newslist },
  { 'path': '/newsdetail/:id', 'component': newsdetail },
  { 'path': '/goodslist', 'component': goodslist },
  { 'path': '/goodsdetail/:id', 'component': goodsdetail }
]

// 实例化路由对象 
const router = new Router({
  // 路由规则 routes:[{}]
  routes
})

// 通过export default 把路由对象暴露出去
export default router
