import Vue from 'vue';
import App from './App';
import router from './router';
import VResource from 'vue-resource';
import 'common/stylus/index.styl';
import {
    store
} from "./store/index";
/* eslint-disabled */
// import seller from "./../data.json";
// import ratings from "./../data.json";
// import goods from "./../data.json";
// import {
//     goods,
//     seller,
//     ratings
// } from "./../data.json";

Vue.use(VResource);
Vue.config.productionTip = false;
/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    components: {
        App
    },
    template: '<App/>',
    data: {
        eventHub: new Vue()
    }
});
