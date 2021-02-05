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
    meta: { noAuth: true },
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '/login', component: () => import('pages/auth/Login.vue') },
    ],
    meta: { noAuth: true },
  },
  {
    path: '/admin/addBlog',
    name: 'addBlog',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '/admin/addBlog', component: () => import('pages/admin/AddBlog.vue') },
    ],
    meta: { auth: true, admin: true },
  },
  {
    path: '/admin/updateBlog/:id',
    name: 'updateBlog',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '/admin/updateBlog/:id', component: () => import('pages/admin/UpdateBlog.vue') },
    ],
    meta: { auth: true, admin: true },
  },
  {
    path: '/admin/blogMeta',
    name: 'blogMeta',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '/admin/blogMeta', component: () => import('pages/admin/blogMeta.vue') },
    ],
    meta: { auth: true, admin: true },
  },
  {
    path: '/admin/blogs',
    name: 'adminBlogs',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '/admin/blogs', component: () => import('pages/admin/blogs.vue') },
    ],
    meta: { auth: true, admin: true },
  },
  {
    path: '/admin/basics',
    name: 'basics',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '/admin/basics', component: () => import('pages/admin/basics.vue') },
    ],
    meta: { auth: true, admin: true },
  },
  {
    path: '/admin/meta',
    name: 'meta',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '/admin/meta', component: () => import('pages/admin/meta.vue') },
    ],
    meta: { auth: true, admin: true },
  },
  {
    path: '/admin/videos',
    name: 'videos',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '/admin/videos', component: () => import('pages/admin/videos.vue') },
    ],
    meta: { auth: true, admin: true },
  },
  {
    path: '/blog',
    name: 'blog',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '/blog', component: () => import('pages/blog/blog.vue') },
    ],
  },
  {
    path: '/blog/:url',
    name: 'single',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '/blog/:url', component: () => import('pages/blog/single.vue') },
    ],
  },
  {
    path: '/video-tutorials/:id',
    name: 'videos',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '/video-tutorials/:id', component: () => import('pages/index/videos.vue') },
    ],
  },
  {
    path: '*',
    component: () => import('pages/404.vue'),
  },
];

export default routes;
