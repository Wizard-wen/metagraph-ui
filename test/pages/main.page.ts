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
        key: 2
      },
      {
        name: '输入框',
        router: '/github-style/input',
        key: 4
      }
    ]
  },
  {
    name: '图标',
    router: '/icon',
    key: 3
  },
]
