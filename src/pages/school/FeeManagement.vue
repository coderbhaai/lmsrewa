<template>
    <div class="q-pa-md">
        <div v-if="showAddForm"><q-btn @click="hideForm()" class="q-mb-lg" rounded glossy color="accent">Hide Fees</q-btn></div>
        <div v-else><q-btn @click="showForm()" class="q-mb-lg" rounded glossy color="primary">Add Fees</q-btn></div>
        <div v-if="showAddForm">
            <q-form class="q-gutter-md q-mb-lg" @submit="submitHandler">
                <div class="row">
                    <div class="col-3 q-pr-lg"><q-select map-options emit-value v-model="classes" :options="schoolClassOptionsCopy" option-value="id" option-label="name" label="Class" required @input="classSelected"/></div>
                    <div class="col-4 q-pr-lg">
                        <q-select v-model="student" use-input input-debounce="0" label="Select Student" :options="studentList" @filter="filterFn">
                            <template v-slot:no-option><q-item><q-item-section class="text-grey">No results</q-item-section></q-item></template>
                        </q-select>
                    </div>
                    <div class="col-4 q-pr-lg flex-hc"><q-btn label="Create Fees" type="submit" color="primary" class="q-mr-lg"/></div>
                </div>
            </q-form>
        </div>        
    </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
export default {
    data() {
        return {
            classes:                '',
            student:                '',
            showAddForm:            false,
            pagination: { rowsPerPage: 30 },
        }
    },
    methods: {
        ...mapActions(['adminBasics']),
        showForm() { this.showAddForm = true; },
        hideForm() { this.showAddForm = false; },
        resetData(){
            
        },
        submitHandler(){

        },
        classSelected(){
            console.log('Class Selected')
            const data={
                schoolId :      this.user.institute,
                classes:        this.classes
            }
            this.$store.dispatch('studentList', data); 
        },
        filterFn (val, update) {
            if (val === '') {
                update(() => {
                    this.options = this.studentList
                })
            return
            }
        },
    },
    computed: {
        ...mapGetters([ 'user', 'studentList', 'schoolClassOptionsCopy', 'feeStructure',  ]),
    },
    created() {
        const data={
            schoolId : this.user.institute
        }
        this.$store.dispatch('feeManagement', data);
    }
};
</script>
<style>
</style>