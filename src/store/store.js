import Vue from 'vue';
import Vuex from 'vuex';

import stocks from './modules/stocks';
import portfolio from './modules/portfolio';
import token from './modules/token';

import * as actions from './actions';

Vue.use(Vuex);

//with this we can use actions from stocks and portfolio in our project 
export default new Vuex.Store({
    actions,
    modules: {
        stocks,
        portfolio,
        token
    }
});