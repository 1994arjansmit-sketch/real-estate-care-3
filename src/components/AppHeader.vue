<template>
  <v-app-bar color="#141B1F" elevation="2" height="60">
    <template #prepend>
      <div
        class="rec-logo ml-3 d-flex align-center"
        role="button"
        tabindex="0"
        aria-label="Terug naar dashboard"
        @click="$emit('logoClick')"
        @keyup.enter="$emit('logoClick')"
      >
        <!-- REC logo: ruit met chevron -->
        <svg width="38" height="38" viewBox="0 0 38 38" xmlns="http://www.w3.org/2000/svg">
          <rect width="38" height="38" rx="4" fill="#00AAA2"/>
          <g transform="translate(19,19) rotate(45) translate(-10,-10)">
            <rect x="2" y="2" width="16" height="16" fill="none" stroke="white" stroke-width="2"/>
          </g>
          <polyline points="13,22 19,16 25,22" fill="none" stroke="white" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <div class="ml-2">
          <div class="rec-name">Real Estate Care</div>
          <div class="rec-tagline">Caring is in our nature</div>
        </div>
      </div>
    </template>

    <template #append>
      <v-btn icon="mdi-bell-outline" color="white" variant="text" size="small" />
      <v-avatar color="#00AAA2" size="32" class="mr-3 cursor-pointer">
        <span class="text-white text-caption font-weight-bold">AS</span>
      </v-avatar>
    </template>
  </v-app-bar>
</template>

<script>
export default {
  name: 'AppHeader',
  emits: ['logoClick'],
}
</script>

<style scoped>
.rec-logo {
  cursor: pointer;
  outline: none;
}
.rec-logo:focus-visible {
  outline: 2px solid #00AAA2;
  outline-offset: 2px;
  border-radius: 4px;
}
.rec-name {
  font-size: 0.95rem;
  font-weight: 600;
  color: white;
  line-height: 1.2;
  letter-spacing: 0.3px;
}
.rec-tagline {
  font-size: 0.62rem;
  color: #00AAA2;
  letter-spacing: 0.8px;
  line-height: 1;
}
</style>