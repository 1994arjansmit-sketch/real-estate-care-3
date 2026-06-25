<template>
  <v-card rounded="lg" variant="outlined" class="inspection-detail mt-3" style="border-color:#47607C">
    <v-card-text class="pa-4">
      <div class="d-flex align-center justify-space-between mb-3">
        <span class="text-overline" style="color:#00AAA2">{{ inspection.reportTypeLabel }}</span>
        <v-btn
          icon="mdi-close"
          variant="text"
          size="small"
          @click="$emit('close')"
        />
      </div>

      <div class="text-h6 font-weight-bold mb-1" style="color:#141B1F">
        {{ inspection.address }}
      </div>
      <div class="text-caption text-medium-emphasis mb-3">
        {{ inspection.formattedDate }} om {{ inspection.formattedTime }} &middot; {{ inspection.inspector }}
      </div>

      <v-divider class="mb-3" />

      <!-- Velden specifiek voor dit rapportagetype, zoals beschreven in de case -->
      <div
        v-for="field in fieldConfig"
        :key="field.key"
        class="detail-row"
      >
        <span class="detail-label">{{ field.label }}</span>

        <a
          v-if="field.type === 'link'"
          :href="inspection.details[field.key]"
          target="_blank"
          rel="noopener"
          class="detail-link"
        >
          Document bekijken
        </a>
        <span v-else class="detail-value">
          {{ formatDetailValue(inspection.details[field.key], field) }}
        </span>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
import { DETAIL_FIELD_CONFIG, formatDetailValue } from '../models/inspectionDetailFields'

export default {
  name: 'InspectionDetail',
  props: {
    inspection: { type: Object, required: true },
  },
  emits: ['close'],
  computed: {
    fieldConfig() {
      return DETAIL_FIELD_CONFIG[this.inspection.reportType] || []
    },
  },
  methods: {
    formatDetailValue,
  },
}
</script>

<style scoped>
.detail-row {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 12px;
  padding: 6px 0;
}
.detail-label {
  font-size: 0.8rem;
  color: #47607C;
  flex: 0 0 45%;
}
.detail-value {
  font-size: 0.9rem;
  font-weight: 500;
  color: #141B1F;
  text-align: right;
  flex: 1;
}
.detail-link {
  font-size: 0.9rem;
  font-weight: 500;
  color: #00AAA2;
  text-align: right;
  flex: 1;
  text-decoration: none;
}
.detail-link:hover {
  text-decoration: underline;
}
</style>
