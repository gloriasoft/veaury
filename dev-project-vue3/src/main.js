import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// react-dom >= 19
import { createRoot } from 'react-dom/client'
import { setVeauryOptions } from 'veaury'
setVeauryOptions({
  react: {
    createRoot
  }
})

const app = createApp(App)
app.use(router)
app.use(store)
app.mount('#app')
