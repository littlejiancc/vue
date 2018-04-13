<template>
<div>
  <SignHeader>账号登录</SignHeader>
  <SignMain>
    <div class="title">账号登录</div>
      <div>
          <div class="input-login">
              <el-input placeholder="注册邮箱/客服账号" v-model="accountInput">
                  <template slot="prepend">账号</template>
              </el-input>
          </div>
          <div class="input-login">
              <el-input placeholder="6-16字符" v-model="passwordInput" type="password">
                  <template slot="prepend">密码</template>
              </el-input>
          </div>
          <div class="input-login">
              <el-input placeholder="请输入域名" v-model="domainInput">
                  <template slot="prepend">域名</template>
                  <template slot="append">.qiyukf.com</template>
              </el-input>
          </div>
      </div>
      <el-button @click="loginClick" type="primary" :loading="loading" :disabled="disabled" style="font-size: 16px">登录</el-button>
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
      mounted: function() {
          //读取cookie中的账号信息，如果有accountInfo的话，则说明该用户之前勾选了记住密码的功能，则需要自动填上账号密码
          this.loadAccountInfo();
      },
      methods:{
        loginClick(){
          const {accountInput,passwordInput,domainInput,checked} = this;
          const data = {account:accountInput,password:passwordInput,companyDomain:domainInput,remember_me:checked}
          this.loading = true;
          const accountInfo = accountInput+"&"+passwordInput+"&"+domainInput;
          if(checked){
              console.log("set cookie");
              this.setCookie('accountInfo',accountInfo,1440*3);
              console.log(this.getCookie('accountInfo'));
          }else{
              this.delCookie("accountInfo");
          }
          this.$http.post(this.rootUrl+'/user/login', data).then(data => {
            console.log(data.data);
            if (data.data.code == '200'){
              const token = data.data.result.token;
              sessionStorage.setItem("token",token);
              this.$router.push('/index');
            }else {
              this.$message.error('帐号、密码或域名有误!');
              this.loading = false;
            }
          }).catch(function (err) {
            console.log(err);
              this.loading = false;
          });
        },
          loadAccountInfo(){
              let accountInfo = this.getCookie('accountInfo');

              //如果cookie里没有账号信息
              if(Boolean(accountInfo) == false){
                  console.log('cookie中没有检测到账号信息！');
                  return false;
              }else{
                  //如果cookie里有账号信息
                  console.log('cookie中检测到账号信息！现在开始预填写！');

                  console.log(accountInfo.split("&"));
                  this.accountInput = accountInfo.split("&")[0];
                  this.passwordInput = accountInfo.split("&")[1];
                  this.domainInput = accountInfo.split("&")[2];
              }
          },



        setCookie: function(c_name,value,expiremMinutes){
            var exdate = new Date();
            exdate.setTime(exdate.getTime() + expiremMinutes * 60 * 1000);
            document.cookie= c_name + "=" + escape(value)+((expiremMinutes==null) ? "" : ";expires="+exdate.toGMTString());
        },
        // 读取cookie
        getCookie: function(c_name){
            if (document.cookie.length>0)
            {
                var c_start=document.cookie.indexOf(c_name + "=");
                if (c_start!=-1)
                {
                    c_start=c_start + c_name.length+1;
                    var c_end=document.cookie.indexOf(";",c_start);
                    if (c_end==-1)
                        c_end = document.cookie.length
                    return unescape(document.cookie.substring(c_start, c_end))
                }
            }
            return ""
        },
        // 删除cookie
        delCookie: function(c_name){
            var exp = new Date();
            exp.setTime(exp.getTime() - 1);
            var cval = this.getCookie(c_name);
            if(cval!=null){
                document.cookie = c_name + "=" + cval + ";expires=" + exp.toGMTString();
            }
        },
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
 /* .input{
    display: flex;
    align-items: center;
    padding-bottom: 30px;
  }*/
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
  .input-login{
      margin-top: 20px;
  }
</style>
