<template>
  <div class="account-from">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm"  label-width="100px" size="medium" class="demo-ruleForm">
          <el-form-item label="企业名称" prop="companyName" class="input-add" >
              <el-input   v-model="ruleForm.companyName" placeholder="请输入企业名称"></el-input>
          </el-form-item>
          <el-form-item label="企业账户" prop="account" class="input-add" >
              <el-input  disabled="true" v-model="ruleForm.account" ></el-input>
          </el-form-item>
          <el-form-item label="登录域名" prop="companyDomain" class="input-add" >
              <el-input  disabled="true" v-model="ruleForm.companyDomain"></el-input>
          </el-form-item>
          <el-form-item label="企业联系人" prop="linkman" class="input-add" >
              <el-input   v-model="ruleForm.linkman" placeholder="请输入企业联系人"></el-input>
          </el-form-item>
          <el-form-item label="手机" prop="mobile" class="input-add" >
              <el-input   v-model="ruleForm.mobile" placeholder="请输入手机号"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email" class="input-add" >
              <el-input   v-model="ruleForm.email" placeholder="请输入邮箱"></el-input>
          </el-form-item>
      </el-form>
      <div >

          <el-button type="primary" @click="submitForm('ruleForm')" style="float: right">保 存</el-button>
      </div>
  </div>
</template>

<script>
  export default {
    data(){
        return {
            ruleForm: {
                companyName: '',
                account:'',
                companyDomain:'',
                linkman:'',
                mobile:'',
                email:'',
            },
            rules: {
                companyName: [
                    {required: true, message: '请输入企业名称', trigger: 'blur'},
                ],
                linkman: [
                    {required: true, message: '请输入企业联系人', trigger: 'blur'},
                ],
                email:[
                    {required: true, message: '请输入企邮箱', trigger: 'blur'},
                    { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur,change' }
                ],
                mobile:[
                    {required: true, message: '请输入手机号', trigger: 'blur'},
                    { pattern: '^(1[3,4,5,7,8])\\d{9}$', message: '请输入正确的手机号格式', trigger: 'blur,change' }
                ],
            },
        };
    },
      mounted(){
          this.getAccountInfo();
      },
      methods: {
          submitForm(formName){
              this.$refs[formName].validate((valid) => {
                  if (!valid) {
                      console.log('error submit!!');
                      return false;
                  }

                  this.$refs[formName].resetFields();
                  return true;
              });
          },
          getAccountInfo(){
              const token = sessionStorage.getItem("token");
              this.$http({
                  url:this.rootUrl+'/company/info',
                  method:"get",
                  headers:{"Authorization":'Bearer '+token},
              }).then(res=>{
                  console.log(res)
                  if (res.data.code == '200') {
                      const company = res.data.result.company;
                      this.ruleForm = company;
                  }else {
                      this.$message.error('服务器错误！');
                  }
              }).catch(function (err) {
                  console.log(err);
                  this.$message.error('服务器错误！');
              })
          }
      }
  }
</script>

<style scoped>
    .account-from{
        width: 30%;
        margin: 60px 40px;
        min-width: 400px;
    }
    .input-add{
        width: 100%;
        margin-top: 30px;
    }
</style>