import axios from '../../axios-auth';

const state = {
    idToken: null,
    userId: null
};

const mutations = {

};

const actions = {
    register({ commit }, authData) {
        axios.post('/accounts:signUp?key=AIzaSyAH0vb33JuiSPXzBTlDk0zZubWa31KgCes',
            {
                email: authData.email,
                password: authData.password,
                returnSecureToken: true
            })
            .then(res => {
                console.log(res);
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
            })
            .catch(err => console.log(err));
    }
};

const getters = {

};

export default {
    state,
    mutations,
    actions,
    getters
}