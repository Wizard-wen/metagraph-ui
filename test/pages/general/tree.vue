<template>
  1
  <metagraph-tree :tree-list="treeList"></metagraph-tree>
</template>

<script lang="ts" setup>
import {ref} from "vue";
import MetagraphTree from "../../../src/general/metagraph-tree/metagraph-tree.vue";

const treeList = ref([
  {
    title: 'section 1',
    name: 'a',
    key: '1',
    children: [
      {
        title: 'section 1-1',
        name: 'a',
        key: 2,
        children: [
          {
            title: 'section 1-1-1',
            name: 'aa',
            key: 3,
          }
        ]
      }
    ]
  },
  {
    title: 'section 2',
    name: 'b',
    key: '2',
  }
])
</script>

<style scoped>

</style>