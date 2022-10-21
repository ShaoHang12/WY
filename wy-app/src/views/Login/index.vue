<template>
  <div class="login">
    <h1 class="loginTop">欢迎登录</h1>
    <van-form @submit="onSubmit">
      <van-field
        v-model="phone"
        name="phone"
        label="手机号"
        placeholder="请输入手机号码"
      />
      <van-field
        v-model="password"
        type="password"
        name="Password"
        label="密码"
        placeholder="请输入密码"
      />
      <div style="margin: 16px">
        <van-button round block type="danger" native-type="submit" @click="Login" style="color: white;">
          登录
        </van-button>
      </div>
    </van-form>
  </div>
</template>
<script>
import { getLoginUser } from "@/request/api/my";
export default {
  data() {
    return {
      phone: "",
      password: "",
      username: "",
    };
  },
  mounted() {
    this.$store.state.isShowTab = false;
  },
  methods: {
    async Login() {
      let res = await this.$store.dispatch("getLogin", {
        phone: this.phone,
        password: this.password,
      });
      if (res.data.code === 200) {
        //如果返回的code等于200，说明登录成功，就跳转个人中心页面
        this.$store.commit("updateIsLogin", true);
        this.$store.commit("updateToken", res.data.token);
        let result = await getLoginUser(res.data.account.id);
        this.$store.commit("updateUser", result);
        this.$router.push("/my");
      } else {
        alert("手机号码或者密码错误");
        this.password = "";
      }
    },
    onSubmit(values) {
    },
  },
};
</script>
<style lang="less" scoped>
.login {
  .loginTop {
    text-align: center;
    margin: 0.4rem 0;
  }
}
</style>
