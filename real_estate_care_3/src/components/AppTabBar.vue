<template>
  <v-bottom-navigation
    v-model="activeTab"
    bg-color="#141B1F"
    elevation="8"
    grow
  >
    <v-btn value="assigned" :color="activeTab === 'assigned' ? '#00AAA2' : '#8A9BAA'" @click="$emit('tabChange', 'assigned')">
      <v-badge
        v-if="assignedCount > 0"
        :content="assignedCount"
        color="error"
        floating
      >
        <v-icon>mdi-clipboard-list-outline</v-icon>
      </v-badge>
      <v-icon v-else>mdi-clipboard-list-outline</v-icon>
      <span class="tab-label">Toegewezen</span>
    </v-btn>

    <v-btn value="completed" :color="activeTab === 'completed' ? '#00AAA2' : '#8A9BAA'" @click="$emit('tabChange', 'completed')">
      <v-icon>mdi-clipboard-check-outline</v-icon>
      <span class="tab-label">Uitgevoerd</span>
    </v-btn>

    <v-btn value="knowledge" :color="activeTab === 'knowledge' ? '#00AAA2' : '#8A9BAA'" @click="$emit('tabChange', 'knowledge')">
      <v-icon>mdi-book-open-outline</v-icon>
      <span class="tab-label">Kennisbase</span>
    </v-btn>

    <v-btn value="settings" :color="activeTab === 'settings' ? '#00AAA2' : '#8A9BAA'" @click="$emit('tabChange', 'settings')">
      <v-icon>mdi-cog-outline</v-icon>
      <span class="tab-label">Instellingen</span>
    </v-btn>
  </v-bottom-navigation>
</template>

<script>
export default {
  name: 'AppTabBar',
  props: {
    assignedCount: { type: Number, default: 3 },
    currentTab: { type: String, default: 'assigned' },
  },
  emits: ['tabChange'],
  data() {
    return {
      activeTab: this.currentTab,
    }
  },
  watch: {
    currentTab(val) {
      this.activeTab = val
    },
  },
}
</script>

<style scoped>
.tab-label {
  font-size: 10px;
  margin-top: 2px;
  display: block;
}
</style>