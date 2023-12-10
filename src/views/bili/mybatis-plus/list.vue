<template>
    <div class="app-container">
        mybatis-plus
        <!--查询表单-->
        <div class="search-div">
        <el-form label-width="70px" size="small">
            <el-row>
            <el-col :span="24">
                <el-form-item label="角色名称">
                <el-input style="width: 100%" v-model="searchObj" placeholder="分 P 名称"></el-input>
                </el-form-item>
            </el-col>
            </el-row>
            <el-row style="display:flex">
            <el-button type="primary" icon="el-icon-search" size="mini"  @click="fetchData()">搜索</el-button>
            <el-button icon="el-icon-refresh" size="mini" @click="resetData">重置</el-button>
            </el-row>
        </el-form>
        </div>

        <!-- 表格 -->
        <el-table
            v-loading="listLoading"
            :data="list"
            stripe
            border
            style="width: 100%;margin-top: 10px;"
            @selection-change="handleSelectionChange">

            <!-- <el-table-column type="selection"/> -->

            <el-table-column
                label="序号"
                width="70"
                align="center">
                <template slot-scope="scope">
                {{ (page - 1) * limit + scope.$index + 1 }}
                </template>
            </el-table-column>

            <el-table-column prop="url" label="url" width="350"/>
            <el-table-column prop="view" label="view" />
            <el-table-column prop="bvid" label="bvid" />
            <el-table-column prop="part" label="part" width="300"/>
            <el-table-column prop="page" label="page" />
            <el-table-column prop="cid" label="cid" />
            <el-table-column prop="duration" label="duration" />
            <!-- <el-table-column label="操作" width="200" align="center"> -->
            <!-- </el-table-column> -->
        </el-table>

        <!-- 分页组件 -->
        <el-pagination
            :current-page="page"
            :total="total"
            :page-sizes=[10,20,50,100,200,500,1000]
            :page-size="limit"
            style="padding: 30px 0; text-align: center;"
            layout="total, prev, pager, next, jumper"
            @current-change="fetchData"
        />
    </div>
</template>
<script>
import api from '@/api/bili/bili'

export default {
    data() {
        return {
            listLoading:false,//是否显示加载
            list:[],//角色列表
            total:0,//总记录数
            page:1,//当前页
            limit:10,//每页显示记录数
            searchObj:"",//条件查询封装对象
        }
    },
    created() {
        this.fetchData()
    },
    methods: {
        fetchData(pageNum=1) {
            //页数赋值
            this.page = pageNum
            //ajax
            api.getPageList(this.searchObj,this.page,this.limit)
                .then(response => {
                //this.listLoading = false
                //console.log(response)
                //每页数据列表
                this.list = response.data.records
                //总记录数
                this.total = response.data.total
                }
            )
        }
    }
}
</script>