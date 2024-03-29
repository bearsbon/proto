import { createRouter as createVueRouter, createWebHistory } from 'vue-router';
import { isLogged, isNotLogged, middlewarePipeline } from './middleware';
const Navbar = () => import('@/core/p-navbar/p-navbar.vue');
const Auth = () => import('@/auth/auth.vue');
const Demo = () => import('@/demo/demo.vue');
const Simulation = () => import('@/simulation/simulation.vue');
const Error = () => import('@/core/error/error.vue');
const Report = () => import('@/simulation/report/report.vue');

export const createRouter = () =>
  createVueRouter({
    history: createWebHistory(),
    routes: [
      {
        path: '/',
        redirect: '/demo',
      },
      {
        path: '/auth',
        name: 'Auth',
        meta: {
          middleware: [isLogged],
        },
        component: Auth,
      },
      {
        path: '/demo',
        name: 'Demo',
        meta: {
          middleware: [isNotLogged],
        },
        components: {
          header: Navbar,
          default: Demo,
        },
      },
      {
        path: '/report',
        name: 'Simulation',
        meta: {
          middleware: [isNotLogged],
        },
        components: {
          header: Navbar,
          default: Simulation,
        },
        children: [
          {
            path: '/simulation/:type',
            name: 'reportType',
            props: route => ({ type: route.query.type }),
            component: Report,
          },
        ],
      },
      {
        path: '/not-found',
        name: 'NotFound',
        component: Error,
        meta: {
          middleware: [isNotLogged],
          error404: true,
        },
      },
      {
        path: '/:catchAll(.*)',
        redirect: '/demo',
      },
    ],
  });

const router = createRouter();

router.beforeEach((to, from, next) => {
  const { middleware } = to.meta;

  if (!middleware) {
    return next();
  }

  return middleware[0]({
    next: middlewarePipeline(next, middleware, 1),
  });
});

router.beforeResolve(async (to, from, next) => {
  if (!to.matched.length) {
    next({ path: '/not-found' });
    return;
  }
  next();
});

export default router;
