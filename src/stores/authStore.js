import { defineStore } from 'pinia'

// Gesimuleerde gebruikersdatabase voor het prototype.
// In productie wordt dit vervangen door een echte backend-call.
const MOCK_USERS = [
  { username: 'arjan', password: 'rec2025', name: 'Arjan Smit', initials: 'AS', role: 'inspector' },
  { username: 'lotte', password: 'rec2025', name: 'Lotte de Vries', initials: 'LV', role: 'inspector' },
]

// Gesimuleerde 2FA-code die in productie per SMS of authenticator-app verstuurd wordt.
const MOCK_2FA_CODE = '123456'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isAuthenticated: localStorage.getItem('rec_auth') === 'true',
    currentUser: JSON.parse(localStorage.getItem('rec_user') || 'null'),
    pendingUser: null,       // tijdelijk opgeslagen na stap 1, vóór 2FA-bevestiging
    loginError: null,
    twoFactorError: null,
  }),

  getters: {
    userName: (state) => state.currentUser?.name || '',
    userInitials: (state) => state.currentUser?.initials || '',
  },

  actions: {
    /**
     * Stap 1: valideer gebruikersnaam en wachtwoord.
     * Bij succes wordt de gebruiker opgeslagen als pendingUser en
     * moet de 2FA-code nog ingevoerd worden.
     * @returns {boolean} true als credentials kloppen
     */
    validateCredentials(username, password) {
      this.loginError = null
      const user = MOCK_USERS.find(
        (u) => u.username === username && u.password === password,
      )
      if (user) {
        this.pendingUser = user
        return true
      }
      this.loginError = 'Gebruikersnaam of wachtwoord is onjuist.'
      return false
    },

    /**
     * Stap 2: valideer de 2FA-code.
     * Simuleert een verificatie die in productie via een externe dienst zou lopen.
     * @returns {boolean} true als code klopt
     */
    validateTwoFactor(code) {
      this.twoFactorError = null
      if (code === MOCK_2FA_CODE) {
        this.currentUser = this.pendingUser
        this.pendingUser = null
        this.isAuthenticated = true
        localStorage.setItem('rec_auth', 'true')
        localStorage.setItem('rec_user', JSON.stringify(this.currentUser))
        return true
      }
      this.twoFactorError = 'De verificatiecode is onjuist. Probeer: 123456'
      return false
    },

    logout() {
      this.isAuthenticated = false
      this.currentUser = null
      this.pendingUser = null
      localStorage.removeItem('rec_auth')
      localStorage.removeItem('rec_user')
    },
  },
})