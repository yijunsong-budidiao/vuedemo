<template>
  <el-dialog
    :title="info.isAdd ? '添加角色' : '修改角色'"
    :visible.sync="info.isShow"
    width="40%"
    @close="close"
  >
    <!-- 表单 -->
    <el-form :model="forminfo" ref="form" :rules="rules" label-width="140px">
      
      <el-form-item label="角色名称" prop="rolename">
        <el-input
          v-model="forminfo.rolename"
          placeholder="请输入角色名称"
        ></el-input>
      </el-form-item>
      <el-form-item label="角色权限"  prop="menus">
        <el-tree show-checkbox :props="{label:'title',children: 'children'}" :data="menulist"
        default-expand-all ref="tree" node-key="id"
        :check-strictly="isstrictly"></el-tree>
      </el-form-item>
      <el-form-item label="角色状态">
        <el-switch
          v-model="forminfo.status"
          :active-value="1"
          :inactive-value="2"
        ></el-switch>
      </el-form-item>
      <el-form-item label="">
        <el-button type="primary" @click="submit">提交</el-button>
        <el-button type="warning" @click="reset">重置</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>
<script>
import { addRole, editRole } from "@/request/role";
import { mapGetters, mapActions } from "vuex";
let defaultItem = {
  rolename: "",
  menus: "",
  status: 1,
};
export default {
  props: {
    info: {
      type: Object,
      default() {
        return {
          isAdd: true,
          isShow: false,
        };
      },
    },
  },
  data() {
    return {
      forminfo: { ...defaultItem },
      rules: {
        //验证规则对象
        rolename: [{ required: true, message: "必填", trigger: "blur" }],
      },
      isstrictly:false
    };
  },
  created() {},
  computed: {
    ...mapGetters({
      menulist: "menu/menulist",
      rolelist: "role/rolelist",
    }),
  },
  mounted() {
    if (!this.rolelist.length) {
      this.get_role_list();
    }
    this.get_menu_list();

  },
  methods: {
    ...mapActions({
      get_role_list: "role/get_role_list",
      get_menu_list: "menu/get_menu_list",
    }),
    setinfo(val) {
      defaultItem = { ...val };
      this.forminfo = { ...val };
      console.log(JSON.parse(this.forminfo.menus))
      this.isstrictly = true
      this.$nextTick(()=>{
        this.$refs.tree.setCheckedKeys(JSON.parse(this.forminfo.menus))
        this.isstrictly = false
      });
    },
    async submit() {
      this.$refs.form.validate(async (valid) => {
        // 获取属性节点
        let idarr = this.$refs.tree.getCheckedKeys().concat(this.$refs.tree.getHalfCheckedKeys())
        this.forminfo.menus = JSON.stringify(idarr)
        if (valid) {
          let res;
          if (this.info.isAdd) {
            res = await addRole(this.forminfo);
            console.log(res);
          } else {
            res = await editRole(this.forminfo);
          }
          if (res.code == "200") {
            this.info.isShow = false;
            this.$message.success(res.msg);
            this.get_role_list(); // 再次获取列表，让仓库最新
            // this.reset();
          } else {
            this.$message.error(res.msg);
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    reset() {
      this.forminfo = { ...defaultItem };
    },
    close() {
      // 关闭时清除表单验证
      this.$refs.form.clearValidate();
    },
  },
  components: {},
};
</script>
<style scoped>
</style>