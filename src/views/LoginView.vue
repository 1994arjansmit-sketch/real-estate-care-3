<template>
  <div class="login-view d-flex align-center justify-center" style="min-height: 100vh; background: #141B1F;">
    <v-card
      rounded="xl"
      elevation="8"
      class="login-card pa-6"
      width="360"
      style="background: #1E272E;"
    >
      <!-- Logo -->
      <div class="d-flex align-center justify-center mb-6">
        <svg width="44" height="44" viewBox="0 0 38 38" xmlns="http://www.w3.org/2000/svg">
          <rect width="38" height="38" rx="6" fill="#00AAA2"/>
          <g transform="translate(19,19) rotate(45) translate(-10,-10)">
            <rect x="2" y="2" width="16" height="16" fill="none" stroke="white" stroke-width="2"/>
          </g>
          <polyline points="13,22 19,16 25,22" fill="none" stroke="white" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <div class="ml-3">
          <div style="font-size:1.1rem; font-weight:700; color:white; line-height:1.2;">Real Estate Care</div>
          <div style="font-size:0.65rem; color:#00AAA2; letter-spacing:1px;">Caring is in our nature</div>
        </div>
      </div>

      <!-- Stap 1: inloggen -->
      <template v-if="step === 1">
        <div class="text-center mb-5">
          <div class="text-h6 font-weight-bold" style="color:white;">Inloggen</div>
          <div class="text-caption" style="color:#8A9BAA;">Voer je gegevens in om door te gaan</div>
        </div>

        <v-text-field
          v-model="username"
          label="Gebruikersnaam"
          prepend-inner-icon="mdi-account-outline"
          variant="outlined"
          density="comfortable"
          bg-color="#141B1F"
          color="#00AAA2"
          class="mb-3"
          autocomplete="username"
          style="--v-field-label-color: #8A9BAA;"
          @keyup.enter="submitCredentials"
        />

        <v-text-field
          v-model="password"
          label="Wachtwoord"
          prepend-inner-icon="mdi-lock-outline"
          :append-inner-icon="showPassword ? 'mdi-eye-off-outline' : 'mdi-eye-outline'"
          :type="showPassword ? 'text' : 'password'"
          variant="outlined"
          density="comfortable"
          bg-color="#141B1F"
          color="#00AAA2"
          class="mb-1"
          autocomplete="current-password"
          @click:append-inner="showPassword = !showPassword"
          @keyup.enter="submitCredentials"
        />

        <div v-if="authStore.loginError" class="text-caption text-error mb-3 text-center">
          {{ authStore.loginError }}
        </div>

        <v-btn
          block
          color="#00AAA2"
          size="large"
          rounded="lg"
          class="mt-3 font-weight-bold"
          :loading="isLoading"
          @click="submitCredentials"
        >
          Doorgaan
        </v-btn>

        <div class="text-caption text-center mt-4" style="color:#8A9BAA;">
          Demo: gebruiker <strong style="color:#00AAA2;">arjan</strong> of <strong style="color:#00AAA2;">lotte</strong>, wachtwoord <strong style="color:#00AAA2;">rec2025</strong>
        </div>
      </template>

      <!-- Stap 2: twee-staps verificatie -->
      <template v-else>
        <div class="text-center mb-5">
          <v-icon size="40" color="#00AAA2" class="mb-2">mdi-shield-check-outline</v-icon>
          <div class="text-h6 font-weight-bold" style="color:white;">Verificatie</div>
          <div class="text-caption" style="color:#8A9BAA;">
            Er is een code gestuurd naar je geregistreerde apparaat.
            Voer de code in om door te gaan.
          </div>
        </div>

        <v-otp-input
          v-if="otpSupported"
          v-model="twoFactorCode"
          length="6"
          variant="outlined"
          color="#00AAA2"
          bg-color="#141B1F"
          class="mb-2"
          @finish="submitTwoFactor"
        />

        <v-text-field
          v-else
          v-model="twoFactorCode"
          label="Verificatiecode (6 cijfers)"
          prepend-inner-icon="mdi-numeric"
          variant="outlined"
          density="comfortable"
          bg-color="#141B1F"
          color="#00AAA2"
          class="mb-2"
          maxlength="6"
          inputmode="numeric"
          @keyup.enter="submitTwoFactor"
        />

        <div v-if="authStore.twoFactorError" class="text-caption text-error mb-3 text-center">
          {{ authStore.twoFactorError }}
        </div>

        <v-btn
          block
          color="#00AAA2"
          size="large"
          rounded="lg"
          class="mt-2 font-weight-bold"
          :loading="isLoading"
          @click="submitTwoFactor"
        >
          Verifiëren
        </v-btn>

        <v-btn
          block
          variant="text"
          size="small"
          color="#8A9BAA"
          class="mt-2"
          @click="step = 1"
        >
          Terug naar inloggen
        </v-btn>

        <div class="text-caption text-center mt-3" style="color:#8A9BAA;">
          Demo verificatiecode: <strong style="color:#00AAA2;">123456</strong>
        </div>
      </template>
    </v-card>
  </div>
</template>

<script>
import { useAuthStore } from '../stores/authStore'

export default {
  name: 'LoginView',
  setup() {
    return { authStore: useAuthStore() }
  },
  data() {
    return {
      step: 1,
      username: '',
      password: '',
      showPassword: false,
      twoFactorCode: '',
      isLoading: false,
      otpSupported: true,
    }
  },
  mounted() {
    // v-otp-input kan ontbreken in sommige Vuetify-builds; fallback naar tekstveld.
    try {
      this.otpSupported = true
    } catch {
      this.otpSupported = false
    }
  },
  methods: {
    async submitCredentials() {
      if (!this.username || !this.password) return
      this.isLoading = true
      await this.$nextTick()
      const valid = this.authStore.validateCredentials(this.username, this.password)
      this.isLoading = false
      if (valid) {
        this.step = 2
        this.twoFactorCode = ''
      }
    },

    async submitTwoFactor() {
      if (this.twoFactorCode.length < 6) return
      this.isLoading = true
      await this.$nextTick()
      const valid = this.authStore.validateTwoFactor(this.twoFactorCode)
      this.isLoading = false
      if (valid) {
        this.$router.push('/dashboard')
      }
    },
  },
}
</script>

<style scoped>
.login-view {
  min-height: 100vh;
}
</style>