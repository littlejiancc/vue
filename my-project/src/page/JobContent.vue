<template>
    <div>
        <div>
            <Title showDate showAllService showExportData title="工作质量报表">
                <div>
                    <div class="popover-content">
                        <div class="popover-content-left">平均首次响应时间</div>
                        <div class="popover-content-right">访客首次询问和客服回复时间间隔的平均值</div>
                    </div>
                    <div class="popover-content">
                        <div class="popover-content-left">平均响应时间</div>
                        <div class="popover-content-right">所有访客询问和客服回复时间间隔的平均值</div>
                    </div>
                    <div class="popover-content">
                        <div class="popover-content-left">30秒应答率</div>
                        <div class="popover-content-right">响应时间在30秒以内的服务占比</div>
                    </div>
                    <div class="popover-content">
                        <div class="popover-content-left">平均会话时长</div>
                        <div class="popover-content-right">访客进入到会话结束时间间隔的平均值</div>
                    </div>
                    <div class="popover-content">
                        <div class="popover-content-left">一次性解决率</div>
                        <div class="popover-content-right">统计周期内，访客未二次来访的会话与总会话数的比值，此数据有一定时间延迟</div>
                    </div>
                    <div class="popover-content">
                        <div class="popover-content-left">相对满意度</div>
                        <div class="popover-content-right">满意数量和评价数量的比值</div>
                    </div>
                </div>
            </Title>
        </div>
        <div class="table"  v-loading="loading">
            <el-table
                :data="tableData"
                style="width: 100%"
            >
                <el-table-column
                    prop="name"
                    label="姓名"
                    sortable
                >
                </el-table-column>
                <el-table-column
                    prop="first"
                    label="平均首次响应时间"
                    sortable
                >
                </el-table-column>
                <el-table-column
                    prop="average"
                    label="平均响应时间"
                    sortable
                >
                </el-table-column>
                <el-table-column
                    prop="responseRate"
                    label="30秒应答率"
                    sortable
                >
                </el-table-column>
                <el-table-column
                    prop="duration"
                    label="平均会话时长"
                    sortable
                >
                </el-table-column>
                <el-table-column
                prop="firstSolve"
                label="一次性解决率"
                sortable
                >
                </el-table-column>
                <el-table-column
                    prop="satisfaction"
                    label="相对满意度"
                    sortable
                >
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
    </div>
</template>

<script>
    import Title from "../components/Title";
    export default {
        components:{Title},
        data(){
            return{
                tableData:[],
                loading:false,
                total:0,
                page:1,
                perPage:10,
            };
        },
        methods:{
            pageSizeChange(val){
                this.perPage = val;
                this.getUserList();
            },
            currentPageChange(val){
                this.page = val;
                this.getUserList();
            },
        },
    }
</script>

<style scoped>
    .pagination{
        text-align: right;

        margin-top: 40px;
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