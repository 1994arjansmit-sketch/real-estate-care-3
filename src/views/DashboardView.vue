<template>
  <div class="dashboard-view">
    <div class="greeting-section pa-4 pb-2">
      <div class="text-h6 font-weight-bold" style="color:#141B1F">Goedemorgen, {{ userName }}</div>
      <div class="text-body-2" style="color:#47607C">{{ today }}</div>
    </div>

    <div class="summary-row px-4 pb-3">
      <v-row no-gutters dense>
        <v-col cols="4">
          <v-card rounded="lg" class="stat-card text-center pa-3" color="#00AAA2">
            <div class="text-h5 font-weight-bold text-white">{{ assignedCount }}</div>
            <div class="text-caption text-white">Toegewezen</div>
          </v-card>
        </v-col>
        <v-col cols="4" class="px-1">
          <v-card rounded="lg" class="stat-card text-center pa-3" variant="outlined" style="border-color:#47607C">
            <div class="text-h5 font-weight-bold" style="color:#141B1F">{{ completedInspections.length }}</div>
            <div class="text-caption" style="color:#47607C">Uitgevoerd</div>
          </v-card>
        </v-col>
        <v-col cols="4">
          <v-card rounded="lg" class="stat-card text-center pa-3" variant="outlined" style="border-color:#47607C">
            <div class="text-h5 font-weight-bold text-warning">{{ urgentCount }}</div>
            <div class="text-caption" style="color:#47607C">Urgent</div>
          </v-card>
        </v-col>
      </v-row>
    </div>

    <div class="section-label px-4 pb-2">
      <span class="text-caption font-weight-bold text-uppercase" style="color:#47607C; letter-spacing:1px">Hoofdmenu</span>
    </div>

    <div class="cards-section px-4">
      <v-row no-gutters dense>
        <v-col cols="12" class="mb-2" v-for="item in menuItems" :key="item.route">
          <DashboardCard
            :title="item.title"
            :subtitle="item.subtitle"
            :icon="item.icon"
            :badge="item.badge"
            @click="$router.push(item.route)"
          />
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'pinia'
import { useAuthStore } from '../stores/authStore'
import { useInspectionStore } from '../stores/inspectionStore'
import DashboardCard from '../components/DashboardCard.vue'

export default {
  name: 'DashboardView',
  components: { DashboardCard },
  computed: {
    ...mapGetters(useAuthStore, ['userName']),
    ...mapGetters(useInspectionStore, ['assignedCount', 'completedInspections', 'assignedInspections']),
    urgentCount() {
      return this.assignedInspections.filter(
        (i) => i.details?.urgentActionRequired === true
      ).length
    },
    menuItems() {
      return [
        {
          route: '/assigned',
          title: 'Toegewezen rapportages',
          subtitle: `${this.assignedCount} openstaande inspecties`,
          icon: 'mdi-clipboard-list-outline',
          badge: this.assignedCount || null,
        },
        {
          route: '/completed',
          title: 'Uitgevoerde rapportages',
          subtitle: 'Bekijk en bewerk eerdere inspecties',
          icon: 'mdi-clipboard-check-outline',
          badge: null,
        },
        {
          route: '/knowledge',
          title: 'Kennisbase',
          subtitle: 'Normbladen en testprocedures',
          icon: 'mdi-book-open-outline',
          badge: null,
        },
        {
          route: '/settings',
          title: 'Instellingen',
          subtitle: 'Account, weergave en meldingen',
          icon: 'mdi-cog-outline',
          badge: null,
        },
      ]
    },
    today() {
      return new Date().toLocaleDateString('nl-NL', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
    },
  },
  async mounted() {
    const store = useInspectionStore()
    await store.fetchInspections()
  },
}
</script>

<style scoped>
.dashboard-view {
  height: 100%;
  overflow-y: auto;
  background: #F4F6F7;
}
.stat-card {
  min-height: 64px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
</style>