import { EmmaStandard } from './EMMA/Standard'
import { Phytobricks } from './MoClo/Phytobricks'

var constructTemplates = {
  'EMMA / Standard': EmmaStandard,
  'MoClo / Phytobricks': Phytobricks,
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
