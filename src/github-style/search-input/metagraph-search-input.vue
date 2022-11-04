<template>
  <div class="search" ref="root">
    <label
      ref="searchBox"
      for="search"
      class="search-label"
      :class="{'expand-search-label': isSearchListShow}">
      <div
        class="search-box"
        :class="[isSearchListShow ? 'expand-search-box' : 'normal-search-box']">
        <input
          v-model="searchText"
          id="search"
          type="text"
          autocomplete="off"
          :placeholder="placeholder"
          class="normal-search-input"
          @blur="handleInputBlur($event)"
          @focus="showMenuList()"
          @input="handleInput($event)"
          @keydown="handleInputKeyDown($event)"/>
        <search-icon v-if="!isSearchListShow" class="search-icon"></search-icon>
      </div>
      <div class="search-list" v-if="isSearchListShow">
        <template v-for="(item, index) in showList" :key="index">
          <template v-if="item.type === 'type' && searchText">
            <div
              class="search-item"
              :class="{'search-item-active': index === currentHoverIndex}"
              @mouseover="handleMouseover($event, index, item)"
              @click="handleClickSearchItem($event, index, item)">
              <search-icon class="icon"></search-icon>
              <div class="text">{{ searchText }}</div>
              <div class="tag">{{ item.label }}</div>
            </div>
          </template>
          <div
            v-if="item.type === 'history'"
            class="search-item"
            :class="{
              'search-item-active': index === currentHoverIndex,
              'no-border': index === historyShowList.length - 1
            }"
            @click="handleClickSearchItem($event, index, item)"
            @mouseover="handleMouseover($event, index, item)">
            <repository-list-icon class="icon"></repository-list-icon>
            <div class="text" v-html="item.html"></div>
            <div class="tag" v-if="index === currentHoverIndex">jump to</div>
          </div>
        </template>
      </div>
    </label>
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent, PropType, ref, toRef
} from 'vue';
import { v1 as uuidV1 } from 'uuid';
import { SearchIcon, RepositoryListIcon } from '../../icons';
import {root, searchText, searchBox, isSearchListShow, currentHoverIndex} from './metagraph.search.input';

type ItemType = {
  value?: string;
  label?: string;
  html?: string;
  uid: string;
  type: 'type' | 'history';
};

