import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';
import PSimulationTable from '@/shared/p-simulation-table/p-simulation-table.vue';
import { simulationTableFields } from '@/shared/helpers/variables';
import PButton from '@/shared/p-button/p-button.vue';
import PPdf from '@/shared/p-pdf/p-pdf.vue';
import { getReportData } from '@/simulation/report/report.data';

export default defineComponent({
  name: 'Workspace',
  components: {
    'p-pdf': PPdf,
    'p-button': PButton,
    'p-simulation-table': PSimulationTable,
  },
  setup() {
    const router = useRouter();
    const { getData, palette, report, reportData, summaryInformation, isLoading, tableData, embeddingFilesSize, metricsData } =
      getReportData();
    const pdfComponent = ref(null);
    const fields = simulationTableFields.workspace;
    const dataLoading = ref(false);
    const items = ref([]);
    const type = 'Clustering';

    const newSimulation = () => {
      router.push({ name: 'create', query: { type: 'classification' } });
    };

    async function downloadReportClick(id, isDownloading) {
      await getData(id);
      pdfComponent.value.generateReport();
      isDownloading = false;
    }

    return {
      fields,
      items,
      newSimulation,
      dataLoading,
      downloadReportClick,
      report,
      reportData,
      palette,
      summaryInformation,
      type,
      isLoading,
      tableData,
      embeddingFilesSize,
      metricsData,
      pdfComponent,
    };
  },
});
