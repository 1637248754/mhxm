import Vue from 'vue'
import axios from 'axios';
import ElementUI from 'element-ui';
Vue.use(ElementUI);
var vue = new Vue({});
let cancel, promiseArr = {};

//设置接口网页
axios.defaults.baseURL = '/api';
//设置超时时间
axios.defaults.timeout = 10000;
//设置默认请求头
axios.defaults.headers = {
  'X-Requested-With': 'XMLHttpRequest',
  "Content-Type": "application/json;charset=UTF-8",
  "Accept": "application/json",
  "token": '',
}

//启动拦截器发送数据前需做什么
// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  // // 发起请求时，取消掉当前正在进行的相同请求
  if (promiseArr[config.url]) {
    promiseArr[config.url]('操作取消');
    promiseArr[config.url] = cancel;
  } else {
    promiseArr[config.url] = cancel;
  }
  // 判断是否有token
  var token = localStorage.getItem('token');
  if (token) {
    //有就储存进请求头
    config.headers.token = `${token}`;
  }
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

//响应拦截
axios.interceptors.request.use(response => {
  return response;
}, error => {
  vue.$message({
    showClose: true,
    message: '错误，请重试',
    type: 'error'
  });
  return Promise.resolve(error.response);
})

export default {
  //Post方法
  post(url, params) {
    // console.log(params)
    return new Promise((resolve, reject) => {
      axios({
        method: 'post',//get请求
        url, //请求接口地址
        data: params, //参数
      }).then(value => {
        var data = typeof (value.data) == 'string' ? JSON.parse(value.data) : value.data;
        //判断token是否过期
        if (data.code == 401) {
          vue.$message({
            showClose: true,
            message: data.info.message,
            type: 'error'
          });
          //清除token
          localStorage.removeItem('token');
          window.location.reload();
        }
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  //Get方法
  // get(){

  // }
}
