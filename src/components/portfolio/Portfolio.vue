<template>
    <div>
        <h1 v-if="username">This is {{ username.slice(-1) !== 's' ? username + '\'s' : username + '\'' }} Portfolio</h1>
        <appStock v-for="stock in stocks" :stock="stock"></appStock>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Stock from './Stock.vue';

export default {
    created() {
        this.$store.dispatch('fetchUser')
    },
    computed: {
        //with this syntaxis we can change the name of method 
        ...mapGetters({
            stocks: 'stockPortfolio'
        }),
        username() {
            return !this.$store.getters.user ? false : this.$store.getters.user.username;
        }
    },
    components: {
        appStock: Stock
    }
}
</script>