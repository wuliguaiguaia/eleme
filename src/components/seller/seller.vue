<!--  -->
<template>
  <div class='seller-wrap' @scroll.passive="onscroll">
      <div class="header content">
          <div class="top jus-between">
              <div class="left">
                  <h1>{{seller.name}}</h1>
                  <div class="flex">
                    <star :size=36 :score="seller.score"></star>
                    <span>(661)</span>
                    <span class="count">月售{{seller.sellCount}}单</span>
                  </div>
              </div>
              <div class="right flex-col">
                  <i class=" icon-favorite" :class="{favorite:favorite}" @click="favorite = !favorite"></i>
                  <p><span v-show="!favorite">收藏</span><span v-show="favorite">已收藏</span></p>
              </div>
          </div>
          <ul class="bottom flex">
              <li class="flex-col"><span>起送价</span><span>{{seller.minPrice}}<span>元</span></span></li>
              <li class="flex-col"><span>商家配送</span><span>{{seller.deliveryPrice}}<span>元</span></span></li>
              <li class="flex-col"><span>平均配送时间</span><span>{{seller.deliveryTime}}<span>分钟</span></span></li>
          </ul>
      </div>
      <div class="bulletin content">
          <h1>公告与活动</h1>
          <p>{{seller.bulletin}}</p>
          <ul>
              <li v-for="support in seller.supports" :key="support.type">
                  <span class="icon" :class="supports[support.type]"></span>
                  <span class="desc">{{support.description}}</span>
              </li>
          </ul>
      </div>
      <div class="pics content">
          <h1>商家实景</h1>
          <div class="container">
            <ul class="touch-pics" :style="{width:`${width}px`}">
                <li v-for=" (pic,index) in seller.pics" :key="index">
                    <img :src="pic" alt="">
                </li>
            </ul>
          </div>
      </div>
      <div class="info content">
          <h1>商家信息</h1>
          <p v-for="(info,index) in seller.infos" :key="index">{{info}}</p>
      </div>
      <shop-cart  :minPrice="seller.minPrice"  :deliveryPrice="seller.deliveryPrice" :selectFoods="selectFoods"></shop-cart>
  </div>
</template>

<script>
import star from "../star/star";
import shopCart from "../shopcart/shopcart";
export default {
  data() {
    return {
      favorite: false,
      selectFoods: [],
      supports: [],
      startX: 0,
      diffX: 0,
      scroll: 0
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
  components: { star, shopCart },
  computed: {
    width() {
      return 120 * this.seller.pics.length + 6 * (this.seller.pics.length - 1);
    },
    W() {
      return document.querySelector(".pics .container").offsetWidth;
    }
  },
  mounted() {
    this.supports = ["decrease", "discount", "special", "invoice", "guarantee"];
    this.$root.eventHub.$on("onSellerSelectFood", val => {
      this.selectFoods = val;
    });
  },
  methods: {
    onscroll(e) {
      this.scroll = e.target.scrollTop;
    },
    activated() {
      let scrollEle = document.querySelector(".seller-wrap");

      if (this.scroll > 0) {
        scrollEle.scrollTo(0, this.scroll);
        console.log(this.scroll);
      }
    }
  }
};
</script>
<style lang='stylus' scoped>
@import '../../common/stylus/mixin';

.seller-wrap {
    overflow-y: scroll;
    width: 100vw;
    overflow-x: hidden;
    background-color: #f3f5f7;
    height: calc(100% - 48px);
    position: absolute;
    left: 0;
    bottom: 48px;

    .content {
        padding: 18px 18px 0 18px;
        background: #fff;
        border-top: 1px solid rgba(7, 17, 27, 0.1);
        border-bottom: 1px solid rgba(7, 17, 27, 0.1);
        margin-top: 16px;
    }

    .content:first-of-type {
        margin-top: 0;
        border-top: none;
    }

    .content:last-of-type {
        border-bottom: none;
    }

    h1 {
        font-size: 14px;
        line-height: 14px;
        color: rgb(7, 17, 27);
    }

    .header {
        .top {
            border-1px(rgba(7, 17, 27, 0.1));
            padding-bottom: 18px;

            h1 {
                margin-bottom: 8px;
            }

            .star {
                margin-right: 8px;
            }

            span {
                font-size: 10px;
                line-height: 18px;
                color: rgb(77, 85, 93);
                margin-right: 12px;
            }

            .right {
                width: 50px;
                text-align: center;

                i {
                    font-size: 24px;
                    color: #3a2a2a;
                    line-height: 24px;
                    margin-bottom: 4px;

                    &.favorite {
                        color: rgb(240, 20, 20);
                    }
                }

                p {
                    font-size: 10px;
                    line-height: 10px;
                    color: rgb(77, 85, 93);

                    span {
                        margin: 0;
                    }
                }
            }
        }

        .bottom {
            padding: 18px 0;

            li {
                flex: 1;
                align-items: center;
                justify-content: center;

                &>span {
                    color: rgb(147, 153, 159);
                    font-size: 10px;
                    line-height: 10px;
                }

                span + span {
                    margin-top: 4px;
                    font-size: 24px;
                    line-height: 24px;
                    color: rgb(7, 17, 27);

                    span {
                        font-size: 10px;
                        line-height: 10px;
                    }
                }
            }

            li + li {
                border-left-1px(rgba(7, 17, 27, 0.1));
            }
        }
    }

    .bulletin {
        p {
            padding: 8px 12px 16px 12px;
            border-1px(rgba(7, 17, 27, 0.1));
            font-weight: 12px;
            line-height: 24px;
            color: rgb(240, 20, 20);
        }

        li + li {
            border-top-1px(rgba(7, 17, 27, 0.1));
        }

        li {
            padding: 16px 12px;
            line-height: 16px;

            .icon {
                width: 16px;
                height: 16px;
                margin-right: 6px;
                background-size: cover;

                &.decrease {
                    bg-image('decrease_3');
                }

                &.discount {
                    bg-image('discount_3');
                }

                &.special {
                    bg-image('special_3');
                }

                &.invoice {
                    bg-image('invoice_3');
                }

                &.guarantee {
                    bg-image('guarantee_3');
                }
            }

            .desc {
                font-size: 12px;
                color: rgb(7, 17, 27);
            }
        }
    }

    .container {
        width: 100%;
        overflow: scroll;
    }

    .pics {
        padding-bottom: 18px;

        ul {
            overflow: hidden;
            margin-top: 12px;

            li {
                float: left;

                img {
                    width: 120px;
                    height: 90px;
                }
            }

            li + li {
                margin-left: 6px;
            }
        }
    }

    .info {
        h1 {
            margin-bottom: 12px;
        }

        p {
            padding: 16px 12px;
            font-size: 12px;
            line-height: 16px;
            color: rgb(7, 17, 27);
            border-top-1px(rgba(7, 17, 27, 0.1));
        }
    }
}
</style>
