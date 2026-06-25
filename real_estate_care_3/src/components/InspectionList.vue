<template>
  <v-list rounded="lg" bg-color="white" lines="two" class="inspection-list">
    <v-list-item
      v-for="inspection in inspections"
      :key="inspection.id"
      :active="selectedId === inspection.id"
      active-color="#00AAA2"
      prepend-icon="mdi-clipboard-check-outline"
      rounded="lg"
      class="mb-1"
      @click="$emit('select-inspection', inspection.id)"
    >
      <v-list-item-title class="font-weight-medium">
        {{ inspection.address }}
      </v-list-item-title>
      <v-list-item-subtitle>
        {{ inspection.reportTypeLabel }} &middot; {{ inspection.formattedDate }}
      </v-list-item-subtitle>

      <template #append>
        <v-icon color="medium-emphasis" icon="mdi-chevron-right" size="20" />
      </template>
    </v-list-item>
  </v-list>
</template>

<script>
export default {
  name: 'InspectionList',
  props: {
    inspections: { type: Array, required: true },
    selectedId: { type: [Number, String], default: null },
  },
  emits: ['select-inspection'],
}
</script>

<style scoped>
.inspection-list {
  border: 1px solid rgba(0, 0, 0, 0.06);
}
</style>