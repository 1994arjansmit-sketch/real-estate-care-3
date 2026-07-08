<template>
  <v-app :theme="'recTheme'">
    <AppHeader
      v-if="isAuthenticated"
      @logoClick="$router.push('/dashboard')"
    />

    <v-main :style="isAuthenticated ? 'padding-bottom: 56px;' : ''">
      <router-view />
    </v-main>

    <AppTabBar
      v-if="isAuthenticated"
      :assignedCount="assignedCount"
      :currentRoute="$route.name"
      @tabChange="$router.push('/' + $event)"
    />
  </v-app>
</template>

<script>
import { mapState, mapGetters } from 'pinia'
import { useAuthStore } from './stores/authStore'
import { useInspectionStore } from './stores/inspectionStore'
import AppHeader from './components/AppHeader.vue'
import AppTabBar from './components/AppTabBar.vue'

export default {
  name: 'App',
  components: { AppHeader, AppTabBar },
  computed: {
    ...mapState(useAuthStore, ['isAuthenticated']),
    ...mapGetters(useInspectionStore, ['assignedCount']),
  },
}
</script>

<style>
* {
  -webkit-tap-highlight-color: transparent;
}
body {
  overscroll-behavior: none;
}
.v-main {
  background: #F5F7FA !important;
}
</style>