<template>
  <metagraph-button :title="'点击'" :isLoading="isLoading" @click="handleClick">
    <template #icon>
      <StarFilled style="color: red" v-if="isActive"/>
      <StarOutlined v-else/>
    </template>
  </metagraph-button>
  <metagraph-tag :title="'ssss'" :color="'#41b883'"></metagraph-tag>
  <metagraph-tag :title="'知识库'"></metagraph-tag>
  <div class="test">测试css</div>
  <meta-word-count>sssss</meta-word-count>

  <form>
    <div>
      <label for="cvc">Enter your CVC
        <meta-popup-info
          img="@/assets/logo.png"
          :data-text="text">
        </meta-popup-info>
      </label>
      <input type="text" id="cvc">
    </div>
  </form>
  <meta-current-time
    @datechange="handleChange($event)"
    time-zone="America/New_York">The time is
  </meta-current-time>
  <metagraph-card
    :title="'新的灵感'"
    :description="'新的灵感来源于一次尝试'">
    <template #tag>
      <ant-tag>会计</ant-tag>
    </template>
  </metagraph-card>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { Tag } from 'ant-design-vue';
import { StarOutlined, StarFilled } from '@ant-design/icons-vue';
import { MetagraphButton, MetagraphCard, MetagraphTag } from "@/index";

export default defineComponent({
  name: "button-demo",
  components: { MetagraphTag, MetagraphCard, MetagraphButton, AntTag: Tag, StarOutlined, StarFilled },
  setup() {
    const jsCode = 'const a = 1;'
    const text = '1Your card validation code (CVC) is an extra security feature — it is the last 3 or 4 numbers on the back of your card.'
    const isActive = ref(true);
    const isLoading = ref(false);

    function handleChange(event: CustomEvent) {
      console.log(event.detail[0].value)
    }

    function handleClick() {
      isLoading.value = true;
      isActive.value = !isActive.value;
      setTimeout(() => {
        isLoading.value = false;
      }, 500)
    }

    return {
      handleChange,
      handleClick,
      isLoading,
      text,
      isActive
      // code: highlight(jsCode, languages.)
    }
  }
})
</script>

<style scoped lang="scss">
.test {
  color: var(--main-bg-color);
}
</style>
