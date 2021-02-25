<template>
  <div class="phone">
    <div class="headertitle">通讯录</div>

    <div class="search">
      <van-search
        v-model="value"
        placeholder="搜索联系人"
        @click="gotosearch"
      />
    </div>
    <van-skeleton title :row="1" :loading="loading">
      <div class="organization" @click="gotoorganization">
        <div class="phone-text">
          <div class="phone-img"></div>
          <div class="phone-name">组织机构</div>
          <div class="phone-ico">
            <van-icon name="arrow" />
          </div>
        </div>
      </div>
    </van-skeleton>

    <van-index-bar
      :highlight-color="colors"
      class="content"
      :z-index="zindex"
      :sticky="false"
    >
      <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
        <div v-if="showss">
          <van-skeleton
            title
            :row="3"
            :loading="loading"
            v-for="item in 3"
            :key="item"
          >
          </van-skeleton>
        </div>
        <div v-else>
          <div v-for="(item, index) in phonelist" :key="index">
            <van-index-anchor :index="item.selection" class="title" />
            <div
              class="phone-text"
              v-for="(item1, index1) in item.selectionData"
              :key="index1"
              @click="gotodetail(item1.sysId)"
            >
              <div class="phone-imguser">
                <div :class="randcolor[parseInt(Math.random() * 4)]">
                  {{ item1.realName.substring(item1.realName.length - 2) }}
                </div>
              </div>
              <div class="phone-nameuser">
                <span>{{ item1.realName }}</span> | {{ item1.departName }}
              </div>
              <div class="phone-ico">
                <van-icon name="arrow" />
              </div>
            </div>
          </div>
        </div>
      </van-pull-refresh>
    </van-index-bar>
  </div>
</template>
<script>
import {
  IndexBar,
  IndexAnchor,
  Icon,
  Search,
  PullRefresh,
  Toast,
  Skeleton,
} from "vant";
import { getUsers } from "@/api/api";
import { mapState, mapMutations } from "vuex";
import utils from "@/utils/index.js";
export default {
  components: {
    "van-index-bar": IndexBar,
    "van-index-anchor": IndexAnchor,
    "van-icon": Icon,
    "van-search": Search,
    "van-pull-refresh": PullRefresh,
    "van-skeleton": Skeleton,
  },
  data() {
    return {
      colors: "#8b8989",
      value: "",
      zindex: 100,
      phonelist: [],
      randcolor: ["rand1", "rand2", "rand3", "rand4"],
      isLoading: false,
      loading: true,//骨架屏
      showss: true, //骨架屏
    };
  },
  computed: {
    ...mapState("user", ["username", "userpwd"]),
  },
  mounted() {
    this.loading = true;
    console.log(this.$route);
    //发送请求获取数据
    getUsers().then((res) => {
      let lists = JSON.parse(utils.urlResonponse(res.data)).data;
      console.log(lists);
      this.phonelist = lists;
      this.loading = false;
      this.showss = false;
    });
  },
  methods: {
    ...mapMutations("addressbkks", ["defaultSiyidChanges"]),
    gotosearch() {
      let that = this;
      this.$router.push({
        name: "Search",
        params: {
          metal: "phoneIndex",
          lists: that.phonelist,
        },
      });
    },
    //恢复默认值
    defaultId() {
      this.defaultSiyidChanges("6d92eff4c1a04dcfb6582a8e63dd520b");
    },
    gotoorganization() {
      //恢复默认值
      this.defaultId();
      this.$router.push({
        path: "/addressbook",
      });
    },
    gotodetail(value) {
      this.$router.push({
        name: "Details",
        params: {
          sysId: value,
          metal: "phone",
        },
      });
    },
    onRefresh() {
      //发送请求获取刷新数据
      getUsers().then((res) => {
        let lists = JSON.parse(utils.urlResonponse(res.data)).data;
        console.log(lists);
        this.phonelist = lists;
        Toast("刷新成功");
        this.isLoading = false;
      });
    },
  },
};
</script>
<style lang="scss" scoped>
@import "../assets/sass/phone.scss";
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
