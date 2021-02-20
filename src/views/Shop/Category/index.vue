<template>
  <div>
    <el-button type="primary" @click="add">添加分类</el-button>
    <!-- 列表组件 -->
    <v-list @edit="edit"></v-list>
    <!-- 添加/修改组件 -->
    <v-info :info="info" ref="child"></v-info>
  </div>
</template>
<script>
import VList from "./vlist";
import VInfo from "./vinfo";
export default {
  data() {
    return {
      info: {
        isAdd: true,
        isShow: false,
      },
    };
  },
  created() {},
  methods: {
    add() {
      this.info.isAdd = true;
      this.info.isShow = true;
      this.$refs.child.setinfo({
        pid: 0,
        catename: "",
        img: "",
        status: 1,
      });
    },
    edit(val) {
      this.info.isAdd = false;
      this.info.isShow = true;
      this.$refs.child.setinfo(val);
    },
  },
  components: {
    VList,
    VInfo,
  },
};
</script>
<style scoped>
</style>