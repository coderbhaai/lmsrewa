const routes = [
  {
    path: '/',
    name: 'home',
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
    meta: {
      noAuth: true,
    },
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '/login', component: () => import('pages/auth/Login.vue') },
    ],
    meta: {
      noAuth: true,
    },
  },
  {
    path: '/admin/addBlog',
    name: 'addBlog',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '/admin/addBlog', component: () => import('pages/admin/AddBlog.vue') },
    ],
    meta: {
      admin: true,
    },
  },
  {
    path: '/admin/updateBlog/:id',
    name: 'updateBlog',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '/admin/updateBlog/:id', component: () => import('pages/admin/UpdateBlog.vue') },
    ],
    meta: {
      admin: true,
    },
  },
  {
    path: '/admin/blogMeta',
    name: 'blogMeta',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '/admin/blogMeta', component: () => import('pages/admin/blogMeta.vue') },
    ],
    meta: {
      admin: true,
    },
  },
  {
    path: '/admin/blogs',
    name: 'blogs',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '/admin/blogs', component: () => import('pages/admin/blogs.vue') },
    ],
    meta: {
      admin: true,
    },
  },
  {
    path: '*',
    component: () => import('pages/404.vue'),
  },
];

export default routes;
