import { defineComponent, ref, computed, onMounted, inject } from 'vue';
import { useRouter } from 'vue-router';
import { removeLocalStorage } from '@/shared/helpers/storage';
import { getUser } from '@/api/auth';
import { useAlertService } from '@/shared/helpers/AlertService';

export default defineComponent({
  name: 'PNavbar',
  setup() {
    const userShortName = ref('');
    const router = useRouter();
    const alertService = inject('alertService', () => useAlertService(), true);

    const currentRoute = computed(() => {
      return router.currentRoute.value.path;
    });

    const linksArray = [
      {
        name: 'User Guide and Examples',
        path: '/demo',
      },
      {
        name: 'Clustering',
        path: '/workspace',
      },
      {
        name: 'Classification',
        path: '/classification',
      },
    ];

    const onLogout = async () => {
      removeLocalStorage('token');
      await router.push('/auth');
    };

    onMounted(() => {
      getUser()
        .then(({ data }) => {
          const firstName = data.firstName || undefined;
          const lastName = data.lastName || undefined;
          userShortName.value = `${firstName} ${lastName.slice(0, 1)}.`;
        })
        .catch(() => {
          userShortName.value = 'User not found';
          alertService.showError('User not found');
        });
    });

    return {
      userShortName,
      currentRoute,
      linksArray,
      onLogout,
    };
  },
});
