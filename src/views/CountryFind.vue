<template>
  <div class="home" style="margin: 20px">
    <!-- 搜索 -->
    <el-form :inline="true" size="small">
      <el-form-item label="生物编号">
        <el-input
          v-model="query.biologyNum"
          placeholder="请输入查询参数"
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
          placeholder="请输入查询参数"
          clearable
        >
          <template #prefix>
            <el-icon class="el-input__icon">
              <search />
            </el-icon>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item label="发现位置">
        <el-input
          v-model="query.foundLocation"
          placeholder="请输入查询参数"
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
          查询
        </el-button>
      </el-form-item>
      <el-form-item>
        <el-button size="mini" type="danger" @click="clear">重置</el-button>
      </el-form-item>
    </el-form>
    <!-- 操作 -->
    <div style="margin-bottom: 20px">
      <el-button type="primary" @click="add" size="mini"> 添加国家 </el-button>
      <el-popconfirm title="确认删除?" @confirm="deleteBatch">
        <template #reference>
          <el-button type="danger" size="mini">批量删除</el-button>
        </template>
      </el-popconfirm>
    </div>
    <!-- 数据 -->
    <el-table
      :data="tableData"
      stripe
      :border="true"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" />
      <el-table-column prop="biologyNum" label="生物编号" sortable />
      <el-table-column prop="countryName" label="国家名称" />
      <el-table-column prop="foundTime" label="发现时间" sortable />
      <el-table-column prop="foundLocation" label="发现位置" sortable />
      <el-table-column prop="longitude" label="经度" sortable />
      <el-table-column prop="latitude" label="维度" sortable />

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
      <el-form :model="countryFindForm" label-width="120px">
        <el-form-item label="生物编号">
          <el-input
            style="width: 80%"
            v-model="countryFindForm.biologyNum"
          ></el-input>
        </el-form-item>
        <el-form-item label="国家名称">
          <el-input
            style="width: 80%"
            v-model="countryFindForm.countryName"
          ></el-input>
        </el-form-item>
        <el-form-item label="发现时间">
          <el-input
            style="width: 80%"
            v-model="countryFindForm.foundTime"
          ></el-input>
        </el-form-item>
        <el-form-item label="发现位置">
          <el-input
            style="width: 80%"
            v-model="countryFindForm.foundLocation"
          ></el-input>
        </el-form-item>
        <el-form-item label="经度">
          <el-input
            style="width: 80%"
            v-model="countryFindForm.longitude"
          ></el-input>
        </el-form-item>
        <el-form-item label="纬度">
          <el-input
            style="width: 80%"
            v-model="countryFindForm.latitude"
          ></el-input>
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
import { ElMessage } from "element-plus";
import api from '@/api.js'
import moment from 'moment';

export default {
  name: "CountryFind",
  created() {
    this.load();
  },
  data() {
    return {
      // 查询参数
      query: {
        pageNum: 1,
        pageSize: 10,
        biologyNum: "",
        countryName: "",
        foundLocation: ""
      },
      // 表单
      countryFindForm: {
        biologyNum: "",
        countryName: "",
        foundTime: "",
        foundLocation: "",
        longitude: "",
        latitude: "",
      },
      // 表格数据
      tableData: [],
      total: 0,
      title: "",
      saveDialogVisible: false,
    };
  },
  methods: {
    // 选择切换
    handleSelectionChange(val) {
      this.ids = val.map((v) => v.id);
    },
    // 批量删除
    deleteBatch() {
      if (this.ids === undefined || this.ids.length === 0) {
        ElMessage.warning("请选择数据！");
        return;
      }
      api.countryFindDeleteBatch(this.ids).then(res => {
        ElMessage.success("批量删除成功");
        this.load();
      })
    },
    // 加载数据
    load() {
      api.countryFindList(this.query).then((res) => {
        this.tableData = res.data.records;
        // 处理日期格式问题
        this.tableData.map(r => {
          r.foundTime = moment(r.foundTime).local().format('YYYY-MM-DD');
        })
        this.total = res.data.total;
      })
    },
    // 清空搜索条件
    clear() {
      this.query.biologyNum = "";
      this.query.countryName = "";
      this.query.foundLocation = "";
      this.load();
    },
    // 删除数据
    handleDelete(id) {
      api.countryFindDelete(id).then(res => {
        ElMessage.success(res.msg);
        this.load();
      })
    },
    // 新增数据对话框
    add() {
      this.title = "添加数据";
      this.saveDialogVisible = true;
      this.countryFindForm = {};
    },
    // 修改数据对话框
    handleSave() {
      if (this.countryFindForm.id) {
        api.countryFindUpdate(this.countryFindForm).then(res => {
          ElMessage.success(res.msg);
          this.load();
          this.saveDialogVisible = false;
        })
      } else {
        api.countryFindAdd(this.countryFindForm).then(res => {
          ElMessage.success(res.msg);
          this.load();
          this.saveDialogVisible = false;
        })
      }
    },
    // 修改提交
    handleEdit(id) {
      api.countryFindInfo(id).then(res => {
        this.title = "编辑数据"
        this.countryFindForm = res.data;
        this.saveDialogVisible = true;
      })
    },
    // 
    handleSizeChange(pageSize) {
      this.query.pageSize = pageSize;
      this.load();
    },
    // 
    handleCurrentChange(pageNum) {
      this.query.pageNum = pageNum;
      this.load();
    }
  },

};
</script>
