<template>
  <div class="table-bg">
    <el-table
      :data="specslist"
      row-key="id"
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
    >
      <el-table-column prop="specsname" label="规格名称"></el-table-column>
      <el-table-column label="规格名称">
        <template slot-scope="scope">
          <div
            >{{scope.row.attrs.join(",")}}</div
          >
        </template>
      </el-table-column>
      <el-table-column prop="status" label="状态">
        <template slot-scope="scope">
          <el-tag type="success" size="normal" v-if="scope.row.status == 1"
            >启用</el-tag
          >
          <el-tag type="warning" size="normal" v-if="scope.row.status == 2"
            >禁用</el-tag
          >
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
    <!-- 分页 -->
    <el-pagination
      class="pagination"
      @size-change="sizechange"
      @current-change="pagechange"
      :current-page="page"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="size"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      background
    >
    </el-pagination>
  </div>
</template>
<script>
import { mapGetters, mapActions,mapMutations } from "vuex";
import { delSpecs } from "@/request/specs";
export default {
  data() {
    return {
      list: [],
    };
  },
  created() {},
  computed: {
    ...mapGetters({
      specslist: "specs/specslist",
      page: "specs/page",
      size: "specs/size",
      total: "specs/total",
      // getrolenamebyid: "role/getrolenamebyid",
    }),
  },
  mounted() {
      this.get_specs_list();
  },
  methods: {
    ...mapMutations({
      SET_PAGE:"specs/SET_PAGE"
    }),
    ...mapActions({
      get_specs_list: "specs/get_specs_list",
      set_page: "specs/set_page",
      set_size: "specs/set_size",
    }),
    edit(val) {
      this.$emit("edit", { ...val });
    },
    async del(id) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          let res = await delSpecs(id);
          if (res.code == 200) {
            this.$message.success(res.msg);
            if (this.specslist.length==1 && this.page!=1) {
              this.SET_PAGE(this.page-1)
            }
            this.get_specs_list();
          } else {
            this.$message.error(res.msg);
          }
        })
        .catch(() => {
          //   this.$message({
          //     type: "info",
          //     message: "已取消删除",
          //   });
        });
    },
    sizechange(val) {
      this.set_size(val)
    },
    pagechange(val) {
      this.set_page(val)
    },
  },
  components: {},
};
</script>
<style scoped>
.pagination {
  margin-top: 20px;
}
</style>