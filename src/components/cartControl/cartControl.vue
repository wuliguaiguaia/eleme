<!--  -->
<template>
  <div class='cartControl-wrap  align-center'>
      <transition name="move1">
        <span class="reduce" @click.stop="reduce" v-show="food.count>0">-</span>
      </transition>
      <transition name="move2">
        <span class="num" v-show="food.count>0">{{food.count}}</span>
      </transition>
     <span class="add" @click.stop="add">+</span>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  data() {
    return {};
  },
  props: {
    food: {
      type: Object
    }
  },
  watch: {
    goodLen(val) {
      if (val === 0) {
        this.food.count = 0;
      }
    }
  },
  computed: {
    goodLen() {
      return this.$store.state.goodList.length;
    }
  },
  mounted() {},
  methods: {
    ...mapMutations(["addGoods", "updateGoods", "deleteGoods"]),
    add(e) {
      if (!this.food.count) {
        this.$set(this.food, "count", 1);
        this.addGoods(this.food);
      } else {
        this.food.count++;
        this.updateGoods(this.food);
      }
      console.log("小球出现！", "eventhub emit");
      this.$root.eventHub.$emit("storeTarget", e.target);
    },

    reduce() {
      this.food.count--;
      if (this.food.count === 0) {
        console.log("delete");
        this.deleteGoods(this.food.id);
      } else {
        console.log("update");
        this.updateGoods(this.food);
      }
    }
  }
};
</script>
<style lang='stylus' scoped>
.cartControl-wrap {
    text-align: center;

    .reduce, .add {
        display: inline-block;
        font-size: 24px;
        line-height: 24px;
        border: 2px solid transparent;
        border-radius: 50%;
        width: 24px;
        height: 24px;
        cursor: pointer;
    }

    .add {
        background-color: rgb(0, 160, 220);
        color: #fff;
        z-index: 0;
    }

    .num {
        font-size: 10px;
        color: rgb(147, 153, 159);
        display: inline-block;
        width: 24px;
        opacity: 1;
        transform: translate3D(0, 0, 0) rotate(0);
    }

    .reduce {
        color: rgb(0, 160, 220);
        border-color: lightblue;
        pacity: 1;
        transform: translate3D(0, 0, 0) rotate(0);
    }

    .move1-enter-active, .move1-leave-active, .move2-enter-active, .move2-leave-active {
        transition: all linear 0.4s;
    }

    .move1-enter, .move1-leave-active {
        transform: translate3D(52px, 0, 0) rotate(360deg);
        opacity: 0;
    }

    .move2-enter, .move2-leave-active {
        transform: translate3D(24px, 0, 0) rotate(360deg);
        opacity: 0;
    }
}
</style>
