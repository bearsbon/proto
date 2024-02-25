import { defineComponent, ref, inject } from 'vue';
import { useRouter } from 'vue-router';
import { onAuth } from '@/api/auth';
import { setLocalStorage } from '@/shared/helpers/storage';
import PButton from '@/shared/p-button/p-button.vue';
import { useAlertService } from '@/shared/helpers/AlertService';

export default defineComponent({
  name: 'Auth',
  components: {
    'p-button': PButton,
  },
  setup() {
    const router = useRouter();
    const email = ref('');
    const password = ref('');
    const validationState = ref({
      email: null,
      password: null,
    });
    const onLogin = ref(false);

    const alertService = inject('alertService', () => useAlertService(), true);
    const fieldValidationError = 'Required field';
    const incorrectDataError = 'Incorrect login and password. Please try again';

    const fieldFocused = field => {
      validationState.value[field] = null;
    };

    const submit = () => {
      if (!email.value.length) {
        validationState.value.email = false;
        alertService.showError(fieldValidationError);
      }

      if (!password.value.length) {
        validationState.value.password = false;
        alertService.showError(fieldValidationError);
      }

      if (!email.value.length || !password.value.length) {
        return;
      }

      const request = {
        username: email.value,
        password: password.value,
        rememberMe: false,
      };

      onLogin.value = true;
      onAuth(request)
        .then(({ data }) => {
          setLocalStorage('token', data.id_token);
          router.push('/demo');
        })
        .catch(() => {
          alertService.showError(incorrectDataError);
        })
        .finally(() => {
          onLogin.value = false;
        });
    };

    return {
      email,
      password,
      onLogin,
      validationState,
      fieldFocused,
      submit,
    };
  },
});
