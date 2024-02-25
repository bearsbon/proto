import { defineComponent } from 'vue';

export default defineComponent({
  compatConfig: { MODE: 3 },
  name: 'PButton',
  props: {
    variant: String,
    disabled: Boolean,
  },
  emits: ['click'],
});
