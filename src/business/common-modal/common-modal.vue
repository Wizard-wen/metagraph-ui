<template>
  <ant-modal
    :width="800"
    :title="title"
    okText="确定"
    cancelText="取消"
    :visible="isModalVisible"
    :confirm-loading="modalConfirmLoading"
    :zIndex="9999"
    @cancel="handleModalCancel"
    @ok="handleModalOk">
    <slot name="content"></slot>
  </ant-modal>
</template>

<script lang="ts">
import {
  Modal
} from 'ant-design-vue';
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: "common-modal",
  props: {
    isModalVisible: {
      type: Boolean,
      required: true
    },
    title: {
      type: String,
      default: 'title'
    }
  },
  emits: ['close'],
  components: {
    AntModal: Modal,
  },
  setup(props, { emit }) {
    function handleModalOk() {
    }

    function handleModalCancel() {
    }

    const modalConfirmLoading = ref(false);
    return {
      modalConfirmLoading,
      handleModalOk,
      handleModalCancel
    }
  }
})
</script>

<style scoped>

</style>
