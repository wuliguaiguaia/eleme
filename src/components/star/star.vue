<!--  -->
<template>
  <div class='star' :class="starType">
      <span v-for="(itemClass,index) in itemClasses" :class="itemClass" :key="index" class="star-item"></span>
  </div>
</template>

<script>
let LENGTH = 5;
export default {
  data() {
    return {};
  },
  props: {
    size: {
      type: Number
    },
    score: {
      type: Number
    }
  },
  components: {},
  computed: {
    starType() {
      return "star-" + this.size;
    },
    itemClasses() {
      let result = [];
      let score = Math.floor(this.score * 2) / 2;
      let hasDecimal = score % 1 === 0;
      let trunc = Math.floor(score);
      for (let i = 0; i < trunc; i++) {
        result.push("on");
      }
      if (!hasDecimal) {
        result.push("half");
      }
      if (result.length < LENGTH) {
        let len = LENGTH - result.length;
        for (let j = 0; j < len; j++) {
          result.push("off");
        }
      }
      return result;
    }
  },
  mounted() {},
  methods: {}
};
</script>
<style lang='stylus' scoped>
@import '../../common/stylus/mixin';

.star {
    .star-item ~ .star-item {
        margin-left: 10px;
    }

    &.star-48 {
        .star-item {
            display: inline-block;
            font-size: 0;
            width: 20px;
            height: 20px;
            background-size: 20px 20px;

            &.half {
                bg-image('star48_half');
            }

            &.on {
                bg-image('star48_on');
            }

            &.off {
                bg-image('star48_off');
            }
        }
    }

    &.star-36 {
        .star-item {
            display: inline-block;
            font-size: 0;
            width: 15px;
            height: 15px;
            background-size: 15px 15px;

            &.half {
                bg-image('star36_half');
            }

            &.on {
                bg-image('star36_on');
            }

            &.off {
                bg-image('star36_off');
            }
        }
        .star-item ~ .star-item {
            margin-left: 6px;
        }
    }

    &.star-24 {
        .star-item {
            display: inline-block;
            font-size: 0;
            width: 10px;
            height: 10px;
            background-size: 10px 10px;

            &.half {
                bg-image('star24_half');
            }

            &.on {
                bg-image('star24_on');
            }

            &.off {
                bg-image('star24_off');
            }
        }

        .star-item ~ .star-item {
            margin-left: 3px;
        }
    }
}
</style>
