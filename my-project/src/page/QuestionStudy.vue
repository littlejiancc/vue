<template>
  <div>
    <div style="margin: 40px">
        <Title title="问题学习">
            <div>
                <div class="popover-content">
                    <div class="popover-content-left">问题</div>
                    <div class="popover-content-right">访客提问的问题</div>
                </div>
                <div class="popover-content">
                    <div class="popover-content-left">提问时间</div>
                    <div class="popover-content-right">访客提问问题的时间</div>
                </div>
            </div>
        </Title>
    </div>
      <div class="btn-delete">
          <el-button type="primary" icon="el-icon-delete" :disabled="delDisable" @click="deleteBtnMore"></el-button>
          <label class="selected-label">{{label}}</label>
      </div>
      <div class="table"  v-loading="loading">
          <el-table
              :data="tableData"
              ref="multipleTable"
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
                  label="问题"
              >
              </el-table-column>
              <el-table-column
                  prop="askTime"
                  label="提问时间"
                  sortable
              >
              </el-table-column>
              <el-table-column
                  fixed="right"
                  label="操作"
                  width="200"
              >
                  <template slot-scope="scope">
                      <el-button  @click="addToQuestion(scope.row)" type="text" size="small">添加到知识库</el-button>
                      <el-button  @click="deleteBtn(scope.row)" type="text" size="small">忽略</el-button>
                  </template>
              </el-table-column>

          </el-table>
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
import Title from "../components/Title";
import moment from "moment";
  export default {
    components:{Title},
      data(){
        return{
            title:"添加到知识库",
            tableData:[],
            loading:false,
            total:0,
            page:1,
            perPage:10,
            multipleSelection: [],
            delDisable:true,
            label:'',
            dialogFormVisible:false,
            id:[],
            options: [],
            pointId: '',
            value: '',
            simQuestion:[{value:""}],
            delDisable:true,
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
        };
      },
      mounted(){
          this.getPointList();
          this.getQueStudyList();

      },
      methods:{
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
          pageSizeChange(val){
              this.perPage = val;
              this.getQueStudyList();
          },
          currentPageChange(val){
              this.page = val;
              this.getQueStudyList();
          },
          handleSelectionChange(val) {
              this.multipleSelection = val;
              this.id=[];
              console.log(this.multipleSelection);
              if (this.multipleSelection.length !=0){
                  this.delDisable = false;
                  this.label = '已选中'+this.multipleSelection.length+'项';
                  for (let index in this.multipleSelection){
                      console.log(this.multipleSelection[index].id)
                      this.id = this.multipleSelection.map(e=>e.id);
                  }
              }else {
                  this.delDisable = true;
                  this.label = '';
              }
          },
          addSimQuestionClick(){
              this.simQuestion.push({value:""})
          },
          delSimQuestionClick(index){
              this.simQuestion.splice(index,1);
          },
          addToQuestion(row){
              this.id = [];
              this.dialogFormVisible = true;
              this.ruleForm.title = row.title;
              this.id.push(row.id);
              console.log("this.id"+this.id)
          },
          pointSelectedChange(value){
              this.pointId = value;

          },
          deleteBtn(row){
              this.id = [];
              this.id.push(row.id);
              this.deleteStudy(this.id);
          },
          deleteBtnMore(){
              console.log(this.id);
              this.deleteStudy(this.id);
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
          getQueStudyList(){
              this.loading = true;
              const token = sessionStorage.getItem("token");
              const {page,perPage} = this;
              this.$http({
                  url:this.rootUrl+'/study/list',
                  method:"post",
                  headers:{"Authorization":'Bearer '+token},
                  data:{page,perPage}
              }).then(res=>{
                  this.loading = false;
                  console.log(res);
                  if (res.data.code == '200') {
                      const formatString = 'YYYY-MM-DD HH:mm:ss';
                      const result = res.data.result;
                      for (let index in result.list) {
                          result.list[index].askTime = moment(result.list[index].askTime).format(formatString)
                      }
                      this.tableData = result.list;
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
          deleteStudy(value){
              const token = sessionStorage.getItem("token");
              const data = {ids:value};
              console.log(data);
              this.$confirm('此操作将永久删除问题 是否继续?', '提示', {
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  type: 'warning'
              }).then(() =>{
                  this.$http({
                      url:this.rootUrl+'/study/delete',
                      method:"post",
                      headers:{"Authorization":'Bearer '+token},
                      data:data
                  }).then(res=>{
                      console.log(res);
                      if (res.data.code == '200'){
                          this.$message({
                              message: '删除成功！',
                              type: 'success'
                          });
                          this.getQueStudyList();
                      }else{
                          this.$message.error('删除失败！');
                      }
                  }).catch(function (err) {
                      console.log(err);
                  });
              }).catch(() => {
                  this.$message({
                      type: 'info',
                      message: '已取消删除'
                  });
              });
          },
          saveQuestion(){
              console.log(this.simQuestion);
              const simQuestion = this.simQuestion.map(e=>e.value);
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
              console.log(data);
              const url =this.rootUrl+'/question/add';
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
                      console.log(this.id+'dsg');
                      this.$http({
                          url:this.rootUrl+'/study/delete',
                          method:"post",
                          headers:{"Authorization":'Bearer '+token},
                          data:{ids:this.id}
                      }).then(res=>{
                          console.log(res);
                          if (res.data.code == '200'){
                              this.$message({
                                  message: '删除成功！',
                                  type: 'success'
                              });
                              this.getQueStudyList();
                          }else{
                              this.$message.error('删除失败！');
                          }
                      }).catch(function (err) {
                          console.log(err);
                      });

                      this.getQueStudyList();

                  }else if(res.data.code == '209'){
                      this.$message.error('此标题已存在！');
                  }else {
                      this.$message.error('保存失败！');
                  }
              }).catch(function (err) {
                  console.log(err);
              })
          },
      },

  }
</script>

<style scoped>
    .pagination{
        text-align: right;

        margin-top: 40px;
    }
    .table {
        padding: 0 40px 40px 40px;
    }
    .btn-delete{
        padding-left: 40px;
    }
    .popover-content{
        padding-bottom: 30px;
    }
    .popover-content-left{
        width: 30%;
        float: left;
    }
    .popover-content-right{
        width: 70%;
        float: left;
    }
</style>