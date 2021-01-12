const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
    ],
  },
  {
    path: '/register',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '/register', component: () => import('pages/auth/Register.vue') },
    ],
  },
  {
    path: '/login',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '/login', component: () => import('pages/auth/Login.vue') },
    ],
  },

  {
    path: '*',
    component: () => import('pages/404.vue'),
  },
];

export default routes;
