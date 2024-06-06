<script>
export default {
    name: "User2",
    data() {
        return {
            tableData: [
                {
                    id: 1,
                    name: "占山",
                    password: "9999"
                }
            ]
        }
    }
}

</script>

<template>
    <div style="">
        <div style="">
            <el-form inline="true">
                <el-form-item label="用户名">
                    <el-input placeholer="请输入用户名"></el-input>
                </el-form-item>
                <el-form-item label="密码">
                    <el-input placeholer="请输入密码"></el-input>
                </el-form-item>
            </el-form>
        </div>
        <div style="width: 100%;">
            <el-table :data="tableData" stripe border="true">
                <el-table-column prop="id" label="用户ID"></el-table-column>
                <el-table-column prop="name" label="用户名"></el-table-column>
                <el-table-column prop="password" label="密码"></el-table-column>
                <el-table-column label="操作">
                    <el-button size="mini">编辑</el-button>
                </el-table-column>
            </el-table>
        </div>

        <div style="width: 100%;">
            <el-pagination currentPage="2" :page-sizes="[5, 10, 20]" page-size="100"
                layout="total, sizes, prev, pager, next, jumper" :total="100">
            </el-pagination>
        </div>
    </div>

    <el-diaog title="编辑框" width="30%">
        <el-form>
            <el-form-item>
                <el-input></el-input>
            </el-form-item>
        </el-form>
    </el-diaog>
</template>

<style></style>