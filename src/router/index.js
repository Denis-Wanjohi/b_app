import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Default from '@/views/Default.vue'
import AddTeams from '@/views/AddTeams.vue'
import Login from '@/views/Login.vue'
import RequestCode from '@/views/RequestCode.vue'
import Dashboard from '@/views/Dashboard.vue'
import Requests from '@/views/Requests.vue'
import { user } from '@/stores/user'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Welcome',
      component: Default,
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: Dashboard,
    },
    {
      path: '/add-matches',
      name: 'Add Teams',
      component: AddTeams,
    },
    {
      path: '/requests',
      name: 'Requests',
      component: Requests,
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
    },
    {
      path: '/code-request',
      name: 'Request Code',
      component: RequestCode,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    },
  ],
})


router.beforeEach((to,from,next)=>{
  // alert()
  let isAuthenticated = user().authenticated
  console.log(to.path)
  if(isAuthenticated){
    if(to.path == '/login' || to.path == '/code-request' || to.path == '/'){
      next('Dashboard')
    }else{
      next()
    }
    // }
  }else{
    if(to.path != '/login' && to.path != '/code-request' && to.path != '/'){
      if(to.path != '/code-request' && to.path != '/'){
        next('/login')
      }else{
        next('/')
      }
    }else{
      next()
    }
  }
})

export default router
