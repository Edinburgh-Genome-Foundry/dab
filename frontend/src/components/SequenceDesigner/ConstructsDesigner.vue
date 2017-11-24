<template lang='pug'>
.constructs-designer
  //- .file-operations
    //- el-button(icon='document' size='mini' @click='downloadExcel').file-link Download Excel
    //- el-button.file-link(size='mini' @click='downloadJson') <icon name='file-text-o'></icon> Download JSON
    //- el-button.file-link(size='mini' @click='showFileDialog=true') <icon name='upload'></icon> Upload Sketches
    //- el-dialog.part-selector(title="Upload a schema", :visible.sync="showFileDialog", size='small')
    //-   files-uploader(v-model='file', :showSelected='false', :multiple='false')
  //- textarea.title(v-model='projectTitle', type="textarea" rows=1, placeholder='(Enter a project title)')
  transition-group(name='constructs-list',
                   enter-active-class='animated flipInX',
                   leave-active-class='animated fadeOut',
                   tag='div')
    .construct(v-for="construct, i in constructs",
         :construct='construct',
         :is='constructTypes[construct.templateName]',
         :key='construct.id')

    collapsible-button(text='Add constructs' key='collapsible-button')
      el-button.add-construct(icon='plus' v-for='component, name in constructTypes',
                              size='small', :key='name',
                              @click='addConstruct({template: component.constructTemplate}); dialogVisible=false') {{name}}
      files-uploader(v-model='file', :showSelected='false', :multiple='false',
                     help='Click here or drag/drop a .project',
                     text='...or provide constructs from a previous project.')
</template>

<script>
import construct from './Construct'
import EMMAConstruct from './templates/EMMAConstruct'
import PhytobricksConstruct from './templates/PhytobricksConstruct'
import { mapMutations } from 'vuex'
import CollapsibleButton from '../widgets/CollapsibleButton'
export default {
  name: 'constructs-designer',
  data: function () {
    return {
      projectTitle: 'My project',
      constructTypes: {
        'EMMA': EMMAConstruct,
        'Phytobricks': PhytobricksConstruct
      },
      dialogVisible: false,
      file: {},
      // showFileDialog: false
    }
  },
  components: {
    construct,
    'collapsible-button': CollapsibleButton
  },
  computed: {
    constructs () {
      return this.$store.state.constructs
    }
  },
  methods: {
    ...mapMutations([
      'addConstruct',
    ])
  },
  mounted: function () {
    // if (this.constructs.length === 0) {
    //   this.addConstruct({template: this.constructTypes['EMMA'].constructTemplate})
    //   this.addConstruct({template: this.constructTypes['EMMA'].constructTemplate})
    // }
    console.log('Mounted', this.constructs)
  }
}
// computed: {
//   emptySlots: function () {
//     return Object.values(this.slots).some(function (slot) {
//       return ((slot.selectedParts.length === 0) && slot.optionsEnabled &&
//               (slot.userEnabled || slot.optionsLocked))
//     })
//   },
//   partsIds: function () {
//     var partIds = []
//     Object.values(this.slots).map(function (val) {
//       if (val.optionsEnabled && (val.optionsLocked || val.userEnabled)) {
//         val.selectedParts.map(function (val2) {
//           if (partIds.indexOf(val2.dbId) < 0) {
//             partIds.push([val2.dbId, val2.dbName])
//           }
//         })
//       }
//     })
//     return partIds
//   }
// },
</script>

<style lang='scss' scoped>
.constructs-designer {
  width: 100%;
  margin-top: 2em;
  input, textarea {
    border: none !important;
    outline: 0 !important;
    border-color: Transparent;
    font-family: 'Raleway';
    font-size: 1em;
    resize: none;
    &.title {
      font-size: 2em;
      margin-bottom: 0.1em;
      width: 100%;
      text-align: center;

    }
    &.note {
      width: 100%;
    }
  }
  .file-operations {
    text-align: center;
    .file-link {
      display: inline;
      font-size: 1em;
      border: none;
      margin-right: 1em;
    }
    margin-bottom: 2.5em;
  }
  .el-dropdown-menu__item {
    font-family: 'Raleway' !important;

  }
  .add-construct {
    margin-bottom: 1em;
  }
  .add-a-construct {
    width: 95%;
    max-width: 500px;
    margin: 0 auto;
    text-align: center;
    h3 {
      font-size: 1.5em;
      // text-align: center;
    }
    .files-uploader {
      margin-top: 1em;
    }

  }
  .constructs-list-move {
    transition: transform 1s;
  }
  .collapsible-button-move {
    transition: transform 1s;
  }
}


// .constructs-list-leave-active {
//   transition: all 1s;
//   opacity: 0;
// }
// .constructs-list-item {
//   transition: all 1s;
//   display: inline-block;
//   margin-right: 10px;
// }
// .constructs-list-leave-active {
//   position: absolute;
// }
</style>
