<template>
  <div class='container'>
      <p class="subtitle">
        Drug Information
      </p>
      <app-searchbar class='search' @searchDrug="getDrugInfo"></app-searchbar>
      <app-drug-info v-if='isActive' :drug2='drug' :allDrugs='allDrugs' :type='type' :drugName='drugName'></app-drug-info>
  </div>
</template>

<script>
import DrugInfo from './components/DrugInfo.vue';
import Searchbar from './components/Searchbar.vue';

export default {
  data: function() {
    return {
      drug:  {},
      isActive: false,
      drugName: ''
    }
  },
  components: {
    'app-drug-info': DrugInfo,
    'app-searchbar': Searchbar
  },
  methods: {
    getDrugInfo(e) {
      var inside;
      this.drugName = e;
      fetch(`https://api.fda.gov/drug/label.json?search=openfda.generic_name:"${e}"&limit=50`).then(res => res.json()).then( data => {
        this.drug = data.results[0];
        this.allDrugs = data.results;
        this.isActive = true;
        this.type = 'Generic';
      })
      .catch(error => {
        fetch(`https://api.fda.gov/drug/label.json?search=openfda.brand_name:"${e}"&limit=50`).then(res => res.json()).then( data => {
        this.drug = data.results[0];
        this.allDrugs = data.results;
        this.isActive = true;
        this.type = 'Brand';
        });
      });
      // Fetch the drug's info using openFDA API, send it to the Drug Info component, and reveal the component.
    }
  },
  mounted() {
    this.getDrugInfo('Amoxicillin');
  }
}
</script>

<style lang="scss">
html {
  background: #477998;
 // background: -webkit-linear-gradient(to right, #0b8793, #360033);  /* Chrome 10-25, Safari 5.1-6 */
//  background: linear-gradient(to right, #0b8793, #360033); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

}
.search {
  padding: 100px 100px 55px 100px;
}
</style>
