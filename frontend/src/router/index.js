import Vue from 'vue'
import VueRouter from 'vue-router'



Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'home',
        component: Home
      },
      {
        path: '/signup',
        name: 'signup',
        component: () => import('../views/signup.vue')
      },
      {
        path: '/signin',
        name: 'signin',
        component: () => import('../views/signin.vue')
      }
]

const router = new VueRouter({

})

export default router;