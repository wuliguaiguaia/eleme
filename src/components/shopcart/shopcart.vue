<!--  -->
<template>
    <div class='shopcart-wrap'>
        <div class="bottom flex" @click="onShowDetail">
            <div class="car">
                <span class="icon-shopping_cart jusCenter-alignCenter " :class="{'car-active':totalCount>0}"></span>
                <span class="num-icon" v-show="totalCount>0">{{totalCount}}</span>
                </div>
            <div class="content align-center">
                <div class="money">￥<span class="total-money">{{totalPrice}}</span></div>
                <div class="line"></div>
                <div class="dilivery-fee">另需配送费{{deliveryPrice}}元</div>
                <div class="min-money right">￥{{minPrice}}元起送</div>
                <div class="submit right" v-show="totalPrice>=minPrice" @click.stop.prevent="pay">去结算</div>
            </div>
        </div>
        <transition name="fade">
            <div class="screen" v-show="showDetail" @click="showDetail = !showDetail"></div>
        </transition>
        <transition name="slide">
            <div class="details-box" v-show="showDetail">
                <div class="jus-between header"><h3>购物车</h3><span class="clear" @click="clearFoods">清空</span></div>
                <ul class="details-content">
                    <li v-for="(item,index) in goodList"  :key="item.name" class="jus-between">
                        <div class="details-left">{{item.name}}</div>
                        <div class="details-right flex">
                            <span class="item-price text-red"><span class="saleicon">￥</span><span class="price">{{itemPrice(index)}}</span></span>
                            <cart-control :food="item" ></cart-control>
                        </div>
                    </li>
                </ul>
            </div>
        </transition>
        <div class="ball-container">
            <div v-for="(ball,index) in balls" :key="index" >
                <transition name="drop" v-on:before-enter="beforeEnter" v-on:enter="enter" v-on:after-enter="afterEnter" class="drop-transition">
                    <div class="ball" v-show="ball.show">
                        <div class="inner inner-hook">1</div>
                    </div>
                </transition>
            </div>
        </div>
    </div>
</template>

<script>
import cartControl from "../cartControl/cartControl";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      showDetail: false,
      balls: [
        {
          show: false
        },
        {
          show: false
        },
        {
          show: false
        },
        {
          show: false
        },
        {
          show: false
        }
      ],
      dropBall: []
    };
  },
  props: {
    deliveryPrice: {
      type: Number,
      default: 0
    },
    minPrice: {
      type: Number,
      default: 0
    }
  },
  components: {
    cartControl
  },
  watch: {
    totalCount(val) {
      if (val <= 0) {
        this.showDetail = false;
      }
    }
  },
  computed: {
    ...mapGetters(["totalPrice", "totalCount"]),
    goodList() {
      return this.$store.state.goodList;
    }
  },
  mounted() {
    this.drop();
    // 关键一步！
  },
  methods: {
    itemPrice(index) {
      return this.goodList[index].price * this.goodList[index].count;
    },
    onShowDetail() {
      if (this.totalCount > 0) {
        this.showDetail = !this.showDetail;
      }
    },
    clearFoods() {
      this.showDetail = false;
      this.$store.commit("clearGoods");
    },
    drop() {
      this.$root.eventHub.$on("storeTarget", target => {
        console.log("小球出现！", "on");

        for (let i = 0; i < this.balls.length; i++) {
          let ball = this.balls[i];
          //   找到一个隐藏的小球，并return 出去
          if (!ball.show) {
            ball.show = true;
            ball.el = target;
            this.dropBall.push(ball);
            return false;
          }
        }
      });
    },
    beforeEnter: function(el) {
      // 找到所有 为 true 的小球
      let count = this.balls.length;
      while (count--) {
        let ball = this.balls[count];
        if (ball.show) {
          let rect = ball.el.getBoundingClientRect();
          let x = rect.left - 32;
          let y = -(window.innerHeight - rect.top - 22);
          el.style.cssText = `
                        display:block;
                        transform:translate3d(0,${y}px,0)`;
          let inner = el.querySelector(".inner-hook");
          inner.style.cssText = `transform:translate3d(${x}px,0,0)`;
        }
      }
    },
    // 此回调函数是可选项的设置
    // 与 CSS 结合时使用
    enter: function(el, done) {
      // 触发浏览器重绘
      // eslint-disable-next-line
      let rf = el.offsetHeight;
      this.$nextTick(() => {
        el.style.cssText = `transform:translate3d(0,0,0)`;
        let inner = el.querySelector(".inner-hook");
        inner.style.cssText = `transform:translate3d(0,0,0)`;
      });
      done();
    },
    afterEnter: function(el) {
      let ball = this.dropBall.shift();
      if (ball) {
        ball.show = false;
        el.display = "none";
      }
    },
    pay() {
      this.showDetail = false;
      alert("去支付！");
    }
  }
};
</script>
<style lang='stylus' scoped>
@import '../../common/stylus/mixin';

