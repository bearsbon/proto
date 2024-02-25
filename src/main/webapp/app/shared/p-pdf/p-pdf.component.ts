import { computed, defineComponent, onMounted, ref } from 'vue';
import Vue3Html2pdf from 'vue3-html2pdf';
import PConfusionMatrix from '@/shared/p-confusion-matrix/p-confusion-matrix.vue';
import PMetrixTable from '@/shared/p-metrix-table/p-metrix-table.vue';
import PChart from '@/shared/p-chart/p-chart.vue';
import { simulationTableFields } from '@/shared/helpers/variables';

export default defineComponent({
  name: 'PPdf',
  components: {
    'p-chart': PChart,
    'p-metrix-table': PMetrixTable,
    'vue3-html2pdf': Vue3Html2pdf,
    'p-confusion-matrix': PConfusionMatrix,
  },
  props: {
    inferenceChart: Object,
    report: Object,
    palette: Object,
    summaryInformation: Object,
    isPdf: Boolean,
    type: String,
    outputFilesize: String,
    inputFilesize: String,
    metricsData: Object,
    embeddingFilesSize: String,
    fromTable: Boolean,
  },
  setup(props) {
    const collapse = ref(true);
    const fields = computed(() => {
      return props.report.splitter ? simulationTableFields.pdfClass : simulationTableFields.pdfClaster;
    });
    const chartStyle = {
      width: '550px',
      height: '280px',
    };
    const html2Pdf = ref(null);
    function generateReport() {
      setTimeout(() => {
        html2Pdf.value.generatePdf();
      }, 0);
    }
    const method = props.report.modelType;
    const subTitle = props.type === 'Classification' ? 'Method' : 'Algorithm';
    const metricsData = props.metricsData;
    const embeddingFilesSize = props.embeddingFilesSize;

    async function beforeDownload({ html2pdf, options, pdfContent }) {
      await html2pdf()
        .set({
          ...options,
          pagebreak: { after: 'br', mode: ['avoid-all', 'css', 'legacy'] },
        })
        .from(pdfContent)
        .toPdf()
        .get('pdf')
        .then(pdf => {
          const totalPages = pdf.internal.getNumberOfPages();
          for (let i = 1; i <= totalPages; i++) {
            pdf.setPage(i);
            pdf.setFontSize(10);
            pdf.setTextColor(150);
            pdf.text('Page ' + i + ' of ' + totalPages, pdf.internal.pageSize.getWidth() * 0.85, pdf.internal.pageSize.getHeight() - 0.3);
          }
        })
        .save();
    }

    const fromTable = props.fromTable;

    return {
      generateReport,
      html2Pdf,
      beforeDownload,
      collapse,
      chartStyle,
      fields,
      method,
      subTitle,
      metricsData,
      embeddingFilesSize,
      fromTable,
    };
  },
});
