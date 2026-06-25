<template>
  <v-card
    :color="color"
    :variant="variant"
    rounded="lg"
    class="dashboard-card"
    @click="$emit('click')"
    ripple
  >
    <v-card-text class="d-flex align-center pa-4">
      <v-icon :color="iconColor" :icon="icon" size="32" class="mr-4" />
      <div class="flex-grow-1">
        <div class="card-title font-weight-medium">{{ title }}</div>
        <div v-if="subtitle" class="card-subtitle text-medium-emphasis">{{ subtitle }}</div>
      </div>
      <div v-if="badge" class="badge-chip">
        <v-chip size="small" color="error" class="font-weight-bold">{{ badge }}</v-chip>
      </div>
      <v-icon color="medium-emphasis" icon="mdi-chevron-right" size="20" class="ml-2" />
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'DashboardCard',
  props: {
    title: { type: String, required: true },
    subtitle: { type: String, default: '' },
    icon: { type: String, required: true },
    iconColor: { type: String, default: '#00AAA2' },
    color: { type: String, default: 'surface' },
    variant: { type: String, default: 'elevated' },
    badge: { type: [Number, String], default: null },
  },
  emits: ['click'],
}
</script>

<style scoped>
.dashboard-card {
  cursor: pointer;
  transition: transform 0.15s ease, box-shadow 0.15s ease;
}
.dashboard-card:active {
  transform: scale(0.98);
}
.card-title {
  font-size: 0.95rem;
  line-height: 1.3;
  color: rgba(0, 0, 0, 0.87);
}
.card-subtitle {
  font-size: 0.78rem;
  margin-top: 2px;
}
</style>