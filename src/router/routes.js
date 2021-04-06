const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
    ],
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '/register', component: () => import('pages/auth/Register.vue') },
    ],
    meta: { noAuth: true },
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '/login', component: () => import('pages/auth/Login.vue') },
    ],
    meta: { noAuth: true },
  },
  {
    path: '/blog',
    name: 'Blog',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '/blog', component: () => import('pages/blog/Blog.vue') },
    ],
  },
  {
    path: '/blog/:url',
    name: 'Single',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '/blog/:url', component: () => import('pages/blog/Single.vue') },
    ],
  },
  {
    path: '/video-tutorials/:id',
    name: 'Videos',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '/video-tutorials/:id', component: () => import('pages/index/Videos.vue') },
    ],
  },
  {
    path: '/online-test-series',
    name: 'OnlineTestSeries',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '/online-test-series', component: () => import('pages/index/OnlineTestSeries.vue') },
    ],
  },
  {
    path: '/test-paper/:id',
    name: 'TestPaper',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '/test-paper/:id', component: () => import('pages/index/TestPaper.vue') },
    ],
    meta: { auth: true },
  },
  {
    path: '/daily-practice',
    name: 'DailyPractice',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '/daily-practice', component: () => import('pages/index/DailyPractice.vue') },
    ],
  },  
  {
    path: '/hire-a-tutor',
    name: 'HireATutor',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '/hire-a-tutor', component: () => import('pages/index/HireATutor.vue') },
    ],
    meta: {},
  },
  // Admin Routes
  {
    path: '/admin/addBlog',
    name: 'AddBlog',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '/admin/addBlog', component: () => import('pages/admin/AddBlog.vue') },
    ],
    meta: { auth: true, ss: true },
  },
  {
    path: '/admin/updateBlog/:id',
    name: 'UpdateBlog',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '/admin/updateBlog/:id', component: () => import('pages/admin/UpdateBlog.vue') },
    ],
    meta: { auth: true, ss: true },
  },
  {
    path: '/admin/blogMeta',
    name: 'BlogMeta',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '/admin/blogMeta', component: () => import('pages/admin/BlogMeta.vue') },
    ],
    meta: { auth: true, ss: true },
  },
  {
    path: '/admin/blogs',
    name: 'AdminBlogs',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '/admin/blogs', component: () => import('pages/admin/Blogs.vue') },
    ],
    meta: { auth: true, ss: true },
  },
  {
    path: '/admin/basics',
    name: 'Basics',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '/admin/basics', component: () => import('pages/admin/Basics.vue') },
    ],
    // meta: { ss: true },
  },
  {
    path: '/admin/meta',
    name: 'Meta',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '/admin/meta', component: () => import('pages/admin/Meta.vue') },
    ],
    meta: { auth: true, ss: true },
  },
  {
    path: '/admin/videos',
    name: 'Videos',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '/admin/videos', component: () => import('pages/admin/Videos.vue') },
    ],
    meta: { auth: true, ss: true },
  },
  {
    path: '/admin/questionBank',
    name: 'QuestionBank',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '/admin/questionBank', component: () => import('pages/admin/QuestionBank.vue') },
    ],
    meta: { auth: true, ss: true },
  },  
  {
    path: '/admin/questionSummary',
    name: 'QuestionSummary',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '/admin/questionSummary', component: () => import('pages/admin/QuestionSummary.vue') },
    ],
    meta: { auth: true, ss: true },
  },
  {
    path: '/admin/addQuestion',
    name: 'AddQuestion',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '/admin/addQuestion', component: () => import('pages/admin/AddQuestion.vue') },
    ],
    meta: { auth: true, ss: true },
  },
  {
    path: '/admin/updateQuestion/:id',
    name: 'UpdateQuestion',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '/admin/updateQuestion/:id', component: () => import('pages/admin/UpdateQuestion.vue') },
    ],
    meta: { auth: true, ss: true },
  },
  {
    path: '/admin/institutes',
    name: 'Institutes',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '/admin/institutes', component: () => import('pages/admin/Institutes.vue') },
    ],
    meta: { auth: true, ss: true },
  },
  // Admin Routes

  // School Routes
  {
    path: '/school/leadManagement',
    name: 'LeadManagement',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '/school/leadManagement', component: () => import('pages/school/LeadManagement.vue') },
    ],
    meta: { auth: true },
  },
  {
    path: '/school/basics',
    name: 'SchoolBasics',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '/school/basics', component: () => import('pages/school/Basics.vue') },
    ],
    meta: { auth: true },
  },
  {
    path: '/school/attendance',
    name: 'SchoolAttendance',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '/school/attendance', component: () => import('pages/school/Attendance.vue') },
    ],
    meta: { auth: true },
  },
  {
    path: '/school/teacherAttendance',
    name: 'TeacherAttendance',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '/school/teacherAttendance', component: () => import('pages/school/TeacherAttendance.vue') },
    ],
    meta: { auth: true },
  },
  {
    path: '/school/takeAttendance',
    name: 'SchoolTakeAttendance',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '/school/takeAttendance', component: () => import('pages/school/TakeAttendance.vue') },
    ],
    meta: { auth: true },
  },
  {
    path: '/school/groups',
    name: 'SchoolGroups',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '/school/groups', component: () => import('pages/school/Groups.vue') },
    ],
    meta: { auth: true },
  },

  // School Routes
  {
    path: '*',
    name: '404',
    component: () => import('pages/404.vue'),
  },
];

export default routes;
