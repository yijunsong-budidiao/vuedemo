<template>
  <el-dialog
    :title="info.isAdd ? '添加管理员' : '修改管理员'"
    :visible.sync="info.isShow"
    width="40%"
    @close="close"
  >
    <!-- 表单 -->
    <el-form :model="forminfo" ref="form" :rules="rules" label-width="140px">
      <el-form-item label="选择角色" prop="pid">
        <el-select v-model="forminfo.roleid" placeholder="请选择">
          <el-option
            v-for="item in rolelist"
            :key="item.id"
            :label="item.rolename"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="管理员名称" prop="username">
        <el-input
          v-model="forminfo.username"
          placeholder="请输入管理员名称"
        ></el-input>
      </el-form-item>
      <el-form-item label="管理员密码" prop="password" v-if="this.info.isAdd">
        <el-input
          v-model="forminfo.password"
          placeholder="请输入管理员密码"
        ></el-input>
      </el-form-item>
      <el-form-item label="管理员密码" prop="password" v-else>
        <el-input
          v-model="forminfo.password"
          placeholder="密码留空表示不修改"
        ></el-input>
      </el-form-item>
      <el-form-item label="管理员状态">
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
import { addUser, editUser } from "@/request/user";
import { mapGetters, mapActions } from "vuex";
let defaultItem = {
  roleid: 1,
  username: "",
  password: "",
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
        username: [{ required: true, message: "必填", trigger: "blur" }],
        // password: [{ required: true, message: "必填", trigger: "blur" }],
      },
      isstrictly: false,
    };
  },
  created() {},
  computed: {
    ...mapGetters({
      userlist: "user/userlist",
      rolelist: "role/rolelist",
    }),
  },
  mounted() {
    this.get_role_list();
  },
  methods: {
    ...mapActions({
      get_role_list: "role/get_role_list",
      get_user_list: "user/get_user_list",
    }),
    setinfo(val) {
      val.password = ""
      defaultItem = { ...val };
      this.forminfo = { ...val };
    },
    async submit() {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          let res;
          if (this.info.isAdd) {
            res = await addUser(this.forminfo);
            console.log(res);
          } else {
            res = await editUser(this.forminfo);
          }
          if (res.code == "200") {
            this.info.isShow = false;
            this.$message.success(res.msg);
            this.get_user_list(); // 再次获取列表，让仓库最新
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