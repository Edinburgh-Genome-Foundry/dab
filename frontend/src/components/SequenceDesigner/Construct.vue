<script>
import partslot from './PartSlot'
import construct from './Construct'
import download from 'downloadjs'
import toolbar from './ConstructToolBar'
import { mapMutations } from 'vuex'

export default {
  name: 'construct',
  props: {construct},
  data () {
    return {
      options: JSON.parse(JSON.stringify(this.construct.options)),
      showOptions: false
    }
  },
  computed: {
    constructName: {
      get () {
        return this.construct.name
      },
      set (value) {
        this.updateConstructName({
          construct: this.construct,
          name: value
        })
      }
    },
    optionsEnabled () {
      var tpl = this.constructTemplate
      var options = this.options
      var result = {}
      tpl.slotNames.map(function (name) {
        result[name] = tpl.slotOptions[name].enabled(options)
      })
      return result
    },
    optionsLocked () {
      var tpl = this.constructTemplate
      var result = {}
      tpl.slotNames.map(function (name) {
        result[name] = tpl.slotOptions[name].locked
      })
      return result
    },
    categoriesEnabled () {
      var tpl = this.constructTemplate
      var options = this.options
      var result = {}
      tpl.slotNames.map(function (name) {
        result[name] = tpl.slotOptions[name].categoriesEnabled(options)
      })
      return result
    }
  },
  watch: {
    options: {
      deep: true,
      handler (newval) {
        this.updateOptions({
          construct: this.construct,
          options: newval
        })
      }
    }
  },
  components: {
    'part-slot': partslot,
    'toolbar': toolbar
  },
  methods: {
    ...mapMutations([
      'updateOptions',
      'updateConstructName'
    ]),
    downloadSchema: function () {
      download(JSON.stringify(this.constructData, null, ' '), 'json')
    }
  }
}
</script>
<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style lang='scss' scoped>
.construct {
  hr {
    border: 1px solid #eee;
  }
  margin-top: 4em;
  .name {
    font-size: 1.5em;
    margin-bottom: 0em;
    width: 100%;
    display: inline-block;
  }
  textarea {
    border: none !important;
    outline: 0 !important;
    border-color: Transparent;
    font-family: 'Raleway';
    font-size: 1em;
    resize: none;

  }
  .construct-hover-only {
    visibility: hidden;
  }
  .slots /deep/ {
    .construct-hover-only {
      visibility: hidden;
    }
  }
  &:hover {
    .construct-hover-only {
      visibility: visible;
    }
    .slots /deep/ {
      .construct-hover-only {
        visibility: visible;
      }
    }
  }
  .options {
    width: 85%;
    max-width: 55em;
    margin: 1em auto;
    .radio {
      display: inline;
      padding: 20px;
    }
    .el-checkbox, .el-select {
      margin-right: 1em;
      margin-left: 0;
    }
  }
}

.part-slot {
  display: inline-block;;
}
.parts-list-move {
  transition: transform 0.5s;
}
.absolute-animation {
  position: absolute;
  transition: all 0.5s;
}
</style>
