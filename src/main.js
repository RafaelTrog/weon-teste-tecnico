import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import VueI18n from 'vue-i18n'
import vuetify from './plugins/vuetify'
import HomeView from "./views/Home.vue"
import RegisterView from "./views/Register.vue"
import store from "./store"
import messages from "./locales"

Vue.config.productionTip = false

Vue.use(VueRouter)
Vue.use(VueI18n)

const routes = [
  { path: '/', component: HomeView },
  { path: '/cadastro', component: RegisterView }
]

const router = new VueRouter({
  routes
})

const i18n = new VueI18n({
  locale: 'pt', // set locale
  messages, // set locale messages
})

new Vue({
  render: h => h(App),
  vuetify,
  router,
  store,
  i18n
}).$mount('#app')
