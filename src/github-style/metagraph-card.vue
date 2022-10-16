<template>
  <div class="metagraph-card">
    <div class="card-head">
      <div class="name">
        {{ title }}
      </div>
      <div class="repository-type">
        <slot name="tag"></slot>
      </div>
    </div>
    <div class="description">
      {{ description }}
    </div>
    <div class="bottom">
      <slot name="control"></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: "metagraph-card",
  props: {
    title: {
      type: String,
      required: true
    },
    description: {
      type: String
    }
  }
})
</script>

<style scoped lang="scss">
.metagraph-card {
  border-radius: 6px;
  border: 1px solid #CCC;
  min-height: 75px;
  padding: 10px 15px;

  .card-head {
    display: flex;
    justify-content: space-between;

    .name {
      font-weight: bold;
      cursor: pointer;
    }

    .repository-type {
      margin-right: 0;
      border-radius: 3px;
    }
  }

  .description {
    text-align: left;
    font-size: 12px;
    height: auto;
    line-height: 25px;
    margin-bottom: 10px;
  }

  .domain-tag-list {
    height: 22px;
    text-align: left;
    margin-bottom: 10px;
  }

  .bottom {
    display: flex;
    justify-content: flex-start;
    gap: 15px;
  }
}


</style>
