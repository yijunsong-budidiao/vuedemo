<template>
  <div class="table-bg">
    <el-table
      :data="menulist"
      row-key="id"
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
      default-expand-all
    >
      <el-table-column prop="id" label="ID"></el-table-column>
      <el-table-column prop="title" label="菜单名称"></el-table-column>
      <el-table-column prop="url" label="菜单地址"></el-table-column>
      <el-table-column prop="icon" label="图标">
        <template slot-scope="scope">
          <i :class="scope.row.icon"></i>
        </template>
      </el-table-column>
      <el-table-column prop="type" label="类型">
        <template slot-scope="scope">
          <el-tag type="success" size="normal" v-if="scope.row.type==1">目录</el-tag>
          <el-tag type="warning" size="normal" v-if="scope.row.type==2">菜单</el-tag>
          
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
import { delMenu } from "@/request/menu";
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
      menulist: "menu/menulist",
    }),
  },
  mounted() {
    if (!this.menulist.length) {
      this.get_menu_list();
    }
  },
  methods: {
    ...mapActions({
      get_menu_list: "menu/get_menu_list",
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
          let res = await delMenu(id);
          if (res.code == 200) {
            this.$message.success(res.msg);
            this.get_menu_list();
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
</style>