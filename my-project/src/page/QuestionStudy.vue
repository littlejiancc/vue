<template>
  <div>
    <div style="margin: 40px">
        <Title>问题学习</Title>
    </div>
      <div class="btn-delete">
          <el-button type="primary" icon="el-icon-delete" :disabled="delDisable"></el-button>
          <label class="selected-label">{{label}}</label>
      </div>
      <div class="table"  v-loading="loading">
          <el-table
              :data="tableData"
              ref="multipleTable"
              tooltip-effect="dark"
              style="width: 100%"
              @selection-change="handleSelectionChange"
          >
              <el-table-column
                  type="selection"
                  width="55">
              </el-table-column>
              <el-table-column
                  prop="question"
                  label="问题"
              >
              </el-table-column>
              <el-table-column
                  prop="time"
                  label="提问时间"
                  sortable
              >
              </el-table-column>
              <el-table-column
                  fixed="right"
                  label="操作"
                  width="200"
              >
                  <template slot-scope="scope">
                      <el-button  @click="editPoint(scope.row)" type="text" size="small">添加到知识库</el-button>
                      <el-button  @click="deletePoint(scope.row)" type="text" size="small">删除</el-button>
                  </template>
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
            tableData:[{
                question:'手机电池坏了',
                time:'2018-04-11 00:00:00'
            }

            ],
            loading:false,
            total:0,
            page:1,
            perPage:10,
            multipleSelection: [],
            delDisable:true,
            label:'',
        };
      },
      methods:{
          handleSelectionChange(val) {
              this.multipleSelection = val;
              console.log(this.multipleSelection);
              if (this.multipleSelection.length !=0){
                  this.delDisable = false;
                  this.label = '已选中'+this.multipleSelection.length+'项';
              }else {
                  this.delDisable = true;
                  this.label = '';
              }
          },
      },
  }
</script>

<style scoped>
    .pagination{
        text-align: right;

        margin-top: 40px;
    }
    .table {
        padding: 0 40px 40px 40px;
    }
    .btn-delete{
        padding-left: 40px;
    }
</style>