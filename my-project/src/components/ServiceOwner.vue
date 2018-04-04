<template>
  <div id="owner">
      <div class="search">
        <div>
          <el-input placeholder="请输入内容" v-model="searchInput" >
            <el-button @click="searchClick" slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </div>
        <div >
          <el-button type="primary"  @click="dialogFormVisible = true">新增客服</el-button>
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
              <el-button  @click="handleClick(scope.row)" type="text" size="small">编辑</el-button>
              <el-button v-if="scope.row.role!='超级管理员'" type="text" size="small">删除</el-button>
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
          :page-sizes="[10, 20, 30]"
          @size-change="pageSizeChange"
          @current-change="currentPageChange"
        >
        </el-pagination>
      </div>
      <el-dialog title="新增客服人员" :visible.sync="dialogFormVisible" width="600px" :closeOnClickModal="false"  >
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm"  label-width="60px" size="small " class="demo-ruleForm">
              <el-form-item label="账号" prop="account" class="input-add" >
                  <el-input v-model="ruleForm.account" placeholder="须为3到10个字母或数字"></el-input>
              </el-form-item>
              <el-form-item label="姓名" prop="name" class="input-add">
                  <el-input v-model="ruleForm.name" placeholder="用于报表和历史会话的显示"></el-input>
              </el-form-item>
              <el-form-item label="昵称" prop="nickname" class="input-add">
                  <el-input v-model="ruleForm.nickname" placeholder="用于访客端聊天窗口的显示"></el-input>
              </el-form-item>
              <el-form-item label="手机号" prop="phone" class="input-add">
                  <el-input v-model="ruleForm.phone" placeholder="用于企业内部通讯"></el-input>
              </el-form-item>
              <el-form-item label="邮箱" prop="email" class="input-add">
                  <el-input v-model="ruleForm.email" placeholder="请输入邮箱地址"></el-input>
              </el-form-item>
              <el-form-item label="密码" prop="password" class="input-add">
                  <el-input v-model="ruleForm.password" placeholder="请输入6到10个字符"></el-input>
              </el-form-item>
              <el-form-item label="角色" prop="region" class="input-add">
                  <el-select v-model="ruleForm.role" placeholder="请选择角色">
                      <el-option label="管理员" value="2"></el-option>
                      <el-option label="普通客服" value="3"></el-option>
                      <el-option label="工单客服" value="4"></el-option>
                  </el-select>
              </el-form-item>
              <el-form-item label="最大接待量" prop="maxReception" class="input-add">
                  <el-input v-model="ruleForm.maxReception" placeholder="请输入最大接待量"></el-input>
              </el-form-item>
          </el-form>
              <div slot="footer" class="dialog-footer">
                  <el-button @click="cancel('ruleForm')">取 消</el-button>
                  <el-button type="primary" @click="saveUser('ruleForm')">保 存</el-button>
              </div>


      </el-dialog>



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
      perPage:10,
        loading:false,
      dialogFormVisible:false,
        ruleForm: {
            account: '',
            name:'',
            nickname:'',
            phone:'',
            email:'',
            password:'',
            role:'',
            maxReception:'',

        },
        rules: {
            account: [
                {required: true, message: '请输入账号', trigger: 'blur'},
                { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
            ],
            name: [
                {required: true, message: '请输入姓名', trigger: 'blur'}
            ],
            nickname: [
                {required: true, message: '请输入昵称', trigger: 'blur'}
            ],
            password: [
                { required: true, message: '请输入密码', trigger: 'blur' },
                { min: 6, max: 10, message: '长度在 6 到 10 个字符', trigger: 'blur' }
            ],
            role: [
                { required: true, message: '请选择角色', trigger: 'change' }
            ],
            /*maxReception: [
                { type: 'number',required: true, message: '最大接待量必须是整数', trigger: 'blur' }
            ],*/
        }

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
              console.log(result.userList);
              for(let index in result.userList) {
                  if ( result.userList[index].role == 1) result.userList[index].role = '超级管理员';
                  else if (result.userList[index].role == 2) result.userList[index].role = '管理员';
                  else if (result.userList[index].role == 3) result.userList[index].role = '普通客服';
                  else if (result.userList[index].role == 4) result.userList[index].role = '工单客服';
               }
              this.tableData = result.userList;
              this.total = result.total
            }).catch(function (err) {
                  console.log(err);
                  this.loading = false;
    })
    },
      saveUser(formName){
          this.$refs[formName].validate((valid) => {
              if (!valid) {
                  console.log('error submit!!');
                  return false;
              }
              return true;
          });
          const token = sessionStorage.getItem("token");
          if(this.role == '超级管理员') this.role = 1;
          else if(this.role == '管理员') this.role = 2;
          else if(this.role == '普通客服') this.role = 3;
          else if(this.role == '工单客服') this.role = 4;
          const data = {account:this.ruleForm.account,name:this.ruleForm.name,nickname:this.ruleForm.nickname,
              mobile:this.ruleForm.phone,email:this.ruleForm.email,password:this.ruleForm.password,role:this.ruleForm.role,maxReception:this.ruleForm.maxReception};
          console.log(data);
          this.$http({
              url:this.rootUrl+'/user/save',
              method:"post",
              headers:{"Authorization":'Bearer '+token},
              data:data
          }).then(res=>{
              console.log(res);
              if (res.data.code == '200'){
                  this.$message({
                      message: '保存成功！',
                      type: 'success'
                  });
                  this.dialogFormVisible = false;
                  this.$refs[formName].resetFields();
                  this.getUserList();
              }else{
                  this.$message.error('保存失败');
              }
          }).catch(function (err) {
              console.log(err);
          })
      },
      cancel(formName){
          this.$refs[formName].resetFields();
          this.dialogFormVisible = false;
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
        padding-right: 40px;
    }
    /*.dialog-content{
        display: flex;
        flex-direction: column;
        align-items: center;
    }*/
    .input-add{
        margin: 20px auto 0 auto;
        width: 450px;
    }
</style>