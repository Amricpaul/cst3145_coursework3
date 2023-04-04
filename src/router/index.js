import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import CheckoutView from '@/views/CheckoutView.vue'
import ThankyouView from '@/views/ThankyouView.vue'
import store from '@/store/store.js'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/checkout',
      name: 'checkout',
      component: CheckoutView,
      beforeEnter: (to, from, next) => {
        if (store.state.cart.length > 0) {
          // If there are items in the cart, allow access to the route
          next();
        } else {
          // If there are no items in the cart, redirect to the home page
          next('/');
        }
      }
    },
    {
      path: '/thankyou',
      name: 'thankyou',
      component: ThankyouView,
    }
  ]
})

export default router
