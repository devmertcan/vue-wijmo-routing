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
      {
        path: '/view/nav',
        name: 'view.nav',
        component: () => import('@/pages/DataFetching.vue'),
        meta: {
          layout: 'auth',
          requiresAuth: true
        }
      },
      {
        path: '/view/map/:snapshotId',
        name: 'view.map',
        component: () => import('@/components/MapComponent.vue'),
        meta: {
          layout: 'auth',
          requiresAuth: true
        }
      },
      {
        path: '/view/summary/:id',
        name: 'view.summary',
        component: () => import('@/pages/SummaryView.vue'),
        props: true,
        meta: {
          layout: 'auth',
          requiresAuth: true
        }
      },
      {
        path: '/view/summarypivot/:datasetIds',
        name: 'view.summarypivot',
        component: () => import('@/components/SummaryPivotComponent.vue'),
        props: true,
        meta: {
          layout: 'auth',
          requiresAuth: true
        }
      },
      {
        path: '/view/trippivot/:snapshotId',
        name: 'view.trippivot',
        component: () => import('@/components/TripPivotComponent.vue'),
        props: true,
        meta: {
          layout: 'auth',
          requiresAuth: true
        }
      },
      {
        path: '/view/side-by-side-map/:snapshotIds',
        name: 'view.sidemap',
        component: () => import('@/pages/SideMapView.vue'),
        props: true,
        meta: {
          layout: 'auth',
          requiresAuth: true
        }
      },
      {
        path: '/view/side-by-side-trip/:snapshotIds',
        name: 'view.sidetrip',
        component: () => import('@/pages/SideTripView.vue'),
        props: true,
        meta: {
          layout: 'auth',
          requiresAuth: true
        }
      }
    ]
  },
  {
    path: '/manage',
    component: () => import('@/layouts/Default.vue'),
    children: [
      {
        path: '/manage/tags',
        name: 'manage.tags',
        component: () => import('@/pages/TagManage.vue'),
        meta: {
          layout: 'auth',
          requiresAuth: true
        }
      },
    ]
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
