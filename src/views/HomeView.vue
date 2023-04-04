<script setup>
import LessonsList from '@/components/LessonsList.vue'
</script>

<template>
  <!-- FILTERS -->
  <div class="card filter-board">
    <div class="card-body">
        <div class="row">
          <div class="col-md-3">
            <div class="form-group">
              <label>Subjects</label>
              <select class="form-select" aria-label="Default select example" v-model="filter.subjectKey">
                <option value="all">All Subjects</option>
                <option value="designing">Designing</option>
                <option value="development">Development</option>
                <option value="marketing">Marketing</option>
                <option value="business">Business</option>
              </select>
            </div>
          </div>
          <div class="col-md-3">
            <div class="form-group">
              <label>Location</label>
              <select class="form-select" v-model="filter.locationKey" aria-label="Default select example">
                <option value="all">All Locations</option>
                <option value="Knowledge Park, Dubai">Knowledge Park, Dubai</option>
                <option value="City walk, Dubai">City walk, Dubai</option>
                <option value="Academic City, Dubai">Academic City, Dubai</option>
              </select>
            </div>
          </div>
          <div class="col-md-3 offset-lg-3 offset-sm-0">
              <div class="form-group">
                <label>Sort By</label>
                <select class="form-select" v-on:change="sortByVal($event)" aria-label="Default select example" v-model="filter.sortbyKey">
                  <option value="default">Default</option>
                  <option value="availablity">Space available</option>
                  <option value="price-low-first">Price: low to high</option>
                  <option value="price-high-first">Price: high to low</option>
                  <option value="ascending">Alphabetically: A-Z</option>
                  <option value="descending">Alphabetically: Z-A</option>
                </select>
              </div>
          </div>
        </div>
    </div>
  </div>

  <LessonsList 
    :lessons="lessons"
    :filter="filter"
    :storeCurrency="storeCurrency"
    v-on:add-to-cart="addToCart"
  />
</template>

<script>
import {mapState} from 'vuex';
export default {
  name: 'HomeView',
  data: () => ({
    
  }),
  computed: {
    ...mapState(['lessons', 'filter', 'cart', 'order', 'storeCurrency'])
  },
  methods: {
    addToCart: function(lesson){
        lesson.availableStock--;
        let newItem = this.cart.filter(function(item){
            console.log('check item: '+item._id);
            if(item._id === lesson._id){
                return item.quantity++;
            }
        });

        if(!(newItem.length)){
          lesson.quantity = 1;
          // this.cart.push(lesson);
          this.$store.dispatch('addCart', lesson); // update
        }
        this.cartTotal();
    },
    sortByVal: function($event) { //sorting
            let tempLessons = this.lessons;
            if(this.filter.sortbyKey === 'default'){
              this.lessons.sort((l1,l2) => {
                    if (l1._id < l2._id){
                          return -1;}
                    
                    if (l1._id > l2._id){
                          return 1;}
                        
                        return 0;
                  });
            }
            if(this.filter.sortbyKey  === 'availablity'){

                  this.lessons.sort((l1,l2) => {
                    if (l1.availableStock > l2.availableStock){
                          return -1;}
                    
                    if (l1.availableStock < l2.availableStock){
                          return 1;}
                        
                        return 0;
                  });
            }
            if(this.filter.sortbyKey === 'price-low-first'){

                    this.lessons.sort((l1,l2) => {
                      if (l1.price < l2.price){
                            return -1;}
                      
                      if (l1.price > l2.price){
                            return 1;}
                          
                          return 0;
                    });
              }
              if(this.filter.sortbyKey  === 'price-high-first'){

                    this.lessons.sort((l1,l2) => {
                      if (l1.price > l2.price){
                            return -1;}
                      
                      if (l1.price < l2.price){
                            return 1;}
                          
                          return 0;
                    });
              }
              if(this.filter.sortbyKey  === 'ascending'){
                  this.lessons.sort((l1,l2) => {
                    if (l1.title < l2.title){
                          return -1;}
                    
                    if (l1.title > l2.title){
                          return 1;}
                        
                        return 0;
                  });
              }
              if(this.filter.sortbyKey === 'descending'){
                  this.lessons.sort((l1,l2) => {
                    if (l1.title > l2.title){
                          return -1;}
                    
                    if (l1.title < l2.title){
                          return 1;}
                        
                        return 0;
             });
            }
    },
    cartTotal: function(){
        let  total = 0;
        this.cart.forEach(function(item){
            total += item.price * item.quantity;
        })
       this.order.total = total;
    }
  }
}
</script>