<template>
  <div id="owner">
      <div class="search">
        <div style="width: 350px">
          <el-input placeholder="输入客服姓名/昵称/帐号/手机号" v-model="searchInput" >
            <el-button @click="searchClick" slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </div>
        <div >
          <el-button type="primary"  @click="addUser">新增客服</el-button>
        </div>
      </div>
      <div class="table"  v-loading="loading">
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
                prop="email"
                label="邮箱"
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
              <el-button  @click="editUser(scope.row)" type="text" size="small">编辑</el-button>
              <el-button v-if="scope.row.role!='超级管理员'" @click="deleteUser(scope.row)" type="text" size="small">删除</el-button>
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
      <el-dialog title="新增客服人员" :visible.sync="dialogFormVisible" width="600px" :closeOnClickModal="false" @close="closeDialog('ruleForm')">
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm"  label-width="60px" size="small " class="demo-ruleForm">
              <el-form-item label="账号" prop="account" class="input-add" >
                  <el-input :disabled="accountDisabled"  v-model="ruleForm.account" placeholder="必须为3到10个字母或数字"></el-input>
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
              <el-form-item  label="密码" prop="password" class="input-add">
                  <el-input type="password" :disabled="passwordDisabled" v-model="ruleForm.password" placeholder="请输入6到16个字符"></el-input>
              </el-form-item>
              <el-form-item label="角色" prop="region" class="input-add">
                  <el-select v-model="ruleForm.role" placeholder="请选择角色" :disabled="roleDisabled">
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
                  <el-button type="primary" @click="submitForm('ruleForm')">保 存</el-button>
              </div>


      </el-dialog>



  </div>

</template>

<script>


