import { defineComponent, computed } from 'vue';

export default defineComponent({
  compatConfig: { MODE: 3 },
  name: 'PUploadFile',
  model: {
    prop: 'modelValue',
    event: 'update:modelValue',
  },
  props: {
    modelValue: Array,
    isValid: {
      type: Boolean,
      default: true,
    },
    isError: {
      type: Boolean,
      default: false,
    },
    label: {
      type: String,
      default: '',
    },
    dataFile: {
      type: Array,
    },
    isInference: {
      type: Boolean,
    },
    isDisabled: {
      type: Boolean,
    },
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const value = computed({
      get: () => props.modelValue,
      set: val => {
        emit('update:modelValue', val);
      },
    });

    const invalidData = computed(() => {
      return 'error';
    });

    function formatNames(files) {
      return files.length === 1 ? files[0].name : `${files.length} files selected`;
    }

    return {
      value,
      invalidData,
      formatNames,
    };
  },
});
