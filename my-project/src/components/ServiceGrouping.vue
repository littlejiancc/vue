<template>
  <div>
        <el-button size="small" @click="dialogFormVisible = true">充值</el-button>
        <el-dialog title="收货地址" :visible.sync="dialogFormVisible">
      <el-form >
          <el-form-item label="活动名称" label-width="180px">
                <el-input ></el-input>
          </el-form-item>
      </el-form>

  </el-dialog>
  </div>
</template>

<script>
  export default {
    data(){
          return {
            dialogFormVisible:false
          }
      },
  }
</script>

<style scoped>
    

</style>