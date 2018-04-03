<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  data(){
    return{
      loginIn:null
    }
  },
  created(){
    const token = sessionStorage.getItem("token");
    if(!token)return this.$router.push('/login')
  }
}
</script>

<style>
*{
  box-sizing: border-box;
}
  html,body{
    margin: 0;
    padding: 0;
    background: #f5f6f7;
  }
  h1,h2,h3,h4,h5,h6,ul,li{
    padding: 0;
    margin: 0;
  }
  li{
    list-style: none;
  }
  a{
        text-decoration: none;
        color: inherit;
    }
</style>
