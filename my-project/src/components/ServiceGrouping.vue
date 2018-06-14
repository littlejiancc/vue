<template>
    <div>
        <div class="u-title" style="">
            <el-button type="primary" @click="addGroupBtn">新增分组</el-button>
        </div>
        <div class="u-msg" v-if="isShow">
            <img src="https://qiyukf.nosdn.127.net/prd/res/img/empty_5d5abe342a2c1bcc8b72df873467b893.png">
        </div>
        <div style="width: 100%;float: left">
            <div v-for="(item,index) in groupList" :key="index" >
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <span title="组名称">组名称:{{item.name}}</span>
                        <i style="float: right; padding: 3px 0" class="el-icon-delete" @click="deleteBtn(item.id)"></i>
                    </div>
                    <div v-for="o in item.userList" :key="o" class="text item">
                        {{o.name }}
                    </div>
                    <div style="text-align: center">
                        <a class="add" @click="addUser(item.id)">
                            <i class="el-icon-plus" style="color: #a3afb7;" ></i>添加组员
                        </a>
                    </div>

                </el-card>
            </div>
        </div>
        <el-dialog title="新增分组" :visible.sync="dialogFormVisible" width="600px" :closeOnClickModal="false" @close="closeDialog('ruleForm')">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm"  label-width="100px" size="small " class="demo-ruleForm">
                <el-form-item label="分组名称" prop="name" class="input-add" >
                    <el-input  v-model="ruleForm.name" placeholder="请输入分组名称"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="cancel('ruleForm')">取 消</el-button>
                <el-button type="primary" @click="submitForm('ruleForm')">保 存</el-button>
            </div>
        </el-dialog>
        <el-dialog title="新增人员" :visible.sync="dialogFormVisible2" width="600px" :closeOnClickModal="false" @close="closeDialog('ruleForm2')">
            <el-form :model="ruleForm2" :rules="rules" ref="ruleForm2"  label-width="100px" size="small " class="demo-ruleForm">
                <el-transfer v-model="value1" :data="data"></el-transfer>
            </el-form>

            <div slot="footer" class="dialog-footer">
                <el-button @click="cancel('ruleForm2')">取 消</el-button>
                <el-button type="primary" @click="submitForm('ruleForm2')">保 存</el-button>
            </div>
        </el-dialog>

    </div>

</template>

