 <!--  -->
 <template>
   <header>
       <div class="header">
        <div class="avatar"><img :src="seller.avatar"  alt=""></div>
        <div class="content">
            <div class="name">
                <span class="icon"></span><span>{{seller.name}}</span>
            </div>
            <div class="description">{{seller.description}}/{{seller.deliveryTime}}分钟到达</div>
            <div v-if="seller.supports" class="support">
                <span  :class="['icon',supports[seller.supports[0].type]]"></span><span>{{seller.supports[0].description}}</span>
            </div>
        </div>
            <div v-if="seller.supports" class="supports" @click="showBulletin">
                <span class="len">{{seller.supports.length}}个</span>
                <span class="icon-keyboard_arrow_right"></span>
            </div>
       </div>
       <div class="bulletin jusCenter-alignCenter">
           <span class="icon"></span><span class="content">{{seller.bulletin}}</span><span class="icon-keyboard_arrow_right"></span>
       </div>
       <div class="header-bg"><img :src="seller.avatar" alt=""></div>
       <transition name="fade">
            <div class="bulletin-wrap" v-show="isShowBulletin">
                <div class="wrapper">
                    <div class="container">
                        <h1>{{seller.name}}</h1>
                        <div class="star jus-center">
                            <v-star :size="size" :score="seller.score"></v-star>
                        </div>
                        <h2><span class="before border-1px  "></span>优惠信息<span class="after border-1px"></span></h2>
                        <ul class="clear-fix">
                            <li v-for="(item,index) in seller.supports" :key="index">
                                <span :class="['icon',supports[item.type]]"></span>
                                <span>{{item.description}}</span>
                            </li>
                        </ul>
                        <h2><span class="before border-1px"></span> 商家公告<span class="after border-1px"></span></h2>
                        <p>{{seller.bulletin}}</p>
                    </div>
                </div>
                <div class="close"><span class="icon icon-close" @click="closeBulletin"></span></div>
            </div>
       </transition>
   </header>
 </template>
<script>
import VStar from "./../star/star";
// /* eslint-disable */
export default {
  data() {
    return {
      supports: [],
      size: 48,
      isShowBulletin: false
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
  },
  components: {
    VStar
  },
  computed: {},
  mounted() {},
  methods: {
    closeBulletin() {
      this.isShowBulletin = false;
    },
    showBulletin() {
      this.isShowBulletin = true;
    }
  }
};
</script>

<style lang='stylus' scoped>
@import '../../common/stylus/mixin';

header {
    position: relative;
    color: #fff;
}

.header {
    padding: 24px 0 18px 24px;

    &>div {
        display: inline-block;
    }

    .icon {
        vertical-align: sub;
        display: inline-block;
    }

    .avatar {
        width: 64px;
        height: 64px;
        margin-right: 16px;
        vertical-align: top;

        img {
            width: 100%;
            height: 100%;
        }
    }

    .name {
        font-size: 16px;
        font-weight: bold;
        line-height: 18px;

        .icon {
            width: 30px;
            height: 18px;
            bg-image('brand');
            background-size: 30px 18px;
            margin-right: 6px;
        }
    }

    .description {
        font-size: 12px;
        line-height: 12px;
        margin-top: 8px;
    }

    .support {
        font-size: 10px;
        line-height: 12px;
        font-weight: 200;
        margin-top: 10px;

        &>.icon {
            width: 12px;
            height: 12px;
            background-size: 12px 12px;
            background-repeat: no-repeate;
            margin-right: 4px;
        }
    }

    .supports {
        display: inline-block;
        font-size: 10px;
        line-height: 12px;
        background-color: rgba(0, 0, 0, 0.2);
        padding: 0 8px;
        border-radius: 14px;
        position: absolute;
        right: 12px;
        bottom: 46px;
        line-height: 24px;

        .len {
            margin-right: 4px;
        }
    }

    .icon-keyboard_arrow_right {
        vertical-align: middle;
    }
}

.decrease {
    bg-image('decrease_1');
}

.discount {
    bg-image('discount_1');
}

.special {
    bg-image('special_1');
}

.invoice {
    bg-image('invoice_1');
}

.guarantee {
    bg-image('guarantee_1');
}

.bulletin {
    color: #fff;
    width: 100vw;
    height: 28px;
    line-height: 28px;
    background-color: rgba(7, 17, 27, 0.2);
    overflow: hidden;
    font-size: 10px;

    .icon {
        flex-basis: 22px;
        width: 22px;
        height: 12px;
        background-size: 22px 12px;
        bg-image('bulletin');
        margin: 0 4px 0 12px;
        vertical-align: bottom;
    }

    .content {
        flex: 1;
        height: 28px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    span:last-of-type {
        flex-basis: 12px;
        margin: 0 12px 0 4px;
    }
}

.header-bg {
    position: absolute;
    top: 0;
    right: 0;
    z-index: -1;
    background-color: rgba(7, 17, 27, 0.5);
    filter: blur(10px);
    width: 100vw;
    height: 100%;

    img {
        width: 100%;
        height: 100%;
    }
}

.bulletin-wrap {
    overflow: auto;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 100;
    height: 100vh;
    background: rgba(7, 17, 27, 0.8);
    backdrop-filter: blur(10px);

    &.fade-enter-active, &.fade-leave-active {
        transition: all ease 0.5s;
    }

    &.fade-enter-to {
        opacity: 1;
        background: rgba(7, 17, 27, 0.8);
    }

    &.fade-enter, &.fade-leave-to {
        opacity: 0;
        background: rgba(7, 17, 27, 0);
    }

    .wrapper {
        min-height: 100%;
    }

    .container {
        padding: 0 36px;
        padding-bottom: 64px;

        h1 {
            text-align: center;
            padding: 64px 0 16px 0;
            font-size: 16px;
            line-height: 16px;
            font-weight: 700;
        }

        h2 {
            text-align: center;
            margin: 29px 0 24px 0;
            font-size: 14px;
            font-weight: 700;
            display: flex;
            align-items: center;
            height: 14px;
        }

        h2 .before, h2 .after {
            vertical-align: middle;
            display: inline-block;
            // width 112px;
            flex: 1;
            // height 1px;
            // background-color rgba(255,255,255,0.2);
            margin-right: 12px;
            border-1px(rgba(255, 255, 255, 0.2));
        }

        h2 .after {
            margin-left: 12px;
            margin-right: 0;
        }

        ul {
            padding-left: 12px;
            line-height: 12px;
            font-size: 12px;

            li~li {
                margin-top: 12px;
            }
        }

        .star {
        }

        .icon {
            width: 16px;
            height: 16px;
            background-size: 16px 16px;
            background-repeat: no-repeate;
            margin-right: 6px;
        }

        p {
            padding-left: 12px;
            font-size: 12px;
            line-height: 24px;
        }
    }

    .close {
        font-size: 32px;
        color: rgba(255, 255, 255, 0.5);
        text-align: center;
        margin: -64px auto auto;

        .icon-close {
            width: 32px;
            height: 32px;
        }
    }
}
</style>
