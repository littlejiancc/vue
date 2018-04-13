// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from "axios"

Vue.prototype.$http = axios;
Vue.prototype.rootUrl = '/api';
//添加一个响应拦截器
axios.interceptors.response.use(function (response) {
    console.log(response);
    // token 已过期，重定向到登录页面
    if (response.data.code == '201'){
        localStorage.clear()
        router.replace({
            path: '/login',
            query: {redirect: router.currentRoute.fullPath}
        })
    }
    return response
}, function (error) {
    // Do something with response error
    return Promise.reject(error)
})

Vue.config.productionTip = false

Vue.use(ElementUI)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
