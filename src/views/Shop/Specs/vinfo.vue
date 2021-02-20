<template>
  <el-dialog
    :title="info.isAdd ? '添加规格' : '修改规格'"
    :visible.sync="info.isShow"
    width="40%"
    @close="close"
  >
    <!-- 表单 -->
    <el-form :model="forminfo" ref="form" :rules="rules" label-width="140px">
      <el-form-item label="规格名称" prop="specsname">
        <el-input
          v-model="forminfo.specsname"
          placeholder="请输入规格名称"
        ></el-input>
      </el-form-item>
      <el-form-item label="属性值" prop="attrs">
        <label v-for="(item, index) in list" :key="index" class="pro">
          <el-input
            style="width: 160px"
            v-model="item.value"
            placeholder="请输入属性值"
          ></el-input>
          <el-button v-if="index == 0" type="primary" @click="addAttrs()"
            >添加属性</el-button
          >
          <el-button v-else type="danger" @click="delAttrs(index)"
            >删除属性</el-button
          >
        </label>
      </el-form-item>
      <el-form-item label="规格状态">
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
import { addSpecs, editSpecs } from "@/request/specs";
import { mapGetters, mapActions } from "vuex";
let defaultItem = {
  specsname: "",
  attrs: "",
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
        specsname: [{ required: true, message: "必填", trigger: "blur" }],
      },
      list: [{ value: "" }],
    };
  },
  created() {},
  computed: {
    ...mapGetters({
      specslist: "specs/specslist",
    }),
  },
  methods: {
    ...mapActions({
      get_specs_list: "specs/get_specs_list",
    }),
    setinfo(val) {
      defaultItem = { ...val };
      this.forminfo = { ...val };
      if (this.forminfo.attrs != "") {
        this.list = []
        for (let k in this.forminfo.attrs) {
          let a = {
            value: this.forminfo.attrs[k],
          };
          this.list.push(a);
        }
      } else {
        this.list = [{ value: "" }]
      }
    },
    async submit() {
      let state = this.list.every((val) => {
        return val.value;
      });
      if (!state) {
        this.$message.error("属性不能为空");
        return;
      }
      this.forminfo.attrs = this.list.map((val) => {
        return val.value;
      });
      this.forminfo.attrs = this.forminfo.attrs.join(",");

      this.$refs.form.validate(async (valid) => {
        if (valid) {
          let res;
          if (this.info.isAdd) {
            res = await addSpecs(this.forminfo);
          } else {
            res = await editSpecs(this.forminfo);
          }
          if (res.code == "200") {
            this.info.isShow = false;
            this.$message.success(res.msg);
            this.get_specs_list(); // 再次获取列表，让仓库最新
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
    addAttrs() {
      this.list.push({ value: "" });
    },
    delAttrs(idx) {
      this.list.splice(idx, 1);
    },
  },
  components: {},
};
</script>
<style scoped>
.pro {
  display: block;
  margin-bottom: 10px;
}
</style>