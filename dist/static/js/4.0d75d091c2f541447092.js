webpackJsonp([4],{O8HK:function(t,e,s){s("eeuJ");var n=s("C/hV")(s("f5fg"),s("xDEb"),"data-v-1f0b0688",null);t.exports=n.exports},eeuJ:function(t,e){},f5fg:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=s("NVrd"),a=s.n(n),r=s("b2g5"),i=s.n(r),o=s("xSw9"),l=s.n(o);e.default={data:function(){return{ratingType:2,hasContent:!1,ratings:{},ratingsPage:!0,selectFoods:[]}},props:{seller:{type:Object,default:function(){return{}}}},components:{star:a.a,ratingSelect:i.a,shopCart:l.a},created:function(){var t=this;this.$http.get("api/ratings").then(function(e){0===e.data.errno&&(t.ratings=e.data.data)},function(t){return console.log(t)})},mounted:function(){var t=this;this.$root.eventHub.$on("onRatingSelectFood",function(e){t.selectFoods=e,console.log("rating",t.selectFoods,"on")})},methods:{resetType:function(t){this.ratingType=t},resetHasContent:function(t){this.hasContent=t}}}},xDEb:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"evaluation-wrap"},[s("div",{staticClass:"content flex"},[s("div",{staticClass:"left"},[s("h1",[t._v(t._s(t.seller.score))]),t._v(" "),s("h2",[t._v("综合评价")]),t._v(" "),s("h3",[t._v("高于周边商家"+t._s(t.seller.rankRate)+"%")])]),t._v(" "),s("div",{staticClass:"right"},[s("ul",[s("li",{staticClass:"flex"},[s("h2",[t._v("服务态度")]),t._v(" "),s("star",{attrs:{size:36,score:t.seller.serviceScore}}),t._v(" "),s("h2",{staticClass:"num"},[t._v(t._s(t.seller.serviceScore))])],1),t._v(" "),s("li",{staticClass:"flex"},[s("h2",[t._v("商品评分")]),t._v(" "),s("star",{attrs:{size:36,score:t.seller.foodScore}}),t._v(" "),s("h2",{staticClass:"num"},[t._v(t._s(t.seller.foodScore))])],1),t._v(" "),s("li",{staticClass:"flex"},[s("h2",[t._v("送达时间")]),t._v(" "),s("span",{staticClass:"time"},[t._v(t._s(t.seller.deliveryTime)+"分钟")])])])])]),t._v(" "),s("div",{staticClass:"content"},[s("rating-select",{attrs:{ratings:t.ratings,ratingType:t.ratingType,hasContent:t.hasContent,ratingsPage:t.ratingsPage},on:{resetHasContent:t.resetHasContent,resetType:t.resetType}})],1),t._v(" "),s("shop-cart",{attrs:{minPrice:t.seller.minPrice,deliveryPrice:t.seller.deliveryPrice}})],1)},staticRenderFns:[]}}});
//# sourceMappingURL=4.0d75d091c2f541447092.js.map