<script>
  export default {
    data(){
        const generateData = _ => {
            const data = [];
            for (let i = 1; i <= 15; i++) {
                data.push({
                    key: i,
                    label: `备选项 ${ i }`,
                });
            }
            return data;
        };
          return {
              groupList: [],
              userList: [],
              isShow:true,
              groupId:'',
              dialogFormVisible:false,
              dialogFormVisible2:false,
              ruleForm: {
                  name: '',
              },
              ruleForm2: {

              },
              rules: {
                  name: [
                      {required: true, message: '请输入名称', trigger: 'blur'},
                  ],
              },
              data: [],
              value1: []
          }
      },
      mounted(){
          this.getGroupList();
      },
      methods:{
          getGroupList(){
              const token = sessionStorage.getItem("token");
              this.$http({
                  url:this.rootUrl+'/group/list',
                  method:"post",
                  headers:{"Authorization":'Bearer '+token},
              }).then(res=>{
                  console.log(res);
                  if (res.data.code == '200') {
                      const result = res.data.result;
                      this.groupList = result.list;
                      if(this.groupList.length === 0){
                          this.isShow=true
                      }else{
                          this.isShow=false
                      }
                      console.log(this.groupList);
                  }else {

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
                  if(formName == 'ruleForm'){
                      this.addGroup();
                      return true;
                  }else{
                      this.addUserGroup();
                      console.log("222"+this.value1);
                  }

              });
          },
          //关闭弹框的事件
          closeDialog(formName){
              this.$refs[formName].resetFields();

          },
          cancel(formName){
              console.log(this.options);
              this.$refs[formName].resetFields();
              this.dialogFormVisible = false;
              this.dialogFormVisible2 = false;
          },
          addGroupBtn(){
              this.dialogFormVisible = true;

          },
          addGroup(){
              const token = sessionStorage.getItem("token");
              this.$http({
                  url:this.rootUrl+'/group/add',
                  method:"post",
                  headers:{"Authorization":'Bearer '+token},
                  data:{name:this.ruleForm.name}
              }).then(res=>{
                  console.log(res);
                  if (res.data.code == '200') {
                      this.$message({
                          message: '保存成功！',
                          type: 'success'
                      });
                      this.getGroupList();
                      this.dialogFormVisible = false;
                  }else if(res.data.code == '209'){
                      this.$message.error('此分组名称已存在！');
                  }
              }).catch(function (err) {
                  console.log(err);
                  this.$message.error('服务器错误！');
              })
          },
          deleteBtn(id){
              console.log(id);
              const token = sessionStorage.getItem("token");
              this.$confirm('此操作将永久删除分组 是否继续?', '提示', {
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  type: 'warning'
              }).then(() =>{
                  this.$http({
                      url:this.rootUrl+'/group/delete',
                      method:"post",
                      headers:{"Authorization":'Bearer '+token},
                      data:{id:id}
                  }).then(res=>{
                      console.log(res);
                      if (res.data.code == '200') {
                          this.$message({
                              message: '删除成功！',
                              type: 'success'
                          });
                          this.getGroupList();
                      }else {

                      }
                  }).catch(function (err) {
                      console.log(err);
                      this.$message.error('服务器错误！');
                  })
              }).catch(() => {
                  this.$message({
                      type: 'info',
                      message: '已取消删除'
                  });
              });

          },
          addUser(id){
              this.dialogFormVisible2 = true;
              this.getUserNotGroup(id);
              this.value1=[];
              this.groupId=id;
          },
          getUserNotGroup(id){
              const token = sessionStorage.getItem("token");
              this.$http({
                  url:this.rootUrl+'/group/user/notGroup',
                  method:"post",
                  headers:{"Authorization":'Bearer '+token},
                  data:{id:id},
              }).then(res=>{
                  console.log(res);
                  if (res.data.code == '200') {
                      const result = res.data.result;
                      for (let index in result.list) {
                          result.list[index].key = result.list[index].id;
                          result.list[index].label = result.list[index].name;
                      }
                    this.data =  result.list;
                  }else {

                  }
              }).catch(function (err) {
                  console.log(err);
                  this.$message.error('服务器错误！');
              })
          },
          addUserGroup(){
              const token = sessionStorage.getItem("token");
              this.$http({
                  url:this.rootUrl+'/add/userGroup',
                  method:"post",
                  headers:{"Authorization":'Bearer '+token},
                  data:{id:this.groupId,userIds:this.value1}
              }).then(res=>{
                  console.log(res);
                  if (res.data.code == '200') {
                      this.$message({
                          message: '添加成功！',
                          type: 'success'
                      });
                      this.getGroupList();
                      this.dialogFormVisible2 = false;
                  }else {

                  }
              }).catch(function (err) {
                  console.log(err);
                  this.$message.error('服务器错误！');
              })
          },
      }
  }
</script>

<style scoped>
    .u-title{
       margin: 20px;
        width: 100%;
    }
    .u-msg{
        text-align: center;
        font-size: 14px;
        color: #999;

    }
    .text {
        font-size: 14px;
    }

    .item {
        margin-bottom: 18px;
    }

    .clearfix:before,
    .clearfix:after {
        display: table;
        content: "";
    }
    .clearfix:after {
        clear: both
    }

    .box-card {
        float: left;
        width: 25%;
        margin: 20px;
    }
    .input-add{
        margin: 20px auto 0 auto;
        width: 450px;
    }

</style>