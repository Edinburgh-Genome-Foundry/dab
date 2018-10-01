import axios from 'axios'

class IceClient {
  constructor (root) {
    this.sessionInfos = {}
    this.axiosInstance = axios.create({
      baseURL: root + '/rest/',
      timeout: 10000,
      headers: {}
    })
  }

  async request (method, endpoint, data, responseType = 'json') {
    try {
      var params = {method, url: endpoint}
      if (data) {
        params.data = data
      }
      var response = await this.axiosInstance(params)
    } catch (error) {
      var stringRequest = [method, endpoint, JSON.stringify(data)].join(' ')
      console.error('Failed ICE request ' + stringRequest)
      throw error
    }
    if (responseType === 'json') {
      return response.data
    } else if (responseType === 'file') {
      return response.data
    }
  }

  setApiToken (client, token) {
    this.axiosInstance.defaults.headers['X-ICE-API-Token'] = token
    this.axiosInstance.defaults.headers['X-ICE-API-Token-Client'] = client
    this.sessionInfos.name = client
  }

  async getNewSessionId (credentials) {
    try {
      var response = await this.request('POST', 'accesstokens', credentials)
    } catch (error) {
      console.log('ERROR GETTING SESSION ID. Check credentials ?')
      throw (error)
    }
    this.axiosInstance.defaults.headers['X-ICE-Authentication-SessionId'] = response.sessionId
    this.sessionInfos = response
    return response
  }

  async getCustomFields (partId) {
    return this.request('GET', `custom-fields?partId=${partId}`)
  }

  async getPartSamples (id) {
    return this.request('GET', `parts/${id}/samples`)
  }

  async getSequence (id, format) {
    var endpoint = `file/${id}/sequence/${format || 'genbank'}`
    return this.request('GET', endpoint, {}, 'file')
  }

  async getPartInfos (id) {
    return this.request('GET', `parts/${id}`)
  }

  async getFolderInfos (id) {
    return this.request('GET', `folders/${id}`)
  }

  async search (params) {
    var batchSize = params.batchSize || 50
    var minScore = params.minscore || 0
    var self = this

    async function request (offset) {
      return self.request('POST', 'search', {
        entryTypes: params.entry_types || [],
        parameters: {
          start: offset,
          retrieveCount: batchSize,
          sortField: params.sortField || 'RELEVANCE'
        },
        blastQuery: {},
        queryString: params.query,
        webSearch: params.webSearch
      })
    }
    var requestResult = await request(0)
    var count = requestResult['resultCount']

    var result = []
    for (var offset = 0; offset < count; offset = offset + batchSize) {
      var res = await request(offset)
      res['results'].map(function (e) {
        if (e.score > minScore) {
          result.push(e.entryInfo)
        }
      })
    }
    return result
  }

  async changePassword (newPassword, userId) {
    var id = userId || this.sessionsInfos.id
    return this.request('PUT', `users/${id}/password`, {password: newPassword})
  }

  async getCollectionFolders (collection) {
    return this.request('GET', `collections/${collection}/folders`)
  }

  async findPartsWithParameterValue (parameter, value) {
    var results = []
    var self = this
    var searchResults = await this.search({query: value})
    for (var e of searchResults) {
      var parameters = await self.getCustomFields(e['id'])
      if (parameters.some(p => ((p.name === parameter) && (p.value === value)))) {
        e.parameters = parameters
        results.push(e)
      } else {
        return results
      }
    }
    return results
  }
}

exports.IceClient = IceClient
