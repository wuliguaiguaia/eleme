import Vue from 'vue';
import Vuex from "vuex";
Vue.use(Vuex);

function STORAGE(name) {
    return {
        save(obj) {
            window.localStorage.setItem(name, JSON.stringify(obj));
        },
        fetch() {
            return JSON.parse(window.localStorage.getItem(name)) || [];
        }
    };
}

export const store = new Vuex.Store({
    state: {
        goodList: STORAGE("goods").fetch()
    },
    getters: {
        totalPrice(state) {
            let total = 0;
            state.goodList.forEach((item, index) => {
                total += item.price * item.count;
            });
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
            STORAGE("goods").save(state.goodList);
        },
        deleteGoods(state, id) {
            let index = state.goodList.findIndex((item) => {
                return item.id === id;
            });
            state.goodList.splice(index, 1);
            STORAGE("goods").save(state.goodList);
        },
        updateGoods(state, data) {
            let index = state.goodList.findIndex((item) => {
                return item.id === data.id;
            });
            state.goodList[index]['count'] = data.count;
            STORAGE("goods").save(state.goodList);
            console.log(state.goodList);
        },
        clearGoods(state) {
            state.goodList = [];
            STORAGE("goods").save(state.goodList);
        }
    }
});
