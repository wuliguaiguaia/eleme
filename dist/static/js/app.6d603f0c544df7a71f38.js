webpackJsonp([5],{0:function(t,e){},"34KM":function(t,e){},AVKf:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{attrs:{id:"app"}},[s("v-header",{attrs:{seller:t.seller}}),t._v(" "),s("ul",{staticClass:"tab border-1px"},[s("router-link",{class:{active:"goods"==t.$route.name},attrs:{tag:"li",to:{name:"goods"}}},[t._v("商品")]),t._v(" "),s("router-link",{class:{active:"rating"==t.$route.name},attrs:{tag:"li",to:{name:"rating"}}},[t._v("评价")]),t._v(" "),s("router-link",{class:{active:"seller"==t.$route.name},attrs:{tag:"li",to:{name:"seller"}}},[t._v("商家")])],1),t._v(" "),s("div",{staticClass:"content-wrap"},[s("keep-alive",[s("router-view",{attrs:{seller:t.seller}})],1)],1)],1)},staticRenderFns:[]}},EWzk:function(t,e){},Evi9:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("header",[s("div",{staticClass:"header"},[s("div",{staticClass:"avatar"},[s("img",{attrs:{src:t.seller.avatar,alt:""}})]),t._v(" "),s("div",{staticClass:"content"},[s("div",{staticClass:"name"},[s("span",{staticClass:"icon"}),s("span",[t._v(t._s(t.seller.name))])]),t._v(" "),s("div",{staticClass:"description"},[t._v(t._s(t.seller.description)+"/"+t._s(t.seller.deliveryTime)+"分钟到达")]),t._v(" "),t.seller.supports?s("div",{staticClass:"support"},[s("span",{class:["icon",t.supports[t.seller.supports[0].type]]}),s("span",[t._v(t._s(t.seller.supports[0].description))])]):t._e()]),t._v(" "),t.seller.supports?s("div",{staticClass:"supports",on:{click:t.showBulletin}},[s("span",{staticClass:"len"},[t._v(t._s(t.seller.supports.length)+"个")]),t._v(" "),s("span",{staticClass:"icon-keyboard_arrow_right"})]):t._e()]),t._v(" "),s("div",{staticClass:"bulletin jusCenter-alignCenter"},[s("span",{staticClass:"icon"}),s("span",{staticClass:"content"},[t._v(t._s(t.seller.bulletin))]),s("span",{staticClass:"icon-keyboard_arrow_right"})]),t._v(" "),s("div",{staticClass:"header-bg"},[s("img",{attrs:{src:t.seller.avatar,alt:""}})]),t._v(" "),s("transition",{attrs:{name:"fade"}},[s("div",{directives:[{name:"show",rawName:"v-show",value:t.isShowBulletin,expression:"isShowBulletin"}],staticClass:"bulletin-wrap"},[s("div",{staticClass:"wrapper"},[s("div",{staticClass:"container"},[s("h1",[t._v(t._s(t.seller.name))]),t._v(" "),s("div",{staticClass:"star jus-center"},[s("v-star",{attrs:{size:t.size,score:t.seller.score}})],1),t._v(" "),s("h2",[s("span",{staticClass:"before border-1px  "}),t._v("优惠信息"),s("span",{staticClass:"after border-1px"})]),t._v(" "),s("ul",{staticClass:"clear-fix"},t._l(t.seller.supports,function(e,n){return s("li",{key:n},[s("span",{class:["icon",t.supports[e.type]]}),t._v(" "),s("span",[t._v(t._s(e.description))])])})),t._v(" "),s("h2",[s("span",{staticClass:"before border-1px"}),t._v(" 商家公告"),s("span",{staticClass:"after border-1px"})]),t._v(" "),s("p",[t._v(t._s(t.seller.bulletin))])])]),t._v(" "),s("div",{staticClass:"close"},[s("span",{staticClass:"icon icon-close",on:{click:t.closeBulletin}})])])])],1)},staticRenderFns:[]}},F4qB:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});e.default={data:function(){return{}},props:{size:{type:Number},score:{type:Number}},components:{},computed:{starType:function(){return"star-"+this.size},itemClasses:function(){for(var t=[],e=Math.floor(2*this.score)/2,s=e%1==0,n=Math.floor(e),o=0;o<n;o++)t.push("on");if(s||t.push("half"),t.length<5)for(var a=5-t.length,r=0;r<a;r++)t.push("off");return t}},mounted:function(){},methods:{}}},HrcD:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=s("hxP8"),o=s.n(n);e.default={name:"App",data:function(){return{seller:null,nowIndex:0}},components:{vHeader:o.a},methods:{},created:function(){var t=this;this.$http.get("/static/data.json").then(function(e,s){t.seller=e.body.seller})}}},M93x:function(t,e,s){s("xq4r");var n=s("C/hV")(s("HrcD"),s("AVKf"),null,null);t.exports=n.exports},NHnr:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=s("7+uW"),o=s("M93x"),a=s.n(o),r=s("/ocq");n.a.use(r.a);var i=new r.a({mode:"history",routes:[{path:"/",redirect:"/goods"},{path:"/goods",component:function(t){return Promise.all([s.e(0),s.e(1)]).then(function(){return t(s("PXOj"))}.bind(null,s)).catch(s.oe)},name:"goods",children:[{path:"/goods/:userId",component:function(t){return Promise.all([s.e(0),s.e(3)]).then(function(){return t(s("L2Os"))}.bind(null,s)).catch(s.oe)},name:"foodDetail"}]},{path:"/rating",component:function(t){return Promise.all([s.e(0),s.e(4)]).then(function(){return t(s("O8HK"))}.bind(null,s)).catch(s.oe)},name:"rating"},{path:"/seller",component:function(t){return Promise.all([s.e(0),s.e(2)]).then(function(){return t(s("N0EE"))}.bind(null,s)).catch(s.oe)},name:"seller"}]}),l=s("OolZ"),c=(s("34KM"),s("mvHQ")),u=s.n(c),d=s("9rMa");function p(t){return{save:function(e){window.localStorage.setItem(t,u()(e))},fetch:function(){return JSON.parse(window.localStorage.getItem(t))||[]}}}n.a.use(d.a);var v=new d.a.Store({state:{goodList:p("goods").fetch()},getters:{totalPrice:function(t){var e=0;return t.goodList.forEach(function(t,s){e+=t.price*t.count}),e},totalCount:function(t){var e=0;return t.goodList.forEach(function(t){e+=t.count}),e}},mutations:{addGoods:function(t,e){t.goodList.push(e),p("goods").save(t.goodList)},deleteGoods:function(t,e){var s=t.goodList.findIndex(function(t){return t.id===e});t.goodList.splice(s,1),p("goods").save(t.goodList)},updateGoods:function(t,e){var s=t.goodList.findIndex(function(t){return t.id===e.id});t.goodList[s].count=e.count,p("goods").save(t.goodList),console.log(t.goodList)},clearGoods:function(t){t.goodList=[],p("goods").save(t.goodList)}}});n.a.use(l.a),n.a.config.productionTip=!1,new n.a({el:"#app",router:i,store:v,components:{App:a.a},template:"<App/>",data:{eventHub:new n.a}})},NVrd:function(t,e,s){s("EWzk");var n=s("C/hV")(s("F4qB"),s("gUoT"),"data-v-0cdcecc8",null);t.exports=n.exports},gUoT:function(t,e){t.exports={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"star",class:this.starType},this._l(this.itemClasses,function(t,s){return e("span",{key:s,staticClass:"star-item",class:t})}))},staticRenderFns:[]}},hxP8:function(t,e,s){s("kUKp");var n=s("C/hV")(s("xqdO"),s("Evi9"),"data-v-6a91d8a8",null);t.exports=n.exports},kUKp:function(t,e){},xq4r:function(t,e){},xqdO:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=s("NVrd"),o=s.n(n);e.default={data:function(){return{supports:[],size:48,isShowBulletin:!1}},props:{seller:{type:Object,default:function(){return{}}}},created:function(){this.supports=["decrease","discount","special","invoice","guarantee"]},components:{VStar:o.a},computed:{},mounted:function(){},methods:{closeBulletin:function(){this.isShowBulletin=!1},showBulletin:function(){this.isShowBulletin=!0}}}}},["NHnr"]);
//# sourceMappingURL=app.6d603f0c544df7a71f38.js.map