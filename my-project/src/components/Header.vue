<template>
  <div id="header">
      <div  @click="isCollapseClick"><i :class="isShow"></i></div>
      <ul class="list">
          <li>探索网易七鱼</li>
          <li>联系客服</li>
          <li>下载中心</li>
          <li>消息中心</li>
          <li>
            <el-dropdown trigger="click">
                <span class="el-dropdown-link">
                    超级管理员<i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>切换为客服模式</el-dropdown-item>
                    <el-dropdown-item>个人信息设置</el-dropdown-item>
                    <el-dropdown-item>企业帐户管理</el-dropdown-item>
                    <el-dropdown-item>退出</el-dropdown-item>
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