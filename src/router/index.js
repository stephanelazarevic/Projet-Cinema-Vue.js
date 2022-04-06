import { createRouter, createWebHashHistory } from 'vue-router'
import Recherche from "../views/Recherche.vue";
import Accueil from "../views/Accueil.vue";

const routes = [
  {
    path: '/',
    name: 'accueil',
    component: Accueil
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/recherche',
    name: 'recherche',
	component: Recherche
  },
  {
    path: '/details',
    name: 'details',
	// component: Recherche,
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Details.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
