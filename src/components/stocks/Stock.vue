<template>
    <div class="col-sm-6 col-md-4">
        <div class="panel panel-success">
            <div class="panel-heading">
                <h3 class="panel-title">
                    {{ stock.name }}
                    <small>(Price: {{ stock.price.toFixed(2) }}$)</small>
                </h3>
            </div>
            <div class="panel-body">
                <div class="pull-left">
                    <input type="number" class="form-control" placeholder="Quantity" v-model="quantity"
                        :class="{ danger: insufficientFunds }">
                </div>
                <div class="pull-right">
                    <button class="btn btn-success" @click="buyStock" :disabled="insufficientFunds || quantity <= 0">{{
                            insufficientFunds ? 'Less funds' : 'Buy Stock'
                    }}</button>
                </div>
            </div>

        </div>
    </div>
</template>
<script>
export default {
    props: ['stock'],
    data() {
        return {
            quantity: 0
        }
    },
    computed: {
        funds() {
            return this.$store.getters.funds;
        },
        insufficientFunds() {
            return this.quantity * this.stock.price > this.funds;
        },
        userId() {
            return this.$store.getters.firebaseUserId;
        },
    },
    methods: {
        buyStock() {
            const order = {
                stockId: this.stock.id,
                stockName: this.stock.name,
                stockPrice: this.stock.price,
                quantity: this.quantity
            };
            console.log(order);
            //buyStock is action in modules/stocks
            this.$store.dispatch('buyStock', order);
            // this.$http.put('users/' + this.userId + '.json', order);
            this.quantity = 0;
        }
    }
};
</script>

<style scoped>
.danger {
    border: 1px solid red;
    width: 100%;
}
</style>