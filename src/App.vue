<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Header from '@/components/layouts/header.vue'
</script>

<template>
  <Header/>
  <main id="main" class="container py-5">
   <RouterView />
  </main>
</template>



