<template>
  <div class="home" style="margin: 20px">
    <!-- 搜索 -->
    <el-form inline="true" size="small">
      <el-form-item label="港口名称">
        <el-input
          v-model="query.portName"
          placeholder="请输入港口名称"
          clearable
        >
          <template #prefix>
            <el-icon class="el-input__icon">
              <search />
            </el-icon>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item label="国家名称">
        <el-input
          v-model="query.countryName"
          placeholder="请输入国家名称"
          clearable
        >
          <template #prefix>
            <el-icon class="el-input__icon">
              <search />
            </el-icon>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item label="省份名称">
        <el-input
          v-model="query.province"
          placeholder="请输入省份名称"
          clearable
        >
          <template #prefix>
            <el-icon class="el-input__icon">
              <search />
            </el-icon>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          style="margin-left: 1%"
          @click="load"
          size="mini"
        >
          <svg-icon iconClass="search" />
          查询
        </el-button>
      </el-form-item>
      <el-form-item>
        <el-button size="mini" type="danger" @click="clear">重置</el-button>
      </el-form-item>
    </el-form>
    <!-- 操作 -->
    <div style="margin-bottom: 20px">
      <el-button type="primary" @click="add" v-if="user.role == 1" size="mini">
        添加港口
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
    <!-- 数据 -->
    <el-table
      :data="tableData"
      stripe
      border="true"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" />
      <el-table-column prop="num" label="港口编号" sortable />
      <el-table-column prop="name" label="港口名称" />
      <el-table-column prop="countryName" label="国家名称" sortable />
      <el-table-column prop="province" label="所在省份" />

      <el-table-column fixed="right" label="操作">
        <template v-slot="scope">
          <el-button size="mini" @click="handleEdit(scope.row.id)">
            修改
          </el-button>
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
    <!-- 分页 -->
    <div style="margin: 10px 0; display: flex; justify-content: flex-end">
      <el-pagination
        v-model:currentPage="query.currentPage"
        :page-sizes="[5, 10, 20]"
        :page-size="query.pageSize"
        :total="total"
        layout="total, sizes, prev, pager, next, jumper"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      >
      </el-pagination>
    </div>
    <!-- 添加和修改对话框 -->
    <el-dialog v-model="saveDialogVisible" :title="title" width="30%">
      <el-form :model="form" label-width="120px">
        <el-form-item label="港口编号">
          <el-input style="width: 80%" v-model="portForm.num"></el-input>
        </el-form-item>
        <el-form-item label="港口名称">
          <el-input style="width: 80%" v-model="portForm.name"></el-input>
        </el-form-item>
        <el-form-item label="国家名称">
          <el-input
            style="width: 80%"
            v-model="portForm.countryName"
          ></el-input>
        </el-form-item>
        <el-form-item label="所在省份">
          <el-input style="width: 80%" v-model="portForm.province"></el-input>
        </el-form-item>
      </el-form>

      <template #footer>
        <span class="dialog-footer">
          <el-button @click="saveDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="handleSave">确 定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script >
import request from "../utils/request";
import { ElMessage } from "element-plus";
import api from '@/api.js'


export default {
  name: "Port",
  created() {
    let userStr = sessionStorage.getItem("user") || "{}";
    this.user = JSON.parse(userStr);
    this.load();
  },
  data() {
    return {
      query: {
        pageNum: 1,
        pageSize: 10,
        countryName: "",
        portName: "",
        province: ""
      },
      portForm: {
        num: "",
        name: "",
        countryName: "",
        province: "",
      },
      tableData: [],
      total: 0,
      title: "",
      saveDialogVisible: false,
      user: {},
      number: 0,
      bookData: [],
      isbnArray: [],
      outDateBook: [],
      numOfOutDataBook: 0,
      dialogVisible3: true,
    };
  },
  methods: {
    // 选择切换
    handleSelectionChange(val) {
      this.ids = val.map((v) => v.id);
    },
    // 批量删除
    deleteBatch() {
      if (!this.ids.length) {
        ElMessage.warning("请选择数据！");
        return;
      }
      request.post("/book/deleteBatch", this.ids).then((res) => {
        if (res.code === "0") {
          ElMessage.success("批量删除成功");
          this.load();
        } else {
          ElMessage.error(res.msg);
        }
      });
    },
    // 加载数据
    load() {
      api.portList(this.query).then((res) => {
        this.tableData = res.data.records;
        this.total = res.data.total;
      })
    },
    // 清空搜索条件
    clear() {
      this.query.countryName = "";
      this.query.portName = "";
      this.query.province = "";
      this.load();
    },
    // 删除数据
    handleDelete(id) {
      api.portDelete(id).then(res => {
        ElMessage.success(res.msg);
        this.load();
      })
    },
    // 新增数据对话框
    add() {
      this.title = "添加数据";
      this.saveDialogVisible = true;
      this.portForm = {};
    },
    // 修改数据对话框
    handleSave() {
      if (this.portForm.id) {
        api.portUpdate(this.form).then(res => {
          ElMessage.success(res.msg);
          this.load();
          this.dialogVisible2 = false;
        })
      } else {
        api.portAdd().then(res => {
          ElMessage.success(res.msg);
          this.load();
          this.saveDialogVisible = false;
        })
      }
    },
    // 修改提交
    handleEdit(id) {
      api.portInfo(id).then(res => {
        this.title = "编辑数据"
        this.portForm = res.data;
        this.dialogVisible2 = true;
      })
    },
    // 
    handleSizeChange(pageSize) {
      this.pageSize = pageSize;
      this.load();
    },
    // 
    handleCurrentChange(pageNum) {
      this.pageNum = pageNum;
      this.load();
    }
  },

};
</script>
