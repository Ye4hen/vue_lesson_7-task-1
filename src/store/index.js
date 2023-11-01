import { createStore } from 'vuex';

export default createStore({
	state: {
		studentsList: [
			{
				id: 1,
				name: 'Василенко Василь Васильович',
				marks: [8, 9, 5, 12, 6],
				system: '12-бальна',
				category: null,
				averageMark: null,
			},
			{
				id: 2,
				name: 'Іванов Іван Іванович',
				marks: [2, 3, 1, 2, 2],
				system: '12-бальна',
				category: null,
				averageMark: null,
			},
			{
				id: 3,
				name: 'Петренко Петро Петрович',
				marks: [12, 12, 12, 12, 12],
				system: '12-бальна',
				category: null,
				averageMark: null,
			},
			{
				id: 4,
				name: 'Максименко Максим Максимович',
				marks: [3, 4, 2, 5, 3],
				system: '5-бальна',
				category: null,
				averageMark: null,
			},
			{
				id: 5,
				name: 'Даниленко Данило Данилович',
				marks: [5, 4, 5, 5, 4],
				system: '5-бальна',
				category: null,
				averageMark: null,
			},
			{
				id: 6,
				name: 'Остапенко Остап Остапович',
				marks: [5, 5, 5, 5, 5],
				system: '5-бальна',
				category: null,
				averageMark: null,
			},
		],
		systemsList: [
			{
				name: '5-бальна',
			},
			{
				name: '12-бальна',
			}
		],
		marksCategoryList: [
			{
				name: 'Відмінник'
			},
			{
				name: 'Хорошист'
			},
			{
				name: 'Середнячок'
			},
			{
				name: 'Двійочник'
			},
		],
		selectedSystem: null,
		selectedCategory: null,
		filteredStudents: [],
		errorMessage: null
	},
	getters: {
		getStudentsList: (state) => state.studentsList,
		getSystemsList: (state) => state.systemsList,
		errorMessage: (state) => state.errorMessage,
		getMarksCategoryList: (state) => state.marksCategoryList,
		getSelectedSystem: (state) => state.selectedSystem,
		getSelectedCategory: (state) => state.selectedCategory,

		filteredStudents: (state, getters) => {
			const systemValue = state.selectedSystem;
			const categoryValue = state.selectedCategory;

			let filteredStudents = state.studentsList;
			if (systemValue === "Всі" && categoryValue === "Всі") {
				return filteredStudents;
			}

			if (systemValue === "Всі") {
				filteredStudents = filteredStudents.filter((student) => student.category === categoryValue);
				if (systemValue === "Всі" && !categoryValue) {
					filteredStudents = state.studentsList;
				}
			} else if (categoryValue === "Всі") {
				filteredStudents = filteredStudents.filter((student) => student.system === systemValue);
				if (categoryValue === "Всі" && !systemValue) {
					filteredStudents = state.studentsList;
				}
			} else if (systemValue && categoryValue) {
				filteredStudents = filteredStudents.filter((student) => student.system === systemValue && student.category === categoryValue);
			} else if (systemValue && systemValue !== "Всі") {
				filteredStudents = filteredStudents.filter((student) => student.system === systemValue);
			} else if (categoryValue && categoryValue !== "Всі") {
				filteredStudents = filteredStudents.filter((student) => student.category === categoryValue);
			}

			if (!filteredStudents.length) {
				state.errorMessage = "Немає таких учнів:("
			} else {
				state.errorMessage = null
			}

			filteredStudents = filteredStudents.map((student) => {
				student.averageMark = getters.calculateAverageMark(student.marks);
				student.category = getters.determineCategory(student.averageMark, student.system);
				return student;
			});


			return filteredStudents;
		},

		calculateAverageMark: () => (marks) => {
			if (marks.length === 0) return 0;
			const totalMarks = marks.reduce((sum, mark) => sum + mark, 0);
			return totalMarks / marks.length;
		},

		determineCategory: () => (averageMark, system) => {
			if (system === '12-бальна') {
				if (averageMark >= 9) {
					return "Відмінник";
				} else if (averageMark >= 7) {
					return "Хорошист";
				} else if (averageMark >= 4) {
					return "Середнячок";
				} else {
					return "Двійочник";
				}
			} else if (system === '5-бальна') {
				if (averageMark === 5) {
					return "Відмінник";
				} else if (averageMark >= 4) {
					return "Хорошист";
				} else if (averageMark >= 3) {
					return "Середнячок";
				} else {
					return "Двійочник";
				}
			}
		},
	},
	mutations: {
		setSelectedSystem(state, system) {
			state.selectedSystem = system;
		},
		setSelectedCategory(state, category) {
			state.selectedCategory = category;
		},
	},
	actions: {

		updateSelectedSystem({ commit }, system) {
			commit('setSelectedSystem', system);
		},
		updateSelectedCategory({ commit }, category) {
			commit('setSelectedCategory', category);
		},
	},
	modules: {},
});