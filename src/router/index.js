// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import Wrbt from '@/components/WrbtFams.vue'
import Pygn from '@/components/PygnFams.vue'
import Pgrt from '@/components/PgrtFams.vue'
import Brbs from '@/components/BrbsFams.vue'

const routes = [
  // { path: '/', name: 'Home', component: Wrbt },
  {
    path: '/wrbt',
    name: 'Warungboto',
    component: Wrbt,
    meta: {
      title: 'Warungboto | Family Tree',
    },
  },
  {
    path: '/pygn',
    name: 'Piyungan',
    component: Pygn,
    meta: {
      title: 'Piyungan | Family Tree',
    },
  },
  {
    path: '/pgrt',
    name: 'Penggarit',
    component: Pgrt,
    meta: {
      title: 'Penggarit | Family Tree',
    },
  },
  {
    path: '/brbs',
    name: 'Brebes',
    component: Brbs,
    meta: {
      title: 'Brebes | Family Tree',
    },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.afterEach((to) => {
  document.title = to.meta?.title ?? 'Family Tree'
})

export default router
