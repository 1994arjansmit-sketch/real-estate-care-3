import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { aliases, mdi } from 'vuetify/iconsets/mdi'
import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'
import App from './App.vue'
import router from './router'

const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: { mdi },
  },
  theme: {
    defaultTheme: 'recTheme',
    themes: {
      recTheme: {
        dark: false,
        colors: {
          primary: '#00AAA2',
          secondary: '#47607C',
          'on-primary': '#FFFFFF',
          background: '#F4F6F7',
          surface: '#FFFFFF',
          dark: '#141B1F',
          error: '#D32F2F',
          warning: '#F57C00',
          success: '#388E3C',
        },
      },
    },
  },
})

createApp(App).use(createPinia()).use(router).use(vuetify).mount('#app')