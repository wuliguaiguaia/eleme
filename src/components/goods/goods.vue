<!-- goods -->
<template>
  <div class='goods-wrap'>
      <div class="goods-type">
          <div v-for="(item,index) in goods" :key="item.name" class="foods-type"   :class="{'scroll-link':INDEX == index}" @click="typeChange(index,item.name)" >
              <a class="item" :href="'#' + item.name">
                <span class="icon" :class="supports[item.type]" v-if="item.type>0"></span><span class="title">{{item.name}}</span>
              </a>
          </div>
      </div>
      <div class="goods-foods" @scroll.passive="scrollBox">
          <div v-for="item in goods" :key="item.name" class="flex-col food-list" >
            <h2 :id="item.name" >{{item.name}}</h2>
            <div v-for="food in item.foods" :key="food.name" class="food-wrap">
                <div class="food  flex" @click.stop="onSelect(food)">
                    <img class="food-icon" :src="food.icon" alt="">
                    <div class="food-info">
                        <h3 >{{food.name}}</h3>
                        <div class="food-gray" v-if="food.description">{{food.description}}</div>
                        <div class="sell-count"><span class="food-gray">月售{{food.sellCount}}份</span><span class="food-gray">好评率{{food.rating}}%</span></div>
                        <div class="price-box">
                            <span class=""><span class="saleicon text-red">￥</span><span class="price text-red">{{food.price}}</span></span>
                            <span class="text-through" v-if="food.oldPrice"><span class="saleicon">￥</span><span class="oldPrice">{{food.oldPrice}}</span></span>
                        </div>
                    </div>
                    <div class="cart-control">
                        <cart-control :food="food">
                        </cart-control>
                    </div>
                </div>
            </div>
          </div>
      </div>
      <shop-cart :minPrice="seller.minPrice"  :deliveryPrice="seller.deliveryPrice" :selectFoods="selectFoods"></shop-cart>
    <keep-alive>
        <!-- 相关内容 -->
        <router-view :food="transFood"></router-view>
    </keep-alive>
  </div>
</template>

