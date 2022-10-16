<template>
  <Icon>
    <template #component>
      <svg viewBox="0 0 1024 1024" fill="currentColor" width="1em" height="1em">
        <path
          d="M512 832a32 32 0 0 0 32-32v-256h256a32 32 0 0 0 0-64h-256V224a32 32 0 0 0-64 0v256H224a32 32 0 0 0 0 64h256v256a32 32 0 0 0 32 32"
          ></path>
      </svg>
    </template>
  </Icon>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Icon from '@ant-design/icons-vue';

export default defineComponent({
  components: {
    Icon
  }
});
</script>

