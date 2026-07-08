<template>
  <div class="completed-view pa-4">
    <div class="text-h6 font-weight-bold mb-1" style="color:#141B1F">Uitgevoerde rapportages</div>
    <div class="text-body-2 mb-4" style="color:#47607C">Eerder ingediende inspecties inzien.</div>

    <div v-if="isLoading" class="text-center py-6">
      <v-progress-circular indeterminate color="#00AAA2" />
    </div>

    <div v-else-if="loadError" class="text-body-2 text-error text-center py-4">
      {{ loadError }}
    </div>

    <template v-else>
      <div v-if="completedInspections.length === 0" class="text-body-2 text-medium-emphasis text-center py-6">
        Geen uitgevoerde inspecties gevonden.
      </div>

      <v-list v-else rounded="lg" bg-color="white" lines="two" class="inspection-list">
        <v-list-item
          v-for="inspection in completedInspections"
          :key="inspection.id"
          :active="selectedInspection?.id === inspection.id"
          active-color="#00AAA2"
          prepend-icon="mdi-clipboard-check-outline"
          rounded="lg"
          class="mb-1"
          @click="handleSelect(inspection.id)"
        >
          <v-list-item-title class="font-weight-medium">{{ inspection.address }}</v-list-item-title>
          <v-list-item-subtitle>
            {{ inspection.reportTypeLabel }} &middot; {{ inspection.formattedDate }}
          </v-list-item-subtitle>
          <template #append>
            <v-icon color="medium-emphasis" icon="mdi-chevron-right" size="20" />
          </template>
        </v-list-item>
      </v-list>

      <InspectionDetail
        v-if="selectedInspection"
        :inspection="selectedInspection"
        @close="store.clearSelection()"
      />
    </template>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'pinia'
import { useInspectionStore } from '../stores/inspectionStore'
import InspectionDetail from '../components/InspectionDetail.vue'

export default {
  name: 'CompletedView',
  components: { InspectionDetail },
  setup() {
    return { store: useInspectionStore() }
  },
  computed: {
    ...mapState(useInspectionStore, ['isLoading', 'loadError']),
    ...mapGetters(useInspectionStore, ['completedInspections', 'selectedInspection']),
  },
  async mounted() {
    await this.store.fetchInspections()
  },
  methods: {
    handleSelect(id) {
      if (this.selectedInspection?.id === id) {
        this.store.clearSelection()
      } else {
        this.store.selectInspection(id)
      }
    },
  },
}
</script>

<style scoped>
.completed-view {
  height: 100%;
  overflow-y: auto;
  background: #F4F6F7;
}
.inspection-list {
  border: 1px solid rgba(0,0,0,0.06);
}
</style>