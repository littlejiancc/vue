import Vue from 'vue'
import Router from 'vue-router'
import Home from "../page/Home";
import Login from "../page/Login";
import Regist from "../page/Regist";
import HomeIndex from "../page/HomeIndex";
import WorkReport from "../page/WorkReport";
import Service from "../page/Service";
import Knowledge from "../page/Knowledge";
import Workload from "../page/Workload";
import RobotDataScreening from "../page/RobotDataScreening";
import JobContent from "../page/JobContent";
import HotSpotStatistics from "../page/HotSpotStatistics";
import ProblemClassifyStatistics from "../page/ProblemClassifyStatistics";
import Account from "../page/Account";
import Index from "../page/Index";
import QuestionStudy from "../page/QuestionStudy";


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
          // name:"WorkReport",
          component:WorkReport,
          children:[
            {
              path:"",
              name:"Workload",
              component:Workload
            },{
              path:"robotDataScreening",
              name:"RobotDataScreening",
              component:RobotDataScreening
            },{
              path:"robContent",
              name:"JobContent",
              component:JobContent
            },{
              path:"hotSpotStatistics",
              name:"HotSpotStatistics",
              component:HotSpotStatistics
            },{
              path:"problemClassifyStatistics",
              name:"ProblemClassifyStatistics",
              component:ProblemClassifyStatistics
            }
          ]
        },{
          path:"service",
          name:"Service",
          component:Service
        },
          {
              path:"knowledge",
              name:"Knowledge",
              component:Knowledge
          },
          {
              path:"questionStudy",
              name:"QuestionStudy",
              component:QuestionStudy
          }
          ,
          {
              path:"account",
              name:"Account",
              component:Account
          },
          {
              path:"index",
              name:"Index",
              component:Index
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
