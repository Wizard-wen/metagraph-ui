/**
 * @author songxiwen
 * @date  2022/3/15 17:16
 */


export const routerList = [
  {
    name: 'Github风格',
    router: 'github-style',
    key: 1,
    children: [
      {
        name: '按钮',
        router: '/github-style/button',
        key: 11
      },
      {
        name: '输入框',
        router: '/github-style/input',
        key: 12
      }
    ]
  },
  {
    name: '图标',
    router: '/icon',
    key: 2
  },
  {
    name: 'web原生组件',
    router: '/webComponent',
    key: 3
  },
  {
    name: '业务组件',
    router: '/business',
    key: 4,
    children: [
      {
        name: '卡片',
        router: '/business/card',
        key: 41
      }
    ]
  },
]
