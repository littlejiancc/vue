<template>
  <div>{{msg}}</div>
</template>

<script>
  export default {
    data () {
      return {
        msg: '这里是Home页面'
      }
    },
    created(){
      const token = sessionStorage.getItem("token");
      if(!token)return this.$router.push('/');
    },
  }
</script>

<style>

</style>
