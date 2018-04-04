<template>
  <div id="owner">
      <div class="search">
        <div>
          <el-input placeholder="请输入内容" v-model="searchInput" >
            <el-button @click="searchClick" slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </div>
        <div >
          <el-button type="primary">新增客服</el-button>
        </div>
      </div>
      <div class="table">
        <el-table
          :data="tableData"
          style="width: 100%"
        >
          <el-table-column
            prop="nickname"
            label="昵称"
 
          >
          </el-table-column>
          <el-table-column
            prop="name"
            label="姓名"
          >
          </el-table-column>
          <el-table-column
            prop="account"
            label="账号"
          >
          </el-table-column>
          <el-table-column
            prop="mobile"
            label="手机号"
          >
          </el-table-column>
          <el-table-column
            prop="role"
            label="角色"
          >
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            width="100"
          >
            <template slot-scope="scope">
              <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
              <el-button type="text" size="small">编辑</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="pagination">
        <el-pagination
          background
          layout="total, sizes, prev, pager, next, jumper"
          :page-size="10"
          :total="total"
          :page-sizes="[10, 20, 30, 40, 50, 100]"
          @size-change="pageSizeChange"
          @current-change="currentPageChange"
        >
        </el-pagination>
      </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchInput: "",
      tableData: [],
      total:0,
      page:1,
      perPage:10
    };
  },
  mounted(){
    this.getUserList();
  },
  methods: {
    searchClick() {
      console.log(this.searchInput);
    },
    handleClick(row) {
      // const tableData = this.tableData;
      // tableData[0].name = "lijihui";
      this.tableData[0].name = "李继辉";
      console.log(row);
    },
    pageSizeChange(val){
      this.perPage = val;
      this.getUserList();
    },
    currentPageChange(val){
      this.page = val;
      this.getUserList();
    },
    getUserList(){
      const token = sessionStorage.getItem("token");
      const {page,perPage} = this;
      this.$http({
        url:this.rootUrl+'/user/list',
        method:"post",
        headers:{"Authorization":'Bearer '+token},
        data:{page,perPage}
      }).then(res=>{ 
      const result = res.data.result;
      this.tableData = result.userList;
      this.total = result.total
    })
    }

  }
};
</script>

<style scoped>
.search {
  padding: 30px 40px;
  display: flex;
  justify-content: space-between;
}
.table {
  padding: 0 40px 40px 40px;
}
.pagination{
  text-align: right;
}
</style>