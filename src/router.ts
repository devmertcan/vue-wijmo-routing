import { createRouter, createWebHistory } from "vue-router";

const routes = [
  { path: "/", redirect: '/auth/login' },
  {
    path: '/auth',
    component: () => import('@/layouts/Auth.vue'),
    children: [
      {
        path: '/auth/login',
        name: 'auth.login',
        component: () => import('@/pages/auth/Login.vue'),
        meta: {
          layout: 'auth',
          requiresGuest: true
        }
      },
    ]
  },
  {
    path: '/view',
    component: () => import('@/layouts/Default.vue'),
    children: [
      {
        path: '/view/list',
        name: 'view.list',
        component: () => import('@/pages/CurrencyTable.vue'),
        meta: {
          layout: 'auth',
          requiresAuth: true
        }
      },
      // {
      //   path: '/view/nav',
      //   name: 'view.nav',
      //   component: () => import('@/components/DataFetching.vue'),
      //   meta: {
      //     layout: 'auth',
      //     requiresAuth: true
      //   }
      // },
      // {
      //   path: '/view/pivot',
      //   name: 'view.pivot',
      //   component: () => import('@/components/PivotGrid.vue'),
      //   meta: {
      //     layout: 'auth',
      //     requiresAuth: true
      //   }
      // },
      // {
      //   path: '/view/map',
      //   name: 'view.map',
      //   component: () => import('@/components/RoundMap.vue'),
      //   meta: {
      //     layout: 'auth',
      //     requiresAuth: true
      //   }
      // }
    ]
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
