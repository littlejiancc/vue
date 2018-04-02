<template>
<div>
  <SignHeader>账号登录</SignHeader>
  <SignMain>
    <div class="title">登录网易七鱼</div>
      <div>
          <div class="input">
            <div>账号：</div>
            <div><el-input type="text" placeholder="注册邮箱和客服账号"  v-model="accountInput" clearable></el-input></div>
          </div>
          <div class="input">
            <div>密码：</div>
            <div><el-input type="password" placeholder="6-16个字符" :minlength="6" :maxlength="16" v-model="passwordInput" clearable></el-input></div>
          </div>
          <div class="input">
            <div>域名：</div>
            <div>
              <el-input v-model="domainInput" type="text" clearable>
                <template slot="append">.qiyukf.com</template>
              </el-input></div>
          </div>
      </div>
      <el-button @click="loginClick" type="primary" :loading="loading" :disabled="disabled">登录</el-button>
      <div class="group-forget">
        <el-checkbox v-model="checked">记住密码</el-checkbox>
        <el-popover
          title="忘记密码？"
          placement="top-start"
          width="340"
          trigger="hover"
          content="忘记密码请联系企业超级管理员重置密码超级管理员忘记密码可尝试">
          <span slot="reference">无法登录</span>
        </el-popover>

      </div>
  </SignMain>
  <footer>还没有账号? <router-link class="register" to="/regist">立即注册</router-link></footer>
  <Footer />
</div>

</template>

<script>
import Footer from "../components/Footer";
import SignHeader from "../components/SignHeader";
import SignMain from "../components/SignMain";
  export default {
    components:{Footer,SignHeader,SignMain},
    data () {
      return {
        loading:false,
        accountInput:"",
        passwordInput:"",
        domainInput:"",
        checked:false,
      }
    },
    methods:{
        loginClick(){
          const {accountInput,passwordInput,domainInput,checked} = this;
          // if(!accountInput)return this.$message('账号不能为空！');
          // if(!passwordInput)return this.$message('密码不能为空！');
          // if(!httpInput)return this.$message('域名不能为空！');
          const data = {account:accountInput,password:passwordInput,companyDomain:domainInput,remember_me:checked}
          console.log(data);
          this.loading = true;
          this.$http.post(this.rootUrl+'/user/login', data).then(data => {
            console.log(data.data);
            if (data.data.code == '200'){
              sessionStorage.setItem("token",data.data.token);
              this.$router.push('/');
            }else {
              this.$message.error('帐号、密码或域名有误!');
              this.loading = false;
            }
          }).catch(function (err) {
            console.log(err);
          });
         /* setTimeout(e=>{
            sessionStorage.setItem("token","1321317")
            this.$router.push('/');
            return;
          },2000)*/
        }
    },
    computed:{
      disabled(){
        const {accountInput,passwordInput,domainInput} = this;
        if(!accountInput||!passwordInput||!domainInput)return true;
        return false;
      }
    },

  }
</script>

<style scoped>

  .title{
    font-size: 34px;
    color: #373d40;
    line-height: 1;
    padding: 35px 0;
    text-align: center;
  }
  .input{
    display: flex;
    align-items: center;
    padding-bottom: 30px;
  }
  .input>div:nth-of-type(1){
    width: 20%;
  }
  .input>div:nth-of-type(2){
    width: 80%;
  }
  .el-button{
    width: 100%;
    margin-top: 30px;
  }
  .group-forget{
    display: flex;
    justify-content: space-between;
    margin-top: 35px;
  }
  .group-forget span{
    color: #4291e6;
    font-size: 14px;
  }
  footer{
    text-align: center;
    margin-bottom: 30px;
    font-size: 14px;
    color: #9898a2;
    line-height: 20px;
  }
  .register{
    text-decoration: none;
    color: #4291e6;
  }

</style>
