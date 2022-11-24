/**
 * @author songxiwen
 * @date  2022/3/15 17:16
 */

import {v4 as uuidV4} from 'uuid';

export type OriginRouteType = {
    title: string;
    name: string;
    path: string;
    children?: OriginRouteType[]
}

export type RouteType = {
  title: string;
  name: string;
  path: string;
  key: string;
  children?: OriginRouteType[]
}

export const routerList: OriginRouteType[] = [
    {
        title: 'Github风格',
        name: 'githubStyle',
        path: 'githubStyle',
        children: [
            {
                name: 'button',
                title: '按钮',
                path: '/githubStyle/button',
            },
            {
                name: 'input',
                title: '输入框',
                path: '/githubStyle/input',
            }
        ]
    },
    {
        name: 'icon',
        title: '图标',
        path: '/icon',
    },
    {
        name: 'webComponent',
        title: 'web原生组件',
        path: '/webComponent',
    },
    {
        name: 'general',
        title: '通用组件',
        path: 'general',
        children: [{
            name: 'tree',
            title: '树组件',
            path: '/general/tree'
        }]
    },
    {
        name: 'business',
        title: '业务组件',
        path: '/business',
        children: [
            {
                name: 'card',
                title: '卡片',
                path: '/business/card',
            }
        ]
    },
]


export function generateRouter(originRouterList: OriginRouteType[]): RouteType[] {
    return originRouterList.map(item => {
        if (item.children?.length) {
            const list = item.children
            return {
                ...item,
                key: uuidV4(),
                children: generateRouter(list)
            }
        } else {
            return {
                ...item,
                key: uuidV4()
            }
        }
    })
}