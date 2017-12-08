export const getters = {
  getConstructOptionsEnabled: (state) => (construct) => {
    var tpl = state.constructTemplates[construct.templateName]
    var options = construct.options
    var result = {}
    tpl.slotNames.map(function (name) {
      result[name] = tpl.slotOptions[name].enabled(options)
    })
    return result
  },
  getConstructTemplate: (state) => (construct) => {
    return state.constructTemplates[construct.templateName]
  },
  getConstructOptionsLocked: (state) => (construct) => {
    var tpl = state.constructTemplates[construct.templateName]
    var options = construct.options
    var result = {}
    tpl.slotNames.map(function (name) {
      if (typeof tpl.slotOptions[name].locked === 'function') {
        result[name] = tpl.slotOptions[name].locked(options)
      } else {
        result[name] = tpl.slotOptions[name].locked
      }
    })
    return result
  },
  getConstructCategoriesEnabled: (state) => (construct) => {
    var tpl = state.constructTemplates[construct.templateName]
    var options = construct.options
    var result = {}
    tpl.slotNames.map(function (name) {
      result[name] = tpl.slotOptions[name].categoriesEnabled(options)
    })
    return result
  },
  getConstructEnabled: (state) => (construct) => {
    var tpl = state.constructTemplates[construct.templateName]
    var options = construct.options
    var result = {}
    console.log(tpl.slotNames)
    tpl.slotNames.map(function (name) {
      var optionsEnabled = tpl.slotOptions[name].enabled(options)
      var optionsLocked = null
      if (typeof tpl.slotOptions[name].locked === 'function') {
        optionsLocked = tpl.slotOptions[name].locked(options)
      } else {
        optionsLocked = tpl.slotOptions[name].locked
      }
      var userEnabled = construct.userEnabled[name]
      console.log(name)
      result[name] = (optionsEnabled && (optionsLocked || userEnabled))
    })
    console.log(result)
    return result
  },
  getConstructEmptySlots: (state, getters) => (construct) => {
    var result = []
    var enabledSlots = getters.getConstructEnabled(construct)
    Object.keys(enabledSlots).map(function (slot) {
      console.log(slot, enabledSlots[slot], construct.selectedParts[slot])
      if (enabledSlots[slot] && (construct.selectedParts[slot].length === 0)) {
        result.push(slot)
      }
    })
    return result
  },
  allConstructsEmptySlots (state, getters) {
    console.log('heheheheheh')
    var results = {}
    state.constructs.map(function (construct, i) {
      var emptySlots = getters.getConstructEmptySlots(construct)
      console.log(emptySlots)
      if (emptySlots.length) {
        results[i + 1] = emptySlots
      }
    })
    return results
  }
}
