<template>
    <div class="col-sm-6 col-md-4">
        <div class="panel panel-info">
            <div class="panel-heading">
                <h3 class="panel-title">
                    {{ stock.stockName }}
                    <small>(Price: {{ stock.stockPrice.toFixed(2) | currency }} | Quantity: {{ stock.quantity
                    }})</small>
                </h3>
            </div>
            <div class="panel-body">
                <div class="pull-left">
                    <input type="number" class="form-control" placeholder="Quantity" v-model="quantity"
                        :class="{ danger: insufficientQuantity }">
                </div>
                <div class="pull-right">
                    <button class="btn btn-success" @click="sellStock"
                        :disabled="insufficientQuantity || quantity <= 0">{{ insufficientQuantity ? 'Less Quantity' :
        'Sell'
                        }}</button>
                </div>
            </div>

        </div>
    </div>
</template>
<script>
import { mapActions } from 'vuex';
export default {
    props: ['stock'],
    data() {
        return {
            quantity: 0
        }
    },
    created() {
        this.$store.dispatch('fetchUser')
    },
    computed: {
        insufficientQuantity() {
            return this.quantity > this.stock.quantity;
        }
    },
    methods: {
        ...mapActions({
            placeSellOrder: 'sellStock'
        }),
        sellStock() {
            const order = {
                stockId: this.stock.id,
                // stockName: this.stock.name,
                stockPrice: this.stock.price,
                quantity: this.quantity
            };
            this.placeSellOrder(order);
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