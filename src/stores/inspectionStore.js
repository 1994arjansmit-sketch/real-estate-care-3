import { defineStore } from 'pinia'
import InspectionService from '../services/inspectionService'

export const useInspectionStore = defineStore('inspections', {
  state: () => ({
    inspections: [],
    isLoading: false,
    loadError: null,
    selectedInspectionId: null,
  }),

  getters: {
    /**
     * Uitgevoerde inspecties, gesorteerd op datum (meest recent eerst).
     */
    completedInspections: (state) =>
      [...state.inspections]
        .filter((i) => i.status === 'completed')
        .sort((a, b) => b.date - a.date),

    /**
     * Toegewezen inspecties, gesorteerd op datum (vroegst eerst = meest urgent).
     */
    assignedInspections: (state) =>
      [...state.inspections]
        .filter((i) => i.status === 'assigned')
        .sort((a, b) => a.date - b.date),

    assignedCount: (state) =>
      state.inspections.filter((i) => i.status === 'assigned').length,

    selectedInspection: (state) =>
      state.inspections.find((i) => i.id === state.selectedInspectionId) || null,
  },

  actions: {
    async fetchInspections() {
      if (this.inspections.length > 0) return // voorkom dubbel ophalen
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

    selectInspection(id) {
      this.selectedInspectionId = id
    },

    clearSelection() {
      this.selectedInspectionId = null
    },
  },
})
