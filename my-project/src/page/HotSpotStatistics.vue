<template>
  <div>
    <div>
        <Title showDate>热点问题统计</Title>
    </div>
     <div style="width: 100%">
        <div style="width: 60%">
            <div class="table"  v-loading="loading">
                <el-table
                    :data="tableData"
                    style="width: 100%"
                    >
                    <el-table-column
                        prop="question"
                        label="热点问题"

                    >
                    </el-table-column>
                    <el-table-column
                        prop="point"
                        label="所属知识点"
                    >
                    </el-table-column>
                    <el-table-column
                        prop="matched"
                        label="匹配次数"
                    >
                    </el-table-column>
                </el-table>
            </div>
            <div class="pagination">
                <el-pagination
                    background
                    layout="total, sizes, prev, pager, next, jumper"
                    :page-size="10"
                    :total="total"
                    :page-sizes="[10, 20, 30]"
                    @size-change="pageSizeChange"
                    @current-change="currentPageChange"
                >
                </el-pagination>
            </div>
            <div>

         </div>
     </div>

  </div>
  </div>
</template>

<script>
import Title from "../components/Title";
  export default {
    components:{Title},
      data() {
        return {
            tableData: [{
                question: '手机电池坏了',
                point: '手机',
                matched: '55'
            }, {
                question: '手机充不了点',
                point: '手机',
                matched: '70'
            }, {
                question: '手机摄像头坏了',
                point: '手机',
                matched: '67'
            }, {
                question: '充电器坏了',
                point: '充电器',
                matched: '100'
            }],
            loading:false,
            total:4,
            page:1,
            perPage:10,
        };


      },
  }
</script>

<style scoped>

    .pagination{
        text-align: right;

        margin-top: 40px;
    }
</style>