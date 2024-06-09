<!-- 头部区 -->
<template>
  <div
    style="
      height: 60px;
      line-height: 60px;
      border-bottom: 1px solid #ccc;
      display: flex;
      background-color: #ffffff;
    "
  >
    <div style="padding-left: 30px; font-weight: bold; color: #333">
      港口水域海洋生物及相关贸易国有毒有害生物信息管理
    </div>
    <div style="flex: 1"></div>
    <div style="width: 100px">
      <el-dropdown>
        <span class="el-dropdown-link">
          {{ user.nickName }}
          <el-icon class="el-icon--right">
            <arrow-down />
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="editUserInfo"
              >修改个人信息</el-dropdown-item
            >
            <el-dropdown-item @click="editPassword">修改密码</el-dropdown-item>
            <el-dropdown-item @click="exit">退出系统</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { ElMessage } from "element-plus";

export default {
  name: "Header",
  props: [],
  data() {
    return {
      user: [],
      imgUrl: require("../../assets/icon/login.png"),
    };
  },
  created() {
    let userStr = sessionStorage.getItem("user") || "{}";
    this.user = JSON.parse(userStr);
  },
  methods: {
    editUserInfo() {
      this.$router.push("/person");
    },
    editPassword() {
      this.$router.push("/password");
    },
    exit() {
      sessionStorage.removeItem("user");
      this.$router.push("/login");
      ElMessage.success("退出系统成功");
    },
  },
};
</script>

<style scoped>
.icon {
  width: 40px;
  height: 40px;
  padding-top: 20px;
  padding-right: 10px;
}

.fixed-top {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  z-index: 1030;
}
</style>
