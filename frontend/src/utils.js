var globalSettings = require('settings')

function userIdLookup (data) {
  if (data.$cookie.get('userId')) {
    data.userId = data.$cookie.get('userId').replace(/"/g, '')
  } else {
    data.userId = 'visitor'
    getToken(data)
  }
  return data.userId
}

function getToken (data) {
  if (!data.hasOwnProperty || !data.username) {
    data.$set(data, 'username', globalSettings.ANONYMOUS_USERNAME)
    data.$set(data, 'password', globalSettings.ANONYMOUS_PASSWORD)
  }
  data.$http.post(
    globalSettings.API_AUTH_URL,
    {},
    {
      headers: {
        Authorization: 'Basic ' + btoa(data.username + ':' + data.password)
      },
      emulateJSON: true,
    },
  ).then((result) => {
    if (result.status === 200) {
      let parentUrl = getDomain(data)
      document.cookie = 'sessionId="' + result.body.data.token + '"; domain=' + parentUrl
      document.cookie = 'userId="' + data.username + '"; domain=' + parentUrl
      this.showLoginDialog = false
      data.$set(data, 'showLoginDialog', false)
      data.$set(data, 'userId', data.username)
      data.$set(data, 'loginAction', 'Switch User')
    } else {
      data.$set(data, 'loginMessage', 'bad password' + result.status)
    }
  },
  (result) => {
    this.password = ''
    data.$set(data, 'loginMessage', 'bad password.Error:' + result.status)
  })
}

function getDomain (data) {
  let parentUrl = location.hostname.split('.').slice(1).join('.')
  if (!parentUrl) {
    parentUrl = 'localhost'
  }
  return parentUrl
}

function tryLogout (data) {
  let url = getDomain(data)
  data.username = '' // So we get a visitor cookie!
  document.cookie = 'sessionId=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=' + url
  document.cookie = 'userId=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=' + url
  getToken(data) // we have to login as a visitor now.. so not logout..
}

/**
 * Get the error from a response.
 *
 * @param {Response} response The Vue-resource Response that we will try to get errors from.
 */
function getError (response) {
  return response.body['error_description']
    ? response.body.error_description
    : response.statusText
}

module.exports = {
  userIdLookup,
  getToken,
  getDomain,
  tryLogout,
  getError
}
