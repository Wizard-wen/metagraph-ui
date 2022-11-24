<template>
  <div v-for="item in uiTreeList">
    <template v-if="item.children">
      <div class="children-content">
        <div
            :style="{paddingLeft: level * 28 + 'px'}"
            class="label"
            :class="{'active-item-style': item.key === activeItemId}"
            @mouseenter="handleMouseEnter(item)"
            @mouseleave="handleMouseLeave">
          <div class="icon-content-style arrow" @click="handleClickArrow($event, item)">
            <caret-right-outlined class="arrow-icon" :class="{'arrow-rotate': item.isExpand}"/>
          </div>
          <div class="text" @click="handleClickItem($event, item)">{{ item.title }}</div>
          <div class="control" v-if="expendItemId === item.key">
            <div class="icon-content-style">
              <plus-outlined/>
            </div>
          </div>
        </div>
        <Transition>
          <metagraph-tree v-if="item.isExpand" :tree-list="item.children" :level="level + 1"></metagraph-tree>
        </Transition>
      </div>
    </template>
    <div
        v-else
        @mouseenter="handleMouseEnter(item)"
        @mouseleave="handleMouseLeave"
        class="label"
        :class="{'active-item-style': item.key === activeItemId}"
        :style="{paddingLeft: level * 28 + 'px'}">
      <div class="no-icon"></div>
      <div class="text" @click="handleClickItem($event,item)">{{ item.title }}</div>
      <div class="control" v-if="expendItemId === item.key">
        <div class="icon-content-style">
          <plus-outlined/>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {defineProps, PropType, ref} from 'vue'
import {CaretRightOutlined, PlusOutlined} from '@ant-design/icons-vue';

type TreeItemType = {
  title: '',
  name: '',
  key: string,
  data?: { [key: string]: any },
  children?: TreeItemType[]
}

type TreeItemUIType = {
  title: '',
  name: '',
  key: string,
  data?: { [key: string]: any },
  isActive: boolean;
  isExpand: boolean;
  children?: TreeItemType[]
}

const props = defineProps({
  treeList: {
    type: Array as PropType<TreeItemType[]>,
    default: () => []
  },
  level: {
    type: Number,
    default: 0
  }
})

const uiTreeList = ref<TreeItemUIType[]>([]);
const expendItemId = ref();
const activeItemId = ref();
uiTreeList.value = props.treeList?.map(item => {
  return {
    ...item,
    isActive: false,
    isExpand: false
  }
})

function handleClickItem(event: MouseEvent, item: TreeItemUIType) {
  event.stopPropagation();
  activeItemId.value = undefined;
  activeItemId.value = item.key;
}

function handleClickArrow(event: MouseEvent, item: TreeItemUIType) {
  event.stopPropagation();
  item.isExpand = !item.isExpand
}

function handleMouseEnter(item: TreeItemUIType) {
  expendItemId.value = item.key
}

function handleMouseLeave() {
  expendItemId.value = undefined
}
</script>

<style scoped lang="scss">
.icon-content-style {
  height: 24px;
  width: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 3px;

  .arrow-icon {
    font-size: 12px;
  }

  &:hover {
    background: #e7e9e8;
  }
}

.label {
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 35px;
  line-height: 35px;

  border-radius: 4px;

  &:hover {
    background: #eff0f0;
  }

  .arrow {
    margin-right: 4px;
  }

  .arrow-rotate {
    transform: rotate(90deg);
  }

  .no-icon {
    padding-left: 28px;
  }

  .text {
    cursor: pointer;
    flex: 1;
  }

  .control {
    display: flex;
  }

}
.active-item-style {
  background: #eff0f0;
}
.children-content {

}

/* 下面我们会解释这些 class 是做什么的 */
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

</style>