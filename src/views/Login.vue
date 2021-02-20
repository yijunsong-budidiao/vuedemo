<template>
  <el-row class="login-bg">
    <el-col :span="8" class="login-box">
      <h3>小U商城管理系统</h3>
      <el-form :model="forminfo" ref="form" :rules="rules">
        <el-form-item prop="username">
          <el-input v-model="forminfo.username" placeholder="请输入账号">
            <template slot="prepend"
              ><i class="el-icon-user-solid"></i
            ></template>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="forminfo.password"
            placeholder="请输入密码"
            show-password
          >
            <template slot="prepend"><i class="el-icon-s-goods"></i></template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button class="login-btn" type="primary" @click="submit(forminfo)"
            >立即登录</el-button
          >
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>
<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      forminfo: {
        username: "admin",
        password: "123456",
      },
      rules: {
        //验证规则对象
        username: [{ required: true, message: "必填", trigger: "blur" }],
        password: [{ required: true, message: "必填", trigger: "blur" }],
      },
    };
  },
  created() {},
  methods: {
    ...mapActions({
      login: "user/login",
    }),
    async submit() {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          this.login(this.forminfo)
        }
      });
    },
  },
  components: {},
};
</script>
<style scoped>
.login-bg {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url(../assets/images/login-bg.jpg);
  background-size: cover;
}
.login-box {
  padding: 20px 40px;
  background-color: #fff;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
}
.login-box h3 {
  margin-bottom: 20px;
  text-align: center;
}
.login-btn {
  width: 100%;
  display: block;
}
</style>