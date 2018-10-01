
<template lang="pug">
.construct-upload-form
  p Upload projects or constructs from previous sessions.
  center
    files-uploader(v-model='file', :showSelected='false', :multiple='false',
                   help='Click here or drag/drop a .project',
                   text='Provide JSON designs exported from previous projects.')
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  data () {
    return {
      file: null
    }
  },
  methods: {
    ...mapMutations([
      'loadConstructs'
    ]),
  },
  watch: {
    'file.content': function (newval) {
      if (newval) {
        var json = JSON.parse(atob(newval.split(',')[1]))
        if (json.projectName && (this.constructs.length === 0)) {
          this.$emit('input', json.projectName)
        }
        this.loadConstructs({constructs: json.constructs || [json]})
      }
    }
  }
}
</script>