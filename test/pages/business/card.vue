<template>
  <metagraph-card
      :title="'新的灵感'"
      :description="'新的灵感来源于一次尝试'">
    <template #tag>
      <metagraph-tag>会计</metagraph-tag>
    </template>
  </metagraph-card>
</template>

<script lang="ts" setup>
import { MetagraphCard, MetagraphTag } from "@/index";
</script>

<style scoped>

</style>