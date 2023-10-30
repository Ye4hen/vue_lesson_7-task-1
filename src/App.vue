<template>
    <div class="container">
        <students-component title="ПІБ - Середня Оцінка" />
        <students-filters :systems="getSystemsList" :categories="getMarksCategoryList" />
    </div>
</template>

<script>
import StudentsComponent from './components/StudentsComponent.vue'
import StudentsFilters from './components/StudentsFilters.vue'
import { mapGetters } from 'vuex'

export default {
    name: 'App',
    components: { StudentsComponent, StudentsFilters },
    computed: {
        ...mapGetters(['getSystemsList', 'getMarksCategoryList']),
    },
}
</script>
<style lang="scss">
@import './assets/style/';
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    margin-block: 60px;
}
</style>