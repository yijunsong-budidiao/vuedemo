<template>
  <div>
    <h3 class="logo">小U商城后台</h3>
    <!-- 菜单组件 -->
    <el-menu
      class="page-menu"
      background-color="#444"
      text-color="#fff"
      active-text-color="#409EFF"
      router
      :default-active="$route.path"
      :collapse="iscollapse"
      :unique-opened="true"
    >
      <el-menu-item index="/index"
        ><i class="el-icon-house"></i
        ><span slot="title">后台首页</span></el-menu-item
      >
      <div v-for="(item, index) in menus" :key="item.id">
        <el-menu-item v-if="!item.children && item.type == 2" :index="item.url"
          ><i :class="item.icon"></i
          ><span slot="title">{{ item.title }}</span></el-menu-item
        >
        <el-submenu :index="String(index)" v-else>
          <template slot="title"
            ><i :class="item.icon"></i
            ><span slot="title">{{ item.title }}</span></template
          >
          <el-menu-item
            class="sub-menu"
            v-for="(val, idx) in item.children"
            :index="val.url"
            :key="idx"
            >{{ val.title }}</el-menu-item
          >
        </el-submenu>
      </div>
    </el-menu>
  </div>
</template>
<script>
import { mapState, mapGetters } from "vuex";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapState(["iscollapse"]),
    ...mapGetters({
      menus: "user/menus",
    }),
  },
  created() {},
  methods: {},
  components: {},
};
</script>
<style scoped>
.logo {
  line-height: 60px;
  text-align: center;
  color: #fff;
  background-color: #666;
  white-space: nowrap;
  overflow: hidden;
}
.page-menu {
  border-right: 0;
}
i {
  font-size: 16px !important;
  margin-right: 20px !important;
}
.sub-menu {
  padding-left: 65px !important;
}
</style>