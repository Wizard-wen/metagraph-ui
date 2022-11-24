<template>
  <ant-layout>
    <ant-layout-header class="header">
      <div class="logo"/>
    </ant-layout-header>
    <ant-layout style="min-height: calc(100vh - 64px)">
      <ant-layout-sider width="200" style="background: #fff">
        <ant-menu
          mode="inline"
          :style="{ height: '100%', borderRight: 0 }">
          <template v-for="(item, index) in currentRouterList">
            <template v-if="item.children">
              <ant-sub-menu :key="item.key">
                <template #title>
                  <span>{{ item.title }}</span>
                </template>
                <ant-menu-item
                  v-for="(childItem) in item.children"
                  :key="childItem.key">
                  <router-link :to="childItem.path">{{ childItem.title }}</router-link>
                </ant-menu-item>
              </ant-sub-menu>
            </template>
            <template v-else>
              <ant-menu-item :key="item.key" >
                <router-link :to="item.path">{{ item.title }}</router-link>
              </ant-menu-item>
            </template>
          </template>
        </ant-menu>
      </ant-layout-sider>
      <ant-layout style="padding: 0 24px 24px">
        <ant-layout-content
          :style="{ background: '#fff', padding: '24px', margin: 0, minHeight: '280px' }">
          <router-view></router-view>
        </ant-layout-content>
      </ant-layout>
    </ant-layout>
  </ant-layout>
</template>

<script lang="ts">
import {computed, defineComponent, ref} from 'vue';
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons-vue';
import {
  Layout, Menu
} from 'ant-design-vue';
import {generateRouter, routerList, RouteType} from './main.page';

export default defineComponent({
  name: 'Main',
  components: {
    UserOutlined,
    LaptopOutlined,
    NotificationOutlined,
    AntLayout: Layout,
    AntLayoutContent: Layout.Content,
    AntLayoutHeader: Layout.Header,
    AntLayoutSider: Layout.Sider,
    AntMenu: Menu,
    AntSubMenu: Menu.SubMenu,
    AntMenuItem: Menu.Item
  },
  setup() {
const currentRouterList = ref<RouteType[]>(generateRouter(routerList))
    return {
      selectedKeys1: ref<string[]>(['2']),
      selectedKeys2: ref<string[]>(['1']),
      collapsed: ref<boolean>(false),
      openKeys: ref<string[]>(['sub1']),
      routerList,
      currentRouterList
    };
  },
})
</script>

<style scoped lang="scss">
#components-layout-demo-top-side-2 .logo {
  float: left;
  width: 120px;
  height: 31px;
  margin: 16px 24px 16px 0;
  background: rgba(255, 255, 255, 0.3);
}

.ant-row-rtl #components-layout-demo-top-side-2 .logo {
  float: right;
  margin: 16px 0 16px 24px;
}

.site-layout-background {
  background: #fff;
}
</style>
