import { createRouter, createWebHashHistory } from 'vue-router'
import store from '../vuex/store'

const beforeEnter = (to, from, next) => {
  if (store.state.userId != null) {
    next();
  }
  next('login')
} 

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Index.vue'),
    beforeEnter: beforeEnter
  },
  {
    path: '/post',
    name: 'Post',
    component: () => import('../views/Post.vue'),
    beforeEnter: beforeEnter
  },
  {
    path: '/user',
    name: 'User',
    component: () => import('../views/User.vue'),
    beforeEnter: beforeEnter
  },
  {
    path: '/post/edit/:id',
    name: 'editPost',
    component: () => import( '../components/voir_post.vue' ),
    beforeEnter: beforeEnter
  },
  {
    path: '/signup',
    name: 'signup',
    component: () => import('../views/Signup.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import( '../views/Login.vue' )
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
