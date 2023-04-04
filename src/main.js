import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/store'


const app = createApp(App)

store.dispatch('fetchLessons');

app.use(store)
app.use(router)


app.mount('#app')
