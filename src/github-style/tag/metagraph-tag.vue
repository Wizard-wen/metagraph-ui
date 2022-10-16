<script lang="tsx">
import { defineComponent } from 'vue';

export default defineComponent({
  name: "metagraph-tag",
  props: {
    title: {
      type: String,
      required: true
    },
    color: {
      type: String
    }
  },
  setup(props) {

    const styleObj = {
      background: props.color
    }
    return () =>
      <div
        class={['metagraph-tag', props.color ? 'tag-color-border' : 'tag-border']}
        style={{
          background: props.color || '#FFF',
          color: props.color ? '#FFF' : '#2c3e50'
        }}>
        {props.title}
      </div>
  }
})
</script>

<style scoped lang="scss">
.metagraph-tag {
  font-size: 12px;
  border-radius: 12px;
  padding: 2px 8px;
  width: max-content;
  line-height: 1.5;
}

.tag-border {
  border: 1px solid #d0d7de;
}

.tag-color-border {

}
</style>
