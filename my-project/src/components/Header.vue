<template>
  <div id="header">
      <!-- <div class="logo">
          <img src="../assets/images/indexLogo.png">
      </div>
      <div>1233333333333333</div> -->
      <div @click="isCollapseClick">这里是header</div>
  </div>
</template>

<script>
  export default {
    methods:{
        isCollapseClick(){
            this.$emit("isCollapseClick");
        }
    }
  }
</script>

<style scoped>
    /* #header{
        height: 100%;
        width: 100%;
        text-align: left;
    }
    .logo{
        width: 180px;
        height: 100%;
        background-color: #5294e0;
    }
    .logo img{
        width: 123px;
        height: 35px;
        padding-left: 26px;
        padding-top: 15px;
    } */

</style>