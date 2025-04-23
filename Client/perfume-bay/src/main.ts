import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './global.css'
import PrimeVue from 'primevue/config'
import Aura from '@primeuix/themes/aura'
import ToastService from 'primevue/toastservice'
import { DefaultApolloClient } from '@vue/apollo-composable'
import apolloClient from './apollo'

const app = createApp(App)

app.provide(DefaultApolloClient, apolloClient)

app.use(router)
app.use(PrimeVue, {
  theme: {
    preset: Aura,
  },
})
app.use(ToastService)

app.mount('#app')
