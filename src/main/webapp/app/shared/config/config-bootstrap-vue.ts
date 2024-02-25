import {
  BForm,
  BFormInput,
  BFormCheckbox,
  BFormGroup,
  BProgress,
  BProgressBar,
  BPagination,
  BButton,
  BNavbar,
  BNavbarNav,
  BNavbarBrand,
  BNavbarToggle,
  BNavItem,
  BNavItemDropdown,
  BCollapse,
  BBadge,
  BDropdown,
  BDropdownItem,
  BLink,
  BAlert,
  BModal,
  VBModal,
  BFormDatepicker,
  BInputGroup,
  BInputGroupPrepend,
  ToastPlugin,
  BFormFile,
  BTable,
  BFormSelect,
  BOverlay,
  BEmbed,
  BTooltip,
  BIconPencilSquare,
  BIconDownload,
  BIconQuestionCircleFill,
  BIconTrash,
  BSpinner,
  BIconPlus,
} from 'bootstrap-vue';
import Multiselect from 'vue-multiselect';

export function initBootstrapVue(vue) {
  vue.use(ToastPlugin);

  vue.component('b-badge', BBadge);
  vue.component('b-dropdown', BDropdown);
  vue.component('b-dropdown-item', BDropdownItem);
  vue.component('b-link', BLink);
  vue.component('b-alert', BAlert);
  vue.component('b-button', BButton);
  vue.component('b-navbar', BNavbar);
  vue.component('b-navbar-nav', BNavbarNav);
  vue.component('b-navbar-brand', BNavbarBrand);
  vue.component('b-navbar-toggle', BNavbarToggle);
  vue.component('b-pagination', BPagination);
  vue.component('b-progress', BProgress);
  vue.component('b-progress-bar', BProgressBar);
  vue.component('b-form', BForm);
  vue.component('b-form-input', BFormInput);
  vue.component('b-form-file', BFormFile);
  vue.component('b-form-group', BFormGroup);
  vue.component('b-form-checkbox', BFormCheckbox);
  vue.component('b-collapse', BCollapse);
  vue.component('b-nav-item', BNavItem);
  vue.component('b-nav-item-dropdown', BNavItemDropdown);
  vue.component('b-modal', BModal);
  vue.directive('b-modal', VBModal);
  vue.component('b-form-datepicker', BFormDatepicker);
  vue.component('b-input-group', BInputGroup);
  vue.component('b-input-group-prepend', BInputGroupPrepend);
  vue.component('b-table', BTable);
  vue.component('b-form-select', BFormSelect);
  vue.component('b-overlay', BOverlay);
  vue.component('b-embed', BEmbed);
  vue.component('b-tooltip', BTooltip);
  vue.component('b-pencil-square', BIconPencilSquare);
  vue.component('b-download', BIconDownload);
  vue.component('b-question-fill', BIconQuestionCircleFill);
  vue.component('b-trash', BIconTrash);
  vue.component('b-spinner', BSpinner);
  vue.component('multiselect', Multiselect);
  vue.component('b-plus', BIconPlus);
}
