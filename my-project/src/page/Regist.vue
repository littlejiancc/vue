<template>
    <div>
        <SignHeader>账号注册</SignHeader>
        <SignMain>
            <div class="title">账号注册</div>
            <el-steps align-center :active="active" finish-status="success">
            <el-step title="验证手机号"></el-step>
            <el-step title="创建客服平台"></el-step>
            <el-step title="注册成功"></el-step>
            </el-steps>
            <!-- <component :is="componentId"></component> -->
            <div v-if="active==0">
                <div class="regist-input">
                    <el-form :model="dynamicValidateForm" ref="dynamicValidateForm" label-width="100px" class="demo-dynamic">
                        <el-form-item
                            prop="phone"
                            label="手机号："
                            :rules="rules"
                        >
                            <el-input v-model="dynamicValidateForm.phone" placeholder="请输入11位手机号"></el-input>
                        </el-form-item>
                    </el-form>
                    <div class="input code-input">
                        <div class="el-form-item__label"> 验证码：</div>
                        <div><el-input placeholder="请输入4位验证码" type="text"  v-model="codeInput"></el-input></div>
                        <div><el-button @click="sendVerifyCode"  type="primary" :disabled="disabled" style="font-size: 16px">{{sendCode}}</el-button></div>
                    </div>
                </div>
                <el-button @click="nextFirst"  type="primary" :loading="loading" :disabled="disabled2" style="font-size: 16px">下一步</el-button>
            </div>
            <div v-if="active==1">
                <div class="input-register">
                    <el-input placeholder="请输入企业或团队名称" v-model="name">
                        <template slot="prepend">企业名称</template>
                    </el-input>
                </div>
                <div class="input-register">
                    <el-input placeholder="请输入域名前缀" v-model="domain">
                        <template slot="prepend">登录域名</template>
                        <template slot="append">.qiyukf.com</template>
                    </el-input>
                </div>
                <div class="domain-desc">登录域名将成为您企业客服平台的唯一域名，设置后不能更改
                </div>
                <div class="input-register">
                    <el-input placeholder="将默认成为企业超级管理员帐号" v-model="account">
                        <template slot="prepend">企业邮箱</template>
                    </el-input>
                </div>
                <div class="input-register">
                    <el-input placeholder="请输入6-16位密码" v-model="password" type="password">
                        <template slot="prepend">账号密码</template>
                    </el-input>
                </div>
                <el-button @click="nextSecond"  type="primary" style="margin-top: 30px;font-size: 16px" :loading="loading2"  :disabled="disabled3" >下一步</el-button>
            </div>
            <div v-if="active==2">
                <div class="regist-success">恭喜您！注册成功</div>
                <el-button @click="loginClick" type="primary" :loading="loading3" class="btn-regist-success">进入我的客服平台</el-button>
            </div>
        </SignMain>
        <footer>已有账号? <router-link class="register" to="/login">立即登录</router-link></footer>
        <Footer />
    </div>
</template>

