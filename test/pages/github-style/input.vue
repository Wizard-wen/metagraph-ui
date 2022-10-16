<template>
  <github-search-input
    @input="handleInputChange($event)"
    @search="handleSearch($event)"
    :search-type-list="typeList"
    :placeholder="'请输入搜索内容...'"
    :historyList="filterHistoryList"></github-search-input>
</template>

<script lang="ts">
import { v1 as uuidV1 } from 'uuid';
import { defineComponent, onMounted, ref } from 'vue';
import { GithubSearchInput } from "@/index";

export default defineComponent({
  name: "input-demo",
  components: { GithubSearchInput },
  setup() {
    const historyList: { label: string; value: string }[] = [
      { label: '持有至到期投资', value: '持有至到期投资' },
      { label: 'abc', value: 'abc' },
      { label: 'abc df', value: 'abc df' },
      { label: 'ed abc', value: 'ed abc' }
    ];

    const typeList: { label: string; value: string }[] = [
      { label: 'knowledge', value: 'knowledge' },
      { label: 'repository', value: 'repository' }
    ];

    const filterHistoryList = ref<{
      value: string;
      label: string;
    }[]>([])

    function handleInputChange(value: { value: string }) {
      console.log(value)
      if (value.value) {
        filterHistoryList.value = historyList.filter(item => item.label.includes(value.value))
      } else {
        filterHistoryList.value = historyList;
      }
    }

    function handleSearch(value: {
      value?: string;
      label?: string;
      html?: string;
      uid: string;
      type: 'type' | 'history';
      searchText: string;
    }) {
      console.log(value)
    }


    return {
      filterHistoryList,
      handleInputChange,
      typeList,
      handleSearch
    }
  }
})
</script>

<style scoped>

</style>
