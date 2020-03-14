import http from '@/api/http';

export default {
  //后台登录接口
  signin(params){
     return http.post('/admin/base/login',params)
  },
  //用户管理页
  userList(params){
    return http.post('/admin/user/getlist',params)
  },
  //后台用户管理增删改查
  userListAddto(params){
    return http.post('/admin/base/addto',params)
  },
  //绘图
  Mapping(params){
    return http.post('/admin/Legend/auto',params);
  },
  //题材
  theme(params){
    return http.post('/admin/type/getList',params);
  },
  //题材增删改
  themeListAuto(params){
    return http.post('/admin/type/auto',params);
  },
  themeList(params){
    return http.post('/admin/type/getLists',params);
  },
  //漫画列表
  cartoonLIst(params){
    return http.post('/admin/type/cartoonList',params);
  },
  //漫画添加页题材
  cartoonAuto(params){
    return http.post('/admin/type/cartoonAdd',params);
  },
  //漫画增删改
  cartoonAdd(params){
    return http.post('/admin/type/cartoonAdd',params);
  },
  image(params){
    return http.post('/admin/base/image',params);
  },

}