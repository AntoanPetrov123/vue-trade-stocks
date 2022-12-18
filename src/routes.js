import Home from './components/Home.vue';
import Portfolio from './components/portfolio/Portfolio.vue';
import Stocks from './components/stocks/Stocks.vue';
import Register from './components/auth/register.vue';
import Login from './components/auth/login.vue';

import store from './store/store';


export const routes = [
    { path: '/', component: Home },
    {
        path: '/portfolio',
        component: Portfolio,
        beforeEnter(to, from, next) {
            if (store.state.idToken) {
                next();
            } else {
                next('/register');
            }
        }
    },
    { path: '/register', component: Register },
    { path: '/login', component: Login },
    { path: '/stocks', component: Stocks },
]