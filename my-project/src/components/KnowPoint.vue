<template>
    <div id="question">
        <div class="search">
            <div style="width: 350px">
                <el-input placeholder="搜索知识点关键字" v-model="searchInput" >
                    <el-button @click="searchClick" slot="append" icon="el-icon-search"></el-button>
                </el-input>
            </div>
            <div >
                <el-button type="primary"  @click="addPoint">添加</el-button>
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
                    label="知识点标题"
                >
                </el-table-column>
                <el-table-column
                    sortable
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
                        <el-button  @click="editPoint(scope.row)" type="text" size="small">编辑</el-button>
                        <el-button  @click="deletePoint(scope.row)" type="text" size="small">删除</el-button>
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
        <el-dialog title="新增知识点" :visible.sync="dialogFormVisible" width="800px" :closeOnClickModal="false" @close="closeDialog('ruleForm')">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm"  label-width="100px" size="small " class="demo-ruleForm">
                <el-form-item label="知识点标题" prop="title" class="input-add" >
                    <el-input  v-model="ruleForm.title" placeholder=""></el-input>
                </el-form-item>
                <el-form-item label="知识点内容" prop="content" class="input-add">
                    <el-input type="textarea" v-model="ruleForm.content"></el-input>
                </el-form-item>
                <el-form-item label="相关问题" class="input-add">
                    <el-button type="primary"> 关联已有问题</el-button>
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
    import ElFormItem from "../../node_modules/element-ui/packages/form/src/form-item.vue";
    import ElButton from "../../node_modules/element-ui/packages/button/src/button.vue";
    import moment from "moment";
    export default {
        components: {
            ElButton,
            ElFormItem},
        data() {
            return {
                id:0,
                searchInput:'',
                tableData: [],
                total:0,
                page:1,
                perPage:10,
                loading:false,
                dialogFormVisible:false,
                multipleSelection: [],
                delDisable:true,
                label:'',
                ruleForm: {
                    title: '',
                    content:'',
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
                }
            }
        },
        mounted(){
            this.getPointList();
        },

        methods: {
            searchClick(){

            },
            pageSizeChange(val){
                this.perPage = val;
            },
            currentPageChange(val){
                this.page = val;
            },
            addPoint(){
                this.dialogFormVisible = true;
            },
            editPoint(row){
                this.id = row.id;
                this.dialogFormVisible = true;
                this.getPoint();
            },
            deletePoint(row){

            },
            //关闭弹框的事件
            closeDialog(formName){
                this.$refs[formName].resetFields();
            },
            cancel(formName){
                this.$refs[formName].resetFields();
                this.dialogFormVisible = false;
            },
            submitForm(formName){
                this.$refs[formName].validate((valid) => {
                    if (!valid) {
                        console.log('error submit!!');
                        return false;
                    }
                    this.savePoint();
                    this.$refs[formName].resetFields();
                    return true;
                });
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
                console.log(this.multipleSelection);
                if (this.multipleSelection.length !=0){
                    this.delDisable = false;
                    this.label = '已选中'+this.multipleSelection.length+'项';
                }else {
                    this.delDisable = true;
                    this.label = '';
                }
            },
            savePoint(){
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
                const data = {title:this.ruleForm.title,content:this.ruleForm.content,status:status,startTime:startTime,endTime:endTime}
                console.log(data);
                let url = this.rootUrl+'/point/update';
                if(this.id == 0)
                    url =this.rootUrl+'/point/add';
                this.$http({
                    url:url,
                    method:"post",
                    headers:{"Authorization":'Bearer '+token},
                    data:data
                }).then(res=>{
                    console.log(res);
                    if (res.data.code == '200'){
                        this.dialogFormVisible = false;
                        this.$message({
                            message: '保存成功！',
                            type: 'success'
                        });
                        this.getUserList();
                    }else if(res.data.code == '209'){
                        this.$message.error('此标题已存在！');
                    }else {
                        this.$message.error('保存失败！');
                    }
                }).catch(function (err) {
                    console.log(err);
                })
            },
            getPointList(){
                this.loading = true;
                const token = sessionStorage.getItem("token");
                const {page,perPage} = this;
                this.$http({
                    url:this.rootUrl+'/point/pointList',
                    method:"post",
                    headers:{"Authorization":'Bearer '+token},
                    data:{page,perPage}
                }).then(res=>{
                    this.loading = false;
                    if (res.data.code == '200') {
                        const formatString = 'YYYY-MM-DD HH:mm:ss';
                        const result = res.data.result;
                        for (let index in result.pointList) {
                            result.pointList[index].createTime = moment(result.pointList[index].createTime).format(formatString)
                            if (result.pointList[index].status == 1) {
                                result.pointList[index].period = '永久有效';
                                result.pointList[index].status = '有效';
                            } else {
                                result.pointList[index].period = moment(result.pointList[index].startTime).format(formatString)+'~'+moment(result.pointList[index].endTime).format(formatString);
                                if (moment(new Date())>moment(result.pointList[index].endTime)){
                                    result.pointList[index].status = '失效';
                                }else {
                                    result.pointList[index].status = '有效';
                                }
                            }
                        }
                        this.tableData = result.pointList;
                        this.total = result.total
                    }else {
                        this.tableData = null;
                        this.total = 0;
                    }
                }).catch(function (err) {
                    console.log(err);
                    this.$message.error('服务器错误！');
                })
            },
            getPoint(){
                console.log(this.id);
                const token = sessionStorage.getItem("token");
                const formatString = 'YYYY-MM-DD HH:mm:ss';
                this.$http({
                    url:this.rootUrl+'/point/info',
                    method:"post",
                    headers:{"Authorization":'Bearer '+token},
                    data:{id:this.id}
                }).then(res=>{
                    if (res.data.code == '200') {
                        const point = res.data.result.point;
                        if (point.status == 1){
                            point.period = '永久有效';
                        }else{
                            console.log('000000');
                            point.period = '自定义有效期';
                            console.log(moment(point.startTime).format(formatString));
                            var myArray=new Array();
                            myArray[0] = moment(point.startTime).format(formatString);
                            myArray[1] = moment(point.endTimeTime).format(formatString);
                            point.date = myArray;
                        }
                        this.ruleForm = point;
                    }else {
                        this.$message.error('查询失败！');
                    }
                }).catch(err=>{

                });
            },
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
    .btn-delete{
        padding-left: 40px;
    }
    .pagination{
        text-align: right;
        padding-right: 40px;
    }
    .input-add{
        margin: 20px auto 0 auto;
        width: 600px;
    }
    .selected-label{
        color: #999;
        padding-left: 20px;
    }
</style>