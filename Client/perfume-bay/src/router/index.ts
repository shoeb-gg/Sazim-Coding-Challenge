import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: '/login', // 👈 auto-redirect when visiting '/'
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/auth/LoginView.vue'),
      beforeEnter: (to, from, next) => {
        alreadyLoggedIn(next)
      },
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('@/views/auth/RegisterView.vue'),
      beforeEnter: (to, from, next) => {
        alreadyLoggedIn(next)
      },
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/products/my',
      name: 'my-products',
      component: () => import('../views/Products/UserProducts.vue'),
      beforeEnter: (to, from, next) => {
        checkToken(next)
      },
    },
    {
      path: '/products/add',
      name: 'add-products',
      component: () => import('../views/Products/AddProducts.vue'),
      beforeEnter: (to, from, next) => {
        checkToken(next)
      },
    },
    {
      path: '/products/edit/:id',
      name: 'edit-products',
      component: () => import('../views/Products/EditProduct.vue'),
      beforeEnter: (to, from, next) => {
        checkToken(next)
      },
    },
    {
      path: '/products/all',
      name: 'all-products',
      component: () => import('../views/Products/AllProducts.vue'),
    },
    {
      path: '/products/buyrent/:id',
      name: 'buy-rent-products',
      component: () => import('../views/Products/ProductBuyRent.vue'),
    },
  ],
})

const checkToken = (next) => {
  const token = localStorage.getItem('access_token')
  if (token) next()
  else next('/login')
}

const alreadyLoggedIn = (next) => {
  const token = localStorage.getItem('access_token')
  if (token) next('/products/my')
  else next()
}

export default router