<script>
import Footer from "../components/Footer";
import SignHeader from "../components/SignHeader";
import SignMain from "../components/SignMain";

    export default {
        components:{Footer,SignHeader,SignMain},
        data(){
            return {
                active: 0,
                mobileInput:"",
                codeInput:"",
                loading:false,
                loading2:false,
                loading3:false,
                sendCode:"发送验证码",
                name:"",
                domain:"",
                account:"",
                password:"",
                dynamicValidateForm: {
                    phone: ''
                },
                isSend:false,
                rules:[
                    { required: true, message: '请输入手机号', trigger: 'blur' },
                    { pattern: '^(1[3,4,5,7,8])\\d{9}$', message: '请输入正确的手机号格式', trigger: 'blur,change' }
                ]
            }
        },
        methods:{
            nextFirst() {
                this.loading = true;
                const phone = this.dynamicValidateForm.phone;
                const code = this.codeInput;
                const data = {phone:phone,code:code};
                console.log(data);
                /*if (this.active++ > 2) this.active = 0;*/
               this.$http.post(this.rootUrl+'/regist/codeVerify', data).then(data => {
                    console.log(data.data);
                    if (data.data.code == '200'){
                        if (this.active++ > 2) this.active = 0;
                    }else {
                        this.$message.error('验证码错误，请重新输入！');
                        this.loading = false;
                    }
                }).catch(function (err) {
                    console.log(err);
                    this.loading = false;
                });

            },
            nextSecond() {
                this.loading2 = true;
                const name = this.name;
                const domain = this.domain;
                const account = this.account;
                const password = this.password;
                const mobile = this.dynamicValidateForm.phone;
                const data = {companyName:name,companyDomain:domain,account:account,password:password,mobile:mobile};
                console.log(data);
                /*if (this.active++ > 2) this.active = 0;*/
                this.$http.post(this.rootUrl+'/regist/saveCompany', data).then(data => {
                    console.log(data.data);
                    if (data.data.code == '200'){
                        if (this.active++ > 2) this.active = 0;
                    }else if (data.data.code == '210'){
                        this.$message.error('账号已存在，请重新输入！');
                        this.loading2 = false;
                    }else if (data.data.code == '211'){
                        this.$message.error('企业域名已存在，请重新输入！');
                        this.loading2 = false;
                    }else {
                        this.$message.error('保存失败！');
                        this.loading2 = false;
                    }
                }).catch(function (err) {
                    console.log(err);
                    this.loading2 = false;
                });
            },
            //发送验证码
            sendVerifyCode(){
                if(this.isSend)return;
                this.isSend = true;
                const phone = this.dynamicValidateForm.phone;

                let count = 60;
                this.sendCode = ""+count+"秒后重新发送";
                const timer = setInterval(()=>{
                    if(count===0)  {
                        this.isSend = false;
                        this.sendCode = "发送验证码";
                        return clearInterval(timer);
                    };
                    count--;
                    this.sendCode = ""+count+"秒后重新发送";
                },1000)
                this.$http.post(this.rootUrl+'/regist/sendCode', {phone}).then(data => {
                    console.log(data.data);
                    if (data.data.code == '200'){
                        clearInterval(timer);
                        this.sendCode = "发送验证码";
                    }else {
                        this.$message.error('验证码发送失败，请重试！');
                        this.loading = false;
                    }
                }).catch(function (err) {
                    console.log(err);
                });

            },
            loginClick(){
                const data = {account:this.account,password:this.password,companyDomain:this.domain,remember_me:false}
                console.log(data);
                this.loading3 = true;
                this.$http.post(this.rootUrl+'/user/login', data).then(data => {
                    console.log(data.data);
                    if (data.data.code == '200'){
                        const token = data.data.result.token;
                        sessionStorage.setItem("token",data.data.token);
                        this.$router.push('/');
                    }else {
                        this.$message.error('帐号、密码或域名有误!');
                        this.loading3 = false;
                    }
                }).catch(function (err) {
                    console.log(err);
                    this.loading3 = false;
                });
            }
        },
        computed:{
            disabled(){
                const phone = this.dynamicValidateForm.phone;
                const rules = /^(1[3,4,5,7,8])\d{9}$/;
                const isMatched = rules.test(phone);
                if(!phone || !isMatched)return true;
                return false;
            },
            disabled2(){
                const phone = this.dynamicValidateForm.phone;
                const codeInput = this.codeInput;
                if(!codeInput || !phone)return true;
                return false;
            },
            disabled3(){
                const name = this.name;
                const domain = this.domain;
                const account = this.account;
                const password = this.password;
                if(!name || !domain || !account || !password)return true;
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
  .regist-input{
      margin-top: 30px;
      margin-bottom: 20px;
  }
    .input{
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-bottom: 30px;
  }
  .input>div:nth-of-type(1){
    width: 20%;
  }
  .input>div:nth-of-type(2){
    width: 80%;
  }
  .code-input>div:nth-of-type(1){
    width: 20%;
  }
  .code-input>div:nth-of-type(2){
    width: 40%;
  }
  .code-input>div:nth-of-type(3){
    width: 35%;
  }
  .el-button{
      width: 100%;
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
  .el-input__inner{
    width: 80%;
}
    .el-form-item__label{
        margin-left: 10px;
    }
    .el-form-item__label:before{
        content: '*';
        color: #f56c6c;
        margin-right: 2px;
    }
    .input-register{
        margin-top: 20px;
    }
    .domain-desc{
        line-height: 1.2;
        text-align: left;
        font-size: 14px;
        color: #9b9ba3;
        margin-top: 5px;
    }
    .regist-success{
        margin-top: 37px;
        font-size: 24px;
        color: #373d40;
        text-align: center;
    }
    .btn-regist-success{
        margin-top: 50px;
        font-size: 16px;
    }
</style>
