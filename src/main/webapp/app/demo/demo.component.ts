import { defineComponent, ref, onMounted, inject } from 'vue';
import { useRouter } from 'vue-router';
// import { getMediaLinks } from '@/api/demo';
import PSimulationTable from '@/shared/p-simulation-table/p-simulation-table.vue';
// import { simulationTableFields } from '@/shared/helpers/variables';
import PButton from '@/shared/p-button/p-button.vue';
import PSelect from '@/shared/p-select/p-select.vue';
// import { useAlertService } from '@/shared/helpers/AlertService';

export default defineComponent({
  name: 'Demo',
  components: {
    'p-simulation-table': PSimulationTable,
    'p-button': PButton,
    'p-select': PSelect,
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

    const startSimulation = () => {
      router.push('simulation/1?type=Clustering');
    };

    const handleSelect = selection => {
      router.push(`simulation/1?type=${selection}`);
    };

    return {
      selected,
      proportion,
      selectedType,
      typeOptions,
      signals,
      workspaceRedirect,
      startSimulation,
      handleSelect,
    };
  },
});
