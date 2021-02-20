<template>
  <el-dialog
    :title="info.isAdd ? '添加菜单' : '修改菜单'"
    :visible.sync="info.isShow"
    width="40%"
    @close="close"
  >
    <!-- 表单 -->
    <el-form :model="forminfo" ref="form" :rules="rules" label-width="140px">
      <el-form-item label="菜单类型">
        <el-radio-group v-model="forminfo.type">
          <el-radio :label="1">目录</el-radio>
          <el-radio :label="2">菜单</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item v-if="forminfo.type == 2" label="上级目录" prop="pid">
        <el-select v-model="forminfo.pid" placeholder="请选择">
          <el-option label="顶级目录" :value="0"></el-option>
          <el-option
            v-for="item in menulist"
            :key="item.id"
            :label="item.title"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item
        :label="forminfo.type == 1 ? '目录名称' : '菜单名称'"
        prop="title"
      >
        <el-input v-model="forminfo.title" placeholder="请输入名称"></el-input>
      </el-form-item>
      <el-form-item label="图标" prop="icon">
        <el-input
          v-model="forminfo.icon"
          placeholder="请输入图标class"
        ></el-input>
      </el-form-item>
      <el-form-item label="菜单地址" v-if="forminfo.type == 2" prop="url">
        <el-input
          v-model="forminfo.url"
          placeholder="请输入菜单地址"
        ></el-input>
      </el-form-item>
      <el-form-item label="状态">
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
import { addMenu, editMenu } from "@/request/menu";
import { mapGetters, mapActions } from "vuex";
let defaultItem = {
  pid: 0,
  title: "",
  icon: "",
  type: 1,
  url: "",
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
        type: [{ required: true, message: "必填", trigger: "blur" }],
        title: [{ required: true, message: "必填", trigger: "blur" }, {}],
        icon: [{ required: true, message: "必填", trigger: "blur" }, {}],
        url: [{ required: true, message: "必填", trigger: "blur" }, {}],
      },
    };
  },
  watch: {
    newData: {
      handler(newVal, oldVal) {
        if (JSON.parse(newVal).type != JSON.parse(oldVal).type) {
          // 类型改变时清除表单验证
          this.$refs.form.clearValidate();
        }
      },
      deep: true,
    },
  },
  created() {},
  computed: {
    ...mapGetters({
      menulist: "menu/menulist",
    }),
    newData() {
      return JSON.stringify(this.forminfo);
    },
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
    setinfo(val) {
      defaultItem = { ...val };
      this.forminfo = { ...val };
    },
    async submit() {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          let res;
          if (this.info.isAdd) {
            res = await addMenu(this.forminfo);
            console.log(res);
          } else {
            res = await editMenu(this.forminfo);
          }
          if (res.code == "200") {
            this.$message.success(res.msg);
            this.info.isShow = false;
            this.get_menu_list(); // 再次获取列表，让仓库最新
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