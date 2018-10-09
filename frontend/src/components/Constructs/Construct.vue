<template lang='pug'>
.construct(:class="{'no-hover': construct.noHover}")
  el-menu.construct-sidebar.construct-hover-only(
    :collapse='true',
    style='float: left; position: absolute;'
    v-if="!(construct.hideHeader) && showMenu",
    :collapse-transition='false')
    
    el-menu-item(index='2', @click="moveConstructUp({construct: construct})")
      i.el-icon-arrow-up
      span(slot='title' ) Move up
    el-menu-item(index='3' @click="moveConstructDown({construct: construct})")
      i.el-icon-arrow-down
      span(slot='title') Move down
    el-menu-item(index='4', @click="duplicateConstruct({construct: construct})")
      i.el-icon-plus
      span(slot='title') Duplicate
    el-menu-item(index='5', @click="downloadSchema")
      i.el-icon-download
      span(slot='title') Download schema
    el-menu-item(index='6', @click="deleteConstruct({construct: construct})")
      i.el-icon-delete
      span(slot='title') Delete
    el-submenu(index='1')
      template(slot="title")
        i.el-icon-setting
        span(slot="title") Settings
      .construct-form(:is='forms[construct.templateName]', v-model='options')
    
    
  .div(:style="{marginLeft: construct.hideHeader ? '0px' : '80px'}")
    .construct-header(v-if="!(construct.hideHeader)")
      textarea.name(v-model='constructName', placeholder='(Name this construct)', :rows='1')
      .template-name From {{construct.templateName}}
    .slots()
      transition-group(name='parts-list',
                      enter-active-class='animated flipInX',
                      leave-active-class='animated zoomOut absolute-animation',
                      tag='div')
        .part-slot(v-for='slotName in constructTemplate.slotNames', :key='slotName',
                  v-if='optionsEnabled[slotName]', :slotName='slotName',
                  is='part-slot',
                  :categoriesEnabled='categoriesEnabled[slotName]',
                  :color='constructTemplate.zoneColors[constructTemplate.slotInfos[slotName].zone]',
                  :zoneIndex='Object.keys(constructTemplate.zoneColors).indexOf(constructTemplate.slotInfos[slotName].zone[0]) + 1',
                  :construct='construct',
                  :noConnection='construct.doNotConnect'
                  :optionsLocked='optionsLocked[slotName]',
                  :userEnabled='construct.userEnabled[slotName]')
</template>

<script>
import partslot from '../Parts/PartSlot'
import download from 'downloadjs'
import { forms } from './ConstructForm'
import { mapMutations, mapGetters } from 'vuex'

export default {
  name: 'construct',
  props: {construct: {default: null}},
  data () {
    return {
      options: JSON.parse(JSON.stringify(this.construct.options)),
      showOptions: false,
      forms: forms,
      showMenu: false
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
  mounted () {
    this.showMenu = true
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
    'part-slot': partslot
  },
  methods: {
    ...mapMutations([
      'updateOptions',
      'updateConstructName',
      'deleteConstruct',
      'duplicateConstruct',
      'moveConstructUp',
      'moveConstructDown',
    ]),
    downloadSchema: function () {
      download(
        JSON.stringify(this.construct, null, ' '),
        this.constructName + '.json'
      )
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
  &:hover:not(.no-hover) {
    .construct-hover-only {
      visibility: visible;
    }
    .slots /deep/ {
      .construct-hover-only {
        visibility: visible;
      }
    }
  }
  .template-name {
    color: grey;
    font-size: 0.8em;
    margin-top: -0.5em;
    margin-left: 0.3em;
  }
  .construct-sidebar {
    // font-size: 0.8em;
  }
}

.construct-form /deep/ {
  .el-form-item {
    margin-bottom: 1px !important;
  }
  .el-form-item__label {

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
