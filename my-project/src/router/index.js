import Vue from 'vue'
import Router from 'vue-router'
import Home from "../page/Home";
import Login from "../page/Login";
import Regist from "../page/Regist";
import HomeIndex from "../page/HomeIndex";
import WorkReport from "../page/WorkReport";
import Service from "../page/Service";

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Home,
      children:[
        {
          path:"",
          name:"HomeIndex",
          component:HomeIndex
        },{
          path:"workReport",
          name:"WorkReport",
          component:WorkReport
        },{
          path:"service",
          name:"Service",
          component:Service
        }
      ]
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
