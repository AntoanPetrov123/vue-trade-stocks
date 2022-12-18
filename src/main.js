import Vue from 'vue'
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
import axios from 'axios';

import App from './App.vue'
import { routes } from './routes';
import store from './store/store';

Vue.use(VueRouter);
Vue.use(VueResource);

Vue.http.options.root = 'https://vue-trade-stocks-default-rtdb.firebaseio.com/';

Vue.filter('currency', value => {
  return '$' + value.toLocaleString();
})

axios.defaults.baseURL = 'https://vue-trade-stocks-default-rtdb.firebaseio.com/'
// axios.defaults.headers.common['Authorization'] = 'something';
axios.defaults.headers.get['Accepts'] = 'application/json';

const reqInterceptor = axios.interceptors.request.use(config => {
  console.log(config);
  return config;
});
// const resInterceptor = axios.interceptors.response.use(res => {
//   console.log(response);
//   return res;
// });

axios.interceptors.request.eject(reqInterceptor);
// axios.interceptors.request.eject(resInterceptor);


const router = new VueRouter({
  mode: 'history',
  routes
});

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})

export default router;
