<template>
  <el-container>
    <el-header>
        <Header @isCollapseClick="isCollapseClick"></Header>
      </el-header>
    
    <el-container>
      <el-aside width="auto">
      <Aside :isCollapse="isCollapse"></Aside>
    </el-aside>
      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import Header from "../components/Header";
import Aside from "../components/Aside";
  export default {
    components:{Header,Aside},
    data () {
      return {
        isCollapse: false
      }
    },
    created(){
      const token = sessionStorage.getItem("token");
      if(!token)return this.$router.push('/login');
    },
    methods: {
      
      isCollapseClick(){
        this.isCollapse = !this.isCollapse;
      }
    }
  }
</script>

<style scoped>

  *{
    box-sizing: content-box;
  }
  .el-header, .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }

  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 200px;
    /* padding-top: 60px; */
  }

  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 160px;
  }

 .el-container {
    height: 100vh;
  }
  .el-aside{
    overflow: inherit;
    position: relative;

  }
  .el-menu{
    height: 100%;
  }
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
  .el-radio-group{
    position: absolute;
    left: 100%;
    display: flex;
    height: 60px;
  }
</style>
