const simulationTableFields = {
  default: [
    {
      key: 'simulation',
      label: 'Simulation example',
      class: 'text-center',
    },
    {
      key: 'sourceFile',
      label: 'Input data structure example',
      class: 'text-center',
    },
    {
      key: 'filezipname',
      label: 'Output embeddings example',
      class: 'text-center',
    },
    {
      key: 'report',
      label: 'Report example',
      class: 'text-center',
    },
  ],
  workspace: [
    {
      key: 'simulation',
      label: 'Simulation name',
      class: 'text-center',
    },
    {
      key: 'filezipname',
      label: 'Embeddings',
      class: 'text-center',
    },
    {
      key: 'modelMethod',
      label: 'Clustering method',
      class: 'text-center',
    },
    {
      key: 'report',
      label: 'Report',
      class: 'text-center',
    },
    {
      key: 'delete',
      label: ' ',
      class: 'text-center',
    },
  ],
  classification: [
    {
      key: 'simulation',
      label: 'Simulation name',
      class: 'text-center',
    },
    {
      key: 'filezipname',
      label: 'Embeddings',
      class: 'text-center',
    },
    {
      key: 'modelMethod',
      label: 'Classification method',
      class: 'text-center',
    },
    {
      key: 'report',
      label: 'Report',
      class: 'text-center',
    },
    {
      key: 'delete',
      label: ' ',
      class: 'text-center',
    },
  ],
  report: [
    {
      key: 'name',
      label: '',
    },

    {
      key: 'f1-score',
      label: 'F1',
    },
    {
      key: 'recall',
      label: 'Recall',
    },
    {
      key: 'precision',
      label: 'Precision',
    },
    {
      key: 'support',
      label: 'Support',
    },
  ],
  pdfClass: [
    {
      key: 'classifier',
      label: 'Classification method',
    },
    {
      key: 'trainSize',
      label: 'Train/test proportion',
    },
    {
      key: 'model',
      label: 'VibroSense encoder version',
    },
    {
      key: 'splitter',
      label: 'Splitter type',
    },
  ],
  pdfClaster: [
    {
      key: 'classifier',
      label: 'Classification method',
    },
    {
      key: 'model',
      label: 'VibroSense encoder version',
    },
  ],
};

const resultTableFields = [
  {
    key: 'classifier',
    label: 'Classification method',
  },
  {
    key: 'accuracy',
    label: 'Accuracy',
  },
];

const pageToEndPointDependencies = {
  demo: {
    experimentsListEndPoint: 'demo/simulations',
    csvDownloadingEndPoint: 'api/user-guids-csv/',
    pdfDownloadingEndPoint: 'demo/data-files/',
    zipDownloadingEndPoint: 'demo/data-files/',
    endpointPostfix: '/raw',
  },
  workspace: {
    experimentsListEndPoint: 'simulations?model_type=cluster',
    pdfDownloadingEndPoint: 'api/experiment/getpdf/',
    nextTitle: 'simulations/next-title',
    zipDownloadingEndPoint: 'simulations/',
    endpointPostfix: '/data-files-archive?data_type=embedding',
  },
  classification: {
    experimentsListEndPoint: 'simulations?model_type=classify',
    pdfDownloadingEndPoint: 'api/experiment/getpdf/',
    nextTitle: 'simulations/next-title',
    zipDownloadingEndPoint: 'simulations/',
    endpointPostfix: '/data-files-archive?data_type=embedding',
  },
};

export { simulationTableFields, pageToEndPointDependencies, resultTableFields };