export default defineComponent({
  name: 'github-search-input',
  components: {
    SearchIcon,
    RepositoryListIcon
  },
  props: {
    placeholder: {
      type: String,
      default: '请输入搜索内容...'
    },
    searchTypeList: {
      type: Array as PropType<{
        value: string;
        label: string;
      }[]>,
      default: () => []
    },
    historyStorageKey: {
      type: String,
      default: 'search-history-key'
    },
    historyList: {
      type: Array as PropType<{
        label: string;
        value: string;
      }[]>,
      default: () => []
    }
  },
  emits: ['input', 'search'],
  setup(props, { emit }) {
    const historyList = toRef(props, 'historyList');
    const searchTypeList = toRef(props, 'searchTypeList');
    const historyShowList = computed<ItemType[]>(() => {
      return historyList.value.map((item: {
        value: string, label: string
      }) => {
        let text = item.label.replaceAll(searchText.value, `<span style="color: red">${searchText.value}</span>`)
        return { label: item.label, value: item.value, html: `<span>${text}</span>`, type: 'history', uid: uuidV1() }
      })
    });
    const showList = computed<ItemType[]>(() => {
      if (searchText.value) {
        currentHoverIndex.value = 0;
      }
      const result: ItemType[] = searchText.value ? [
        {
          value: '',
          label: 'all',
          type: 'type',
          uid: uuidV1()
        } as ItemType,
        ...searchTypeList.value.map((item: {
          value: string;
          label: string;
        }) => ({ ...item, type: 'type', uid: uuidV1() })) as ItemType[],
        ...historyShowList.value
      ] : [...historyShowList.value];
      return result;
    })
    // const root = ref<HTMLElement | null>(null);
    // const searchBox = ref<Element>();
    // const isSearchListShow = ref(false);
    // const searchText = ref('');
    // const currentHoverIndex = ref<number>(0);

    function showMenuList() {
      if (!isSearchListShow.value) {
        isSearchListShow.value = true;
        emit('input', {
          value: ''
        })
        window.addEventListener('click', handleClickOutside, false);
      }

    }

    function hide() {
      isSearchListShow.value = false;
      window.removeEventListener('click', handleClickOutside, false);
    }

    function handleClickOutside(event: Event) {
      if (!searchBox.value?.contains(event.target as Node)) {
        console.log('out click');
        hide();
      }
    }

    async function handleInputKeyDown(event: KeyboardEvent) {
      const input = event.target as HTMLInputElement;
      if (event.code === 'Enter') {
        emit('search', {
          ...showList.value[currentHoverIndex.value],
          searchText: searchText.value
        });
        isSearchListShow.value = false;
        currentHoverIndex.value = 0;
        searchText.value = '';
        input.blur();
      }
      if (event.code === 'ArrowDown') {
        event.preventDefault()
        if (currentHoverIndex.value < showList.value.length - 1) {
          currentHoverIndex.value += 1;
        }
      }
      if (event.code === 'ArrowUp') {
        event.preventDefault()
        if (currentHoverIndex.value > 0) {
          currentHoverIndex.value -= 1;
        }
      }
    }

    function handleInputBlur(event: Event) {
      isSearchListShow.value = false;
      currentHoverIndex.value = 0;
    }

    function handleInput(event: Event) {
      event.preventDefault()
      const input = event.target as HTMLInputElement;
      searchText.value = input.value;
      emit('input', {
        value: input.value
      })
    }

    function handleMouseover(event: MouseEvent, index: number, params: {
      value?: string,
      label?: string,
      html?: string,
      type: 'type' | 'history',
      uid: string
    }) {
      currentHoverIndex.value = index;
    }

    function handleClickSearchItem(event: MouseEvent, index: number, params: {
      value?: string,
      label?: string,
      html?: string,
      type: 'type' | 'history',
      uid: string
    }) {
      emit('search', {
        ...params,
        searchText: searchText.value
      })
    }

    return {
      root, isSearchListShow, searchText,
      handleInput, handleMouseover, currentHoverIndex, handleInputKeyDown, showMenuList,
      searchBox, historyShowList, handleClickSearchItem, showList, handleInputBlur
    };
  }
});
</script>

<style scoped lang="scss">
$border-color: #57606E;
@import "../../style/input.common";

.search {
  height: 100%;
  width: 272px;

  .search-label {
    display: block;
    box-sizing: content-box;
    width: 100%;
    border: 1px solid #444d56;
    border-radius: 4px;
    transition: width 0.3s linear, height 0.3s linear;

    .search-box {
      display: flex;
      width: 100%;
      align-items: center;
      padding: 2px 0;

      .normal-search-input {
        display: block;
        height: 30px;
        width: 100%;
        padding: 2px 12px;
        margin: 0;
        border: 0;

        &::placeholder {
          // todo change placeholder
        }
      }

      .search-icon {
        font-size: 25px;
        color: #999999;
      }
    }

    .normal-search-box {
      border-bottom: 1px solid transparent;
    }

    .expand-search-box {
      border-top-left-radius: 4px;
      border-top-right-radius: 4px;
      border-bottom: 1px solid #444d56;
    }

    .search-list {
      width: 100%;
      max-height: 300px;
      background: #fff;
      transition: width 0.5s;

      .search-item {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        height: 44px;
        padding: 7px;
        width: 100%;
        line-height: 50px;
        border-bottom: 1px solid #e1e4e8;
        cursor: pointer;

        .icon {
          font-size: 20px;
          color: #999999;
        }

        .text {
          flex: 1;
          padding-left: 15px;
          height: 30px;
          text-align: left;
          width: 273px;
          line-height: 30px;
        }

        .tag {
          border-radius: 6px;
          padding: 0 10px;
          font-size: 12px;
          height: 25px;
          line-height: 25px;
          background: #f6f8fa;
          color: #6a737d;
        }
      }

      .search-item-active {
        background: #0366d6;
        color: #fff;

        .icon {
          color: #fff;
        }
      }

      .no-border {
        border-bottom: none;
      }
    }
  }

  .expand-search-label {
    width: 433px;
    max-height: 330px;
    background: #fff;
    //border-radius: 4px;
  }

  .fade-enter-active,
  .fade-leave-active {
    transition: all 0.5s linear;
    height: max-content;
  }

  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
    height: 0;
  }

}
</style>