<script>
// import { goods } from "../../../data.json";
import $ from "jquery";
import shopCart from "../shopcart/shopcart";
import cartControl from "../cartControl/cartControl";
import foodDetail from "../foodDetail/foodDetail";
let INDEX = -1;
export default {
  data() {
    return {
      checked: false,
      goods: {},
      supports: [],
      scrollY: 0,
      foodListHeightArr: [],
      num: 0,
      showBall: false,
      transFood: {},
      INDEX: 0
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
  created() {
    this.supports = ["decrease", "discount", "special", "invoice", "guarantee"];
    this.$http.get("./../../../static/data.json").then(
      res => {
        this.goods = res.body.goods;
        this.$nextTick(() => {
          for (let i = 0; i < this.goods.length; i++) {
            this.goods[i].foods.forEach((food, index) => {
              this.$set(food, "count", 0);
              this.$set(food, "id", ++INDEX);
            });
          }
          this.calculateHeight();
        });
      },
      err => console.log(err)
    );
  },
  components: {
    shopCart,
    cartControl,
    foodDetail
  },
  computed: {
    nowIndex: {
      get() {
        for (let i = 0; i < this.foodListHeightArr.length; i++) {
          let height1 = this.foodListHeightArr[i];
          let height2 = this.foodListHeightArr[i + 1];

          if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
            return i;
          }
        }
        return 0;
      },
      set(val) {
        this.INDEX = val;
      }
    },
    selectFoods() {
      let arr = [];
      for (let i = 0; i < this.goods.length; i++) {
        this.goods[i].foods.forEach((food, index) => {
          if (food.count > 0) {
            arr.push(food);
          }
        });
      }
      return arr;
    }
  },
  mounted() {},
  watch: {
    selectFoods: {
      handler(val) {
        this.$root.eventHub.$emit("onRatingSelectFood", val);
        this.$root.eventHub.$emit("onSellerSelectFood", val);
      },
      deep: true
    },
    nowIndex(val) {
      this.INDEX = val;
    }
  },
  methods: {
    scrollBox() {
      this.scrollY = $(".goods-foods").scrollTop();
    },
    calculateHeight() {
      $(".food-list").each((index, item) => {
        this.foodListHeightArr.push($(item).position().top);
      });
    },
    // 进入
    onSelect(food) {
      this.transFood = food;
      //   this.showFoodDetail = true;
      this.$router.push({ name: "foodDetail", params: { userId: food.name } });
    },
    // // 返回
    // goback() {
    //   this.showFoodDetail = false;
    // },
    typeChange(index, name) {
      this.INDEX = index;
    }
  },
  provide() {
    return { getIndex: this.INDEX };
  }
};
</script>
<style lang='stylus' scoped>
@import '../../common/stylus/mixin';

.goods-wrap {
    display: flex;
    position: relative;

    .goods-type {
        flex: 0 0 80px;
        width: 80px;
        overflow-y: auto;
        height: calc(100vh - 174px);

        .foods-type:not(:last-of-type) .item {
            border-1px(rgba(7, 17, 27, 0.1));
        }

        .foods-type {
            font-size: 12px;
            color: rgb(20, 20, 20);
            padding: 0 12px;
            background: #f3f5f7;

            .item {
                display: block;
                width: 56px;
                height: 54px;
                line-height: 14px;
                display: table-cell;
                vertical-align: middle;
            }

            .icon {
                width: 12px;
                height: 12px;
                background-size: 12px 12px;
                background-repeat: no-repeate;
                margin-right: 4px;

                &.decrease {
                    bg-image('decrease_1');
                }

                &.discount {
                    bg-image('discount_1');
                }

                &.special {
                    bg-image('special_1');
                }

                &.invoice {
                    bg-image('invoice_1');
                }

                &.guarantee {
                    bg-image('guarantee_1');
                }
            }

            .title {
            }
        }

        .foods-type.scroll-link {
            color: rgb(240, 20, 20);
            background-color: #fff;
            position: relative;
            margin-top: -1px;

            .item:after {
                border: none;
            }
        }
    }

    .goods-foods {
        overflow-y: auto;
        height: calc(100vh - 174px);
        flex: 1;
        position: relative;
        padding-bottom: 48px;

        h2 {
            border-left: 2px solid #d9dde1;
            background-color: #f3f5f7;
            font-size: 12px;
            color: rgb(147, 153, 159);
            line-height: 26px;
            text-indent: 14px;
        }

        .food-list .food-wrap {
            margin: 0 18px;
        }

        .food-list .food-wrap:not(:last-of-type) {
            border-1px: rgba(7, 17, 27, 0.1);
        }

        .food {
            padding: 18px 0;
            position: relative;

            .food-icon {
                width: 80px;
                height: 80px;
            }

            .food-info {
                margin-left: 10px;

                h3 {
                    margin-top: 2px;
                    font-size: 14px;
                    color: rgb(7, 17, 27);
                }

                .food-gray {
                    margin-top: 8px;
                    margin-right: 12px;
                    font-size: 10px;
                    color: rgb(147, 153, 159);
                    display: inline-block;
                }

                .price-box {
                    margin-top: 8px;
                    font-weight: bold;
                    line-height: 24px;
                    color: rgb(147, 153, 159);
                    font-size: 14px;

                    .saleicon {
                        font-size: 10px;
                        font-weight: normal;
                    }

                    .text-red {
                        color: red;
                    }

                    .oldPrice {
                        font-size: 10px;
                    }
                }
            }

            .cart-control {
                position: absolute;
                bottom: 18px;
                right: 0;

                .ball {
                    position: absolute;
                    right: 0;
                    top: 0;
                    width: 16px;
                    height: 16px;
                    color: #fff;
                    background: red;
                    border-radius: 50%;
                    text-align: center;
                    line-height: 16px;
                    font-size: 12px;
                    z-index: -1;
                    cursor: pointer;
                }
            }
        }
    }
}

.shopcart {
    position: fixed;
    bottom: 0;
    left: 0;
}
</style>
