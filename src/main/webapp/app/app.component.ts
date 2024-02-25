import { defineComponent, provide  } from 'vue';
import PLayout from '@/core/p-layout/layout.vue';

import { useAlertService } from '@/shared/helpers/AlertService';

export default defineComponent({
  compatConfig: { MODE: 3 },
  name: 'App',
  components: {
    'p-layout': PLayout,
  },
  setup() {
    provide('alertService', useAlertService());
    return {};
  },
});
