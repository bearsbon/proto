import { defineComponent, onMounted, ref, computed, watchEffect, watch } from 'vue';
import { Chart as ChartJS, Tooltip, Legend, PointElement, LinearScale } from 'chart.js';
import { Bubble } from 'vue-chartjs';

ChartJS.register(LinearScale, PointElement, Tooltip, Legend);

export default defineComponent({
  name: 'p-chart',
  components: {
    Bubble,
  },
  props: {
    data: Array,
    type: String,
    label: String,
    palette: Object,
    labelsArr: Array,
    chartStyle: Object,
    isPdf: Boolean,
    modalId: String,
    alorithmTitle: String,
    isInf: Boolean,
    isClustering: Boolean,
    isPredictedLabel: Boolean,
  },
  setup(props) {
    const chartData = ref({
      datasets: [],
    });

    const collapse = ref(true);

    const isPdf = props.isPdf;
    const modalId = props.modalId;
    const alorithmTitle = props.alorithmTitle;
    const isPredictedLabel = props.isPredictedLabel;

    const toggleText = computed(() => {
      return collapse.value ? 'Click to collapse' : 'Click to expand';
    });

    const chart = ref(null);

    const chartLegend = ref([]);
    const chartOptions = ref({
      responsive: true,
      maintainAspectRatio: false,
      animation: {
        duration: 0,
      },
      scales: {
        x: {
          ticks: {
            display: false,
          },
        },
        y: {
          ticks: {
            display: false,
          },
        },
      },
      elements: {
        point: {
          radius: 5,
        },
      },
      plugins: {
        tooltip: {
          enabled: false,
        },
        legend: {
          display: isPdf && !props.isClustering ? true : false,
          position: 'bottom',
          align: 'center',
          maxWidth: 500,
          labels: {
            generateLabels: () => {
              return chartLegend.value;
            },
          },
        },
      },
    });

    const modalChartOptions = ref({
      responsive: true,
      maintainAspectRatio: false,
      animation: {
        duration: 0,
      },
      scales: {
        x: {
          ticks: {
            display: false,
          },
        },
        y: {
          ticks: {
            display: false,
          },
        },
      },
      elements: {
        point: {
          radius: 5,
        },
      },
      plugins: {
        tooltip: {
          // enabled: false,
        },
        legend: {
          display: props.isClustering ? false : true,
          position: 'bottom',
          align: 'center',
          maxWidth: 500,
          labels: {
            generateLabels: () => {
              return chartLegend.value;
            },
          },
        },
      },
    });

    watch(
      () => props.data,
      newData => {
        if (chart.value && chart.value?.chart?.data?.datasets.length) {
          for (let i = 0; i < chart.value?.chart?.data?.datasets.length; i++) {
            chart.value.chart.data.datasets[i].data = [...chart.value.chart.data.datasets[i].data, ...newData[i].data];
          }

          chart.value?.chart?.update();
        } else {
          const res = newData.map((el, index) => {
            return { backgroundColor: props.palette[index], ...el };
          });
          chart.value?.chart?.data?.datasets = res;
          chart.value?.chart?.update();
        }
      }
      // { deep: true }
    );

    onMounted(() => {
      for (const prop in props.palette) {
        chartLegend.value.push({ text: prop, fillStyle: props.palette[prop] });
      }

      chartData.value.datasets = props.data?.map((item, index) => {
        item.backgroundColor = props.palette[index];
        // Логика отрисовки predicted label на графике
        // item.backgroundColor = props.palette[item.label];
        // if (item.predictedLabel?.length) {
        //   if (item.label !== item.predicted_label) {
        //     item.borderColor = props.palette[item.predicted_label];
        //     item.borderWidth = 4;
        //   }
        // }
        return item;
      });
    });

    return {
      chartData,
      chartOptions,
      toggleText,
      collapse,
      isPdf,
      modalId,
      modalChartOptions,
      alorithmTitle,
      isPredictedLabel,
      chart,
    };
  },
});
