<template xmlns:v-popover="http://www.w3.org/1999/xhtml">
  <div id="title">

        <h3>{{title}}
            <el-popover
                ref="popover"
                placement="top-start"
                title="标题"
                width="200"
                trigger="hover"
                content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。">
                <slot></slot>
            </el-popover>
            <i class="el-icon-info" style="font-size: 14px" v-popover:popover> </i>

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
          title:{type:String,required:true},
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