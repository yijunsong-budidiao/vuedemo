<template>
  <div class="table-bg">
    <el-table
      :data="rolelist"
      row-key="id"
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
    >
      <el-table-column prop="id" label="ID"></el-table-column>
      <el-table-column prop="rolename" label="角色名称"></el-table-column>
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
import { delRole } from "@/request/role";
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
      rolelist: "role/rolelist",
    }),
  },
  mounted() {
    if (!this.rolelist.length) {
      this.get_role_list();
    }
  },
  methods: {
    ...mapActions({
      get_role_list: "role/get_role_list",
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
          let res = await delRole(id);
          if (res.code == 200) {
            this.$message.success(res.msg);
            this.get_role_list();
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