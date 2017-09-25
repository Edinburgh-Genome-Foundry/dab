var globalSettings = require('setting.js')
var exports = module.exports = {}
// var Vue = require('vue')
// var VueCookie = require('vue-cookie')
// Vue.use(VueCookie)
exports.userIdLookup = function (data) {
  if (data.$cookie.get('userId')) {
    data.userId = data.$cookie.get('userId').replace(/"/g, '')
  } else {
    data.userId = 'visitor'
    exports.getToken(data)
  }
  return data.userId
}

exports.getToken = function (data) {
  if (!data.hasOwnProperty || !data.username) {
    data.$set(data, 'username', globalSettings.ANONYMOUS_USERNAME)
    data.$set(data, 'password', globalSettings.ANONYMOUS_PASSWORD)
  }
  data.$http.post(
    globalSettings.AUTH_URL,
    {},
    {
      headers: {
        Authorization: 'Basic ' + btoa(data.username + ':' + data.password)
      },
      emulateJSON: true,
    },
  ).then((result) => {
    if (result.status === 200) {
      let parentUrl = exports.getDomain(data)
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
  }
)
}

exports.getDomain = function (data) {
  let parentUrl = location.hostname.split('.').slice(1).join('.')
  if (!parentUrl) {
    parentUrl = 'localhost'
  }
  return parentUrl
}

exports.tryLogout = function (data) {
  let url = exports.getDomain(data)
  data.username = '' // So we get a visitor cookie!
  document.cookie = 'sessionId=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=' + url
  document.cookie = 'userId=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=' + url
  exports.getToken(data) // we have to login as a visitor now.. so not logout..
}
