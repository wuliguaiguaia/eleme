webpackJsonp([3],{HNmW:function(t,s){t.exports={render:function(){var t=this,s=t.$createElement,o=t._self._c||s;return o("transition",{attrs:{name:"slide"}},[o("div",{key:t.food.name,staticClass:"foodDetail-wrap",attrs:{transition:"slide"}},[o("i",{staticClass:"icon-arrow_lift icon",on:{click:t.goback}}),t._v(" "),o("div",{staticClass:"header"},[o("img",{attrs:{src:t.food.image,alt:""}}),t._v(" "),o("div",{staticClass:"content"},[o("h1",[t._v(t._s(t.food.name))]),t._v(" "),o("div",{staticClass:"sale-info"},[o("span",[t._v("月售"+t._s(t.food.sellCount)+"份")]),t._v(" "),o("span",[t._v("好评率"+t._s(t.food.rating)+"%")])]),t._v(" "),o("div",{staticClass:"price-box flex"},[o("div",{},[o("span",{staticClass:"saleicon text-red"},[t._v("￥")]),o("span",{staticClass:"price text-red"},[t._v(t._s(t.food.price))])]),t._v(" "),t.food.oldPrice?o("div",{staticClass:"text-through"},[o("span",{staticClass:"saleicon"},[t._v("￥")]),o("span",{staticClass:"oldPrice"},[t._v(t._s(t.food.oldPrice))])]):t._e()]),t._v(" "),o("div",{staticClass:"cart-control"},[o("cart-control",{directives:[{name:"show",rawName:"v-show",value:t.food.count>0,expression:"food.count>0"}],attrs:{food:t.food}}),t._v(" "),o("div",{directives:[{name:"show",rawName:"v-show",value:0==t.food.count,expression:"food.count==0"}],staticClass:"add",on:{click:t.onShowCart}},[t._v("加入购物车")])],1)])]),t._v(" "),t.food.info?o("div",{staticClass:"content introduce"},[o("h2",[t._v("商品介绍")]),t._v(" "),o("p",[t._v(t._s(t.food.info))])]):t._e(),t._v(" "),o("div",{staticClass:"special"},[o("h2",[t._v("商品评价")]),t._v(" "),o("rating-select",{attrs:{ratings:t.food.ratings,ratingType:t.ratingType,hasContent:t.hasContent},on:{resetHasContent:t.resetHasContent,resetType:t.resetType}})],1)])])},staticRenderFns:[]}},I6lC:function(t,s){},L2Os:function(t,s,o){o("I6lC");var e=o("C/hV")(o("VZtC"),o("HNmW"),"data-v-42652d30",null);t.exports=e.exports},VZtC:function(t,s,o){"use strict";Object.defineProperty(s,"__esModule",{value:!0});var e=o("pvcg"),a=o.n(e),n=o("b2g5"),i=o.n(n);s.default={data:function(){return{showCart:!1,ratingType:2,hasContent:!1}},inject:["getIndex"],props:{food:{type:Object}},created:function(){},components:{cartControl:a.a,ratingSelect:i.a},computed:{},mounted:function(){},methods:{goback:function(){this.ratingType=2,this.hasContent=!1,this.$router.go(-1)},onShowCart:function(t){this.showCart=!0,this.$set(this.food,"count",1),this.$store.commit("addGoods",this.food),this.$root.eventHub.$emit("storeTarget",t.target)},resetType:function(t){this.ratingType=t},resetHasContent:function(t){this.hasContent=t}}}}});
//# sourceMappingURL=3.9f217666520e496fce29.js.map