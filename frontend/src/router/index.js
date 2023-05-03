import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Index.vue')
  },
  {
    path: '/post',
    name: 'Post',
    component: () => import('../views/Post.vue')
  },
  {
    path: '/user',
    name: 'User',
    component: () => import('../views/User.vue')
  },
  {
    path: '/post/edit/:id',
    name: 'editPost',
    component: () => import( '../components/voir_post.vue' )
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
