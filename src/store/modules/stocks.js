import stocks from '../../data/stocks';
const state = {
    stocks: []
};

const mutations = {
    'SET_STOCKS'(state, stocks) {
        state.stocks = stocks;
    },
    'RND_STOCKS'(state) {
        const min = -(Math.random() * 20 + 1);
        const max = Math.random() * 20 + 1;
        state.stocks.forEach(stock => {
            stock.price = stock.price + ((Math.random() * (max - min + 1)) + min);
            // stock.price = stock.price * (1 + Math.random() - 0.5);
        });
    }
};

const actions = {
    buyStock: ({ commit }, order) => {
        //BUY_STOCK is in mutations in modules/portfolio
        commit('BUY_STOCK', order);
    },
    initStocks: ({ commit }) => {
        commit('SET_STOCKS', stocks);
    },
    randomizeStocks: ({ commit }) => {
        commit('RND_STOCKS')
    }
};

const getters = {
    stocks: state => {
        return state.stocks;
    }
};

export default {
    state,
    mutations,
    actions,
    getters
}