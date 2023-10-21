import { createRouter, createWebHashHistory } from 'vue-router'
import Welcome from '../views/Welcome.vue'
import Garden from '../views/Garden.vue'

const routes = [
  {
    path: '/',
    name: 'welcome',
    component: Welcome
  },
  {
    path: '/garden',
    name: 'garden',
    component: Garden
  },
]

const router = createRouter({
  
  history: createWebHashHistory(),
  routes,
  scrollBehavior() {
    return { x: 0, y: 0 }
  },
})

export default router
