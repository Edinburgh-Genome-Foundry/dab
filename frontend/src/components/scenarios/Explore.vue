<template lang="pug">
div
</template>

<script>
import learnmore from '../../components/widgets/LearnMore'
import sequencesuploader from '../../components/widgets/SequencesUploader'
import digestionset from '../../components/widgets/DigestionSelectorSet'

var infos = {
  title: 'Search the database',
  navbarTitle: 'Search the database',
  path: 'search-the-database',
  description: '',
  icon: require('assets/images/search.svg')
}

export default {
  data: function () {
    return {
      form: {
        ladder: '100_to_4k',
        possibleEnzymes: 'EcoRI, XbaI, XhoI',
        maxEnzymes: 1,
        bandsPrecision: 5,
        make_report: false,
        goal: 'ideal',
        bandsRange: [3, 5],
        files: []
      },
      infos: infos,
      ladder_options: [
        {
          label: 'Ladder 100 bp - 4000 bp',
          value: '100_to_4k'
        },
        {
          label: 'Ladder 35 bp - 5 kbp (AATI)',
          value: '35_to_5k'
        },
        {
          label: 'Ladder 75 bp - 15 kbp (AATI)',
          value: '75_to_15k'
        }
      ],
      goal_options: [
        {
          label: 'Good patterns for all constructs',
          value: 'ideal'
        },
        {
          label: 'Different patterns for all constructs, for identification',
          value: 'separating'
        }
      ],
      queryStatus: {
        polling: {},
        result: {},
        requestError: ''
      },
      enzymesPreselection: (
        'AatII, Acc65I, AccI, AflII, AluI, ApaI, ApaLI, AseI, AvaI, AvaII, ' +
        'BamHI, BanI, BanII, BclI, BglII, BsmI, Bsp1286I, BssHII, ClaI, DdeI, ' +
        'DpnI, DraI, EcoRI, EcoRV, FokI, HaeII, HaeIII, HhaI, HincII, ' +
        'HindIII, HinfI, HpaI, HpaII, KpnI, MboI, MluI, MnlI, MspA1I, MspI, ' +
        'NaeI, NarI, NciI, NcoI, NdeI, NheI, NruI, NsiI, PspOMI, PstI, PvuI, ' +
        'PvuII, RsaI, SacI, SacII, SalI, Sau96I, SmaI, SnaBI, SpeI, SphI, ' +
        'SspI, StuI, StyI, XbaI, XhoI, XmaI'
      )
    }
  },
  components: {
    sequencesuploader,
    learnmore,
    digestionset
  },
  infos: infos,
  methods: {
    handleSuccess: function (evt) {
      console.log(evt)
    },
    validateForm: function () {
      var errors = []
      if (this.form.possibleEnzymes.length < 2) {
        errors.push('Provide at least two different restriction enzymes.')
      }
      if (this.form.files.possibleEnzymes === 0) {
        errors.push('Provide at least one construct file')
      }
      return errors
    }
  }
}
</script>

<style lang='scss' scoped>

h4.formlabel {
  text-align: center;
  text-transform: uppercase;
  margin-top: 40px
}

.form {
  margin: 50px auto;
  max-width: 500px;
}

.title-img {
  height:80px;
  margin-top: -20px;
  margin-bottom: 20px;

}

.el-checkbox {
  font-weight: normal;
}


.el-select {
  width: 100%
}

.el-input-number.inline {
  margin-bottom: -9px;
  margin-left: 10px;
  width: 130px;
}

p.loadData {
  font-size: 0.8em;
  margin-bottom: 0;
  cursor: pointer;
}

.bands-range {
  .el-slider {
    display: inline-block;
    width: 150px;
    margin-bottom: -12px;
    margin-left: 10px;
  }
}
</style>
