<template>
  <div class='container'>
      <p class="subtitle">
        Drug Information
      </p>
      <app-searchbar @searchDrug="getDrugInfo"></app-searchbar>
      <app-drug-info v-if='isActive' :drug='drug' :drugName='drugName'></app-drug-info>
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
      this.drugName = e;
      fetch(`https://api.fda.gov/drug/label.json?search=openfda.generic_name:"${e}"&limit=1`).then(function(response) {
        return response.json();
      }).then(function(result) {
        this.drug = result;
      });
      // Fetch the drug's info using openFDA API, send it to the Drug Info component, and reveal the component.
      this.isActive = true;
    }
  }
}
</script>

<style lang="scss">
html {
  background: #477998;
 // background: -webkit-linear-gradient(to right, #0b8793, #360033);  /* Chrome 10-25, Safari 5.1-6 */
//  background: linear-gradient(to right, #0b8793, #360033); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

}
</style>
