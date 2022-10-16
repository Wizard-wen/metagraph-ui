<template>
  <div>
    <slot/>
    {{ displayTime }}
    <button @click="handle">点击</button>
  </div>
</template>

<script setup lang="ts">
import {ref, computed} from 'vue';

const props = defineProps({
  timeZone: {
    type: String,
    default: 'America/Los_Angeles',
  }
});
const emit = defineEmits(['datechange']);

const currentDateTime = ref(new Date());
const displayTime = computed(() =>
  currentDateTime.value.toLocaleString('en-US', {
    timeZone: props.timeZone,
  })
);

function handle() {
  emit('datechange', displayTime);
}

setInterval(() => {
  currentDateTime.value = new Date();

}, 1000);
</script>
