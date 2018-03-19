import Vue from 'vue'
import Router from 'vue-router'
import Home from "../page/Home";
import Login from "../page/Login";
import Regist from "../page/Regist";

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },{
      path: '/login',
      name: 'Login',
      component: Login
    },{
      path: '/regist',
      name: 'Regist',
      component: Regist
    },
  ]
})
