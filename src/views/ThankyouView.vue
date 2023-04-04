<template>
    <div class="order-confirmed">
        <img src="/img/complete.gif"  />
        <h1>Order Received</h1>
        <p>You will receive a confirmation email shortly</p>
        <router-link to="/" class="btn btn-primary">Back to Home</router-link>
    </div>
</template>
<script>
export default {
    name: 'OrderConfirmed',
}
</script>

<style scoped>
img{
    width: 150px;
    margin: 0 auto;
}
</style>