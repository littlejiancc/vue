<template>
  <header>
    <div>
      <img src="../assets/images/line.png">
      <span><slot></slot></span>
    </div>
  </header>
</template>

<script>
  export default {

  }
</script>

<style scoped>
    header{
    height: 74px;
    width: 100%;
    background: white;
  }
  header>div{
    width: 80%;
    margin: 0 auto;
    height: 100%;
    padding: 20px 0;
  }
  header>div>img{
    height: 29px;
    width: 111px;
    vertical-align: middle;
  }
  header>div>span{
    font-size: 18px;
    color: #686969;
    vertical-align: top;
    line-height: 30px;
    margin-left: 10px;
  }

</style>
