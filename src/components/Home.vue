<template>
    <div>
        <h1>Trade ot View your Portfolio</h1>
        <h6>You can Save and Load your Data</h6>
        <h6>Click on 'End Day' to begin a New Day!</h6>
        <hr>
        <p>Your Balance: {{ funds.toFixed(2) | currency }}</p>
    </div>
</template>

<script>
export default {
    created() {
        this.$store.dispatch('fetchUser')
    },
    computed: {
        funds() {
            return !this.$store.getters.user ? 0 : +this.$store.getters.user.balance;
        }
    },
}
</script>