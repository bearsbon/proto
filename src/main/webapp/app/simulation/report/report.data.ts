import { ref } from 'vue';
import { useRoute } from 'vue-router';
import { getReport } from '@/api/report';
import { colors } from '@/shared/p-chart/chartColors';
import { simulationTableFields } from '@/shared/helpers/variables';

export function getReportData() {
  const isLoading = ref(true);
  const route = useRoute();
  const pdfComponent = ref(null);
  const report = ref(null);
  const reportData = ref([]);
  const summaryInformation = ref([]);
  const tableData = ref([]);
  const embeddingFilesSize = ref(null);
  const isPredictedLabel = ref(false);
  const metricsData = ref(null);

  const palette = ref({
    inferencePalette: {},
    classPalette: {},
  });

  async function getData(id) {
    await getReport(id).then(({ data }) => {
      report.value = data;
      reportData.value = data.exchanges;
      embeddingFilesSize.value = formatBytes(data.embeddingFilesSize);

      data.exchanges.forEach(el => {
        if (data.modelType === 'classify') {
          tableData.value.push({
            algorithm: el.model.name,
            accuracy: el.result.metrics.accuracy.toFixed(4),
          });
          metricsData.value = parseMetrix(el.result.metrics);
        }

        el.palette = parsePalette(el.result.modelResult.labels, 'classPalette');
      });

      isLoading.value = false;
    });
    return {
      report,
      reportData,
      summaryInformation,
      isLoading,
      tableData,
      embeddingFilesSize,
      metricsData,
      palette,
    };
  }

  function formatBytes(bytes, decimals = 2) {
    if (!+bytes) return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
  }

  function parseMetrix(metrics) {
    let metrix = {
      data: [],
      fields: simulationTableFields.report,
      accuracy: 0,
    };

    metrix.accuracy = metrics.accuracy;
    for (const key in metrics) {
      if (key !== 'accuracy') {
        metrix.data.push({ ...metrics[key], name: key });
      }
    }
    return metrix;
  }

  function parsePalette(items, type, resclassLables = null) {
    items.forEach((item, index) => {
      if (type === 'inferencePalette') {
        palette.value[type][item] = colors[resclassLables.indexOf(item)];
      } else {
        palette.value[type][item] = colors[index];
      }
    });
  }

  return {
    getData,
    report,
    reportData,
    palette,
    pdfComponent,
    summaryInformation,
    isLoading,
    tableData,
    isPredictedLabel,
    embeddingFilesSize,
    metricsData,
    parsePalette,
  };
}
