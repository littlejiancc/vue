<template>
  <div>
    <div>
        <Title showDate showAllService showExportData>工作量报表</Title>
    </div>
      <div class="table"  v-loading="loading">
          <el-table
              :data="tableData"
              style="width: 100%"
          >
              <el-table-column
                  prop="name"
                  label="姓名"
                  sortable
              >
              </el-table-column>
              <el-table-column
                  prop="conversation"
                  label="接入会话量"
                  sortable
              >
              </el-table-column>
              <el-table-column
                  prop="unanswered"
                  label="未回复会话量"
                  sortable
              >
              </el-table-column>
              <el-table-column
                  prop="Initiate"
                  label="主动发起的"
                  sortable
              >
              </el-table-column>
              <el-table-column
                  prop="online"
                  label="在线总时长"
                  sortable
              >
              </el-table-column>
              <el-table-column
                  prop="hang"
                  label="挂起总时长"
                  sortable
              >
              </el-table-column>

          </el-table>
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
      </div>
  </div>
</template>

<script>
import Title from "../components/Title";
  export default {
    components:{Title},
      data(){
        return{
            tableData:[],
            loading:false,
            total:0,
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