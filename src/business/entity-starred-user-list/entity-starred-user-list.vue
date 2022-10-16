<template>
  <ant-spin :spinning="listModel.isLoading">
    <ant-list>
      <template #loadMore>
        <div class="load-more-button" v-if="isShowLoadMore">
          <ant-spin v-if="listModel.isLoadingMore"/>
          <ant-button v-else @click="handleLoadMore">加载更多</ant-button>
        </div>
      </template>
      <ant-list-item v-for="(item, index) in listModel.list" :key="index">
        <template #actions>
          <ant-button @click="goProfilePage(item.id)">查看</ant-button>
        </template>
        <ant-list-item-meta :description="item.email">
          <template #title>
            <div class="name" @click="goProfilePage(item.id)">{{ item.name }}</div>
          </template>
          <template #avatar>
            <ant-avatar v-if="item.avatar" :src="item.avatar"/>
            <div class="icon" v-else></div>
          </template>
        </ant-list-item-meta>
      </ant-list-item>
    </ant-list>
  </ant-spin>
</template>

<script lang="ts">
import {
  Avatar, Button, List, Spin
} from 'ant-design-vue';
import type { UserModelType } from 'metagraph-constant';
import {
  computed,
  defineComponent, PropType, toRef
} from 'vue';

export default defineComponent({
  name: 'entity-starred-user-list',
  props: {
    listModel: {
      type: Object as PropType<{
        isLoading: boolean;
        isLoadingMore: boolean;
        list: UserModelType[],
        total: number;
        currentPage: number;
        pageSize: number;
      }>,
      required: true
    }
  },
  components: {
    AntSpin: Spin,
    AntButton: Button,
    AntAvatar: Avatar,
    AntList: List,
    AntListItem: List.Item,
    AntListItemMeta: List.Item.Meta
  },
  emits: ['goDetail', 'loadMore'],
  setup(props, { emit }) {
    const listModel = toRef(props, 'listModel');

    const isShowLoadMore = computed(
      () => listModel.value.total > listModel.value.list.length
    );

    function handleLoadMore() {
      emit('loadMore');
    }

    function goProfilePage(id: string) {
      emit('goDetail', {
        id
      })
    }

    return {
      goProfilePage,
      // isLoadingMore,
      handleLoadMore,
      isShowLoadMore
    };
  }
});
</script>

<style scoped lang="scss">
.load-more-button {
  text-align: center;
  margin-top: 12px;
  height: 32px;
  line-height: 32px;
}

.name {
  cursor: pointer;
}

.icon {
  height: 30px;
  width: 30px;
  border-radius: 50%;
  background: #f5f5f5;
}
</style>
