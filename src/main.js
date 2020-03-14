// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import Element from 'element-ui';
import http from './api/http';
import api from './api/api';
import axios from 'axios'
import echarts from 'echarts' //引入echarts
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(Element);
Vue.config.productionTip = false
Vue.prototype.$http = axios;
Vue.prototype.$https = http;
Vue.prototype.$api = api;
Vue.prototype.$echarts = echarts //vue全局注入echarts

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
