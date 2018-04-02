<template>
  <main>
      <div>
        <slot></slot>
      </div>
  </main>
</template>

<script>
  export default {
    
  }
</script>

<style scoped>
    main{
    width: 1180px;
    margin: 0 auto;
    background: white;
    height: 587px;
    padding: 30px 0 90px 0;
    margin-top: 80px;
    margin-bottom: 50px;
    background-color: #fff;
  }
  main>div{
    width: 450px;
    margin: 0 auto;
  }

</style>