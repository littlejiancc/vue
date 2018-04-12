<template>
    <div>
        <div>
            <Title showDate showAllService showExportData>工作量报表</Title>
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
    }
</script>

<style scoped>
    .pagination{
        text-align: right;

        margin-top: 40px;
    }
</style>