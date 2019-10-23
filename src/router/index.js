import Vue from 'vue'
import Home from '../views/Home.vue'
import { IonicVueRouter } from '@ionic/vue'

Vue.use(IonicVueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/admin',
    name: 'admin',
    component: () => import('../views/Admin.vue'),
  },
  {
    path: '/admintruck',
    name: 'adminTruck',
    component: () => import('../views/AdminTruck.vue'),
  },
  {
    path: '/admintruck/:id',
    name: 'adminTruckDetail',
    props: true,
    component: () => import('../views/AdminTruckDetail.vue'),
  },
  {
    path: '/adminorder',
    name: 'adminOrder',
    component: () => import('../views/AdminOrder.vue'),
  },
]

const router = new IonicVueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
