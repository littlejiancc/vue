<template>
  <div>
    <div>
        <Title showDate showAllService showExportData title="工作量报表">
            <div class="popover-content">
                <div class="popover-content-left">接入会话量</div>
                <div class="popover-content-right">接入的会话量，包含访客来访和主动发起会话两种情况</div>
            </div>
            <div class="popover-content">
                <div class="popover-content-left">未回复会话量</div>
                <div class="popover-content-right">有访客咨询，但客服未回复即离开的会话数量</div>
            </div>
            <div class="popover-content">
                <div class="popover-content-left">无效会话量</div>
                <div class="popover-content-right">访客未发消息即离开的会话数量</div>
            </div>
            <div class="popover-content">
                <div class="popover-content-left">在线总时长</div>
                <div class="popover-content-right">所选时段内客服在线状态的累计时长</div>
            </div>
            <div class="popover-content">
                <div class="popover-content-left">挂起总时长</div>
                <div class="popover-content-right">所选时间段内客服挂起状态的累计时长</div>
            </div>
            <div class="popover-content">
                <div class="popover-content-left">小休总时长</div>
                <div class="popover-content-right">所选时间段内客服小休状态的累计时长</div>
            </div>
        </Title>
    </div>

      <div class="table"  v-loading="loading"><div>

      </div>
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
                  prop="invalid"
                  label="无效回话量"
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
              <el-table-column
                  prop="relax"
                  label="小休总时长"
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
      methods:{
          pageSizeChange(val){
              this.perPage = val;
              this.getUserList();
          },
          currentPageChange(val){
              this.page = val;
              this.getUserList();
          },
      },
  }
</script>

<style scoped>
    .pagination{
        text-align: right;

        margin-top: 40px;
    }
    .popover-content{
        padding-bottom: 30px;
    }
    .popover-content-left{
        width: 30%;
        float: left;
    }
    .popover-content-right{
        width: 70%;
        float: left;
    }
</style>