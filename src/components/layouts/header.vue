<template>
     <!-- HEADER -->
     <header > 
        <div class="container">
          <div class="row justify-content-between align-items-center">
            <div class="col-7 col-lg-2 col-md-2 order-1"> 
            <router-link to="/" class="text-white logo"><img src="img/tutorio.svg"> {{sitename}}</router-link>
            </div>
            <div class="col-12 col-md-5 order-3 order-lg-2 order-md-2"> 
              <div class="p-1 bg-light rounded rounded-pill shadow-sm">
                <div class="input-group">
                  <input type="text" placeholder="What're you searching for?" v-model="filter.searchValue" aria-describedby="button-addon1" class="form-control border-0 bg-light">
                  <div class="input-group-append">
                    <button id="button-addon1" type="button" disabled class="btn btn-link text-primary"><i class="fa fa-search"></i></button>
                  </div>
                </div>
              </div>
              </div>
              <div class="col-5 col-md-5 text-right order-2">
                <button type="button" class="cart-icon position-relative" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">
                  <svg xmlns="http://www.w3.org/2000/svg" height="48" width="48" fill="#fff"><path d="M11 44q-1.2 0-2.1-.9Q8 42.2 8 41V15q0-1.2.9-2.1.9-.9 2.1-.9h5.5v-.5q0-3.15 2.175-5.325Q20.85 4 24 4q3.15 0 5.325 2.175Q31.5 8.35 31.5 11.5v.5H37q1.2 0 2.1.9.9.9.9 2.1v26q0 1.2-.9 2.1-.9.9-2.1.9Zm0-3h26V15h-5.5v4.5q0 .65-.425 1.075Q30.65 21 30 21q-.65 0-1.075-.425-.425-.425-.425-1.075V15h-9v4.5q0 .65-.425 1.075Q18.65 21 18 21q-.65 0-1.075-.425-.425-.425-.425-1.075V15H11v26Zm8.5-29h9v-.5q0-1.9-1.3-3.2Q25.9 7 24 7q-1.9 0-3.2 1.3-1.3 1.3-1.3 3.2ZM11 41V15v26Z"/></svg> 
                  <span class="position-absolute translate-middle badge rounded-pill bg-danger">
                    {{cart.length}}
                  </span>
                </button>
              </div>
          </div>
        </div>
      </header>
      <!-- SHOW CART DRAWER -->
      <div>
          <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
            <div class="offcanvas-header d-flex align-content-between">
              <h3 id="offcanvasRightLabel mb-4">Cart Items</h3>
              <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            
            <div class="offcanvas-body">
                  <div class="alert alert-info" v-if="cart.length == 0">Your cart is currently empty.</div>
                  <div class="cart-items">
                      <div v-for="item in cart" class="row py-3 cart-item">
                          <div class="col-md-3">
                              <img v-bind:src="item.img" class="w-100" />
                          </div>
                          <div class="col-md-7">
                              <p>{{item.title}}</p>
                              <span>Quantity: {{item.quantity}}</span>
                              
                              <p><strong>{{item.price.toLocaleString()}} {{storeCurrency}}</strong></p>
                          </div>
                          <div class="col-md-2">
                              <button class="btn btn-sm btn-danger" v-on:click="deleteFromCart(item)"><i class="fa-solid fa-trash mr-3"></i></button>
                          </div>
                         
                      </div>
                  </div>
            </div>
            <div class="offcanvas-footer p-3 ">
              <div class="d-grid gap-2">
                <span><b>Total (USD)</b></span>
                <h5><strong>{{order.total.toLocaleString()}} {{storeCurrency}}</strong></h5>
                <hr>
                  <router-link to="/checkout" v-on:click="hideDrawer()" class="btn btn-primary btn-lg d-block">CONTINUE TO CHECKOUT</router-link> 
              </div>
            </div>
          </div>
      </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
export default {
  name: 'Header',
  data() {
    return {
      sitename: 'Tutorio',
    }
  },
  computed: {
    ...mapState(['lessons','storeCurrency', 'order', 'cart', 'filter'])
  },
  methods: {
    ...mapActions(['cartTotalAction']),
    deleteFromCart: function(lesson){
      let obj = this.lessons.find(item => item._id === lesson._id);
      obj.availableStock += lesson.quantity;
      let item = this.cart.indexOf(lesson);
      this.cart.splice(item,1);
        this.cartTotalAction();
    },
    hideDrawer(){
        let myOffcanvas = document.getElementById('offcanvasRight')
        let bsOffcanvas = bootstrap.Offcanvas.getInstance(myOffcanvas);
        bsOffcanvas.hide();
    }
  }
}

</script>