<template>
  <el-container class="page">
    <el-aside :width="iscollapse ? '64px':'200px'" class="page-nav">
      <left />
    </el-aside>
    <el-container class="page-content">
      <el-header class="page-header">
        <top />
      </el-header>
      <el-main class="page-main">
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
import { mapState } from "vuex";
import left from "./left";
import top from "./top";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapState(['iscollapse'])
  },
  created() {},
  methods: {},
  components: {
    left,
    top,
  },
};
</script>
<style scoped>
.page {
  width: 100vw;
  height: 100vh;
}
.page-nav {
  width: 100%;
  background-color: #444;
  overflow-x: hidden;
  overflow-y: auto;
  /* transition: width .5s ease; */
}
.page-content {
  width: 100%;
  background-color: #ccc;
}
.page-header {
  height: 100px;
  background-color: #fff;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
  position: relative;
  z-index: 10;
}
</style>