<!-- 读者管理 -->
<template>
  <div class="home" style="margin: 20px">
    <!-- 搜索-->
    <div style="">
      <el-form :inline="true" size="small">
        <el-form-item label="用户编号">
          <el-input v-model="query.id" placeholder="请输入用户编号" clearable>
            <template #prefix
              ><el-icon class="el-input__icon"><search /></el-icon
            ></template>
          </el-input>
        </el-form-item>
        <el-form-item label="用户姓名">
          <el-input
            v-model="query.username"
            placeholder="请输入用户姓名"
            clearable
          >
            <template #prefix
              ><el-icon class="el-input__icon"><search /></el-icon
            ></template>
          </el-input>
        </el-form-item>
        <el-form-item label="电话号码">
          <el-input
            v-model="query.phone"
            placeholder="请输入电话号码"
            clearable
          >
            <template #prefix
              ><el-icon class="el-input__icon"><search /></el-icon
            ></template>
          </el-input>
        </el-form-item>
        <el-form-item label="家庭地址">
          <el-input
            v-model="query.address"
            placeholder="请输入家庭地址"
            clearable
          >
            <template #prefix
              ><el-icon class="el-input__icon"><search /></el-icon
            ></template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            style="margin-left: 1%"
            @click="load"
            size="mini"
            >查询</el-button
          >
        </el-form-item>
        <el-form-item>
          <el-button size="mini" type="danger" @click="clear">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- 操作-->

    <div style="margin-bottom: 15px">
      <el-button type="primary" @click="handleAdd" size="mini">
        添加用户
      </el-button>
      <el-popconfirm
        title="确认删除?"
        @confirm="deleteBatch"
        v-if="user.role == 1"
      >
        <template #reference>
          <el-button type="danger" size="mini">批量删除</el-button>
        </template>
      </el-popconfirm>
    </div>
    <!-- 数据-->
    <el-table
      :data="tableData"
      stripe
      :border="true"
      @selection-change="handleSelectionChange"
    >
      <el-table-column v-if="user.role == 1" type="selection" width="55">
      </el-table-column>
      <el-table-column prop="id" label="用户编号" sortable />
      <el-table-column prop="username" label="用户名" />
      <el-table-column prop="nickName" label="昵称" />
      <el-table-column prop="phone" label="电话号码" />
      <el-table-column prop="sex" label="性别" />
      <el-table-column prop="address" label="家庭地址" />
      <el-table-column fixed="right" label="操作">
        <template v-slot="scope">
          <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
          <el-popconfirm
            title="确认删除?"
            @confirm="handleDelete(scope.row.id)"
          >
            <template #reference>
              <el-button type="danger" size="mini">删除</el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页-->
    <div style="margin: 10px 0; display: flex; justify-content: flex-end">
      <el-pagination
        v-model:currentPage="query.currentPage"
        :page-sizes="[5, 10, 20]"
        :page-size="query.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      >
      </el-pagination>
    </div>
    <!-- 添加和编辑用户 -->
    <el-dialog v-model="dialogVisible" :title="title" width="30%">
      <el-form :model="form" label-width="120px">
        <el-form-item label="用户名">
          <el-input style="width: 80%" v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item label="昵称">
          <el-input style="width: 80%" v-model="form.nickName"></el-input>
        </el-form-item>
        <el-form-item label="电话号码">
          <el-input style="width: 80%" v-model="form.phone"></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <div>
            <el-radio v-model="form.sex" label="男">男</el-radio>
            <el-radio v-model="form.sex" label="女">女</el-radio>
          </div>
        </el-form-item>
        <el-form-item label="地址">
          <el-input
            type="textarea"
            style="width: 80%"
            v-model="form.address"
          ></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="save">确 定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import api from "@/api";
import { ElMessage } from "element-plus";

export default {
  created() {
    this.load();
    let userStr = sessionStorage.getItem("user") || "{}";
    this.user = JSON.parse(userStr);
  },
  name: "User",
  methods: {
    handleSelectionChange(val) {
      this.ids = val.map((v) => v.id);
    },
    deleteBatch() {
      if (this.ids === undefined || this.ids.length === 0) {
        ElMessage.warning("请选择数据！");
        return;
      }
      api.userDeleteBatch(this.ids).then(res => {
        ElMessage.success("批量删除成功");
        this.load();
      })
    },
    load() {
      api.userList(this.query).then(res => {
        this.tableData = res.data.records;
        this.total = res.data.total;
      })
    },
    clear() {
      this.query.id = "";
      this.query.username = "";
      this.query.phone = "";
      this.query.address = "";
      this.load();
    },
    handleDelete(id) {
      api.userDelete(id).then(res => {
        ElMessage.success("删除成功");
        this.load();
      })
    },
    handleAdd() {
      this.title = "添加用户信息"
      this.dialogVisible = true;
      this.form = {};
    },
    save() {
      if (this.form.id) {
        api.userUpdate(this.form).then(res => {
          ElMessage({
            message: "更新成功",
            type: "success",
          });
          this.load();
          this.dialogVisible = false;
        })
      } else {
        api.userAdd(this.form).then(res => {
          ElMessage({
            message: "添加成功",
            type: "success",
          });
          this.load();
          this.dialogVisible = false;
        })
      }
    },
    handleEdit(row) {
      this.title = "编辑用户信息"
      this.form = JSON.parse(JSON.stringify(row));
      this.dialogVisible = true;
    },
    handleSizeChange(pageSize) {
      this.query.pageSize = pageSize;
      this.load();
    },
    handleCurrentChange(pageNum) {
      this.query.pageNum = pageNum;
      this.load();
    },
  },
  data() {
    return {
      query: {
        pageNum: 1,
        pageSize: 10,
        id: "",
        username: "",
        phone: "",
        address: "",
      },
      form: {
        username: "",
        nickName: "",
        phone: "",
        sex: "",
        address: ""
      },
      dialogVisible: false,
      total: 10,
      tableData: [],
      user: {},
      ids: [],
      title: ""
    };
  },
};
</script>
