<template>
  <div class="header">
    <div class="lt">
      <el-button
        v-if="iscollapse"
        type="primary"
        size="small"
        @click="TOGGLE"
        class="toggle-btn"
      >
        <i class="el-icon-s-fold"></i>
      </el-button>
      <el-button
        v-else
        type="primary"
        size="small"
        @click="TOGGLE"
        class="toggle-btn"
      >
        <i class="el-icon-s-unfold"></i>
      </el-button>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>{{ $route.meta.title }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div>
      <el-dropdown trigger="click">
        <span class="el-dropdown-link">
          {{ this.username }},你好！<i
            class="el-icon-arrow-down el-icon--right"
          ></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item @click.native='clickFullscreen'>
            <i class="el-icon-full-screen"></i>{{isFullscreen?"退出全屏":"全屏操作"}}</el-dropdown-item
          >
          <el-dropdown-item @click.native="QUIT">
            <i class="el-icon-switch-button"></i> 退出登录</el-dropdown-item
          >
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>
<script>
import { mapState, mapGetters, mapMutations } from "vuex";
// 全屏插件
import screenfull from 'screenfull'
export default {
  data() {
    return {
      isFullscreen: false
    };
  },
  computed: {
    ...mapState(["iscollapse"]),
    ...mapGetters({
      username: "user/username",
    }),
  },
  created() {},
  methods: {
    ...mapMutations({
      TOGGLE: "TOGGLE",
      QUIT: "user/QUIT",
    }),
    clickFullscreen(){
        if (!screenfull.isEnabled) {
          this.$message.warning('您的浏览器不支持全屏')
          return false
        }
        this.isFullscreen = !this.isFullscreen
        screenfull.toggle()
      }
  },
  components: {},
};
</script>
<style scoped>
.header {
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.toggle-btn {
  width: 40px;
  height: 35px;
  font-size: 18px;
  line-height: 35px;
  padding: 0;
  margin-right: 30px;
}
.header .lt {
  display: flex;
  align-items: center;
}
</style>