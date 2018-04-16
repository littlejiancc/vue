<template>
  <div id="question">
      <div class="search">
          <div style="width: 350px">
              <el-input placeholder="搜索问题关键字" v-model="searchInput" >
                  <el-button @click="searchClick" slot="append" icon="el-icon-search"></el-button>
              </el-input>
          </div>
          <div >
              <el-button type="primary"  @click="addQuestion">添加</el-button>
          </div>
      </div>
      <div class="btn-delete">
          <el-button type="primary" icon="el-icon-delete" :disabled="delDisable"></el-button>
          <label class="selected-label">{{label}}</label>
      </div>
      <div class="table"  v-loading="loading">
          <el-table
              ref="multipleTable"
              :data="tableData"
              tooltip-effect="dark"
              style="width: 100%"
              @selection-change="handleSelectionChange"
          >
              <el-table-column
                  type="selection"
                  width="55">
              </el-table-column>
              <el-table-column
                  prop="title"
                  label="问题标题"

              >
              </el-table-column>
              <el-table-column
                  prop="point"
                  label="归属知识点"
              >
              </el-table-column>
              <el-table-column
                  prop="createTime"
                  label="创建时间"
              >
              </el-table-column>
              <el-table-column
                  prop="status"
                  label="状态"
              >
              </el-table-column>
              <el-table-column
                  prop="period"
                  label="有效期"
              >
              </el-table-column>
              <el-table-column
                  fixed="right"
                  label="操作"
                  width="100"
              >
                  <template slot-scope="scope">
                      <el-button  @click="editQuestion(scope.row)" type="text" size="small">编辑</el-button>
                      <el-button v-if="scope.row.role!='超级管理员'" @click="deleteQuestion(scope.row)" type="text" size="small">删除</el-button>
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
      <el-dialog :title="title" :visible.sync="dialogFormVisible" width="800px" :closeOnClickModal="false" @close="closeDialog('ruleForm')">
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm"  label-width="100px" size="small " class="demo-ruleForm">
              <el-form-item label="问题标题" prop="title" class="input-add" >
                  <el-input  v-model="ruleForm.title" placeholder="填写访客可能会问到的问题"></el-input>
              </el-form-item>
              <el-form-item label="相似问题" prop="similar" class="input-add" >
                  <div >
                      <div class="similar-title" v-for="(item,index) in simQuestion" :key="index" style="margin-bottom: 10px">
                          <el-input   v-model="item.value" placeholder="填写此问题的其他问法" style="width: 90%"></el-input>
                          <el-button @click="delSimQuestionClick(index)" type="danger" icon="el-icon-delete" circle></el-button>
                      </div>
                      <el-button @click="addSimQuestionClick" type="primary" style="margin-left: 0px;margin-top: 10px" >添加相似问题</el-button>
                  </div>
              </el-form-item>
              <el-form-item label="答案" prop="answer" class="input-add">
                  <el-input type="textarea" v-model="ruleForm.answer" placeholder="输入标准答案"></el-input>
              </el-form-item>
              <el-form-item label="所属知识点" class="input-add">
                  <el-select v-model="value" clearable  placeholder="请选择" @change="pointSelectedChange">
                      <el-option
                          v-for="item in options"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                      </el-option>
                  </el-select>
              </el-form-item>
              <el-form-item label="有效期" class="input-add" prop="period">
                  <el-radio-group v-model="ruleForm.period">
                      <el-radio label="永久有效"></el-radio>
                      <el-radio label="自定义有效期"></el-radio>
                  </el-radio-group>
              </el-form-item>
              <el-form-item label="" prop="date" class="input-add" v-if="this.ruleForm.period == '自定义有效期'">
                  <el-date-picker
                      v-model="ruleForm.date"
                      type="datetimerange"
                      range-separator="至"
                      start-placeholder="开始日期"
                      end-placeholder="结束日期">
                  </el-date-picker>
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
    import moment from "moment";
  export default {
      data() {
          return {
              title:"新增问题",
              id:'',
              searchInput:'',
              tableData: [],
              total:0,
              page:1,
              perPage:10,
              loading:false,
              dialogFormVisible:false,
              multipleSelection: [],
              questionId:[],
              delDisable:true,
              label:'',
              options: [],
              pointId: '',
              value: '',
              simQuestion:[{value:""}],
              ruleForm: {
                  title: '',
                  similar:'',
                  answer:'',
                  period:'永久有效',
                  date:[],
              },
              rules: {
                  title: [
                      {required: true, message: '请输入标题', trigger: 'blur'},
                  ],
                  content: [
                      {required: true, message: '请输入内容', trigger: 'blur'},
                  ],
                  answer: [
                      {required: true, message: '请输入内容', trigger: 'blur'},
                  ],
              }
          }
      },
      mounted(){
          this.getPointList();
          this.getQuestionList();

      },
      methods: {
          addSimQuestionClick(){
            this.simQuestion.push({value:""})
          },
          delSimQuestionClick(index){
              this.simQuestion.splice(index,1);
          },
          searchClick(){

          },
          pageSizeChange(val){
              this.perPage = val;
          },
          currentPageChange(val){
              this.page = val;
          },
          addQuestion(){
            this.dialogFormVisible = true;
            this.simQuestion = [{value:""}];
            this.value = '';

          },
          editQuestion(row){

          },
          deleteQuestion(row){
              console.log(row.id);
              this.questionId.push(row.id);
              console.log(this.questionId);

          },
          handleSelectionChange(val) {
              this.multipleSelection = val;
              console.log(this.multipleSelection);
              if (this.multipleSelection.length !=0){
                  this.delDisable = false;
                  this.label = '已选中'+this.multipleSelection.length+'项';
                  for (let index in this.multipleSelection){
                      console.log(this.multipleSelection[index].id)
                      this.questionId = this.multipleSelection.map(e=>e.id);
                  }
              }else {
                  this.delDisable = true;
                  this.label = '';
              }
          },
          saveQuestion(){
              console.log(this.simQuestion);
              const simQuestion = this.simQuestion.map(e=>e.value);
              console.log(simQuestion);
              console.log(this.pointId);
              const token = sessionStorage.getItem("token");
              let status = 0;
              let startTime;
              let endTime;
              if (this.ruleForm.period == '永久有效'){
                  status = 1;
              }else {
                  startTime = this.ruleForm.date[0];
                  endTime = this.ruleForm.date[1];
              }
              const data = {title:this.ruleForm.title,content:this.ruleForm.content,answer:this.ruleForm.answer,status:status,startTime:startTime,endTime:endTime,simQuestion,knowledgePointId:this.pointId}
              let url = this.rootUrl+'/point/update';
              if(this.id == 0)
                  url =this.rootUrl+'/question/add';
              this.$http({
                  url:url,
                  method:"post",
                  headers:{"Authorization":'Bearer '+token},
                  data:data
              }).then(res=>{
                  console.log(res);
                  if (res.data.code == '200'){
                      this.dialogFormVisible = false;
                      this.$refs['ruleForm'].resetFields();
                      this.$message({
                          message: '保存成功！',
                          type: 'success'
                      });
                      this.getQuestionList();
                  }else if(res.data.code == '209'){
                      this.$message.error('此标题已存在！');
                  }else {
                      this.$message.error('保存失败！');
                  }
              }).catch(function (err) {
                  console.log(err);
              })
          },
          submitForm(formName){
              this.$refs[formName].validate((valid) => {
                  if (!valid) {
                      console.log('error submit!!');
                      return false;
                  }
                  this.saveQuestion();
                  return true;
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
          },
          //获取问题列表
          getQuestionList(){
              this.loading = true;
              const token = sessionStorage.getItem("token");
              const {page,perPage} = this;
              this.$http({
                  url:this.rootUrl+'/question/list',
                  method:"post",
                  headers:{"Authorization":'Bearer '+token},
                  data:{page,perPage}
              }).then(res=>{
                  this.loading = false;
                  console.log(res);
                  if (res.data.code == '200') {
                      const formatString = 'YYYY-MM-DD HH:mm:ss';
                      const result = res.data.result;
                      for (let index in result.staQuestionList) {
                          result.staQuestionList[index].createTime = moment(result.staQuestionList[index].createTime).format(formatString)
                          if (result.staQuestionList[index].status == 1) {
                              result.staQuestionList[index].period = '永久有效';
                              result.staQuestionList[index].status = '有效';
                          } else {
                              result.staQuestionList[index].period = moment(result.staQuestionList[index].startTime).format(formatString)+'~'+moment(result.staQuestionList[index].endTime).format(formatString);
                              if (moment(new Date())>moment(result.staQuestionList[index].endTime)){
                                  result.staQuestionList[index].status = '失效';
                              }else {
                                  result.staQuestionList[index].status = '有效';
                              }
                          }
                          if(!result.staQuestionList[index].point){
                              result.staQuestionList[index].point = '--'
                          }
                      }
                      this.tableData = result.staQuestionList;
                      this.total = result.total;
                  }else {
                      this.tableData = null;
                      this.total = 0;
                  }
              }).catch(function (err) {
                  console.log(err);
                  this.$message.error('服务器错误！');
              })
          },
          getPointList(){
              const token = sessionStorage.getItem("token");
              this.$http({
                  url:this.rootUrl+'/point/pointList',
                  method:"post",
                  headers:{"Authorization":'Bearer '+token},
                  data:{page:1,perPage:10}
              }).then(res=>{
                  if (res.data.code == '200') {
                      const result = res.data.result;

                      for (let index in result.pointList) {
                          result.pointList[index].value = result.pointList[index].id;
                          result.pointList[index].label = result.pointList[index].title;
                      }
                      this.options = result.pointList;
                      console.log(this.options.length);
                  }else {
                      this.options = [];
                  }
              }).catch(function (err) {
                  console.log(err);
                  this.$message.error('服务器错误！');
              })
          },
          pointSelectedChange(value){
              this.pointId = value;

          }

      }
  }
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
    .input-add{
        margin: 20px auto 0 auto;
        width: 600px;
    }
    .btn-delete{
        padding-left: 40px;
    }
</style>