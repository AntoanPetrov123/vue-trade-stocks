<template>
    <nav class="navbar navbar-default">
        <div class="container-fluid">
            <div class="navbar-header">
                <router-link to="/" class="navbar-brand">Trade stocks here!</router-link>
            </div>

            <div class="collapse navbar-collapse">
                <ul class="nav navbar-nav">
                    <router-link to="/portfolio" activeClass="active" tag="li"
                        v-if="auth"><a>Portfolio</a></router-link>
                    <router-link to="/stocks" activeClass="active" tag="li"><a>Stocks</a></router-link>
                </ul>
                <strong class="navbar-text navbar-right">Balance: {{ funds.toFixed(2) | currency }}</strong>
                <ul class="nav navbar-nav navbar-right">
                    <li v-if="auth"><a href="#" @click="startDay">Start Day</a></li>
                    <li v-if="auth"><a href="#" @click="endDay">End Day</a></li>
                    <li class="dropdown" :class="{ open: isDropdownOpen }" @click="toggleDropdown" v-if="auth">
                        <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true"
                            aria-expanded="false">Save/Load Data <span class="caret"></span></a>
                        <ul class="dropdown-menu">
                            <li><a href="#" @click="saveData">Save</a></li>
                            <li><a href="#" @click="loadData">Load</a></li>
                        </ul>
                    </li>
                    <li v-if="!auth">
                        <router-link to="/register">Sign Up</router-link>
                    </li>
                    <li v-if="!auth">
                        <router-link to="/login">Sign In</router-link>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>

<script>
import { mapActions } from 'vuex';
export default {
    data() {
        var interval;
        return {
            isDropdownOpen: false,
            interval,
        }
    },
    created() {
        this.$store.dispatch('fetchUser')
    },
    computed: {
        funds() {
            return !this.$store.getters.user ? 0 : +this.$store.getters.user.balance;
        },
        auth() {
            return this.$store.getters.isAuth;
        }
    },
    methods: {
        ...mapActions({
            //from modules/stocks
            randomizeStocks: 'randomizeStocks',
            fetchData: 'loadData'
        }),
        startDay() {
            this.interval = setInterval(() => {
                this.randomizeStocks();
            }, 10000)
        },
        endDay() {
            clearInterval(this.interval);
        },
        toggleDropdown() {
            return this.isDropdownOpen = !this.isDropdownOpen;
        },
        saveData() {
            const data = {
                funds: this.$store.getters.funds,
                stockPortfolio: this.$store.getters.stockPortfolio,
                stocks: this.$store.getters.stocks
            };
            this.$http.put('data.json', data);
        },
        loadData() {
            this.fetchData();
        }
    }
}
</script>