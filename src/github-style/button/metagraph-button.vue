<script lang="tsx">
import { computed, defineComponent, renderSlot, toRef } from 'vue';
import { LoadingOutlined } from '@ant-design/icons-vue';

export default defineComponent({
  name: "github-button",
  props: {
    title: {
      type: String,
      required: true
    },
    disabled: {
      type: Boolean,
      default: false
    },
    isLoading: {
      type: Boolean,
      default: false
    }
  },
  components: {
    LoadingOutlined
  },
  setup(props, { slots }) {

    const isLoading = toRef(props, 'isLoading');
    const disabled = toRef(props, 'disabled');
    const isDisabled = computed(() => disabled.value || isLoading.value);
    return () => <button
      disabled={isDisabled.value}
      class="meta-normal-button">
      {isLoading.value ? <LoadingOutlined/>
        : renderSlot(slots, 'icon')}
      {props.title}
    </button>
  }
})
</script>

<style scoped lang="scss">
// 按钮公共样式
.meta-normal-button {
  appearance: none;
  background-color: #fafbfc;
  border: 1px solid rgba(27, 31, 35, 0.15);
  border-radius: 6px;
  box-shadow: rgba(27, 31, 35, 0.04) 0 1px 0,
  rgba(255, 255, 255, 0.25) 0 1px 0 inset;
  box-sizing: border-box;
  color: #24292e;
  cursor: pointer;
  display: inline-block;
  font-family: -apple-system, system-ui, "Segoe UI", Helvetica, Arial,
  sans-serif, "Apple Color Emoji", "Segoe UI Emoji";
  font-size: 12px;
  font-weight: 500;
  line-height: 1.5;
  list-style: none;
  padding: 3px 10px;
  position: relative;
  transition: background-color 0.2s cubic-bezier(0.3, 0, 0.5, 1);
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  vertical-align: middle;
  white-space: nowrap;
  word-wrap: break-word;

  &:hover {
    background-color: #f3f4f6;
    text-decoration: none;
    transition-duration: 0.1s;
  }

  &:disabled {
    background-color: #fafbfc;
    border-color: rgba(27, 31, 35, 0.15);
    color: #959da5;
    cursor: default;
  }

  &:active {
    background-color: #edeff2;
    box-shadow: rgba(225, 228, 232, 0.2) 0 1px 0 inset;
    transition: none 0s;
  }

  &:focus {
    outline: 1px transparent;
  }

  &:before {
    display: none;
  }

  &::-webkit-details-marker {
    display: none;
  }
}
</style>
