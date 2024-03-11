// import { getMediaLinks } from '@/api/demo';
import PSimulationTable from '@/shared/p-simulation-table/p-simulation-table.vue';
// import { simulationTableFields } from '@/shared/helpers/variables';
import PButton from '@/shared/p-button/p-button.vue';
import PSelect from '@/shared/p-select/p-select.vue';
// import { useAlertService } from '@/shared/helpers/AlertService';
import { defineComponent, ref, onMounted, computed, inject } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import PConfusionMatrix from '@/shared/p-confusion-matrix/p-confusion-matrix.vue';
import PMetrixTable from '@/shared/p-metrix-table/p-metrix-table.vue';
import { simulationTableFields, resultTableFields } from '@/shared/helpers/variables';
import { downloadZipFile } from '@/api/downloadings';
import downloadFile from '@/shared/helpers/downloadFile';
import { useAlertService } from '@/shared/helpers/AlertService';
import PChart from '@/shared/p-chart/p-chart.vue';
import { getReportData } from '@/simulation/report/report.data';
import { io } from 'socket.io-client';

export default defineComponent({
  name: 'Demo',
  components: {
    'p-simulation-table': PSimulationTable,
    'p-button': PButton,
    'p-select': PSelect,
    'p-metrix-table': PMetrixTable,
    'p-confusion-matrix': PConfusionMatrix,
    'p-chart': PChart,
  },
  setup() {
    const router = useRouter();
    // const alertService = inject('alertService', () => useAlertService(), true);

    const selected = ref(null);
    const proportion = ref(0.75);
    const selectedType = ref(null);
    const signals = ref([{}]);

    const typeOptions = [
      { label: 'Grey noise', value: 'grey' },
      { label: 'Embient noise', value: 'embient' },
      { label: 'Pink noise', value: 'pink' },
    ];

    const workspaceRedirect = () => {
      router.push('/workspace');
    };

    // const startSimulation = () => {
    //   router.push('simulation/1?type=Clustering');
    // };

    const handleSelect = selection => {
      router.push(`simulation/1?type=${selection}`);
    };

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
    const methods = ref('All');

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
      return collapse.value ? 'Click to hide scheme' : 'Click to show scheme';
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
      selected,
      proportion,
      selectedType,
      typeOptions,
      signals,
      workspaceRedirect,
      startSimulation,
      handleSelect,

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
      // startSimulation,
      testData,
      socketData,
      methods,
    };
  },
});
