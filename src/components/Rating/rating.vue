<!--  -->
<template>
  <div class='evaluation-wrap'>
      <div class="content flex">
          <div class="left">
              <h1>{{seller.score}}</h1>
              <h2>综合评价</h2>
              <h3>高于周边商家{{seller.rankRate}}%</h3>
          </div>
          <div class="right">
              <ul>
                  <li class="flex">
                      <h2>服务态度</h2>
                      <star :size=36 :score="seller.serviceScore"></star>
                      <h2 class="num">{{seller.serviceScore}}</h2>
                  </li>
                  <li class="flex">
                      <h2>商品评分</h2>
                      <star :size=36 :score="seller.foodScore"></star>
                      <h2 class="num">{{seller.foodScore}}</h2>
                  </li>
                  <li class="flex">
                      <h2>送达时间</h2>
                      <span class="time">{{seller.deliveryTime}}分钟</span>
                  </li>
              </ul>
          </div>
      </div>
      <div class="content">
          <rating-select :ratings="ratings" :ratingType="ratingType"      :hasContent="hasContent" @resetHasContent="resetHasContent" @resetType="resetType" :ratingsPage="ratingsPage"></rating-select>
      </div>
      <shop-cart :minPrice="seller.minPrice"  :deliveryPrice="seller.deliveryPrice" ></shop-cart>
  </div>
</template>

<script>
import star from "../star/star";
import ratingSelect from "../ratingSelect/ratingSelect";
import shopCart from "../shopcart/shopcart";
export default {
  data() {
    return {
      ratingType: 2,
      hasContent: false,
      ratings: {},
      ratingsPage: true,
      selectFoods: []
    };
  },
  props: {
    seller: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  components: { star, ratingSelect, shopCart },
  created() {
    this.$http.get("/static/data.json").then(
      res => {
          this.ratings = res.body.ratings;
      },
      err => console.log(err)
    );
  },
  mounted() {
    this.$root.eventHub.$on("onRatingSelectFood", val => {
      this.selectFoods = val;
      console.log("rating", this.selectFoods, "on");
    });
  },
  methods: {
    resetType(val) {
      this.ratingType = val;
    },
    resetHasContent(val) {
      this.hasContent = val;
    }
  }
};
</script>
<style lang='stylus' scoped>
@import '../../common/stylus/mixin';

.evaluation-wrap {
    overflow-y: scroll;
    background-color: #f3f5f7;
    height: calc(100% - 48px);
    position: absolute;
    left: 0;
    bottom: 48px;

    .content:first-child {
        padding: 18px 0;
        background-color: #fff;
        border-1px(rgba(7, 17, 27, 0.1));
        margin-bottom: 16px;
    }

    .content {
        background-color: #fff;
    }

    h2 {
        font-size: 12px;
        line-height: 12px;
        color: rgb(7, 17, 27);
        margin-bottom: 8px;
    }

    .left {
        flex: 1;
        text-align: center;

        h1 {
            font-size: 24px;
            color: rgb(255, 153, 0);
            line-height: 28px;
            margin-bottom: 6px;
        }

        h3 {
            color: rgb(147, 153, 159);
            font-size: 10px;
            margin-bottom: 6px;
        }
    }

    .right {
        flex: 2;
        border-left-1px(rgba(7, 17, 27, 0.1));
        padding: 0 24px;

        h2 {
            margin-right: 12px;
            line-height: 18px;
        }

        h2.num {
            color: rgb(255, 153, 0);
            margin-left: 12px;
        }

        .time {
            font-size: 12px;
            color: rgb(147, 153, 159);
            line-height: 18px;
        }
    }
}

@media only screen and (max-width: 383px) {
    .evaluation-wrap {
        .left {
            flex: 1;
        }

        .right {
            flex: 2;
            padding: 0 10px;

            h2 {
                margin-right: 4px;
            }

            h2.num {
                margin-left: 10px;
            }
        }
    }
}
</style>
