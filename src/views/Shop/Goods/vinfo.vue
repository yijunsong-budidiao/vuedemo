<template>
  <el-dialog
    :title="info.isAdd ? '添加商品' : '修改商品'"
    :visible.sync="info.isShow"
    width="60%"
    @close="close"
  >
    <!-- 表单 -->
    <el-form :model="forminfo" ref="form" :rules="rules" label-width="140px">
      <el-form-item label="一级分类" prop="first_cateid">
        <el-select
          v-model="forminfo.first_cateid"
          @change="topChange"
          placeholder="请选择"
        >
          <el-option
            v-for="item in categorylist"
            :key="item.id"
            :label="item.catename"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="二级分类" prop="second_cateid">
        <el-select v-model="forminfo.second_cateid" placeholder="请选择"  @change="testSX">
          <el-option
            v-for="item in childrenCate"
            :key="item.id"
            :label="item.catename"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="商品名称" prop="goodsname">
        <el-input
          v-model="forminfo.goodsname"
          placeholder="请输入商品名称"
        ></el-input>
      </el-form-item>
      <el-form-item label="商品价格" prop="price">
        <el-input
          v-model="forminfo.price"
          placeholder="请输入商品价格"
        ></el-input>
      </el-form-item>
      <el-form-item label="市场价格" prop="market_price">
        <el-input
          v-model="forminfo.market_price"
          placeholder="请输入市场价格"
        ></el-input>
      </el-form-item>
      <el-form-item label="商品图片" prop="img">
        <el-upload
          class="avatar-uploader"
          action=""
          :show-file-list="false"
          :auto-upload="false"
          :on-change="change"
        >
          <img v-if="hasImg" :src="imageUrl" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="商品描述" prop="description">
        <el-input
          v-model="forminfo.description"
          placeholder="请输入商品描述"
        ></el-input>
      </el-form-item>
      <el-form-item label="商品规格" prop="specsid">
        <el-select
          v-model="forminfo.specsid"
          @change="specsChange"
          placeholder="请选择"
        >
          <el-option
            v-for="item in specslist"
            :key="item.id"
            :label="item.specsname"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="商品规格属性" prop="specsattr">
        <el-select v-model="forminfo.specsattr" placeholder="请选择" @change="testSX">
          <el-option
            v-for="item in childrenSpecs"
            :key="item.id"
            :label="item.value"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="商品状态">
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
import { addGoods, editGoods } from "@/request/goods";
import { mapGetters, mapActions } from "vuex";
let defaultItem = {
  first_cateid: "",
  second_cateid: "",
  goodsname: "",
  price: "",
  market_price: "",
  img: "",
  description: "",
  specsid: "",
  specsattr: "",
  isnew: 2,
  ishot: 2,
  status: 1,
  firstcatename:"",
  secondcatename:"",
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
        goodsname: [{ required: true, message: "必填", trigger: "blur" }],
      },
      imageUrl: "",
      hasImg: false,
      childrenCate: [],
      childrenSpecs: [],
    };
  },
  created() {},
  computed: {
    ...mapGetters({
      categorylist: "category/categorylist",
      specslist: "specs/specslist",
    }),
  },
  mounted() {
    this.get_category_list();
    this.get_specs_all_list();
  },
  methods: {
    ...mapActions({
      get_category_list: "category/get_category_list",
      get_specs_all_list: "specs/get_specs_all_list",
      get_goods_list: "goods/get_goods_list",
    }),
    setinfo(val) {
      defaultItem = { ...val };
      this.forminfo = { ...val };
      this.imageUrl = this.$host + this.forminfo.img;
      if (this.forminfo.img) {
        this.hasImg = true;
      } else {
        this.hasImg = false;
      }
      this.childrenCate = []
      for (let k in this.categorylist) {
        if (this.forminfo.first_cateid == this.categorylist[k].id) {
          this.childrenCate = this.categorylist[k].children;
        }
      }
      let list = [];
      this.childrenSpecs = []
      for (let k in this.specslist) {
        if (this.forminfo.specsid == this.specslist[k].id) {
          list = this.specslist[k].attrs;
        }
      }
      
      for (let k in list) {
        let a = {
          id: k,
          value: list[k],
        };
        this.childrenSpecs.push(a);
      }
    },
    async submit() {

      this.$refs.form.validate(async (valid) => {
        if (valid) {
          let res;
          // 删除 this.forminfo 中 firstcatename 和 secondcatename 两个属性
          this.$delete(this.forminfo,"firstcatename")
          this.$delete(this.forminfo,"secondcatename")

          // 提交formdata类型
          let fd = new FormData();
          for(let k in this.forminfo) {
            fd.append(k,this.forminfo[k])
          }
          if (this.info.isAdd) {
            res = await addGoods(fd);
          } else {
            res = await editGoods(fd);
          }
          if (res.code == "200") {
            this.info.isShow = false;
            this.$message.success(res.msg);
            this.get_goods_list(); // 再次获取列表，让仓库最新
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
      this.imageUrl = this.$host + this.forminfo.img;
      if (this.forminfo.img) {
        this.hasImg = true;
      } else {
        this.hasImg = false;
      }
      this.childrenCate = []
      for (let k in this.categorylist) {
        if (this.forminfo.first_cateid == this.categorylist[k].id) {
          this.childrenCate = this.categorylist[k].children;
        }
      }
      let list = [];
      this.childrenSpecs = []
      for (let k in this.specslist) {
        if (this.forminfo.specsid == this.specslist[k].id) {
          list = this.specslist[k].attrs;
        }
      }
      
      for (let k in list) {
        let a = {
          id: k,
          value: list[k],
        };
        this.childrenSpecs.push(a);
      }
    },
    close() {
      // 关闭时清除表单验证
      this.$refs.form.clearValidate();
    },
    change(file, fileList) {
      this.imageUrl = URL.createObjectURL(file.raw);
      this.forminfo.img = file.raw;
      if (this.forminfo.img) {
        this.hasImg = true;
      } else {
        this.hasImg = false;
      }
    },
    topChange(val) {
      this.childrenCate = []
      this.forminfo.second_cateid = "";
      // 根据一级的id遍历数组找到对应的children，就是二级
      for (let k in this.categorylist) {
        if (val == this.categorylist[k].id) {
          this.childrenCate = this.categorylist[k].children;
        }
      }
    },
    specsChange(val) {
      this.childrenSpecs = [];
      this.forminfo.specsattr = "";
      // 根据一级的id遍历数组找到对应的children，就是二级
      let list = [];
      for (let k in this.specslist) {
        if (val == this.specslist[k].id) {
          list = this.specslist[k].attrs;
        }
      }
      
      for (let k in list) {
        let a = {
          id: k,
          value: list[k],
        };
        this.childrenSpecs.push(a);
      }
    },
    testSX(){
      this.$forceUpdate()
    }
  },
  components: {},
};
</script>
<style scoped>
.pro {
  display: block;
  margin-bottom: 10px;
}
.avatar-uploader-icon {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader-icon:hover {
  border-color: #409eff;
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