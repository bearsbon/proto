import { defineComponent, ref, onMounted, inject, watch, computed } from 'vue';
import { useRouter } from 'vue-router';
import { initSimulation } from '@/api/simulation';
import PUploadFile from '@/shared/p-upload-file/p-upload-file.vue';
import PSelect from '@/shared/p-select/p-select.vue';
import PButton from '@/shared/p-button/p-button.vue';
import { useAlertService } from '@/shared/helpers/AlertService';
import { getReport } from '@/api/report';
import { getNextSimulationTitle } from '@/api/experiments';
import { getModels } from '@/api/models';

export default defineComponent({
  name: 'SimulationCreate',
  components: {
    'p-upload-file': PUploadFile,
    'p-select': PSelect,
    'p-button': PButton,
  },
  props: {
    page: {
      type: String,
      default: 'workspace',
    },
  },
  setup(props) {
    const router = useRouter();
    const alertService = inject('alertService', () => useAlertService(), true);

    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    const type =
      router.currentRoute.value.query.type === 'clustering' || router.currentRoute.value.query.type === 'Clustering'
        ? 'Clustering'
        : 'Classification';
    const modelType = type === 'Clustering' ? 'cluster' : 'classify';

    const experimentsAmount = ref('001');
    let repeatAmount = '';

    const header = ref(type + ' #' + experimentsAmount.value + `-${String(year).slice(-2)}/${month}/${day}` + repeatAmount);
    router.currentRoute.value.query.name ? (header.value = router.currentRoute.value.query.name + '-r1') : '';

    getNextSimulationTitle('workspace', modelType).then(data => {
      header.value = data.data;
    });

    const isRenameActive = ref(false);
    const renameHeader = () => (isRenameActive.value = true);
    const submitNewName = () => (isRenameActive.value = false);
    const maxFileWeight = ref(150);
    const selectedAlgorithm = ref(null);

    // const clusteringOptions = ref([
    //   { name: 'All (default)', value: 'all' },
    //   { name: 'DBSCAN', value: 'cluster.dbscan' },
    //   { name: 'KMEANS', value: 'cluster.kmeans' },
    //   { name: 'HDBSCAN', value: 'cluster.hdbscan' },
    //   { name: 'SPECTRAL', value: 'cluster.spectral' },
    //   { name: 'MEANSHIFT', value: 'cluster.meanshift' },
    // ]);
    // const classificationOptions = ref([
    //   { name: 'All (default)', value: 'all' },
    //   { name: 'SVM', value: 'classify.svm' },
    //   { name: 'SGD', value: 'classify.sgd' },
    //   { name: 'Logistic', value: 'classify.logistic' },
    //   { name: 'MLP', value: 'classify.mlp' },
    // ]);

    getModels(modelType).then(data => {
      multiselectOptions.value = [{ name: 'All (default)', sid: '*' }, ...data.data];
    });
    const multiselectValue = ref({ name: 'All (default)', sid: '*' });
    const multiselectOptions = ref(null);

    const splitterType = [
      { name: 'Random', value: 'random' },
      { name: 'Sequential', value: 'sequential' },
    ];
    const selectedSplitterType = ref({ name: 'Random', value: 'random' });

    const showTooltip = ref(false);

    const redirectBack = () => {
      type === 'Clustering' ? router.push('/workspace') : router.push('/classification');
    };

    const dataFile = ref(null);
    const inferenceFile = ref(null);
    const disabled = dataFile.value === null ? ref(true) : ref(false);
    const isProcessing = ref('File processing may take few minutes');

    const tooltip =
      type === 'Classification'
        ? 'After extracting the embeddings, they are classified using different methods. You can choose one of them to get the best result or use your own. Please contact us so that we can set it up for you.'
        : 'After extraction the embeddings are clustered in the same way as raw data clustering. You can choose from different algorithms to get the best result or you can use your own. Please contact us to install it for you.';

    const modelList = ref([]);
    const clusterList = ref([]);
    const classifyList = ref([]);
    const splitterList = ref([]);

    const fieldDisabledToggle = ref({
      model: false,
      cluster: false,
      classify: false,
      splitter: false,
      proportion: false,
    });
    const modelValue = ref(null);
    const clusterValue = ref(null);
    const classifyValue = ref(null);
    const splitterValue = ref(null);

    watch(
      () => clusterValue.value,
      () => {
        fieldDisabledToggle.value.classify = Boolean(clusterValue.value);
        fieldDisabledToggle.value.proportion = Boolean(clusterValue.value);
        fieldDisabledToggle.value.splitter = Boolean(clusterValue.value);

        if (clusterValue.value) {
          classifyValue.value = null;
          proportion.value = null;
          splitterValue.value = null;
        }
      }
    );

    watch(
      () => classifyValue.value,
      () => {
        fieldDisabledToggle.value.cluster = Boolean(classifyValue.value);

        if (classifyValue.value) {
          clusterValue.value = null;
        }
      }
    );

    watch(
      () => [inferenceFile.value, dataFile.value],
      () => {
        if (inferenceFile.value && dataFile.value.some(el => el.name === inferenceFile.value.name)) {
          alertService.showError(`Dataset and validation files cannot match!`);
          inferenceFile.value = [];
        }
      }
    );

    const dataFormatList = [
      {
        id: 1,
        valuefront: '.csv',
      },
    ];

    const proportion = ref(0.75);

    const isButtonDisabled = computed(() => {
      let isDisabled = true;

      if (dataFile.value) {
        isDisabled = false;
      }
      return isDisabled;
    });

    const onRun = ref(false);
    const runSimulation = () => {
      if (!multiselectValue.value) {
        alertService.showError(`Please select ${type} method`);
        return;
      }

      if (type === 'Classification' && !selectedSplitterType.value) {
        alertService.showError(`Please select splitter type`);
        return;
      }

      if (!header.value.includes('#') && !header.value.includes('/')) {
        alertService.showError('The name of simulation should contain # and date yy/mm/dd!');
        return;
      }

      const getDataFilesCount = dataFile.value.length;
      if (getDataFilesCount > 20) {
        alertService.showError('Maximum number of files is 20');
        return;
      }

      if (type === 'Classification' && getDataFilesCount < 2) {
        alertService.showError('At least two files are required to run the simulation');
        return;
      }

      const getInferenceFileCount = inferenceFile.value?.length;
      if (getInferenceFileCount > 20) {
        alertService.showError('Maximum number of files is 20');
        return;
      }

      let dataFileWeighIsBig = false;
      for (let i = 0; i < dataFile.value.length; i += 1) {
        const fileSize = dataFile.value[i].size / 1024 / 1024;
        if (fileSize >= maxFileWeight.value) {
          const fileName = dataFile.value[i].name;
          alertService.showError(`The "${fileName}" file weighs more than ${maxFileWeight.value} MB`);
          dataFileWeighIsBig = true;
          break;
        }
      }
      if (dataFileWeighIsBig) {
        return;
      }

      let inferenceFileWeighIsBig = false;
      if (inferenceFile.value?.length) {
        for (let i = 0; i < inferenceFile.value.length; i += 1) {
          const fileSize = inferenceFile.value[i].size / 1024 / 1024;
          if (fileSize >= maxFileWeight.value) {
            const fileName = inferenceFile.value[i].name;
            alertService.showError(`The "${fileName}" file weighs more than ${maxFileWeight.value} MB`);
            inferenceFileWeighIsBig = true;
            break;
          }
        }
      }
      if (inferenceFileWeighIsBig) {
        return;
      }

      const fd = new FormData();

      fd.append('model_sid', multiselectValue.value.sid);
      fd.append('simulation_title', header.value);

      if (type === 'Classification') {
        fd.append('train_size', String(proportion.value));
        fd.append('split_mode', selectedSplitterType.value.value);
      }
      if (dataFile.value) {
        dataFile.value.forEach(file => {
          fd.append('input_files', file);
        });
      }
      if (inferenceFile.value) {
        fd.append('inference_files', inferenceFile.value);
      }

      onRun.value = true;
      const wrapper = document.getElementsByClassName('no-js');
      wrapper ? (wrapper[0].style.overflowY = 'hidden') : null;
      window.scrollTo(0, 0);
      let x = 0;
      let intervalID = setInterval(() => {
        isProcessing.value = isProcessing.value + '.';
        x++;
        if (x === 4) {
          isProcessing.value = 'File processing may take few minutes';
          x = 0;
        }
      }, 500);

      initSimulation(modelType, fd)
        .then(({ data }) => {
          window.clearInterval(intervalID);
          router.push({
            name: 'report',
            params: { id: data.id },
            query: { type: type },
          });
        })
        .catch(({ message }) => {
          alertService.showError(message);
        })
        .finally(() => {
          wrapper ? (wrapper[0].style.overflowY = 'auto') : null;
          onRun.value = false;
        });
    };

    const checkDatafileAndType = () => {
      if (type === 'Classification' && dataFile.value !== null) {
        return true;
      } else return false;
    };

    return {
      header,
      isRenameActive,
      renameHeader,
      submitNewName,
      redirectBack,

      dataFile,
      inferenceFile,

      fieldDisabledToggle,
      modelList,
      modelValue,
      clusterList,
      clusterValue,
      classifyList,
      classifyValue,
      splitterList,
      splitterValue,

      proportion,

      dataFormatList,
      selectedAlgorithm,
      showTooltip,
      disabled,
      splitterType,
      selectedSplitterType,
      onRun,
      isButtonDisabled,
      runSimulation,
      checkDatafileAndType,
      multiselectOptions,
      multiselectValue,
      type,
      tooltip,
      isProcessing,
    };
  },
});
