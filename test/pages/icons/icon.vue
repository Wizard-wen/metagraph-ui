<template>
  <comment-icon class="font-icon"></comment-icon>
  <knowledge-icon class="font-icon"></knowledge-icon>
  <repository-list-icon class="font-icon"></repository-list-icon>
  <search-icon class="font-icon"></search-icon>
  <star-icon class="font-icon"></star-icon>
  <add-icon class="font-icon"></add-icon>

  <div>
    <StarOutlined />Comment Icon is very buitiful
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { CommentIcon, KnowledgeIcon, RepositoryListIcon, SearchIcon, StarIcon, AddIcon } from '@/index';
import {StarOutlined} from '@ant-design/icons-vue';
export default defineComponent({
  name: "icon",
  components: {
    CommentIcon, KnowledgeIcon, RepositoryListIcon, SearchIcon, StarIcon, AddIcon,
    StarOutlined
  }
})
</script>

<style scoped lang="scss">
.font-icon {
  font-size: 24px;
}
</style>
