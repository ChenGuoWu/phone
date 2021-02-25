<template>
  <div class="home">
    <van-form @submit="onSubmit">
      <van-field
        v-model="username"
        name="username"
        label="用户名"
        placeholder="用户名"
        :rules="[{ required: true, message: '请填写用户名' }]"
      />
      <van-field
        v-model="password"
        type="password"
        name="password"
        label="密码"
        placeholder="密码"
        :rules="[{ required: true, message: '请填写密码' }]"
      />
      <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit">
          提交
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
// @ is an alias to /src

import { Form, Field, Button } from "vant";
import { getoatoken } from "@/api/api";
import { mapMutations } from "vuex";
import utils from "@/utils/index.js";
export default {
  components: {
    "van-form": Form,
    "van-field": Field,
    "van-button": Button,
  },
  data() {
    return {
      username: "yuliyang",
      password: "Yuliyang@123",
    };
  },
  methods: {
    ...mapMutations(["gettoken"]),
    ...mapMutations("user", ["getusername", "getuserpwd"]),
    onSubmit(values) {
      console.log("submit", values);
      let password = utils.urlRequest(values.password);
      console.log(password);
      const parmas = {
        username: values.username,
        password: password,
      };
      //存入store 
      this.getusername = values.username;
      this.getuserpwd = values.password;
      console.log(parmas);
      getoatoken(parmas).then((res) => {
        //存入token到store里
        console.log(res);
 
        let datas = JSON.parse(utils.urlResonponse(res.data)) ;
        console.log(datas)
        this.gettoken(res.data);
        //把token存入本地存储
        localStorage.setItem("userToken", datas.data.access_token);
        //存入userinfo
        localStorage.setItem("userinfo", JSON.stringify(datas.data.userinfo) );
      });
      this.$router.push({
        name: "Phone",
        params: {},
      });
    },
  },
};
</script>
<style lang="scss" scoped>
@import "../assets/sass/home.scss";
</style>
