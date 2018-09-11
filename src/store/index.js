import Vue from 'vue';
import Vuex from "vuex";
Vue.use(Vuex);
export const store = new Vuex.Store({
    state: {
        goodList: []
    },
    getters: {
        totalPrice(state) {
            let total = 0;
            state.goodList.forEach((item, index) => {
                total += item.price * item.count;
            });
            console.log(total);
            return total;
        },
        totalCount(state) {
            let count = 0;
            state.goodList.forEach(food => {
                count += food.count;
            });
            return count;
        }
    },
    mutations: {
        addGoods(state, data) {
            state.goodList.push(data);
        },
        deleteGoods(state, id) {
            let index = state.goodList.findIndex((item) => {
                return item.id === id;
            });
            state.goodList.splice(index, 1);
        },
        updateGoods(state, data) {
            let index = state.goodList.findIndex((item) => {
                return item.id === data.id;
            });
            state.goodList[index]['count'] = data.count;
        },
        clearGoods(state) {
            // console.log(state.goodList);
            // state.goodList.splice(state.goodList.length, 0);
            state.goodList = [];
            console.log('clear', state.goodList.length);
        }
    }
});
