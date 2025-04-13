// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import Wrbt from './WrbtFams.vue'
// import Pygn from '@/components/PygnFams.vue' // Assuming you still have this

const routes = [
  { path: '/', name: 'Home', component: Wrbt },
  { path: '/wrbt', name: 'Warungboto', component: Wrbt },
  // { path: '/pygn', name: 'Piyungan', component: Pygn } // Assuming you still have this
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router