<template>
  <el-container>
    <el-aside width="auto">
      <div class="logo">
          <img :src="isShowImg">
      </div>
      <Aside :isCollapse="isCollapse"></Aside>
    </el-aside>
    
    <el-container>
      <el-header>
        <Header @isCollapseClick="isCollapseClick" :isCollapse="isCollapse"></Header>
      </el-header>
      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import Header from "../components/Header";
import Aside from "../components/Aside";
import indexLogoHide from  '../assets/images/indexLogoHide.png';
import indexLogo from  '../assets/images/indexLogo.png';
  export default {
    components:{Header,Aside},
    data () {
      return {
        isCollapse: false,
        isShowImg:indexLogo
      }
    },
    created(){
      const token = sessionStorage.getItem("token");
      if(!token)return this.$router.push('/login');
    },
    methods: {
      
      isCollapseClick(){
        
        this.isCollapse = !this.isCollapse;
        if(!this.isCollapse){
          setTimeout(()=>{
            this.isShowImg=indexLogo;
          },300)
        }else{
          this.isShowImg=indexLogoHide;
        }
      }
    }
  }
</script>

<style scoped>

  *{
    box-sizing: content-box;
  }
  .el-header {
    background-color: white;
    color: #333;
    line-height: 60px;
    padding: 0;
    border-bottom: 1px solid #ddd;
  }

  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 200px;
    /* margin-top: 60px; */
  }

  .el-main {
    background-color: white;
    color: #333;
    padding: 0;
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
  .logo{
        width: auto;
        height: 60px;
        background-color: #5294e0;
        text-align: left;
        padding-left: 15px;
        line-height: 80px;
    }
    .logo img{
        width: auto;
        overflow: hidden;
        height: 35px;
        
    }
</style>
