<template>
  <div id="title">
        <h3><slot></slot>
            <i class="el-icon-info"></i>
        </h3>
        <div>
            <el-button v-if="showDate"   icon="el-icon-date">昨天<i class="el-icon-caret-bottom"></i></el-button>
            <el-button v-if="showAllService" >所有接待客服<i class="el-icon-caret-bottom"></i></el-button>
            <el-button v-if="showExportData" type="primary" icon="el-icon-download">导出当前数据</el-button>
        </div>
  </div>
</template>

<script>
  export default {
      props:{
        showDate: { type: Boolean,default: false},
        showAllService: { type: Boolean,default: false},
        showExportData: { type: Boolean,default: false},
        }
  }
</script>

<style scoped>
    h3{
        font-weight: 200;
        font-size: 21px;
        max-width: 30em;
        overflow: hidden;
        word-wrap: normal;
        white-space: nowrap;
        text-overflow: ellipsis;
        height: 30px;
        line-height: 30px;
    }
    #title{
        margin-bottom: 25px;
        display: flex;
        justify-content: space-between;
    }
</style>