<template>
  <div class="table-bg">
    <el-table
      :data="categorylist"
      row-key="id"
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
      default-expand-all
    >
      <el-table-column prop="id" label="ID"></el-table-column>
      <el-table-column prop="catename" label="分类名称"></el-table-column>
      <el-table-column prop="icon" label="图片">
        <template slot-scope="scope">
          <img class="cate-img" v-if="scope.row.img" :src="scope.row.img | pixImg" alt="">
          <img class="cate-img" v-else src="../../../assets/logo.png" alt="">
        </template>
      </el-table-column>
      <el-table-column prop="status" label="状态">
        <template slot-scope="scope">
          <el-tag type="success" size="normal" v-if="scope.row.status==1">启用</el-tag>
          <el-tag type="warning" size="normal" v-if="scope.row.status==2">禁用</el-tag>
          
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            type="primary"
            size="small"
            @click="edit(scope.row)"
            icon="el-icon-edit"
          ></el-button>
          <el-button
            type="danger"
            size="small"
            @click="del(scope.row.id)"
            icon="el-icon-delete"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { delCategory } from "@/request/category";
export default {
  data() {
    return {
      list: [
        
      ],
    };
  },
  created() {},
  computed: {
    ...mapGetters({
      categorylist: "category/categorylist",
    }),
  },
  mounted() {
    if (!this.categorylist.length) {
      this.get_category_list();
    }
  },
  methods: {
    ...mapActions({
      get_category_list: "category/get_category_list",
    }),
    edit(val) {
      this.$emit("edit",{...val})
    },
    async del(id) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          let res = await delCategory(id);
          if (res.code == 200) {
            this.$message.success(res.msg);
            this.get_category_list();
          } else {
            this.$message.error(res.msg);
          }
          console.log(res);
        })
        .catch(() => {
        //   this.$message({
        //     type: "info",
        //     message: "已取消删除",
        //   });
        });
    },
  },
  components: {},
};
</script>
<style scoped>
  .cate-img {
    width: 80px;
    height: 80px;
  }
</style>