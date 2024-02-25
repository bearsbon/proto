import { defineComponent, ref, inject, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useAlertService } from '@/shared/helpers/AlertService';
import downloadFile from '@/shared/helpers/downloadFile';
import { downloadZipFile, downloadPdfFile, downloadCsvFile } from '@/api/downloadings';
import { getExperimentsList } from '@/api/experiments';
import { deleteSimulation } from '@/api/simulation';

export default defineComponent({
  compatConfig: { MODE: 3 },
  name: 'PSimulationTable',
  props: {
    isValid: {
      type: Boolean,
      default: true,
    },
    isError: {
      type: Boolean,
      default: false,
    },
    fields: {
      type: Array,
      default() {
        return [];
      },
    },
    busy: {
      type: Boolean,
      default: false,
    },
    page: {
      type: String,
      default: '',
    },
    pdfComponent: Object,
    downloadReportClic: Function,
  },
  emits: ['downloadReportClick'],
  setup(props, { emit }) {
    const router = useRouter();
    const alertService = inject('alertService', () => useAlertService(), true);
    const emptyTableText = 'To start your first simulation demo click Create New';

    const isLoading = ref(false);
    const items = ref([]);

    const selectedSim = ref(null);
    const isDeleting = ref(false);
    const isDownloading = ref(false);

    const pdfComponent = props.pdfComponent;

    const getExperiments = () => {
      const page = props.page;

      isLoading.value = true;

      getExperimentsList(page)
        .then(({ data }) => {
          if (page === 'demo') {
            data.forEach(el => {
              items.value.push({
                id: el.id,
                simulation: el.title,
                filezipname: el.dataFiles.find(el => el.dataType === 'embedding').filename,
                sourceFile: el.dataFiles.find(el => el.dataType === 'source').filename,
                modelMethod: el.modelMethod,
                pdf: el.dataFiles.find(el => el.dataType === 'report').filename,
                dataFiles: [...el.dataFiles],
              });
            });
          } else {
            data.forEach(el => {
              items.value.unshift({
                id: el.id,
                simulation: el.title,
                filezipname: el.embeddingArchiveFileName,
                modelType: el.modelType,
                modelMethod: el.modelMethod,
                pdf: el.filepdfname,
              });
            });
          }
        })
        .then(() => {
          isLoading.value = false;
        })
        .catch(({ message }) => {
          alertService.showError(message);
        })
        .finally(() => {
          if (router.currentRoute.value.fullPath === '/demo') {
            document.querySelectorAll('tbody tr')[1].style.backgroundColor = '#fff';
            document.querySelector('table').style.background = '#fff';
            document.querySelectorAll('td')[5].style.visibility = 'hidden';
            const el = document.querySelectorAll('td')[1];
            el.style.cssText = 'position: relative; top: 25px; border-top: 0';
            el.classList.add('customTd');
          }
        });
    };

    const openReport = item => {
      if (props.page === 'demo') {
        return;
      }

      router.push({
        name: 'report',
        params: { id: item.id },
        query: { type: item.modelType === 'cluster' ? 'Clustering' : 'Classification' },
      });
    };

    const downloadCsv = fileName => {
      const page = props.page;
      downloadCsvFile(page, fileName)
        .then(({ data }) => {
          downloadFile(data, fileName);
        })
        .catch(({ message }) => {
          alertService.showError(message);
        });
    };

    const downloadZip = (simulationId, fileName, dataFiles) => {
      if (props.page === 'demo') {
        downloadZipFile(dataFiles.find(el => el.dataType === 'embedding').id, props.page)
          .then(({ data }) => {
            downloadFile(data, fileName);
          })
          .catch(({ message }) => {
            alertService.showError(message);
          });
        return;
      } else {
        downloadZipFile(simulationId, props.page)
          .then(({ data }) => {
            downloadFile(data, fileName);
          })
          .catch(({ message }) => {
            alertService.showError(message);
          });
      }
    };

    const downloadReport = (id, isDownloading, fileName) => {
      if (props.page === 'demo') {
        const name = fileName.replace(' ', '%20').replace('#', '%23');
        downloadPdfFile('demo', id).then(({ data }) => {
          downloadFile(data, name);
        });
        return;
      }
      emit('downloadReportClick', id, isDownloading);
    };

    const deleteSim = simId => {
      isLoading.value = true;
      deleteSimulation(simId).then(() => {
        items.value = items.value.filter(el => el.id !== simId);
        isLoading.value = false;
      });
      isShown.value = false;
    };

    const isShown = ref(false);
    const showModal = () => {
      isShown.value = true;
    };
    const hideModal = () => {
      isShown.value = false;
    };

    onMounted(() => {
      getExperiments();
    });

    return {
      downloadReport,
      isLoading,
      items,
      openReport,
      emptyTableText,
      downloadZip,
      downloadCsv,
      deleteSim,
      selectedSim,
      isDeleting,
      isShown,
      showModal,
      hideModal,
      isDownloading,
    };
  },
});
