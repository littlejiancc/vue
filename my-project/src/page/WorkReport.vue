<template>
    <div>
      <div class="title">
          <span @click="checkedClick(1)" :class="num==1?'checked':''">客服</span>
          <span @click="checkedClick(2)" :class="num==2?'checked':''">机器人</span>
      </div>
      <div class="report" >
        <router-link v-for="(item, index) in checked" :key="index" :to="item.path" :class="num==1?serviceListChecked==item.path?'highlight':'nohighlight':robotListCkecked==item.path?'highlight':'nohighlight'" ><span>{{item.name}}</span></router-link>
      </div>
      <div class="content">
        <router-view />
      </div>
  </div>
</template>

<script>
  const serviceList=[
    {path:"/workReport",name:"工作量"},
    {path:"/workReport/robContent",name:"工作质量"}
  ];
  const robotList = [
    {path:"/workReport/RobotDataScreening",name:"机器人数据总览"},
    {path:"/workReport/hotSpotStatistics",name:"热点问题统计"},
    {path:"/workReport/problemClassifyStatistics",name:"问题分类统计"}
  ]
  export default {
    data(){
      return {
        num:1,
        serviceListChecked:"/workReport",
        robotListCkecked:"/workReport/RobotDataScreening",
        checked:serviceList,
      }
    },
    mounted(){
      const path = this.$route.path;
      serviceList.forEach(e=>{
        if(e.path==path){
          this.num = 1;
          this.checked = serviceList;
          this.serviceListChecked = path;
        }
      })
      robotList.forEach(e=>{
        if(e.path == path){
          this.num = 2;
          this.robotListCkecked = path;
          this.checked = robotList;
        }
      })

      this.$router.push(path);
      
    },
    methods:{
      checkedClick(num){
        this.num = num;
        if(num===1){
          this.checked = serviceList;
          this.$router.push(serviceList[0].path);
          return;
        };
        if(num===2){
          this.checked = robotList;
          this.$router.push(robotList[0].path);
        }
      }
    },
    watch: {  
      $route(to) {
        if(this.num===1)return this.serviceListChecked = to.path;
        if(this.num===2)return this.robotListCkecked = to.path;
      }  
    } 
  }
</script>

<style scoped>
  .title{
        padding: 14px 0px 0 20px;
        background-color: #fff;
        border-bottom: 1px solid #ccc;
   }
   .checked{
        position: relative;
        height: 46px !important;
        line-height: 46px !important;
        top: 1px !important;
        color: #5092e1 !important;
        background: white !important;
   }
   .title>span{
        display: inline-block;
        min-width: 65px;
        padding: 0 20px;
        font-size: 16px;
        border: 1px solid #dbdbdb;
        text-align: center;
        border-bottom: none;
        border-radius: 3px 3px 0 0;
        margin-right: 5px;
        background-color: #f4f4f4;
        height: 45px;
        line-height: 45px;
        color: #222;
        text-align: center;
   }
   .report{
        height: 43px;
        border-bottom: 1px solid #ddd;
        padding-left: 51px;
        line-height: 43px;
   }
   .report>a{
     display: inline-block;
     height: 100%;
   }
   .report>a>span{
        padding: 0px 20px;
        border-right: 1px solid #d2d2d2;
        /* height: 14px; */
        font-size: 14px;
        
   }
   .report>a:nth-last-of-type(1)>span{
     border-right: none;
   }
   .highlight{
     color: #5092e1;
   }
   .nohighlight{
    color: #999;
   }
   .content{
     padding: 30px 40px 40px 40px;
   }
</style>