.shopcart-wrap {
    position: fixed;
    bottom: 0;
    left: 0;
    color: rgba(255, 255, 255, 0.4);
    width: 100%;
    z-index: 1;

    .car {
        padding: 0 12px;
        position: relative;
        z-index: 2;

        .icon-shopping_cart {
            border: 6px solid #141d27;
            border-radius: 50%;
            background-color: rgba(72, 72, 72, 0.99);
        }

        .icon-shopping_cart:before {
            border-radius: 50%;
            width: 44px;
            height: 44px;
            font-size: 24px;
            line-height: 44px;
            text-align: center;
        }

        .car-active {
            color: #ffffff;
            background-color: rgb(0, 160, 220);
        }

        .num-icon {
            position: absolute;
            display: inline-block;
            left: 44px;
            top: 0;
            font-size: 9px;
            font-weight: bold;
            color: #fff;
            line-height: 16px;
            background-color: red;
            width: 24px;
            border-radius: 8px;
            text-align: center;
        }
    }

    .content {
        position: absolute;
        bottom: 0;
        padding-left: 80px;
        background-color: #141d27;
        box-sizing: border-box;
        width: 100%;
        height: 48px;
    }

    .money {
        font-size: 16px;
        font-weight: 700;
    }

    .line {
        width: 1px;
        height: 24px;
        background-color: rgba(255, 255, 255, 0.1);
        margin: 0 12px;
    }

    .right {
        width: 105px;
        height: 48px;
        font-size: 12px;
        background-color: rgba(72, 72, 72, 0.99);
        font-weight: bold;
        line-height: 48px;
        position: absolute;
        right: 0;
        text-align: center;
    }

    .submit {
        background-color: green;
        color: #fff;
    }

    .details-box {
        width: 100%;
        position: absolute;
        left: 0;
        bottom: 48px;
        font-size: 14px;
        color: rgb(7, 17, 27);
        z-index: -1;

        .header {
            height: 40px;
            padding: 0 18px;
            line-height: 40px;
            box-sizing: border-box;
            background: #f3f5f7;
            border-1px(rgba(7, 17, 27, 0.1));

            h3 {
                font-weight: 200;
            }

            .clear {
                font-size: 12px;
                color: rgb(0, 160, 220);
            }
        }

        .details-content {
            max-height: 265px;
            overflow: auto;
        }

        .details-content li {
            box-sizing: border-box;
            padding: 12px 18px;
            background-color: #ffffff;
            border-1px(rgba(7, 17, 27, 0.1));
            height: 48px;
            line-height: 24px;

            .details-left {
            }

            .details-right {
                .item-price {
                    margin-right: 12px;
                }

                .saleicon {
                    font-size: 10px;
                }
            }
        }
    }

    .screen {
        background: rgba(7, 17, 27, 0.8);
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: -2;
        opacity: 1;
    }

    .slide-enter-active, .slide-leave-active, .fade-enter-active, .fade-leave-active {
        transition: all ease 0.3s;
    }

    .slide-enter, .slide-leave-active {
        transform: translate3D(0, 100%, 0);
    }

    .fade-enter, .fade-leave-active {
        opacity: 0;
    }

    .ball-container {
        .ball {
            transition: all 0.3s cubic-bezier(0.3, -0.37, 0.83, 0.67);
            position: fixed;
            left: 32px;
            bottom: 22px;
            z-index: 0;

            .inner {
                width: 16px;
                height: 16px;
                background: red;
                color: #ffffff;
                font-size: 12px;
                text-align: center;
                line-height: 16px;
                border-radius: 50%;
                transition: all 0.3s linear;
            }
        }

        .drop-enter-active {
        }
    }
}
</style>
