import { createRouter, createWebHashHistory } from 'vue-router'

// 後台頁
import Signout from '@/components/Signout.vue'
import Dashboard from '@/components/Dashboard.vue'
import Login from '@/components/backstage/Login.vue'
import Products from '@/components/backstage/Products.vue'
import Coupons from '@/components/backstage/Coupons.vue'
import Orders from '@/components/backstage/Orders.vue'
import CustomerOrder from '@/components/backstage/CustomerOrder.vue'

// 前台頁面
import Jindex from '@/components/fpages/Jindex.vue'
import Productlist from '@/components/fpages/Productlist.vue'
import Checkout from '@/components/fpages/Checkout.vue'
import Checkorder from '@/components/fpages/Checkorder.vue'
import Final from '@/components/fpages/Final.vue'
import About from '@/components/fpages/About.vue'
import Contact from '@/components/fpages/Contact.vue'

const routes = [
  // 前台
  { path: '/jindex', name: 'Jindex', component: Jindex },
  { path: '/productlist', name: 'Productlist', component: Productlist },
  { path: '/checkout', name: 'Checkout', component: Checkout },
  { path: '/checkorder', name: 'Checkorder', component: Checkorder },
  { path: '/final/:orderId', name: 'Final', component: Final },
  { path: '/about', name: 'About', component: About },
  { path: '/contact', name: 'Contact', component: Contact },

  // 後台登入
  { path: '/login', name: 'Login', component: Login },
  { path: '/signout', name: 'Signout', component: Signout },

  // 後台 Dashboard + 子路由
  {
    path: '/admin',
    name: 'Dashboard',
    component: Dashboard,
    children: [
      { path: 'products', name: 'Products', component: Products, meta: { requiresAuth: true } },
      { path: 'coupons', name: 'Coupons', component: Coupons, meta: { requiresAuth: true } },
      { path: 'orders', name: 'Orders', component: Orders, meta: { requiresAuth: true } },
      { path: 'customer_order', name: 'CustomerOrder', component: CustomerOrder },
    ],
  },

  // 預設導向
  { path: '/', redirect: '/jindex' },
]

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes,
})

// 全域 guard (檢查登入)
router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1')
    if (!token) return next('/login')
  }
  next()
})

export default router
