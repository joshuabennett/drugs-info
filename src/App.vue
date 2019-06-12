<template>
  <div class='container'>
      <p class="subtitle">
        Drug Information
      </p>

      <div class="field">
        <p class="control has-icons-right">
          <input class="input is-rounded is-large" type="text" placeholder="Drug Brand/Generic Name">
          <span class="icon is-large is-right">
            <i class="fas fa-search"></i>
          </span>
        </p>
      </div>
  </div>
</template>

<script>
import DrugInfo from './components/DrugInfo.vue';
import Searchbar from './components/Searchbar.vue';

export default {
  components: {
    'app-drug-info': DrugInfo,
    'app-searchbar': Searchbar
  }
}
</script>

<style lang="scss">
html {
  background: #477998;
 // background: -webkit-linear-gradient(to right, #0b8793, #360033);  /* Chrome 10-25, Safari 5.1-6 */
//  background: linear-gradient(to right, #0b8793, #360033); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

}
.fas {
  color: black;
  
}
</style>
