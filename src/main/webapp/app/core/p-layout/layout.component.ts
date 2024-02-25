import { defineComponent, computed } from 'vue';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'PLayout',
  setup() {
    const router = useRouter();

    const showNavbar = computed(() => router.currentRoute.value.name !== 'Auth');

    return {
      showNavbar,
    }
  }
});
