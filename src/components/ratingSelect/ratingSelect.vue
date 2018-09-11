<!--  -->
<template>
    <div class='rating-wrap' :class="{'ratings-page':ratingsPage}">
        <div class="rating-type">
            <button class="all" :class="{active:type==2}" @click="type = 2">全部<span class="num">{{ratings.length}}</span></button>
            <button class="recommend" :class="{active:type==0}" @click="type = 0">推荐<span class="num">{{positive}}</span></button>
            <button class="teasing"   :class="{active:type==1}" @click="type = 1">吐槽<span class="num">{{ratings.length - positive}}</span></button>
        </div>
        <div class="m-v-12">
            <span class="icon icon-check_circle" :class="{'text-green':notAll}" @click="notAll = !notAll"></span>只看有内容的评价
            </div>
        <div class="line"></div>
        <ul class="list">
            <li v-for="(item,key) in ratingsFilter" :key="key">
                <div class="between">
                    <span class="time">{{item.rateTime | switchTime}}</span>
                    <span class="user-info">
                        <span class="name">{{item.username}}</span>
                        <img :src="item.avatar">
                        <div class="addBox flex" v-if="ratingsPage">
                            <star :score="item.score" :size=36></star>
                            <span v-if="item.deliveryTime">{{item.deliveryTime}}分钟送达</span>
                        </div>
                    </span>
                </div>
                <div class="info flex-col">
                    <div>
                        <span class="icon" :class="{'icon-thumb_up':item.like,'icon-thumb_down':!item.like}" @click="toggle(item)"></span>
                        <div class="recommend" v-if="ratingsPage">
                            <div v-if="item.recommend.length>0">
                                <span v-for="(rec,index) in item.recommend" :key="index">{{rec}}</span>
                            </div>
                        </div>
                    </div>
                    <span class="text-black order">{{item.text}}</span>
                </div>
            </li>
        </ul>
        <div class="text-center mt-20" v-show="showEmpty">暂无评价</div>
  </div>
</template>

<script>
import { formatDate } from "@/common/js/date";
import star from "../star/star";
export default {
  data() {
    return {
      notAll: this.hasContent,
      type: this.ratingType,
      showEmpty: false
    };
  },
  props: {
    ratings: {
      type: Array,
      default() {
        return [];
      }
    },
    ratingType: {
      type: Number,
      default: 2
    },
    hasContent: {
      type: Boolean,
      default: false
    },
    ratingsPage: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    ratingType(val) {
      this.type = val;
    },
    hasContent(val) {
      this.notAll = val;
    },
    type(val) {
      this.$emit("resetType", val);
    },
    notAll(val) {
      this.$emit("resetHasContent", val);
    },
    ratingsFilter(val) {
      if (val.length === 0) {
        this.showEmpty = true;
      } else {
        this.showEmpty = false;
      }
      console.log(this.showEmpty);
    }
  },
  filters: {
    switchTime(time) {
      return formatDate(new Date(time), "YYYY-MM-DD hh : mm : ss");
    }
  },
  components: { star },
  computed: {
    ratingsFilter() {
      let arr = [];
      arr = this.ratings.filter(rating => {
        if (this.type === 0) {
          return rating.rateType === 0;
        } else if (this.type === 1) {
          return rating.rateType === 1;
        } else {
          return 1;
        }
      });
      if (this.notAll) {
        arr = arr.filter(rating => {
          return rating.text !== "";
        });
      }
      return arr;
    },
    positive() {
      let count = 0;
      for (let i = 0; i < this.ratings.length; i++) {
        if (this.ratings[i].rateType === 0) {
          count++;
        }
      }
      return count;
    }
  },
  mounted() {},
  methods: {
    toggle(item) {
      this.$set(item, "like", !item.like);
    }
  }
};
</script>
<style lang='stylus' scoped>
@import '../../common/stylus/mixin';

.rating-wrap {
    padding: 18px;
    color: #93999f;

    .icon {
        margin-right: 4px;
        line-height: 24px;
        font-size: 12px;
        display: inline;
    }

    .icon-check_circle {
        font-size: 24px;
    }

    .icon-thumb_up {
        color: rgb(0, 160, 220);
    }

    .line {
        margin: 0 -18px;
        height: 1px;
        background: rgba(7, 17, 27, 0.1);
    }

    .rating-type {
        padding-bottom: 18px;
        border-1px(rgba(7, 17, 27, 0.1));

        button {
            padding: 8px 12px;
            text-align: center;
            margin-right: 8px;
            font-size: 12px;
            border-radius: 2px;
            color: rgb(77, 85, 93);

            &.active {
                color: #fff;
            }

            .num {
                font-size: 8px;
            }

            &:first-child {
                background-color: rgba(0, 160, 220, 0.2);

                &.active {
                    background-color: rgb(0, 160, 220);
                }
            }

            &:nth-child(2) {
                background-color: rgba(0, 160, 220, 0.2);

                &.active {
                    background-color: rgb(0, 160, 220);
                }
            }

            &:last-child {
                background-color: rgba(77, 85, 93, 0.2);

                &.active {
                    background-color: rgb(70, 83, 95);
                }
            }
        }
    }

    .list {
        .between {
            display: flex;
            justify-content: space-between;
        }

        li {
            border-1px(rgba(7, 17, 27, 0.1));
            padding: 16px 0;

            img {
                width: 12px;
                height: 12px;
                margin-left: 6px;
                border-radius: 50%;
            }
        }

        li:last-child {
            border-none();
        }
    }

    /* page */
    &.ratings-page {
        .list li {
            padding: 18px 0;

            img {
                margin-left: 0;
                margin-right: 12px;
                width: 28px;
                height: 28px;
            }

            .info {
                margin-left: 40px;
                margin-top: 6px;
                position: relative;

                .order {
                    order: -1;
                    margin-bottom: 8px;
                }

                .icon {
                    line-height: 16px;
                }

                .recommend {
                    display: inline-block;

                    span {
                        font-size: 9px;
                        line-height: 16px;
                        border: 1px solid rgba(7, 17, 27, 0.1);
                        padding: 0 6px;
                        margin-right: 8px;
                    }
                }
            }
        }

        .between {
            .time {
                order: 1;
            }

            .user-info {
                display: flex;
                position: relative;

                .name {
                    order: 1;
                    font-size: 10px;
                    line-height: 12px;
                    color: rgb(7, 17, 27);
                }

                .addBox {
                    position: absolute;
                    left: 40px;
                    top: 16px;
                    width: 80vw;
                    align-items: center;

                    .star {
                        margin-right: 5px;
                    }
                }
            }
        }
    }
}
</style>
