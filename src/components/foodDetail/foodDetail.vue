<!--  -->
<template>
    <transition name="slide" >
        <div class='foodDetail-wrap' transition="slide" :key="food.name">
            <i class="icon-arrow_lift icon" @click="goback"></i>
            <div class="header">
                <img :src="food.image" alt="">
                <div class="content">
                    <h1>{{food.name}}</h1>
                    <div class="sale-info">
                        <span>月售{{food.sellCount}}份</span>
                        <span>好评率{{food.rating}}%</span>
                    </div>
                    <div class="price-box flex">
                        <div class=""><span class="saleicon text-red">￥</span><span class="price text-red">{{food.price}}</span></div>
                        <div class="text-through" v-if="food.oldPrice"><span class="saleicon">￥</span><span class="oldPrice">{{food.oldPrice}}</span></div>
                    </div>
                    <div class="cart-control">
                        <cart-control :food="food" v-show="food.count>0"></cart-control>
                        <div class="add" @click="onShowCart" v-show="food.count==0">加入购物车</div>
                    </div>
                </div>
            </div>
            <div class="content introduce" v-if="food.info">
                <h2>商品介绍</h2>
                <p>{{food.info}}</p>
            </div>
            <div class="special">
                <h2>商品评价</h2>
                <rating-select :ratings="food.ratings" :ratingType="ratingType" :hasContent="hasContent" @resetHasContent="resetHasContent" @resetType="resetType"></rating-select>
            </div>
        </div>
    </transition>
</template>

<script>
import cartControl from "../cartControl/cartControl";
import ratingSelect from "../ratingSelect/ratingSelect";
export default {
  data() {
    return {
      showCart: false,
      ratingType: 2,
      hasContent: false
    };
  },
  inject: ["getIndex"],
  props: {
    food: {
      type: Object
    }
  },
  created() {},
  components: {
    cartControl,
    ratingSelect
  },
  computed: {},
  mounted() {},
  methods: {
    goback() {
      this.ratingType = 2;
      this.hasContent = false;
      this.$router.go(-1);
    },
    onShowCart(e) {
      this.showCart = true;
      this.$set(this.food, "count", 1);
      this.$store.commit("addGoods", this.food);
      this.$root.eventHub.$emit("storeTarget", e.target);
    },
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

.foodDetail-wrap {
    position: fixed;
    bottom: 48px;
    left: 0;
    background: #f3f5f7;
    z-index: 0;
    overflow-y: auto;
    width: 100vw;
    height: 100vh;
    color: rgb(147, 153, 159);
    font-size: 12px;
    line-height: 24px;

    .icon-arrow_lift {
        color: #fff;
        position: fixed;
        top: 0;
        left: 7px;
        font-size: 15px;
    }

    .content {
        padding: 18px;
        position: relative;
        background-color: #ffff;
    }

    .content:not(:first-of-type) {
        margin-top: 16px;
    }

    .special {
        margin-top: 16px;
        background: #fff;

        h2 {
            padding: 18px;
            padding-bottom: 0;
            margin-bottom: 6px;
        }
    }

    h1 {
        font-size: 14px;
        color: rgb(7, 17, 27);
        font-weight: 700;
    }

    h2 {
        font-size: 14px;
        color: rgb(7, 17, 27);
        font-weight: 500;
    }

    .icon {
        margin-right: 4px;
        line-height: 24px;
        font-size: 12px;
        display: inline;
    }

    .header {
        img {
            width: 100%;
            height: 375px;
        }

        .sale-info {
            color: rgb(147, 153, 159);
            font-size: 10px;
            margin-top: 8px;

            span {
                margin-right: 12px;
            }
        }

        .price-box {
            margin-top: 18px;
            line-height: 24px;

            .saleicon {
                font-size: 10px;
            }

            .price {
                font-size: 14px;
                font-weight: bold;
                color: rgb(240, 20, 20);
                margin-right: 12px;
            }

            .oldPrice {
                font-size: 10px;
                color: rgb(147, 153, 159);
            }
        }

        .cart-control {
            &>div {
                position: absolute;
                right: 18px;
                bottom: 18px;
            }

            .add {
                color: #fff;
                font-size: 10px;
                background: rgb(0, 160, 220);
                line-height: 24px;
                height: 24px;
                padding: 0px 7px;
                text-align: center;
                border-radius: 12px;
                cursor: pointer;
            }
        }
    }

    .introduce {
        p {
            margin-top: 6px;
            padding: 0 8px;
            font-size: 12px;
            line-height: 24px;
        }
    }
}

.slide-enter-active, .slide-leave-active, .fade-enter-active, .fade-leave-active {
    transition: all ease 0.4s;
}

.slide-enter, .slide-leave-active {
    transform: translate3d(100%, 0, 0);
    opacity: 0;
}

.fade-enter, .fade-leave-active {
    opacity: 0;
}
</style>
