<template>
    <div class="field has-addons">
        <div class="control is-expanded">
          <input class="input is-rounded is-large" type="text" placeholder="Drug Brand/Generic Name"
          @keyup.enter="submit" v-model='drugName'>
        </div>
        <div class="control">
            <a class="button is-large is-rounded has-text-grey is-primary"
            @click.prevent='submit'>
                Search
            </a>
        </div>
      </div>
</template>

<script>
export default {
    data: function () {
        return {
            drugName: ''
        }
    },
    methods: {
        submit() {
            console.log('Submitted');
            this.$emit('searchDrug', this.drugName);
        }
    }

}
</script>

<style>

</style>
