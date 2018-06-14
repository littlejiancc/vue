<template>
  <div id="header">
      <div  @click="isCollapseClick"><i :class="isShow" style="color: #999;font-size: 30px"></i></div>
      <ul class="list">
          <li>探索</li>
          <li>联系客服</li>
          <li>下载中心</li>
          <li>消息中心</li>
          <li>
            <el-dropdown trigger="click"   @command="handleCommand">
                <span class="el-dropdown-link">
                    超级管理员<i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                    <!--<el-dropdown-item>切换为客服模式</el-dropdown-item>
                    <el-dropdown-item>个人信息设置</el-dropdown-item>
                    <el-dropdown-item>企业帐户管理</el-dropdown-item>-->
                    <el-dropdown-item  command="loginOut">退出</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
          </li>
      </ul>
    
  </div>
</template>

<script>
  export default {
      
    methods:{
        isCollapseClick(){
            this.$emit("isCollapseClick");
        },
        loginOut(){
            sessionStorage.removeItem("token");
            this.$router.push("/login");
        },
        handleCommand(command) {
            if(command == "loginOut"){
                this.loginOut();
            }
        }
    },
    props:["isCollapse"],
    computed:{
        isShow(){
            if(this.isCollapse)return "el-icon-d-arrow-right";
            return "el-icon-d-arrow-left";
            
            
        }
    }
  }
</script>

<style scoped>
    #header{
        height: 100%;
        width: 100%;
        display: flex;
        justify-content: space-between;
        
    }
    #header>div{
        width: 60px;
        font-size: 40px;
        text-align: center;
        border-right: solid 1px rgb(243, 244, 247);
    }
    .list{
        padding-right: 30px;
        display: flex;
    }
    .list>li{
        color: #666666;
        cursor: pointer;
        font-size: 12px;
        padding-right: 30px;
    }
    

</style>