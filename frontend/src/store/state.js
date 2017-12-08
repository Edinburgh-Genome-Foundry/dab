export const STORAGE_KEY = 'constructs-vuejs'
import constructTemplates from './constructTemplates'

// for testing
if (navigator.userAgent.indexOf('PhantomJS') > -1) {
  window.localStorage.clear()
}

export const state = {
  constructs: JSON.parse(window.localStorage.getItem(STORAGE_KEY) || '[]'),
  constructTemplates: constructTemplates
}
