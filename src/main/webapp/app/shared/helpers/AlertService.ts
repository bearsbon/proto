import { BvToast } from 'bootstrap-vue';
import { getCurrentInstance } from 'vue';

export const useAlertService = () => {
  const bvToast = getCurrentInstance().root.proxy['_bv__toast'];
  if (!bvToast) {
    throw new Error('BootstrapVue toast component was not found');
  }
  return new AlertService({
    bvToast,
  });
};

export default class AlertService {
  private bvToast: BvToast;

  constructor({ bvToast }: { bvToast: BvToast }) {
    this.bvToast = bvToast;
  }

  public showInfo(toastMessage, toastOptions?) {
    this.bvToast.toast(toastMessage, {
      toaster: 'b-toaster-top-right',
      title: 'Info',
      variant: 'info',
      solid: true,
      autoHideDelay: 2000,
      ...toastOptions,
    });
  }

  public showError(toastMessage) {
    this.bvToast.toast(toastMessage, {
      toaster: 'b-toaster-top-right',
      title: 'Error',
      variant: 'danger',
      solid: true,
      autoHideDelay: 2000,
    });
  }
}
