<template>
    <div>
        <h1 class="title is-1"> {{ drugName.toUpperCase() }} </h1>
        <p class='alt-name'> {{ /* Generic/Brand Name: */ }} {{ /* Alternate Drug Name */ }}</p>
        <p class='drug-class'> Classification: <a> {{ /* Drug Classification */ }} </a></p>
        <p>Description</p>
        <div class="notification"> {{ /* Drug Description */ }}</div>
    </div>
</template>

<script>
export default {
    props: ['drug', 'drugName']

}
</script>

<style>

</style>
