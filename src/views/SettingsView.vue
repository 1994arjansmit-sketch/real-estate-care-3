<template>
  <div class="settings-view pa-4">
    <div class="text-h6 font-weight-bold mb-1" style="color:#141B1F">Instellingen</div>
    <div class="text-body-2 mb-4" style="color:#47607C">Beheer je account en app-voorkeuren.</div>

    <!-- Accountgegevens -->
    <div class="section-label pb-2">
      <span class="text-caption font-weight-bold text-uppercase" style="color:#47607C; letter-spacing:1px">Account</span>
    </div>

    <v-card rounded="lg" variant="outlined" class="mb-4 pa-4" style="border-color:#e0e0e0; background:white;">
      <div class="d-flex align-center">
        <v-avatar color="#00AAA2" size="48" class="mr-4">
          <span class="text-white font-weight-bold">{{ userInitials }}</span>
        </v-avatar>
        <div>
          <div class="font-weight-bold" style="color:#141B1F">{{ userName }}</div>
          <div class="text-caption" style="color:#47607C">Inspecteur</div>
        </div>
      </div>
    </v-card>

    <!-- Weergave -->
    <div class="section-label pb-2">
      <span class="text-caption font-weight-bold text-uppercase" style="color:#47607C; letter-spacing:1px">Weergave</span>
    </div>

    <v-list rounded="lg" bg-color="white" class="mb-4">
      <v-list-item rounded="lg">
        <v-list-item-title>Donker thema</v-list-item-title>
        <v-list-item-subtitle>Schakel over naar donkere weergave</v-list-item-subtitle>
        <template #append>
          <v-switch
            v-model="darkMode"
            color="#00AAA2"
            hide-details
            density="compact"
          />
        </template>
      </v-list-item>
    </v-list>

    <!-- Meldingen -->
    <div class="section-label pb-2">
      <span class="text-caption font-weight-bold text-uppercase" style="color:#47607C; letter-spacing:1px">Meldingen</span>
    </div>

    <v-list rounded="lg" bg-color="white" class="mb-4">
      <v-list-item rounded="lg">
        <v-list-item-title>Pushberichten</v-list-item-title>
        <v-list-item-subtitle>Ontvang meldingen over nieuwe inspecties</v-list-item-subtitle>
        <template #append>
          <v-switch
            v-model="notifications"
            color="#00AAA2"
            hide-details
            density="compact"
          />
        </template>
      </v-list-item>
      <v-divider />
      <v-list-item rounded="lg">
        <v-list-item-title>Geluiden</v-list-item-title>
        <v-list-item-subtitle>Geluid bij notificaties</v-list-item-subtitle>
        <template #append>
          <v-switch
            v-model="sounds"
            color="#00AAA2"
            hide-details
            density="compact"
          />
        </template>
      </v-list-item>
    </v-list>

    <!-- Uitloggen -->
    <v-btn
      block
      variant="outlined"
      color="error"
      rounded="lg"
      class="mt-2"
      prepend-icon="mdi-logout"
      @click="handleLogout"
    >
      Uitloggen
    </v-btn>
  </div>
</template>

<script>
import { mapGetters } from 'pinia'
import { useAuthStore } from '../stores/authStore'

export default {
  name: 'SettingsView',
  setup() {
    return { authStore: useAuthStore() }
  },
  data() {
    return {
      darkMode: false,
      notifications: true,
      sounds: false,
    }
  },
  computed: {
    ...mapGetters(useAuthStore, ['userName', 'userInitials']),
  },
  methods: {
    handleLogout() {
      this.authStore.logout()
      this.$router.push('/login')
    },
  },
}
</script>

<style scoped>
.settings-view {
  height: 100%;
  overflow-y: auto;
  background: #F4F6F7;
}
</style>