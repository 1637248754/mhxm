import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/layout/Index'
import Username from '../View/admin/User'
import UserLine from '../View/admin/UserLine'
import Theme from '../View/type/ThemeType'
import Cartoon from '../View/type/cartoon'
import Signin from '@/layout/Signin'
import ElementUI from 'element-ui';
Vue.use(ElementUI);
var vue = new Vue({});
Vue.use(Router)

// 导航守卫
// 使用 router.beforeEach 注册一个全局前置守卫，判断用户是否登陆
var route = new Router({
  mode : 'history',
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index,
      children:[
        {
          //用户管理
          path: 'username',
          name: 'Username',
          component: Username,
        },
        {
          //用户绘图
          path: 'userline',
          name: 'userline',
          component: UserLine,
        },
        {
          //题材分类
          path: 'Theme',
          name: 'Theme',
          component: Theme,
        },
        {
          //漫画管理
          path: 'Cartoon',
          name: 'Cartoon',
          component: Cartoon,
        },
      ]
    },
    {
      path:'/signin',
      name:'signin',
      component:Signin
    }
  ]
})

//判断是否登录
route.beforeEach((to, from, next) => {
  if (to.path === '/signin') {
    next();
  } else {
    let token = localStorage.getItem('token');
    if (token === null || token === '') {
      vue.$message({
        message: '请您先登录谢谢!!',
        type: 'warning'
    })
    // return false
      next('/signin');
    } else {
      next();
    }
  }
});

const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
};

export default route
