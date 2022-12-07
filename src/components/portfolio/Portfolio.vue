<template>
    <div>
        <appStock v-for="stock in stocks" :stock="stock"></appStock>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Stock from './Stock.vue';
export default {
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