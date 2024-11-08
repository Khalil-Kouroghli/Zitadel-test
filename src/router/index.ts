import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import zitadelAuth from "../service/zitadelAuth";
import LoginView from '../views/LoginView.vue';
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      component: LoginView
    },
    {
      path: '/login',
      name: 'login',
      meta: {
        authName: zitadelAuth.oidcAuth.authName
      },
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/admin',
      name: 'admin',
      meta: {
        authName: zitadelAuth.oidcAuth.authName
      },
      component: () => {
        if (zitadelAuth.hasRole("admin")) {
          return import('../views/AdminView.vue')
        }
        return import('../views/NoAccessView.vue')
      },
    }
  ]
})

zitadelAuth.oidcAuth.useRouter(router)

export default router