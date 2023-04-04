<template>
    <div class="row justify-content-center">
        <div class="col-md-6">
            <div class="checkout-form">
                <h2>Checkout</h2>
                <hr class="mb-4">
                <form class="needs-validation" novalidate="">
                    <div class="row">
                      <div class="col-md-12 mb-3">
                        <label for="fullname">Full name <span class="text-danger">*</span></label>
                        <input type="text" class="form-control" id="fullname" placeholder="John" v-model="order.name" v-on:keypress="checkInputField($event)" autocomplete="off">
                       </div>

                      <div class="col-md-6 mb-3">
                        <label for="email">Email <span class="text-danger">*</span></label>
                        <input type="email" class="form-control" id="email" placeholder="you@example.com" v-model="order.email" autocomplete="off">
                      </div>
                      <div class="col-md-6 mb-3">
                        <label for="phone">Phone <span class="text-danger">*</span></label>
                        <input type="text" class="form-control" id="phone" placeholder="05xxxxxxxx" v-model="order.phone" v-on:keypress="checkInputField($event)" autocomplete="off">
                      </div>
                    </div>
                    <div class="mb-3">
                      <label for="address">Address <span class="text-danger">*</span></label>
                      <input type="text" class="form-control" id="address" placeholder="1234 Main St" v-model="order.address">
                    </div>

              
                    <button :disabled="canPlaceOrder" v-on:click="submitOrder()" class="btn btn-primary btn-lg text-right mt-4" type="button">Place Order</button>
                  </form>
            </div>
        </div>
        <div class="col-md-4 mb-4">
            <h2>Invoice</h2>
            <hr class="mb-4">
            <ul class="list-group mb-3">
              <li v-for="item in cart" class="list-group-item d-flex justify-content-between lh-condensed">
                <div>
                  <p class="my-0">{{item.title}}</p>
                  <small class="text-muted">Quantity: {{item.quantity}}</small>
                </div>
                <span class="text-muted">{{item.price.toLocaleString()}} {{storeCurrency}}</span>
                  <div><button class="btn btn-sm btn-danger" v-on:click="deleteFromCart(item)"><i class="fa-solid fa-trash mr-3"></i></button></div>
              </li>
              <li class="list-group-item d-flex justify-content-between">
                <span><b>Total (USD)</b></span>
                <strong>{{order.total.toLocaleString()}} {{storeCurrency}}</strong>
              </li>
            </ul>
          </div>
    </div>
</template>
<script>
export default {
  name: 'CheckoutForm',
  props: {
    cart: {
      type: Array,
      required: true
    },
    order: {
      type: Object,
      required: true
    },
    storeCurrency: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      
      orderState: false
    }
  },
  computed: {
    canPlaceOrder() {
      return this.order.name == '' || this.order.email == '' || this.order.phone == '' || this.order.address == '';
    }
  },
  methods: {

      submitOrder(){
              this.$emit('remove-all-cart');
              this.$emit('order-state-init')
              //redirect to home page
              this.$router.push({ name: 'thankyou' });
    },
    deleteFromCart(lesson){
      this.$emit('delete-from-cart', lesson);
    },
    checkInputField($event){

      //name validation (ReGex)
      if($event.target.id === 'fullname') {
          let char = String.fromCharCode($event.keyCode); // Get the character
          if (/^[A-Za-z]+$/.test(char)) { /// Match with regex
              return true;
          }
          else {
              $event.preventDefault();
          }
      }
      //phone validation (ReGex)
      if($event.target.id === 'phone') {
          let char = String.fromCharCode($event.keyCode); // Get the character
          if (/^[0-9]+$/.test(char)) { // Match with regex
              return true;
          }
          else {
              $event.preventDefault();
          }
      }
    }
     
  }
}
</script>