import { defineComponent, ref, onMounted } from 'vue';
import chroma from 'chroma-js';

export default defineComponent({
  name: 'PConfusionMatrix',
  props: {
    matrixData: {
      type: Array,
      default() {
        return [];
      },
    },
    topValue: {
      type: Number,
      default: 0,
    },
    accuracy: {
      type: Number,
      default: 0,
    },
    oxTags: {
      type: Array,
      default() {
        return [];
      },
    },
    oyTags: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  setup(props) {
    const matrix = ref([]);
    const matrixTopValue = ref(0);

    const accuracy = ref(0);
    const oxRaw = ref([]);
    const ox = ref({});
    const oyRaw = ref([]);
    const oy = ref({});

    const matrixOneThirdsValue = ref(0);
    const scalePoints = ref([]);

    const scale = chroma.scale(['edf4fc', 'bad6eb', '62a7d2', '2676b8', '084388']);
    const pickColor = value => {
      return scale(value).toString();
    };

    const truncate = (str, maxLength) => {
      return str.length > maxLength ? str.slice(0, maxLength - 1) + '…' : str;
    };

    onMounted(() => {
      matrix.value = props.matrixData;
      matrixTopValue.value = props.topValue;
      accuracy.value = props.accuracy;

      oxRaw.value = props.oxTags;
      let xCounter = 0;
      oxRaw.value.forEach(item => {
        const key = truncate(item, 10);
        ox.value[`${xCounter}: ${key}`] = item;
        xCounter += 1;
      });

      oyRaw.value = props.oyTags;
      let yCounter = 0;
      oyRaw.value.forEach(item => {
        const key = truncate(item, 10);
        oy.value[`${yCounter}: ${key}`] = item;
        yCounter += 1;
      });

      matrixOneThirdsValue.value = matrixTopValue.value * (1 / 3);
      scale.domain([0, matrixTopValue.value]);

      const divisor = matrixTopValue.value >= 5 ? 5 : matrixTopValue.value;
      const scaleDivision = Math.floor(matrixTopValue.value / divisor);
      scalePoints.value.push(0);
      for (let i = 0; i < divisor; i += 1) {
        const lastValue = scalePoints.value[scalePoints.value.length - 1];
        scalePoints.value.push(lastValue + scaleDivision);
      }
    });

    return {
      matrix,
      matrixTopValue,
      accuracy,
      ox,
      oy,
      matrixOneThirdsValue,
      scalePoints,
      pickColor,
    };
  },
});
