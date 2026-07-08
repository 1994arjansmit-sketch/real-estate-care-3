<template>
  <div class="knowledge-view pa-4">
    <div class="text-h6 font-weight-bold mb-1" style="color:#141B1F">Kennisbase</div>
    <div class="text-body-2 mb-4" style="color:#47607C">Alle relevante documenten en testprocedures.</div>

    <div class="section-label pb-2">
      <span class="text-caption font-weight-bold text-uppercase" style="color:#47607C; letter-spacing:1px">Normbladen</span>
    </div>

    <v-list rounded="lg" bg-color="white" lines="two" class="mb-4">
      <v-list-item
        v-for="doc in normDocuments"
        :key="doc.id"
        prepend-icon="mdi-file-pdf-box"
        rounded="lg"
        class="mb-1"
        @click="openDocument(doc)"
      >
        <v-list-item-title class="font-weight-medium">{{ doc.title }}</v-list-item-title>
        <v-list-item-subtitle>{{ doc.subtitle }}</v-list-item-subtitle>
        <template #append>
          <v-icon color="#00AAA2" icon="mdi-open-in-new" size="18" />
        </template>
      </v-list-item>
    </v-list>

    <div class="section-label pb-2">
      <span class="text-caption font-weight-bold text-uppercase" style="color:#47607C; letter-spacing:1px">Testprocedures</span>
    </div>

    <v-list rounded="lg" bg-color="white" lines="two">
      <v-list-item
        v-for="doc in testProcedures"
        :key="doc.id"
        prepend-icon="mdi-file-document-outline"
        rounded="lg"
        class="mb-1"
        @click="openDocument(doc)"
      >
        <v-list-item-title class="font-weight-medium">{{ doc.title }}</v-list-item-title>
        <v-list-item-subtitle>{{ doc.subtitle }}</v-list-item-subtitle>
        <template #append>
          <v-icon color="#00AAA2" icon="mdi-open-in-new" size="18" />
        </template>
      </v-list-item>
    </v-list>
  </div>
</template>

<script>
export default {
  name: 'KnowledgeView',
  data() {
    return {
      normDocuments: [
        { id: 1, title: 'NEN 3140 Elektra inspectie', subtitle: 'Normblad, versie 2022', url: '#' },
        { id: 2, title: 'Brandveiligheidsnormen 2024', subtitle: 'Richtlijnen en wetgeving', url: '#' },
        { id: 3, title: 'Bouwbesluit 2012 (actueel)', subtitle: 'Technische bouwvereisten', url: '#' },
      ],
      testProcedures: [
        { id: 4, title: 'Testprocedure CV-installaties', subtitle: 'Verwarmingssystemen', url: '#' },
        { id: 5, title: 'Testprocedure elektra NEN 3140', subtitle: 'Elektrische installaties', url: '#' },
        { id: 6, title: 'Inspectieprotocol brandveiligheid', subtitle: 'Sprinklers en blusmiddelen', url: '#' },
      ],
    }
  },
  methods: {
    openDocument(doc) {
      // In productie: open het pdf-bestand via de juiste URL.
      window.open(doc.url, '_blank', 'noopener,noreferrer')
    },
  },
}
</script>

<style scoped>
.knowledge-view {
  height: 100%;
  overflow-y: auto;
  background: #F4F6F7;
}
</style>