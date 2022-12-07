<template>
    <div>
        <h1>Trade ot View your Portfolio</h1>
        <h6>You can Save and Load your Data</h6>
        <h6>Click on 'End Day' to begin a New Day!</h6>
        <hr>
        <p>Your Balance: {{ funds }}</p>
    </div>
</template>

<script>
export default {
    computed: {
        funds() {
            return this.$store.getters.funds;
        }
    }
}
</script>