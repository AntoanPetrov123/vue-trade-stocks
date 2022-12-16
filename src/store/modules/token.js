import globalAxios from 'axios';

import axios from '../../axios-auth';


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
    }
};

const actions = {
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
                dispatch('storeUser', authData);
            })
            .catch(err => console.log(err));
    },
    login({ commit }, authData) {
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
                })
            })
            .catch(err => console.log(err));
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
    }
};

export default {
    state,
    mutations,
    actions,
    getters
}