<template>
  <div>
      <div class="title">
          <span @click="checkedClick(1)" :class="num==1?'checked':''">企业账户信息</span>
          <span @click="checkedClick(2)" :class="num==2?'checked':''">企业操作日志</span>
      </div>
      <component :is="currentView" ></component> 
  </div>
</template>

<script>
import AccountInfo from "./AccountInfo";
import AccountLog from "./AccountLog";

  export default {
      components:{AccountInfo,AccountLog},
      data(){
          return {
            num:1,
            currentView:AccountInfo
          }
      },
   methods:{
       checkedClick(num){
           this.num = num;
           if(num==1)return this.currentView = AccountInfo;
           if(num==2)return this.currentView = AccountLog;
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
        height: 46px;
        line-height: 46px;
        top: 1px;
        color: #5092e1;
        background: white;
   }
   span{
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
    

</style>