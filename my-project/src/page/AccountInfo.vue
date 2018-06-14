<template>
    <div>
        <div class="account-info">企业账号信息</div>
        <div class="account-form">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm"  label-width="100px" size="medium" class="demo-ruleForm">
                <el-form-item label="企业名称" prop="companyName" class="input-add" >
                    <el-input   v-model="ruleForm.companyName" placeholder="请输入企业名称"></el-input>
                </el-form-item>
                <el-form-item label="企业账户" prop="account" class="input-add" >
                    <el-input  :disabled="true" v-model="ruleForm.account" ></el-input>
                </el-form-item>
                <el-form-item label="登录域名" prop="companyDomain" class="input-add" >
                    <el-input  :disabled="true" v-model="ruleForm.companyDomain"></el-input>
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
        <div class="password-update">密码修改</div>
        <div class="password-form">
            <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
                <el-form-item label="原密码" prop="oldPass">
                    <el-input type="password" v-model="ruleForm2.oldPass" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="新密码" prop="newPass">
                    <el-input type="password" v-model="ruleForm2.newPass" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="确认密码" prop="checkPass">
                    <el-input type="password" v-model="ruleForm2.checkPass" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item style="float: right">
                    <el-button @click="resetForm('ruleForm2')">重置</el-button>
                    <el-button type="primary" @click="submitForm('ruleForm2')" :disabled="disabledPassword">提交</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>

</template>

<script>
  export default {
    data(){
        var validateOldPass = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入原密码'));
            } else {
                callback();
            }
        };
        var validateNewPass = (rule, value, callback) => {
            const patt = /^\w{6,16}$/;
            if (value === '') {
                callback(new Error('请输入新密码'));
            }else if(!patt.test(value)){
                callback(new Error('密码必须6到16位字符'));
            }
            else {
                if (this.ruleForm2.checkPass !== '') {
                    this.$refs.ruleForm2.validateField('checkPass');
                }
                callback();
            }
        };
        var validateCheckPass = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请再次输入密码'));
            } else if (value !== this.ruleForm2.newPass) {
                callback(new Error('两次输入密码不一致!'));
            } else {
                callback();
            }
        };
        return {
            ruleForm: {
                companyName: '',
                account:'',
                companyDomain:'',
                linkman:'',
                mobile:'',
                email:'',
            },
            ruleForm2: {
                newPass: '',
                oldPass: '',
                checkPass: ''
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
                    { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' }
                ],
                mobile:[
                    {required: true, message: '请输入手机号', trigger: 'blur'},
                    { pattern: '^(1[3,4,5,7,8])\\d{9}$', message: '请输入正确的手机号格式', trigger: 'blur' }
                ],
            },
            rules2: {
                oldPass: [
                    { validator: validateOldPass, trigger: 'blur' }
                ],
                newPass: [
                    { validator: validateNewPass, trigger: 'blur' }
                ],

                checkPass: [
                    { validator: validateCheckPass, trigger: 'blur' }
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
                  if(formName == 'ruleForm'){
                      this.saveAccountInfo();
                      this.$refs[formName].resetFields();
                      this.getAccountInfo();
                      return true;
                  }else{
                      this.updatePwd();
                      return true;
                  }

              });
          },
          resetForm(formName) {
              this.$refs[formName].resetFields();
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
          },
          saveAccountInfo(){
              const token = sessionStorage.getItem("token");
              const data = {companyName:this.ruleForm.companyName,linkman:this.ruleForm.linkman,
                  mobile:this.ruleForm.mobile,email:this.ruleForm.email};
              this.$http({
                  url:this.rootUrl+'/company/update',
                  method:"post",
                  headers:{"Authorization":'Bearer '+token},
                  data:data,
              }).then(res=>{
                  console.log(res)
                  if (res.data.code == '200') {
                      this.$message({
                          message: '修改成功',
                          type: 'success'
                      });
                      this.getAccountInfo();
                  }else {
                      this.$message.error('修改失败');
                  }
              }).catch(function (err) {
                  console.log(err);
                  this.$message.error('服务器错误！');
              })
          },
          updatePwd(){
              const token = sessionStorage.getItem("token");
              const data = {oldPassword:this.ruleForm2.oldPass,newPassword:this.ruleForm2.newPass};
              this.$http({
                  url:this.rootUrl+'/pwd/update',
                  method:"post",
                  headers:{"Authorization":'Bearer '+token},
                  data:data,
              }).then(res=>{
                  console.log(res)
                  if (res.data.code == '200') {
                      this.$message({
                          message: '密码修改成功',
                          type: 'success'
                      });
                      this.$refs['ruleForm2'].resetFields();
                  }else if(res.data.code == '228'){
                      this.$message.error('原密码不匹配');
                  }else{
                      this.$message.error('密码修改失败');
                  }
              }).catch(function (err) {
                  console.log(err);
                  this.$message.error('服务器错误！');
              })
          },
      },
      computed:{
          disabledPassword(){
              if(!this.ruleForm2.newPass || !this.ruleForm2.oldPass || !this.ruleForm2.checkPass)
                  return true;
              return false;
          },
      },
  }
</script>

<style scoped>
    .account-form,.password-form{
        width: 30%;
        margin: 40px 40px;
        min-width: 400px;
    }
    .input-add{
        width: 100%;
        margin-top: 30px;
    }
    .account-info,.password-update{
        height: 45px;
        border-bottom: 1px solid #ccc;
        margin-left: 50px;
        line-height: 45px;
        margin-top: 40px;
        font-size: 18px;
        font-weight: bold;
        color: #222;
    }
</style>