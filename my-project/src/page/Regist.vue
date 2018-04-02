<template>
    <div>
        <div id="regist">
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
                    <el-form :model="dynamicValidateForm" ref="dynamicValidateForm" label-width="100px" class="demo-dynamic regist-input">
                        <el-form-item
                            prop="phone"
                            label="手机号"
                            :rules="[
                                { required: true, message: '请输入手机号', trigger: 'blur' },
                                { pattern:'^(1[3,4,5,7,8])\\d{9}$', message: '请输入正确的手机号格式', trigger: 'blur,change' }
                            ]"
                        >
                        <el-input v-model="dynamicValidateForm.phone" placeholder="请输入手机号"></el-input>
                        </el-form-item>
                    </el-form>
                        <div class="input code-input">
                            <div>验证码：</div>
                            <div><el-input placeholder="请输入4位验证码" type="text"  v-model="codeInput"></el-input></div>
                            <div><el-button @click="sendCode" type="primary">发送验证码</el-button></div>
                        </div>
                    <el-button @click="nextStep"  type="primary">下一步</el-button>
                </div>
                <div v-if="active==1">
                    这是步骤2
                    <el-button @click="nextStep"  type="primary">下一步</el-button>
                </div>
                <div v-if="active==2">
                    这是步骤3
                    <el-button @click="nextStep"  type="primary">完成</el-button>
                </div>
            </SignMain>
            <footer>已有账号? <router-link class="register" to="/login">立即登录</router-link></footer>
            <Footer />
        </div>
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
                dynamicValidateForm: {
                  phone: ''
              }
            }
        },
        methods:{
            nextStep() {
                  if (this.active++ > 2) this.active = 0;
              },
              sendCode() {
                this.$http.post(this.rootUrl+'/user/login', data).then(data => {
                  if (data.data.code == '200'){

                  }else {

                  }
                }).catch(function (err) {
                  console.log(err);
                });
              }
        }
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


</style>
