import { defineComponent, ref, onMounted, computed, inject } from 'vue';
import PButton from '@/shared/p-button/p-button.vue';
import { useRoute, useRouter } from 'vue-router';
import PConfusionMatrix from '@/shared/p-confusion-matrix/p-confusion-matrix.vue';
import PMetrixTable from '@/shared/p-metrix-table/p-metrix-table.vue';
import { simulationTableFields, resultTableFields } from '@/shared/helpers/variables';
import PPdf from '@/shared/p-pdf/p-pdf.vue';
import { downloadZipFile } from '@/api/downloadings';
import downloadFile from '@/shared/helpers/downloadFile';
import { useAlertService } from '@/shared/helpers/AlertService';
import PChart from '@/shared/p-chart/p-chart.vue';
import { getReportData } from '@/simulation/report/report.data';
import router from '@/router';
import { io } from 'socket.io-client';

export default defineComponent({
  name: 'Report',
  components: {
    'p-metrix-table': PMetrixTable,
    'p-confusion-matrix': PConfusionMatrix,
    'p-button': PButton,
    'p-pdf': PPdf,
    'p-chart': PChart,
  },
  setup: function () {
    const { getData, palette, report, reportData, summaryInformation, isLoading, tableData, embeddingFilesSize, metricsData } =
      getReportData();
    const route = useRoute();
    const fields = simulationTableFields.report;
    const chartStyle = {
      width: '500px',
    };
    const pdfComponent = ref(null);
    const collapse = ref(true);
    const alertService = inject('alertService', () => useAlertService(), true);
    const type = router.currentRoute.value.query.type;
    const resultTableItems = ref(null);
    const subTitle = type === 'Classification' ? 'Method' : 'Algorithm';
    const page = router.currentRoute.value.name;
    const socketData = ref(null);

    const socket = io('ws://localhost:8000');

    const testData = ref(null);

    const startSimulation = () => {
      console.log('start');
      socket.emit('start');

      socket.on('collect', res => {
        const data = JSON.parse(res);

        reportData.value = data;
        socketData.value = data;

        testData.value = data.model_result;
        isLoading.value = false;
      });
    };

    const stopSimulation = () => {
      console.log('stop');
      socket.emit('stop');
    };

    const downloadPdfFile = () => {
      pdfComponent.value.generateReport();
    };

    const downloadZip = (simId, fileName, page) => {
      downloadZipFile(simId, page)
        .then(({ data }) => {
          downloadFile(data, fileName);
        })
        .catch(({ message }) => {
          alertService.showError(message);
        });
    };

    const toggleText = computed(() => {
      return collapse.value ? 'Click to collapse' : 'Click to expand';
    });

    const createNew = () => {
      router.push({ name: 'create', query: { type: type } });
    };

    const repeat = () => {
      router.push({ name: 'create', query: { type: type } });
    };

    const isClassification = () => {
      return type === 'Classification' ? true : false;
    };

    onMounted(() => {
      getData(route.params.id);
    });

    return {
      report,
      fields,
      collapse,
      toggleText,
      pdfComponent,
      downloadPdfFile,
      downloadZip,
      palette,
      chartStyle,
      summaryInformation,
      createNew,
      type,
      repeat,
      reportData,
      isClassification,
      isLoading,
      embeddingFilesSize,
      resultTableFields,
      resultTableItems,
      tableData,
      subTitle,
      metricsData,
      page,
      stopSimulation,
      startSimulation,
      testData,
    };
  },
});
