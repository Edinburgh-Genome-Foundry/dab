var constructTemplates = {
  'EMMA / Standard': require('./EMMA/Standard.js').template,
  'MoClo / Phytobricks': require('./MoClo/Phytobricks.js').template,
  'MoClo / Cyanogate / L1-knockin': require('./MoClo/Cyanogate/L1-knockin.js').template,
  'MoClo / Cyanogate / L1-knockout': require('./MoClo/Cyanogate/L1-knockout.js').template,
  'MoClo / Cyanogate / L1-standard': require('./MoClo/Cyanogate/L1-standard.js').template,
}
var templatesTree = {
  label: 'Templates',
  children: []
}
Object.keys(constructTemplates).map(function (key) {
  var position = templatesTree // root
  var path = key.split(' / ')
  path.map(function (name, i) {
    var child = position.children.find((c) => (c.label === name))
    if (!child) {
      child = {
        label: name,
        children: []
      }
      if (i === path.length - 1) {
        child.templateName = key
      }
      position.children.push(child)
    }
    position = child
  })
})

export default {
  constructTemplates: constructTemplates,
  templatesTree: templatesTree
}
