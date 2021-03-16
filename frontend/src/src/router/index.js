import Vue from 'vue';
import VueRouter from 'vue-router';
import HomePage from '../views/HomePage.vue';
import Post from '../views/Post.vue';

Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'HomePage',
    component: HomePage
  },
  {
    path: '/signup',
    name: 'Signup',
    component: () => import('../views/Signup.vue')
  }, 
  {
    path: '/post/:id',
      name: 'Post',
      component: Post
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import('../views/Profile.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router;