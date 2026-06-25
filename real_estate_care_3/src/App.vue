<template>
  <v-app :theme="'recTheme'">
    <AppHeader @logoClick="handleLogoClick" />

    <v-main style="padding-bottom: 56px;">
      <DashboardView
        v-if="currentTab === 'dashboard'"
        @navigate="handleNavigate"
      />
      <PlaceholderView
        v-else
        :viewType="currentTab"
      />
    </v-main>

    <AppTabBar
      :assignedCount="3"
      :currentTab="tabBarActive"
      @tabChange="handleTabChange"
    />
  </v-app>
</template>

<script>
import AppHeader from './components/AppHeader.vue'
import AppTabBar from './components/AppTabBar.vue'
import DashboardView from './views/DashboardView.vue'
import PlaceholderView from './views/PlaceholderView.vue'

export default {
  name: 'App',
  components: { AppHeader, AppTabBar, DashboardView, PlaceholderView },
  data() {
    return {
      currentTab: 'dashboard',
      tabBarActive: 'assigned',
    }
  },
  methods: {
    handleTabChange(tab) {
      this.tabBarActive = tab
      this.currentTab = tab
    },
    handleNavigate(view) {
      this.tabBarActive = view
      this.currentTab = view
    },
    handleLogoClick() {
      this.currentTab = 'dashboard'
    },
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