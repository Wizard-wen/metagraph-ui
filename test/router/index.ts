/**
 * @author songxiwen
 * @date  2022/3/15 16:08
 */
import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'MainPage',
    component:  () => import('../pages/main-page.vue'),
    children: [
      {
        path: 'github-style',
        name: 'Github',
        component:  () => import('../pages/github-style/index.vue'),
        children: [
          {
            path: 'button',
            name: 'GithubButton',
            component:  () => import('../pages/github-style/button.vue'),
          },
          {
            path: 'input',
            name: 'GithubInput',
            component:  () => import('../pages/github-style/input.vue'),
          }
        ]
      },
      {
        path: 'icon',
        name: 'Icon',
        component:  () => import('../pages/icons/icon.vue'),
      },
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory('/'),
  routes,
});

export default router;
