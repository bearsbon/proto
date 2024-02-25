import { defineComponent, computed, ref, onMounted } from 'vue';

export default defineComponent({
  compatConfig: { MODE: 3 },
  name: 'PSelect',
  model: {
    event: 'update:modelValue',
  },
  props: {
    modelValue: Object,
    options: {
      type: Array,
      default: [],
    },
    label: {
      type: String,
      default: '',
    },
    outputLabel: {
      type: String,
      default: '',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    defaultValue: {
      type: Array,
      default: null,
    },
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    let selected = ref({});
    onMounted(() => {
      props.defaultValue ? (selected.value = props.defaultValue[0]) : (selected.value[props.label] = 'All (default)');
    });

    const invalidData = computed(() => {
      return 'error';
    });

    const selectItem = item => {
      console.log(item);
      selected.value = item;
      emit('update:modelValue', item);
    };

    return {
      invalidData,
      selectItem,
      selected,
    };
  },
});
