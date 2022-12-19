import axios from 'axios';
// import Vue from 'vue';

const state = {
    stocks: [],
    currId: null,
    id: localStorage.getItem('userId')
};

const mutations = {
    //this method gets state and order
    'BUY_STOCK'(state, { stockId, stockName, quantity, stockPrice }) {
        state.currId = localStorage.getItem('firebase-id');
        axios.get(`users/${state.currId}.json`)
            .then(res => {
                console.log(res.data);
                return res.data;
            })
            .then(data => {
                axios.put(`users/${state.currId}.json`,
                    {
                        ...data,
                        stocks: data.stocks ? [...data.stocks, { stockId, stockName, quantity, stockPrice }] : [{ stockId, stockName, quantity, stockPrice }],
                        balance: data.balance -= quantity * stockPrice
                    })
            })
            .catch(err => {
                console.log(err);
            })
    },
    'SELL_STOCK'(state, { stockId, quantity, stockPrice }) {
        const record = state.stocks.find(el => el.id == stockId);
        if (record.quantity > quantity) {
            record.quantity -= quantity;
        } else {
            state.stocks.splice(state.stocks.indexOf(record), 1);
        }
        state.funds += stockPrice * quantity;
    },
    // 'SET_PORTFOLIO'(state, portfolio) {

    //     state.stocks = stockPortfolio;
    // }
};

const actions = {
    sellStock({ commit }, order) {
        commit('SELL_STOCK', order);
    },
};

const getters = {
    stockPortfolio() {
        state.currId = localStorage.getItem('firebase-id');
        axios.get(`users/${state.currId}.json`)
            .then(res => {
                return res.data;
            })
            .then(data => {
                console.log(data);
                console.log(data.stocks, 'stocks');
                return data.stocks;
            })
            .then(stocks => {
                stocks.map(stock => {
                    state.stocks.push({
                        id: stock.id,
                        quantity: stock.quantity,
                        name: stock.name,
                        price: (+stock.price).toFixed(2)
                    })
                })
                return state.stocks;
            })
            .catch(err => {
                console.log(err);
            })
        // .then(stocks => {
        //     return stocks;
        // .map(stock => {
        //     return {
        //         id: stock.id,
        //         quantity: stock.quantity,
        //         name: stock.name,
        //         price: (+stock.price).toFixed(2)
        //     }
        // })
        // })
        // return state.stocks.map(stock => {
        //     const record = getters.stocks.find(el => el.id == stock.id);
        //     return {
        //         id: stock.id,
        //         quantity: stock.quantity,
        //         name: record.name,
        //         price: record.price.toFixed(2)
        //     }
        // });
    },
    // funds(state) {
    //     return state.funds;
    // },
    firebaseUserId(state) {
        return state.currId;
    }
}

export default {
    state,
    mutations,
    actions,
    getters
}