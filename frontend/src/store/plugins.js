
import { STORAGE_KEY } from './state'
import createLogger from 'vuex/plugins/logger'

const localStoragePlugin = store => {
  store.subscribe((mutation, { todos }) => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
    const syncedData = { auth: state.auth, user: state.user }
    if (mutation.type === 'CLEAR_ALL_DATA') {
      localStorage.removeItem(STORAGE_KEY)
    }
  })
}

export default process.env.NODE_ENV !== 'production'
  ? [createLogger(), localStoragePlugin]
  : [localStoragePlugin]
