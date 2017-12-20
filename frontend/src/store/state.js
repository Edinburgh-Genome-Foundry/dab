import constructTemplates from './constructTemplates'
import settings from '../settings'
export const STORAGE_KEY = 'constructs-vuejs'

// for testing
if (navigator.userAgent.indexOf('PhantomJS') > -1) {
  window.localStorage.clear()
}

export const state = {
  constructs: JSON.parse(window.localStorage.getItem(STORAGE_KEY) || '[]'),
  constructTemplates,
  settings,
  auth: {
    isLoggedIn: false,
    accessToken: null,
    refreshToken: null,
  },
  user: {
    name: null
  }
}
