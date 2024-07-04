import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import TaskView from '../views/Task/Task.vue'
import TaskCreate from '../views/Task/TaskCreate.vue'
import TaskEdit from '../views/Task/Edit.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: TaskView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/task',
      name: 'task',
      component: TaskView
    },
    {
      path: '/task/create',
      name: 'taskCreate',
      component: TaskCreate
    },
    {
      path: '/task/:id/edit',
      name: 'taskEdit',
      component: TaskEdit
    },
  ]
})

export default router
