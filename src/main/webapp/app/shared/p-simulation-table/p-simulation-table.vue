<template>
  <b-overlay :show="isDownloading" rounded opacity="0.6" class="text-center">
    <b-table
      sticky-header
      responsive
      head-variant="light"
      show-empty
      :empty-text="emptyTableText"
      :fields="fields"
      :items="items"
      :busy="isLoading"
      @row-clicked="openReport"
    >
      <template #table-busy>
        <b-overlay show rounded opacity="0.6" class="text-center"> Loading... </b-overlay>
      </template>
      <template #cell(filezipname)="data">
        <div class="downloadable-cell" @click.stop="downloadZip(data.item.id, data.item.filezipname, data.item.dataFiles)">
          {{ data.value }}
        </div>
      </template>
      <template #cell(filedataname)="data">
        <div class="downloadable-cell filedataname" @click.stop="downloadCsv(data.value)">
          {{ data.value }}
        </div>
      </template>
      <template #cell(report)="data">
        <div
          class="report-download"
          @click.stop="
            () => {
              if (page === 'demo') {
                downloadReport(
                  data.item.dataFiles.find(el => el.dataType === 'report').id,
                  isDownloading,
                  data.item.dataFiles.find(el => el.dataType === 'report').filename
                );
                return;
              } else {
                downloadReport(data.item.id, isDownloading);
              }
            }
          "
        >
          <i class="icon icon_medium icon-download__white" style="position: relative; top: -2px" />
        </div>
      </template>
      <!-- <template #cell(repeat)>
      <b-button variant="outline" style="padding: 3px 10px; border: 1px solid #6c757d">Repeat</b-button>
    </template> -->
      <template #cell(delete)="data">
        <div
          v-b-modal="'deletingModal'"
          @click.stop="
            () => {
              selectedSim = data.item;
              isShown = true;
            }
          "
        >
          <b-trash style="transform: scale(1.2)" />
        </div>
      </template>
    </b-table>
  </b-overlay>
  <b-modal v-if="isShown" :id="'deletingModal'" size="md" title="Deleting simulation" ok-title="Yes" v-b-modal.modal-center>
    <div>
      <div style="margin: 20px" v-if="selectedSim">Are you sure you want to delete "{{ selectedSim.simulation }}"?</div>
    </div>
    <template #modal-footer>
      <button v-b-modal.modal-close_visit class="btn btn-dark m-1" @click="() => (isShown = false)">Cancel</button>
      <button v-b-modal.modal-close_visit class="btn btn-light m-1" @click="deleteSim(selectedSim.id)">Yes</button>
    </template>
  </b-modal>
</template>

<script lang="ts" src="./p-simulation-table.component.ts" />
<style scoped lang="scss" src="./p-simulation-table.scss" />