export default {
  data() {
    return {
        id:0,
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
                { min: 6, max: 16, message: '长度在 6 到 16 个字符', trigger: 'blur' }
            ],
            role: [
                { required: true, message: '请选择角色', trigger: 'change' }
            ],
            email:[
                { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur,change' }
            ],
            phone:[
                { pattern: '^(1[3,4,5,7,8])\\d{9}$', message: '请输入正确的手机号格式', trigger: 'blur,change' }
            ],
            maxReception: [
                { type: 'number',required: true, message: '最大接待量必须是正整数', trigger: 'blur,change' }
            ],
        },
        accountDisabled:false,
        passwordDisabled:false,
        roleDisabled:false,
    };
  },
  mounted(){
    this.getUserList();
  },
  methods: {
      addUser(){
          this.dialogFormVisible = true;
          this.id = 0;
      },
    editUser(row) {
        this.dialogFormVisible = true;
        this.accountDisabled = true;
        this.passwordDisabled = true;
        this.roleDisabled = false;
        this.id = row.id;
        const token = sessionStorage.getItem("token");
        this.$http({
            url:this.rootUrl+'/user/info',
            method:"post",
            headers:{"Authorization":'Bearer '+token},
            data:{id:this.id}
        }).then(res=>{
            if (res.data.code == '200') {
                const user = res.data.result.user;
                if (user.role == 1)  {
                    user.role = '超级管理员';
                    this.roleDisabled = true;
                }
                else if (user.role == 2) user.role = '管理员';
                else if (user.role == 3) user.role = '普通客服';
                else if (user.role == 4) user.role = '工单客服';
                this.ruleForm = user;
            }else {
                this.$message.error('服务器错误！');
            }
        }).catch(function (err) {
            console.log(err);
            this.$message.error('服务器错误！');
        })

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
      this.loading = true;
      const token = sessionStorage.getItem("token");
      const {page,perPage} = this;
      this.$http({
            url:this.rootUrl+'/user/list',
            method:"post",
            headers:{"Authorization":'Bearer '+token},
            data:{page,perPage}
          }).then(res=>{
              this.loading = false;
          if (res.data.code == '200') {
              const result = res.data.result;
              for (let index in result.userList) {
                  if (result.userList[index].role == 1) result.userList[index].role = '超级管理员';
                  else if (result.userList[index].role == 2) result.userList[index].role = '管理员';
                  else if (result.userList[index].role == 3) result.userList[index].role = '普通客服';
                  else if (result.userList[index].role == 4) result.userList[index].role = '工单客服';
              }
              this.tableData = result.userList;
              this.total = result.total
          }else {
              this.tableData = null;
              this.total = 0;
          }
            }).catch(function (err) {
                  console.log(err);
                this.$message.error('服务器错误！');
        })
    },
      submitForm(formName){
          this.$refs[formName].validate((valid) => {
              if (!valid) {
                  console.log('error submit!!');
                  return false;
              }
              this.saveUser();
              this.$refs[formName].resetFields();
              return true;
          });
      },
      saveUser(){
          console.log(this.id);
          const token = sessionStorage.getItem("token");
          console.log(this.ruleForm.role);
          if(this.ruleForm.role == '超级管理员') this.ruleForm.role = 1;
          else if(this.ruleForm.role == '管理员') this.ruleForm.role = 2;
          else if(this.ruleForm.role == '普通客服') this.ruleForm.role = 3;
          else if(this.ruleForm.role == '工单客服') this.ruleForm.role = 4;
          const data = {id:this.id,account:this.ruleForm.account,name:this.ruleForm.name,nickname:this.ruleForm.nickname,
              mobile:this.ruleForm.phone,email:this.ruleForm.email,password:this.ruleForm.password,role:this.ruleForm.role,maxReception:this.ruleForm.maxReception};
          console.log(data);
          let url = this.rootUrl+'/user/update';
          if(this.id == 0)
            url =this.rootUrl+'/user/save';
          this.$http({
              url:url,
              method:"post",
              headers:{"Authorization":'Bearer '+token},
              data:data
          }).then(res=>{
              console.log(res);
              if (res.data.code == '200'){
                  this.dialogFormVisible = false;
                  this.$message({
                      message: '保存成功！',
                      type: 'success'
                  });
                  this.getUserList();
              }else if(res.data.code == '209'){
                  this.$message.error('此账号已存在！');
              }else {
                  this.$message.error('保存失败！');
              }
          }).catch(function (err) {
              this.$message.error('服务器错误！');
              console.log(err);
          })
      },
      cancel(formName){
          this.$refs[formName].resetFields();
          this.dialogFormVisible = false;
      },
      searchClick(){
          this.loading = true;
          const token = sessionStorage.getItem("token");
          const {page,perPage} = this;
          const keywords = this.searchInput;
          this.$http({
              url:this.rootUrl+'/user/search',
              method:"post",
              headers:{"Authorization":'Bearer '+token},
              data:{page,perPage,keywords}
          }).then(res=>{
              console.log(res);
              this.loading = false;
              const result = res.data.result;
                if (res.data.code == '200'){
                    for(let index in result.userList) {
                        if ( result.userList[index].role == 1) result.userList[index].role = '超级管理员';
                        else if (result.userList[index].role == 2) result.userList[index].role = '管理员';
                        else if (result.userList[index].role == 3) result.userList[index].role = '普通客服';
                        else if (result.userList[index].role == 4) result.userList[index].role = '工单客服';
                    }
                    this.tableData = result.userList;
                    this.total = result.total
                }else {
                    this.tableData = null;
                    this.total = 0;
                }
          }).catch(err=> {
              this.loading = false;
              this.$message.error('服务器错误！');
              console.log(err);
          })
      },

      deleteUser(row){
          const id = row.id;
          const token = sessionStorage.getItem("token");
          this.$confirm('此操作将永久删除客服人员, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
          }).then(() => {
              console.log("222222222");
              this.$http({
                  url:this.rootUrl+'/user/delete',
                  method:"post",
                  headers:{"Authorization":'Bearer '+token},
                  data:{id}
              }).then(res=>{
                  console.log(res);
                  if (res.data.code == '200'){
                      this.$message({
                          type: 'success',
                          message: '删除成功!'
                      });
                      this.getUserList();
                  }else {
                      this.$message.error('删除失败！');
                  }
              }).catch(function (err) {
                  this.$message.error('服务器错误！');
                  console.log(err);
              });
          }).catch(() => {
              this.$message({
                  type: 'info',
                  message: '已取消删除'
              });
          });
      },
      //关闭弹框的事件
      closeDialog(formName){
          this.$refs[formName].resetFields();
      },
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