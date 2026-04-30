import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path:'/',
      name:'HomeView',
      component: () => import('@/views/HomeView.vue')
    },
    {
      path:'/ActAdd',
      name:'ActAdd',
      component: ()=>import('@/views/ActAdd.vue')
    },
    {
      path:'/ActEdit',
      name:'ActEdit',
      component:()=>import('@/views/ActEdit.vue')
    },
    {
      path:'/ActView/:id',
      name:'ActView',
      component:()=>import('@/views/ActView.vue')
    },
  ],
})

export default router
