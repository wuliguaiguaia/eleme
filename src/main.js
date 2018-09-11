// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import VResource from 'vue-resource';
import 'common/stylus/index.styl';
import {
    store
} from "./store/index";

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
