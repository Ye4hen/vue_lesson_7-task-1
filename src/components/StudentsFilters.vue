<template>
    <div class="selects__container">
        <div>
            <select class="select" v-model="selectedSystem">
                <option value="Всі">Всі</option>
                <option v-for="system in systems" :key="system.name" :value="system.name">
                    {{ system.name }}
                </option>
            </select>
        </div>
        <div>
            <select class="select" v-model="selectedCategory">
                <option value="Всі">Всі</option>
                <option v-for="category in categories" :key="category.name" :value="category.name">
                    {{ category.name }}
                </option>
            </select>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
    name: 'StudentsFilters',
    props: {
        systems: Array,
        categories: Array,
    },
    computed: {
        ...mapGetters(['getSelectedSystem', 'getSelectedCategory']),
        selectedSystem: {
            get() {
                return this.getSelectedSystem
            },
            set(newSystem) {
                this.updateSelectedSystem(newSystem)
            },
        },
        selectedCategory: {
            get() {
                return this.getSelectedCategory
            },
            set(newCategory) {
                this.updateSelectedCategory(newCategory)
            },
        },
    },
    methods: {
        ...mapActions(['updateSelectedSystem', 'updateSelectedCategory']),
    },
}
</script>
