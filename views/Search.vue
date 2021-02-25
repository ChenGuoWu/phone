<template>
  <div class="searches">
    <div class="header">
      <van-icon name="arrow-left" class="headerback" @click="gotoback" />
      <div class="headercontent">通讯录</div>
    </div>
    <div class="search">
      <van-search v-model="value" placeholder="搜索联系人" @search="onSearch" />
      <div @click="ceshisearch">搜索</div>
    </div>
    <div class="addressbook">
      <div
        class="addressbook-text"
        v-for="(item, index) in lists"
        :key="index"
        @click="gotodetail(item.sysId)"
      >
        <div class="addressbook-imguser">
          <div :class="randcolor[parseInt(Math.random() * 4)]">
            {{ item.realName.substring(item.realName.length - 2) }}
          </div>
        </div>
        <div class="addressbook-name">
          <span>{{ item.realName }}</span> | {{ item.departName }}
        </div>
        <div class="addressbook-ico">
          <van-icon name="arrow" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { Search, Icon } from "vant";
import { getUsers } from "@/api/api";
import utils from "@/utils/index.js";
import { Toast } from "vant";
export default {
  components: {
    "van-search": Search,
    "van-icon": Icon,
  },
  mounted(){
      if (window.localStorage.getItem('searchlists')) {
          this.lists=JSON.parse(window.localStorage.getItem('searchlists'))
         this.value=JSON.parse(window.localStorage.getItem('searchname')).name
      }
  },
  data() {
    return {
      value: "",
      lists: [],
      randcolor: ["rand1", "rand2", "rand3", "rand4"],
    };
  },
  methods: {
    gotodetail(value) {
      this.$router.push({
        name: "Details",
        params: {
          sysId: value,
          metal: "search",
        },
      });
    },
    gotoback() {
        this.$router.push({
          path: "/phone",
        });
      window.localStorage.removeItem('searchlists')
      window.localStorage.removeItem('searchname')
    },
    onSearch() {},
    ceshisearch() {
      //如果有搜索内容则调用接口
      if (this.value) {
           const params = {
        name: this.value,
      };
      getUsers({ params: params }).then((res) => {
        let lists = JSON.parse(utils.urlResonponse(res.data)).data;
        console.log(lists);
        //将所有需要的数据以数组的形式放入一个数组内
        this.lists = lists.map((item) => {
          return item.selectionData;
        });
        if (this.lists.length) {
          //将数据以单个的形式都放进一个数组内
          this.lists = Array.prototype.concat.apply([], this.lists);
          //存入本地存储中做缓存
          window.localStorage.setItem('searchlists',JSON.stringify(this.lists))
          window.localStorage.setItem('searchname',JSON.stringify({name:this.value}))
        } else {
          Toast("暂无数据");
        }
        //根据搜索过滤
        console.log(this.lists);
      });
      }else{
          Toast("移动办公:请输入你要搜索的联系人");
      }


      
    },
  },
};
</script>
<style lang="scss" scoped>
@import "../assets/sass/header.scss";
</style>
<style lang="scss" scoped>
@import "../assets/sass/search.scss";
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
