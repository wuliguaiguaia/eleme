<template>
  <div id="app">
      <v-header :seller="seller"></v-header>
      <ul class="tab border-1px">
          <router-link tag="li" :class="{active:$route.name == 'goods'}" :to="{name: 'goods'}">商品</router-link>
          <router-link tag="li" :to="{name: 'rating'}" :class="{active:$route.name == 'rating'}">评价</router-link>
          <router-link tag="li" :to="{name: 'seller'}" :class="{active:$route.name == 'seller'}">商家</router-link>
      </ul>
      <div class="content-wrap">
          <keep-alive>
            <router-view :seller="seller"></router-view>
          </keep-alive>
      </div>
  </div>
</template>
<script>
// import { seller } from "./../data.json";
import vHeader from "@/components/header/header";
export default {
  name: "App",
  data() {
    return {
      seller: null,
      nowIndex: 0
    };
  },
  components: {
    vHeader
  },
  methods: {},
  created() {
    this.$http.get("./../../static/data.json").then((res, req) => {
      this.seller = res.body.seller;
    //   this.seller = seller;
      console.log(this.seller, "test seller");
    });
  }
};
</script>

<style lang="stylus">
@import 'common/stylus/mixin';

#app {
    position: relative;
}

.content-wrap {
    position: absolute;
    top: 174px;
    left: 0;
    width: 100vw;
    display: flex;
    overflow-y: auto;
    height: calc(100vh - 174px);
}

.tab {
    border-1px(rgba(7, 17, 27, 0.1));
    width: 100%;
    height: 40px;
    line-height: 40px;
    font-size: 14px;
    display: flex;
    text-align: center;
    color: rgb(77, 85, 93);

    // border-bottom .5px solid rgba(7,17,27,.1)
    li {
        flex: 1;
    }

    li.active {
        color: rgb(240, 20, 20);
    }
}
</style>
