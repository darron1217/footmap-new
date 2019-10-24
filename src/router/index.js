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
    path: '/truck/:id',
    name: 'truck',
    props: true,
    component: () => import('../views/Truck.vue'),
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/LoginView.vue'),
  },
]

const router = new IonicVueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
