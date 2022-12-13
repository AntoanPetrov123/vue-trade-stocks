<template>
    <div>
        <h1>This is {{ username.slice(-1) !== 's' ? username + '\'s' : username + '\'' }} Portfolio</h1>
        <appStock v-for="stock in stocks" :stock="stock"></appStock>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Stock from './Stock.vue';
import axios from 'axios';

export default {
    data() {
        return {
            username: ''
        }
    },
    created() {
        axios.get('/users.json')
            .then(res => {
                console.log(res);
                const data = res.data;
                for (let key in data) {
                    const user = data[key];
                    user.id = key;
                    console.log(user.username);
                    this.username = user.username;
                }
            })
            .catch(err => {
                console.log(err);
            })
    },
    computed: {
        //with this syntaxis we can change the name of method 
        ...mapGetters({
            stocks: 'stockPortfolio'
        })
    },
    components: {
        appStock: Stock
    }
}
</script>