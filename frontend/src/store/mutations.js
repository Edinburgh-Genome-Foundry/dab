export const STORAGE_KEY = 'constructs-vuejs'

// for testing
if (navigator.userAgent.indexOf('PhantomJS') > -1) {
  window.localStorage.clear()
}

function guid () {
  function s4 () {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1)
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4()
}
export const state = {
  constructs: JSON.parse(window.localStorage.getItem(STORAGE_KEY) || '[]')
}

export const mutations = {
  addConstruct (state, { template }) {
    console.log(template)
    var newConstruct = {
      templateName: template.name,
      userEnabled: {},
      selectedParts: {},
      id: guid(),
      name: 'Unnamed Construct',
      options: JSON.parse(JSON.stringify(template.defaultOptions))
    }
    template.slotNames.map(function (name) {
      newConstruct.userEnabled[name] = true
      newConstruct.selectedParts[name] = []
    })
    state.constructs.push(newConstruct)
  },

  duplicateConstruct (state, { construct }) {
    var index = state.constructs.indexOf(construct)
    var newConstructs = state.constructs.slice()
    var newConstruct = JSON.parse(JSON.stringify(newConstructs[index]))
    newConstruct.id = guid()
    newConstruct.name = newConstruct.name + ' (copy)'
    newConstructs.splice(index + 1, 0, newConstruct)
    state.constructs = newConstructs
  },

  deleteConstruct (state, { construct }) {
    var newConstructs = state.constructs.slice()
    newConstructs.splice(state.constructs.indexOf(construct), 1)
    state.constructs = newConstructs
  },

  moveConstructUp (state, { construct }) {
    var index = state.constructs.indexOf(construct)
    var indexUp = Math.max(0, index - 1)
    var newConstructs = state.constructs.slice()
    newConstructs[index] = state.constructs[indexUp]
    newConstructs[indexUp] = construct
    state.constructs = newConstructs
  },

  moveConstructDown (state, { construct }) {
    var index = state.constructs.indexOf(construct)
    var indexDown = Math.min(state.constructs.length - 1, index + 1)
    var newConstructs = state.constructs.slice()
    newConstructs[index] = state.constructs[indexDown]
    newConstructs[indexDown] = construct
    state.constructs = newConstructs
  },

  loadConstructs (state, { constructs }) {
    state.constructs += constructs
  },

  updateUserEnabled (state, {construct, slotName, bool}) {
    construct.userEnabled[slotName] = bool
  },

  updateSelectedParts (state, {construct, slotName, selectedParts}) {
    construct.selectedParts[slotName] = selectedParts
  },

  updateOptions (state, {construct, options}) {
    construct.options = options
  },

  updateConstructName (state, {construct, name}) {
    construct.name = name
  },

}
