<template>
   
      <div class="row">
          <template v-for="lesson in filteredLessons">                  
              <div class="col-md-3">
                  <div class="lesson-card">
                      <img v-bind:src="lesson.img" />
                      <div class="lesson-text-wrap">
                          <span class="lesson-subject">{{lesson.subject}}</span>
                          <h4 class="lesson-title" v-text="lesson.title"></h4>
                          <span class="lesson-location"> {{lesson.location}}</span>
                          <p class="lesson-price">{{lesson.price.toLocaleString()}} <small>{{storeCurrency}}</small></p>
                          <span class="availableStock"><span>{{lesson.availableStock}}</span> Spaces available</span>
                            
                              <hr>
                              <div class="lesson-reviews">
                                  <span v-for="n in lesson.rating" class="fa-solid fa-star"></span>
                                  <span v-for="n in 5-lesson.rating" class="fa-regular fa-star"></span>
                                  ({{lesson.rating}})
                              </div>
                          <button class="cart-btn" v-if="canAddToCart(lesson)" v-on:click="addToCart(lesson)">Add to Cart</button>
                          <button class="cart-btn" :disabled="true" v-if="!canAddToCart(lesson)" v-on:click="addToCart(lesson)">out of space</button>
                         
                      </div>
                  </div>
              </div>
          
          </template>

          <!-- IF LESSONS NOT FOUND -->
          <template v-if="!filteredLessons.length">
            <div class="not-found">
                <i class="fa-solid fa-triangle-exclamation"></i>
                <h1>NOT FOUND</h1>
                <p>We can't find the product that you are looking for</p>
                <button type="button" v-on:click="clearFliters()" class="btn btn-primary">Clear Filters</button>
            </div>
          </template>
      </div>
</template>
<script>
import { mapState } from 'vuex';
export default {
  name: "ProductList",
  props: {
    lessons: {
        type: Array,
        default: () => []
    },
    filter: {
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
    }
  },
    computed: {
        ...mapState(['storeCurrency']),
        filteredLessons(){
                let tempLessons = this.lessons

                  //search term
                  if(this.filter.searchValue !== '' && this.filter.searchValue){
                    tempLessons = tempLessons.filter((lesson) => {
                      return lesson.title.toLowerCase().includes(this.filter.searchValue.toLowerCase()) || lesson.location.toLowerCase().includes(this.filter.searchValue.toLowerCase())
                    })
                  }

                  //location
                  if (this.filter.locationKey !== 'all'){
                    tempLessons = tempLessons.filter((item) => {
                      return (item.location === this.filter.locationKey);
                    })
                  }

                  //subject
                  if (this.filter.subjectKey != 'all'){
                    tempLessons = tempLessons.filter((item) => {
                      return (item.subject == this.filter.subjectKey);
                    })
                  }

                  return tempLessons;
        },
    },
    methods: {
        addToCart(lesson) { //add to cart
            this.$emit("add-to-cart", lesson);
        },
        canAddToCart(lesson) {
        return lesson.availableStock > 0;
        },
        sortByVal(event) {
            this.filter.sortbyKey = event.target.value;
        },
        clearFliters() {
            this.filter.subjectKey = "all";
            this.filter.locationKey = "all";
            this.filter.sortbyKey = "default";
        },
        },
    }

</script>