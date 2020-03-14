import Vue from 'vue'
import Vuex from 'vuex' //vuex模板传值
Vue.use(Vuex)

var state = {
    guide:[
           {
               title:'用户操作',
               url:'',
               icon:'el-icon-user-solid',
               agent:[
                   {
                       title:'用户管理',
                       url:'/username'
                   },
                   {
                    title:'用户绘图',
                    url:'/userline'
                  }
               ]
           },
           {
               title:'分类管理',
               url:'/',
               icon:'el-icon-menu',
               agent:[
                {
                    title:'漫画分类',
                    url:'/Theme'
                },
                {
                 title:'漫画管理',
                 url:'/Cartoon'
               }
            ]
           }
    ],
    isCollapse:false
}

var mutations = {
    toggleSiderBar(state) {
        state.isCollapse = !state.isCollapse
    }
}


const store = new Vuex.Store({
    state, //属性的简写
    mutations,
}) 
export default store;