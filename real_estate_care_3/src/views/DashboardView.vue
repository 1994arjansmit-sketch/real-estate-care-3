<template>
  <div class="dashboard-view">
    <div class="greeting-section pa-4 pb-2">
      <div class="text-h6 font-weight-bold" style="color:#141B1F">Goedemorgen, Arjan</div>
      <div class="text-body-2" style="color:#47607C">{{ today }}</div>
    </div>

    <div class="summary-row px-4 pb-3">
      <v-row no-gutters dense>
        <v-col cols="4">
          <v-card rounded="lg" class="stat-card text-center pa-3" color="#00AAA2">
            <div class="text-h5 font-weight-bold text-white">3</div>
            <div class="text-caption text-white">Toegewezen</div>
          </v-card>
        </v-col>
        <v-col cols="4" class="px-1">
          <v-card rounded="lg" class="stat-card text-center pa-3" variant="outlined" style="border-color:#47607C">
            <div class="text-h5 font-weight-bold" style="color:#141B1F">12</div>
            <div class="text-caption" style="color:#47607C">Uitgevoerd</div>
          </v-card>
        </v-col>
        <v-col cols="4">
          <v-card rounded="lg" class="stat-card text-center pa-3" variant="outlined" style="border-color:#47607C">
            <div class="text-h5 font-weight-bold text-warning">1</div>
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
        <v-col cols="12" class="mb-2" v-for="item in menuItems" :key="item.value">
          <DashboardCard
            :title="item.title"
            :subtitle="item.subtitle"
            :icon="item.icon"
            :badge="item.badge"
            @click="$emit('navigate', item.value)"
          />
        </v-col>
      </v-row>
    </div>

    <div class="inspections-section px-4 pb-4">
      <InspectionsOverview />
    </div>
  </div>
</template>

<script>
import DashboardCard from '../components/DashboardCard.vue'
import InspectionsOverview from '../components/InspectionsOverview.vue'

export default {
  name: 'DashboardView',
  components: { DashboardCard, InspectionsOverview },
  emits: ['navigate'],
  data() {
    return {
      menuItems: [
        {
          value: 'assigned',
          title: 'Toegewezen rapportages',
          subtitle: '3 openstaande inspecties',
          icon: 'mdi-clipboard-list-outline',
          badge: 3,
        },
        {
          value: 'completed',
          title: 'Uitgevoerde rapportages',
          subtitle: 'Bekijk en bewerk eerdere inspecties',
          icon: 'mdi-clipboard-check-outline',
          badge: null,
        },
        {
          value: 'knowledge',
          title: 'Kennisbase',
          subtitle: 'Normbladen en testprocedures',
          icon: 'mdi-book-open-outline',
          badge: null,
        },
        {
          value: 'settings',
          title: 'Instellingen',
          subtitle: 'Account, weergave en meldingen',
          icon: 'mdi-cog-outline',
          badge: null,
        },
      ],
    }
  },
  computed: {
    today() {
      return new Date().toLocaleDateString('nl-NL', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
    },
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