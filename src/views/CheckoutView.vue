<script setup >
import CheckoutForm from '@/components/checkoutForm.vue'
</script>
<template>
  <div class="checkoutView">
    <CheckoutForm 
      :cart="cart"
      :order="order"
      :storeCurrency="storeCurrency"
      v-on:delete-from-cart="deleteFromCart"
      v-on:remove-all-cart="removeAllCart"
      v-on:order-state-init="setOrderInit"
    />
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex';
export default {
  name: 'CheckoutView',
  data() {
    return {
     
    }
  },
  computed: {
    ...mapState(['lessons','cart', 'order', 'storeCurrency'])
  },
  methods: {
    ...mapActions(['removeAllCart', 'setOrderInit']),
    deleteFromCart: function(lesson){
      let obj = this.lessons.find(item => item._id === lesson._id);
      obj.availableStock += lesson.quantity;
      let item = this.cart.indexOf(lesson);
      this.cart.splice(item,1);
      this.cartTotal();
    },
    cartTotal: function(){
        let  total = 0;
        this.cart.forEach(function(item){
            total += item.price * item.quantity;
        })
       this.order.total = total;
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

