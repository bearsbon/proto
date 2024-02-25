import { defineComponent } from 'vue';

export default defineComponent({
  name: 'PMetrixTable',
  props: {
    items: {
      type: Array,
      default() {
        return [];
      },
    },
    fields: Array,
    accuracy: Number,
    label: String,
  },
});
