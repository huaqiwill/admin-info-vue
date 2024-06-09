<!-- 侧边栏 -->
<template>
  <div>
    <el-menu
      style="width: 200px; min-height: calc(100vh - 50px)"
      :default-active="path"
      class="el-menu-vertical-demo"
      router
      background-color="#ffffff"
      text-color="#444"
    >
      <el-menu-item index="/dashboard">
        <el-icon><grid /></el-icon>
        <span>展示面板</span>
      </el-menu-item>

      <el-menu-item index="/user">
        <el-icon><grid /></el-icon>
        <span>用户管理</span>
      </el-menu-item>

      <el-menu-item index="/port">
        <el-icon><grid /></el-icon>
        <span>港口信息</span>
      </el-menu-item>

      <el-menu-item index="/country">
        <el-icon><grid /></el-icon>
        <span>国家信息</span>
      </el-menu-item>

      <el-menu-item index="/biology">
        <el-icon><grid /></el-icon>
        <span>生物信息</span>
      </el-menu-item>
      
      <el-menu-item index="/port-find">
        <el-icon><grid /></el-icon>
        <span>港口发现生物</span>
      </el-menu-item>

      <el-menu-item index="/port-check">
        <el-icon><grid /></el-icon>
        <span>港口检测生物</span>
      </el-menu-item>

      <el-menu-item index="/country-find">
        <el-icon><grid /></el-icon>
        <span>国家发现有害生物</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: "Aside",
  components: {},
  created() {
    let userStr = sessionStorage.getItem("user") || "{}";
    this.user = JSON.parse(userStr);
  },
  data() {
    return {
      user: {},
      path: this.$route.path,
    };
  },
};
</script>

<style scoped>
.icon {
  width: 30px;
  height: 30px;
  padding-top: 5px;
  padding-right: 10px;
}
</style>
