<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <div>
      <el-button>默认按钮</el-button>
      <el-button type="primary">主要按钮</el-button>
      <el-button type="success">成功按钮</el-button>
      <el-button type="info">信息按钮</el-button>
      <el-button type="warning">警告按钮</el-button>
      <el-button type="danger">危险按钮</el-button>
    </div>

    <el-switch
      v-model="value3"
      active-text="按月付费"
      inactive-text="按年付费">
    </el-switch>
    <el-switch
      style="display: block"
      v-model="value4"
      active-color="#13ce66"
      inactive-color="#ff4949"
      active-text="按月付费"
      inactive-text="按年付费">
    </el-switch>
    <Welcome></Welcome>

  </div>
</template>

<script>
  import Welcome from  "./Welcome"
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      value3: true,
      value4: true
    }
  },
  components:{
    Welcome
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
