<template>
  <div class="detail">
    <div class="showpic">
      <van-icon name="arrow-left" class="showpic-back" @click="gotobacks" />
      <div
        class="showpic-img"
        :class="[avatarImg ? randcolor[parseInt(Math.random() * 4)] : '']"
      >
        <img :src="avatarImg" :alt="realNameavatarImg" />
        <!-- <div v-else>{{realNameavatarImg}}</div> -->
      </div>
      <p class="showpic-name">{{ listobj.realName }}</p>
    </div>
    <div class="showcontent">
      <ul>
        <li class="showcontent-content">
          <div>部门</div>
          <div class="showcontent-content-name">{{ listobj.departName }}</div>
        </li>
        <li class="showcontent-content">
          职务
        </li>
        <li class="showcontent-content">
          办公电话
        </li>
        <li class="showcontent-content">
          办公地址
        </li>
      </ul>
    </div>
    <div class="gototakle" @click="gotophone">
      <van-button type="primary" size="large"
        ><van-icon name="phone-o" class="icons" />通话</van-button
      >
    </div>
  </div>
</template>
<script>
import { Icon, Button, Toast } from "vant";
import { getById } from "@/api/api";
import utils from "@/utils/index.js";
import { mapState, mapMutations } from "vuex";
import store from "@/store/index.js";
import axios from "axios";
export default {
  components: {
    "van-icon": Icon,
    "van-button": Button
  },
  data() {
    return {
      listobj: {},
      avatarImg: "", //头像图片
      randcolor: ["rand1", "rand2", "rand3", "rand4"],
      realNameavatarImg: "" //头像姓名
      // temp:'',//头像是否存在
    };
  },
  computed: {
    ...mapState("addressbkks", ["navigationListSiyid", "defaultSiyid"])
  },

  methods: {
    ...mapMutations("addressbkks", [
      "navigationListSiyidpop",
      "defaultSiyidChanges"
    ]),
    gotobacks() {
      if (this.$route.params.metal == "search") {
        this.$router.push({
          path: "/search"
        });
      }
      //首页给特殊的标识符判断
      else if (this.$route.params.metal == "phone") {
        this.$router.push({
          path: "/phone"
        });
      } else {
        //如果不存在则直接跳回原始界面
        if (this.navigationListSiyid.length) {
          //跳转回去并传上一级的参数渲染

          this.$router.push({
            path: "/addressbook"
          });
          let states = this.navigationListSiyid[
            this.navigationListSiyid.length - 1
          ];
          this.defaultSiyidChanges(states);
          console.log(states);
          console.log(this.defaultSiyid);
        } else {
          this.$router.push({
            path: "/addressbook"
          });
        }
      }
    },
    gotophone() {
      Toast("电话号码为空");
    }
  },
  mounted() {
    let that = this;
    async function details() {
      const params = {
        id: that.$route.params.sysId
      };
      let params1;
      await getById({ params: params }).then(res => {
        //解密
        console.log(JSON.parse(utils.urlResonponse(res.data)).data);
        that.listobj = JSON.parse(utils.urlResonponse(res.data)).data[0];
        params1 = JSON.parse(utils.urlResonponse(res.data)).data[0].userPhotoId;
        // that.temp=params1
      });
      //axios
      axios.defaults.baseURL = process.env.VUE_APP_BASE_URL;
      axios({
        method: "get",
        url: "/sysUserPhoto/downloadImage?id=" + params1,
        headers: {
          token: window.localStorage.getItem("userToken")
        },
        responseType: "blob"
      }).then(res => {
        console.log(window.URL.createObjectURL(res.data));
        that.avatarImg = window.URL.createObjectURL(res.data);
        that.realNameavatarImg = that.listobj.realName;
      });
      //axios
      // const xhr = new XMLHttpRequest();
      // xhr.responseType = "blob";
      // xhr.open(
      //   "get",
      //   "http://192.168.65.29:8085/sysUserPhoto/downloadImage?id=" + params1
      // );
      // xhr.setRequestHeader("token", window.localStorage.getItem("userToken"));
      // store.commit("show_loading");
      // xhr.onloadend = () => {
      //   console.log(window.URL.createObjectURL(xhr.response));
      //   store.commit("hide_loading");
      //   that.avatarImg = window.URL.createObjectURL(xhr.response);
      //   that.realNameavatarImg=that.listobj.realName
      // };
      // xhr.send();
    }
    //发送请求获取详细信息
    details();
  }
};
</script>
<style lang="scss" scoped>
@import "../assets/sass/Details.scss";
</style>
<style lang="scss" scoped>
.rand1 {
  background: #5bc067 !important;
}
.rand2 {
  background: #4496fd !important;
}
.rand3 {
  background: #b46ccc !important;
}
.rand4 {
  background: #fd8144 !important;
}
</style>
