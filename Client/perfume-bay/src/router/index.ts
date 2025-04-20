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
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('@/views/auth/RegisterView.vue'),
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
    },
    {
      path: '/products/add',
      name: 'add-products',
      component: () => import('../views/Products/AddProducts.vue'),
    },
  ],
})

// 🔐 Global navigation guard
// This guard checks if the user has access token stored in browser localstorage before accessing certain routes
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('access_token')

  const publicPages = ['/login', '/register']

  if (!token && !publicPages.includes(to.path)) {
    next('/login') // not logged in and trying to access a protected route
  } else if (token && to.path === '/login') {
    next('/products/my') // logged in but trying to visit login
  } else {
    next() // allow access
  }
})

export default router
