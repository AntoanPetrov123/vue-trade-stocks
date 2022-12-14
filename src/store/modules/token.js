import globalAxios from 'axios';

import axios from '../../axios-auth';
import router from '../../main';

const state = {
    idToken: null,
    userId: null,
    user: null
};

const mutations = {
    authUser(state, userData) {
        state.idToken = userData.token;
        state.userId = userData.userId;
    },
    storeUser(state, user) {
        state.user = user;
    },
    clearAuthData(state) {
        state.idToken = null;
        state.userId = null;
    }
};

const actions = {
    setLogoutTimer({ commit }, expirationTimeout) {
        setTimeout(() => {
            commit('clearAuthData');
        }, expirationTimeout * 1000)
    },
    register({ commit, dispatch }, authData) {
        axios.post('/accounts:signUp?key=AIzaSyAH0vb33JuiSPXzBTlDk0zZubWa31KgCes',
            {
                email: authData.email,
                password: authData.password,
                returnSecureToken: true
            })
            .then(res => {
                console.log(res);
                commit('authUser', {
                    token: res.data.idToken,
                    userId: res.data.localId
                });

                //set auto login 
                const now = new Date();
                const expirationDate = new Date(now.getTime() + (res.data.expiresIn * 1000));
                localStorage.setItem('token', res.data.idToken);
                localStorage.setItem('userId', res.data.localId);
                localStorage.setItem('expirationDate', expirationDate);

                dispatch('storeUser', authData);
                //auto logout after some time
                dispatch('setLogoutTimer', res.data.expiresIn);
                router.replace('/portfolio');
            })
            .catch(err => console.log(err));
    },
    login({ commit, dispatch }, authData) {
        axios.post('/accounts:signInWithPassword?key=AIzaSyAH0vb33JuiSPXzBTlDk0zZubWa31KgCes',
            {
                email: authData.email,
                password: authData.password,
                returnSecureToken: true
            })
            .then(res => {
                console.log(res);
                commit('authUser', {
                    token: res.data.idToken,
                    userId: res.data.localId
                });
                //set auto login 
                const now = new Date();
                const expirationDate = new Date(now.getTime() + (res.data.expiresIn * 1000));
                localStorage.setItem('token', res.data.idToken);
                localStorage.setItem('userId', res.data.localId);
                localStorage.setItem('expirationDate', expirationDate);

                router.replace('/portfolio');
                //auto logout after some time
                dispatch('setLogoutTimer', res.data.expiresIn);
            })
            .catch(err => console.log(err));
    },
    autoLogin({ commit }) {
        const token = localStorage.getItem('token');
        if (!token) {
            return;
        }
        const expirationDate = localStorage.getItem('expirationDate');
        const now = new Date();
        if (now >= expirationDate) {
            return;
        }
        const userId = localStorage.getItem('userId');
        commit('authUser', { token, userId })
    },
    logout({ commit, state }) {
        console.log(router);
        commit('clearAuthData');
        localStorage.removeItem('expirationDate');
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        localStorage.removeItem('firebase-id');
        router.replace('/login');
    },
    storeUser({ commit, state }, userData) {
        if (!state.idToken) {
            return;
        }
        globalAxios.post('/users.json' + '?auth=' + state.idToken, userData)
            .then(res => {
                console.log(res);
            })
            .catch(err => {
                console.log(err);
            });
    },
    fetchUser({ commit, state }) {
        if (!state.idToken) {
            return;
        }
        globalAxios.get('/users.json' + '?auth=' + state.idToken)
            .then(res => {
                console.log(res);
                const data = res.data;
                const users = [];
                for (let key in data) {
                    const user = data[key];
                    user.id = key;
                    users.push(user);
                    console.log(user.username);
                    this.username = user.username;
                }
                localStorage.setItem('firebase-id', users[0].id);

                console.log(users[0], 'user');
                commit('storeUser', users[0])
            })
            .catch(err => {
                console.log(err);
            })
    }
};

const getters = {
    user(state) {
        return state.user;
    },
    isAuth(state) {
        return state.idToken !== null;
    }
};

export default {
    state,
    mutations,
    actions,
    getters
}