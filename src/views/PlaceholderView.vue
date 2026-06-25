<template>
  <div class="placeholder-view pa-4">
    <div class="text-h6 font-weight-bold mb-1">{{ title }}</div>
    <div class="text-body-2 text-medium-emphasis mb-4">{{ description }}</div>

    <v-list rounded="lg" bg-color="white" lines="two">
      <v-list-item
        v-for="item in items"
        :key="item.id"
        :prepend-icon="item.icon"
        :title="item.title"
        :subtitle="item.subtitle"
        rounded="lg"
        class="mb-1"
      >
        <template v-if="item.chip" #append>
          <v-chip :color="item.chip.color" size="small" variant="tonal">{{ item.chip.label }}</v-chip>
        </template>
      </v-list-item>
    </v-list>
  </div>
</template>

<script>
export default {
  name: 'PlaceholderView',
  props: {
    viewType: { type: String, required: true },
  },
  computed: {
    title() {
      const titles = {
        assigned: 'Toegewezen rapportages',
        completed: 'Uitgevoerde rapportages',
        knowledge: 'Kennisbase',
        settings: 'Instellingen',
      }
      return titles[this.viewType] || ''
    },
    description() {
      const desc = {
        assigned: 'Openstaande inspecties die aan jou zijn toegewezen.',
        completed: 'Eerder ingediende inspecties inzien of aanpassen.',
        knowledge: 'Alle relevante documenten en testprocedures.',
        settings: 'Beheer je account en app-voorkeuren.',
      }
      return desc[this.viewType] || ''
    },
    items() {
      const data = {
        assigned: [
          { id: 1, icon: 'mdi-home-outline', title: 'Kalverstraat 12, Amsterdam', subtitle: 'Schade + Achterstallig onderhoud', chip: { color: 'error', label: 'Urgent' } },
          { id: 2, icon: 'mdi-home-outline', title: 'Leidsestraat 45, Amsterdam', subtitle: 'Technische installaties', chip: { color: 'warning', label: 'Vandaag' } },
          { id: 3, icon: 'mdi-home-outline', title: 'Rokin 8, Amsterdam', subtitle: 'Modificaties inventariseren', chip: { color: 'primary', label: 'Nieuw' } },
        ],
        completed: [
          { id: 1, icon: 'mdi-check-circle-outline', title: 'Herengracht 100, Amsterdam', subtitle: 'Voltooid op 10 jun 2025', chip: null },
          { id: 2, icon: 'mdi-check-circle-outline', title: 'Prinsengracht 55, Amsterdam', subtitle: 'Voltooid op 8 jun 2025', chip: null },
          { id: 3, icon: 'mdi-check-circle-outline', title: 'Keizersgracht 22, Amsterdam', subtitle: 'Voltooid op 5 jun 2025', chip: null },
        ],
        knowledge: [
          { id: 1, icon: 'mdi-file-pdf-box', title: 'NEN 3140 Elektra inspectie', subtitle: 'Normblad, versie 2022', chip: null },
          { id: 2, icon: 'mdi-file-pdf-box', title: 'Testprocedure CV-installaties', subtitle: 'Procedure document', chip: null },
          { id: 3, icon: 'mdi-file-pdf-box', title: 'Brandveiligheidsnormen 2024', subtitle: 'Richtlijnen en wetgeving', chip: null },
        ],
        settings: [
          { id: 1, icon: 'mdi-account-outline', title: 'Accountgegevens', subtitle: 'Arjan Smit | Arjan@rec.nl', chip: null },
          { id: 2, icon: 'mdi-palette-outline', title: 'Weergave', subtitle: 'Licht thema actief', chip: null },
          { id: 3, icon: 'mdi-bell-outline', title: 'Meldingen', subtitle: 'Pushberichten ingeschakeld', chip: null },
        ],
      }
      return data[this.viewType] || []
    },
  },
}
</script>

<style scoped>
.placeholder-view {
  height: 100%;
  overflow-y: auto;
  background: #F5F7FA;
}
</style>