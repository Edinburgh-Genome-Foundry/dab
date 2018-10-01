<template lang='pug'>
  construct.animated-construct(:construct='construct')
</template>

<script>
import construct from '../Constructs/Construct.vue'

export default {
  data () {
    var templateName = 'MoClo / Phytobricks-L1'
    var template = this.$store.state.constructTemplates[templateName]

    console.log('tmp', template)
    var construct = {
      templateName: templateName,
      hideHeader: true,
      noHover: true,
      userEnabled: {},
      selectedParts: {},
      doNotConnect: true,
      id: 0,
      name: '',
      options: JSON.parse(JSON.stringify(template.defaultOptions))
    }
    console.log(construct.options)
    template.slotNames.map(function (name) {
      construct.userEnabled[name] = true
      construct.selectedParts[name] = []
    })
    return {
      construct
    }
  },
  components: {
    construct
  },
  mounted () {
    var self = this
    this.counter = 0
    this.interval = window.setInterval(function () {
      var param = [
        'singlePartCDS',
        'singlePartPromoterUTR',
        'singlePartUTRTerminator'
      ][[0, 1, 2, 1, 0, 2, 1][self.counter % 7]]
      self.counter++
      var options = Object.assign({}, self.construct.options)
      options[param] = !options[param]
      self.$set(self.construct, 'options', options)
    }, 3000)
  }
}
</script>

<style scoped>
.animated-construct {
  margin-top: 3em !important;
  margin-bottom: 3em !important;
}
</style>