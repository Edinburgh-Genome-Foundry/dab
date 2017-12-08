import { generateRandomID } from '../tools'

export const mutations = {
  addConstruct (state, { templateName }) {
    console.log(template)
    var template = state.constructTemplates[templateName]
    var newConstruct = {
      templateName: templateName,
      userEnabled: {},
      selectedParts: {},
      id: generateRandomID(),
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
    newConstruct.id = generateRandomID()
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
    var newConstructs = state.constructs.slice()
    constructs.map(function (c) {
      console.log(c)
      c.id = generateRandomID()
      console.log(c)
      newConstructs.push(c)
    })
    state.constructs = newConstructs
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
