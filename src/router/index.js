import Vue from 'vue';
import Router from 'vue-router';
import goods from '@/components/goods/goods';
import rating from '@/components/Rating/rating';
import seller from '@/components/seller/seller';
import foodDetail from '@/components/foodDetail/foodDetail';

Vue.use(Router);

export default new Router({
    mode: 'history',
    routes: [{
            path: '/',
            redirect: '/goods'
        },
        {
            path: '/goods',
            component: goods,
            name: 'goods',
            children: [{
                path: '/goods/:userId',
                component: foodDetail,
                name: 'foodDetail'
            }]
        },
        {
            path: '/rating',
            component: rating,
            name: 'rating'
        },
        {
            path: '/seller',
            component: seller,
            name: 'seller'
        }
    ]
});
