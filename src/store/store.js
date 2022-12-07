import Vue from 'vue';
import Vuex from 'vuex';

import stocks from './modules/stocks';
import portfolio from './modules/portfolio';

Vue.use(Vuex);

//with this we can use actions from stocks and portfolio in our project 
export default new Vuex.Store({
    modules: {
        stocks,
        portfolio
    }
});