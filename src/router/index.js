// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
// import Home from '@/views/Home.vue'
import Wrbt from '@/components/WrbtFams.vue'
import Pygn from '@/components/PygnFams.vue'

const routes = [
  { path: '/', name: 'Home', component: Wrbt },
  { path: '/wrbt', name: 'Warungboto', component: Wrbt },
  { path: '/pygn', name: 'Piyungan', component: Pygn }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router