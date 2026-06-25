<template>
  <div class="inspections-overview">
    <div class="section-label pb-2">
      <span class="text-caption font-weight-bold text-uppercase" style="color:#47607C; letter-spacing:1px">
        Uitgevoerde inspecties
      </span>
    </div>

    <div v-if="isLoading" class="text-body-2 text-medium-emphasis py-4 text-center">
      Inspecties laden&hellip;
    </div>

    <div v-else-if="loadError" class="text-body-2 text-error py-4 text-center">
      {{ loadError }}
    </div>

    <template v-else>
      <InspectionList
        :inspections="sortedInspections"
        :selectedId="selectedInspection?.id ?? null"
        @select-inspection="handleSelect"
      />

      <InspectionDetail
        v-if="selectedInspection"
        :inspection="selectedInspection"
        @close="selectedInspection = null"
      />
    </template>
  </div>
</template>

<script>
import InspectionList from './InspectionList.vue'
import InspectionDetail from './InspectionDetail.vue'
import InspectionService from '../services/inspectionService'

export default {
  name: 'InspectionsOverview',
  components: { InspectionList, InspectionDetail },
  data() {
    return {
      inspections: [],
      selectedInspection: null,
      isLoading: true,
      loadError: null,
    }
  },
  computed: {
    sortedInspections() {
      // Gesorteerd op datum, meest recente inspectie eerst.
      return [...this.inspections].sort((a, b) => b.date - a.date)
    },
  },
  async mounted() {
    await this.loadInspections()
  },
  methods: {
    async loadInspections() {
      this.isLoading = true
      this.loadError = null
      try {
        this.inspections = await InspectionService.getInspections()
      } catch (error) {
        this.loadError = 'Het ophalen van de inspecties is niet gelukt. Probeer het later opnieuw.'
        console.error(error)
      } finally {
        this.isLoading = false
      }
    },
    handleSelect(id) {
      this.selectedInspection = this.inspections.find((inspection) => inspection.id === id) ?? null
    },
  },
}
</script>

<style scoped>
.inspections-overview {
  margin-top: 8px;
}
</style>