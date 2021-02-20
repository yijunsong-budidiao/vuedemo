<template>
  <el-dialog
    :title="info.isAdd ? '添加分类' : '修改分类'"
    :visible.sync="info.isShow"
    width="40%"
    @close="close"
  >
    <!-- 表单 -->
    <el-form :model="forminfo" ref="form" :rules="rules" label-width="140px">
      <el-form-item label="上级分类" prop="pid">
        <el-select v-model="forminfo.pid" placeholder="请选择">
          <el-option label="顶级分类" :value="0"></el-option>
          <el-option
            v-for="item in categorylist"
            :key="item.id"
            :label="item.catename"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="分类名" prop="catename">
        <el-input
          v-model="forminfo.catename"
          placeholder="请输入分类名"
        ></el-input>
      </el-form-item>
      <el-form-item label="分类图片" prop="img">
        <el-upload
          class="avatar-uploader"
          action=""
          :show-file-list="false"
          :auto-upload="false"
          :on-change="change"
        >
           <img v-if="forminfo.img" :src="imageUrl" class="avatar">
           <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
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
import { addCategory, editCategory } from "@/request/category";
import { mapGetters, mapActions } from "vuex";
let defaultItem = {
  pid: 0,
  catename: "",
  img: "",
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
        catename: [{ required: true, message: "必填", trigger: "blur" }, {}],
        // img: [{ required: true, message: "必填", trigger: "blur" }, {}],
      },
      imageUrl:""
    };
  },
  watch: {
    // newData: {
    //   handler(newVal, oldVal) {
    //     if (JSON.parse(newVal).type != JSON.parse(oldVal).type) {
    //       // 类型改变时清除表单验证
    //       this.$refs.form.clearValidate();
    //     }
    //   },
    //   deep: true,
    // },
  },
  created() {},
  computed: {
    ...mapGetters({
      categorylist: "category/categorylist",
    }),
    // newData() {
    //   return JSON.stringify(this.forminfo);
    // },
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
    setinfo(val) {
      defaultItem = { ...val };
      this.forminfo = { ...val };
      this.imageUrl = this.$host + this.forminfo.img
    },
    async submit() {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          let res;
          // 提交formdata类型
          let fd = new FormData();
          for(let k in this.forminfo) {
            fd.append(k,this.forminfo[k])
          }
          console.log(fd)
          console.log(this.forminfo)
          if (this.info.isAdd) {
            res = await addCategory(fd);
            console.log(res);
          } else {
            res = await editCategory(fd);
          }
          if (res.code == "200") {
            this.$message.success(res.msg);
            this.info.isShow = false;
            this.get_category_list(); // 再次获取列表，让仓库最新
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
      this.imageUrl = this.$host + this.forminfo.img
    },
    close() {
      // 关闭时清除表单验证
      this.$refs.form.clearValidate();
    },
    change(file,fileList) {
      this.imageUrl = URL.createObjectURL(file.raw);
      this.forminfo.img = file.raw
    }
  },
  components: {},
};
</script>
<style scoped>
  .avatar-uploader-icon {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader-icon:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>