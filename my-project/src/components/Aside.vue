<template>

 <el-menu 
        :default-active="defaultActive" 
        background-color="#545c64" 
        text-color="#fff"
        active-text-color="#ffd04b" 
        class="el-menu-vertical-demo" 
        :collapse="isCollapse"
        :router="true"
      >
     <el-menu-item index="3">
         <i class="el-icon-document"></i>
         <span slot="title">导航三</span>
     </el-menu-item>
     <el-menu-item index="/service">
         <i class="el-icon-menu"></i>
         <span slot="title">客服管理</span>
     </el-menu-item>
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span slot="title">知识库</span>
          </template>

            <el-menu-item index="/knowledge">知识库</el-menu-item>
            <el-menu-item index="/workReport">相似词库</el-menu-item>


            <el-menu-item index="1-3">问题学习</el-menu-item>
            
        </el-submenu>


        <el-menu-item index="4">
          <i class="el-icon-setting"></i>
          <span slot="title">导航四</span>
        </el-menu-item>
      </el-menu>
</template>

<script>
  export default {
      data(){
          return {
              defaultActive:"/"
          }
      },
    props: ['isCollapse'],
    mounted(){
        this.defaultActive = this.$route.path
    },
    methods:{
    //     handleOpen(key, keyPath) {
    //     console.log(key, keyPath);
    //   },
    //   handleClose(key, keyPath) {
    //     console.log(key, keyPath);
    //   }
    }
  }
</script>

<style scoped>
   
    
</style>