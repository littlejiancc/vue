<template>
    <div>
        <SignHeader>注册获取专业版试用</SignHeader>
        <SignMain>
            <div class="title">注册网易七鱼</div>
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
                        <div><el-button @click="sendVerifyCode"  type="primary" :disabled="disabled">{{sendCode}}</el-button></div>
                    </div>
                </div>
                <el-button @click="next"  type="primary" :disabled="disabled2">下一步</el-button>
            </div>
            <div v-if="active==1">
                这是步骤2
                <el-button @click="next"  type="primary">下一步</el-button>
            </div>
            <div v-if="active==2">
                这是步骤3
                <el-button @click="next"  type="primary">完成</el-button>
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
                sendCode:"发送验证码",
                dynamicValidateForm: {
                    phone: ''
                },
                rules:[
                    { required: true, message: '请输入手机号', trigger: 'blur' },
                    { pattern: '^(1[3,4,5,7,8])\\d{9}$', message: '请输入正确的手机号格式', trigger: 'blur,change' }
                ]
            }
        },
        methods:{
            next() {

                if (this.active++ > 2) this.active = 0;

            },
            //发送验证码
            sendVerifyCode(){
                const phone = this.dynamicValidateForm.phone;
                const data ={phone:phone};
                    let count = 60;
                this.sendCode = ""+count+"秒后重新发送";
                const timer = setInterval(()=>{
                    if(count===0)  {
                        this.sendCode = "发送验证码";
                        return clearInterval(timer);
                    };
                    count--;
                    this.sendCode = ""+count+"秒后重新发送";
                },1000)
                if (count != 60){
                    this.$http.post(this.rootUrl+'/regist/sendCode', data).then(data => {
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
                }
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
</style>
