<template lang='pug'>
.construct
  textarea.name(v-model='constructName', placeholder='(Name this construct)' rows=1)
  .construct-hover-only
    toolbar(:construct='construct', @toggleOptions="showOptions = !showOptions")

  .options.animated.flipInX(v-if='showOptions')
    .construct-form(:is='forms[construct.templateName]', v-model='options')

  .slots
    transition-group(name='parts-list',
                     enter-active-class='animated flipInX',
                     leave-active-class='animated zoomOut absolute-animation',
                     tag='div')
      .part-slot(v-for='slotName in constructTemplate.slotNames', :key='slotName',
                 v-if='optionsEnabled[slotName]', :slotName='slotName',
                 is='part-slot',
                 :categoriesEnabled='categoriesEnabled[slotName]',
                 :zone='constructTemplate.slotInfos[slotName].zone',
                 :construct='construct',
                 :optionsLocked='optionsLocked[slotName]',
                 :userEnabled='construct.userEnabled[slotName]')
</template>


<script>
import partslot from '../Parts/PartSlot'
import download from 'downloadjs'
import toolbar from './ConstructToolBar'
import { forms } from './ConstructForm'
import { mapMutations, mapGetters } from 'vuex'

export default {
  name: 'construct',
  props: {construct: {default: null}},
  data () {
    return {
      options: JSON.parse(JSON.stringify(this.construct.options)),
      showOptions: false,
      forms: forms
    }
  },
  computed: {
    ...mapGetters([
      'getConstructOptionsEnabled',
      'getConstructOptionsLocked',
      'getConstructCategoriesEnabled',
    ]),
    constructTemplate () {
      return this.$store.state.constructTemplates[this.construct.templateName]
    },
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
      return this.getConstructOptionsEnabled(this.construct)
    },
    optionsLocked () {
      return this.getConstructOptionsLocked(this.construct)
    },
    categoriesEnabled () {
      return this.getConstructCategoriesEnabled(this.construct)
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
