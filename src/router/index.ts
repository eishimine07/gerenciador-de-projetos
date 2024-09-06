import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('@/layouts/AppLayout.vue'),
    children: [
      {
        path: '',
        redirect: { name: 'projects' }
      },
      {
        path: 'projetos',
        component: () => import('@/views/ProjectsView.vue'),
        name: 'projects',
        meta: { showHeaderAction: true },
      },
      {
        path: 'projetos/novo',
        component: () => import('@/views/NewProjectView.vue'),
        name: 'newProject',
      },
      {
        path: 'projetos/:id/editar',
        component: () => import('@/views/EditProjectView.vue'),
        name: 'editProject',
      },
      {
        path: 'projetos/buscar',
        component: () => import('@/views/SearchProjectView.vue'),
        name: 'searchProject',
        meta: { hideHeader: true }
      },
    ]
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
