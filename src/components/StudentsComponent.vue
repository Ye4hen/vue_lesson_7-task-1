<template>
    <div class="students__container">
        <ul class="students__list">
            <h2 class="title">{{ title }}</h2>
            <li v-for="student in filteredStudents" :key="student.id" class="students__item">
                <h6 class="students__name">{{ student.name }}</h6>
                -
                <div>{{ student.averageMark }}</div>
                <!-- -
                <div>{{ student.category }}</div> -->
            </li>
            <div v-if="errorMessage">{{ errorMessage }}</div>
        </ul>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    name: 'StudentsComponent',
    props: {
        title: String,
    },
    computed: {
        ...mapGetters(['filteredStudents', 'getStudentsList', 'errorMessage']),
        // filterStudentsList() {
        //     if (!this.filteredStudents.length) {
        //         return this.getStudentsList
        //     } else {
        //         return this.filteredStudents
        //     }
        // },
    },
}
</script>
