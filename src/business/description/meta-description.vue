<template>
  {{ msg }}
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: "meta-description",
  setup() {
    const msg = ref('ssss');
    return {
      msg
    }
  }
})
</script>

<style scoped lang="scss">

</style>
