<template>
    <div class="q-pa-md">
        <div v-if="showAddForm"><q-btn @click="hideForm()" class="q-mb-lg" rounded glossy color="accent">Hide Fees</q-btn></div>
        <div v-else><q-btn @click="showForm()" class="q-mb-lg" rounded glossy color="primary">Add Fees</q-btn></div>
        <div v-if="showAddForm">
            <q-form class="q-gutter-md q-mb-lg" @submit="submitHandler">
                <div class="row">
                    <div class="col-3 q-pr-lg"><q-select map-options emit-value v-model="classes" :options="schoolClassOptionsCopy" option-value="id" option-label="name" label="Class" required @input="classSelected"/></div>
                    <div class="col-3 q-pr-lg">
                        <q-select v-model="student" use-input input-debounce="0" label="Select Student" :options="options" option-value="id" option-label="name" @filter="filterFn">
                            <template v-slot:no-option><q-item><q-item-section class="text-grey">No results</q-item-section></q-item></template>
                        </q-select>
                    </div>
                    <div class="col-3 q-pr-lg"><q-select map-options emit-value v-model="fees" :options="filterFees" option-value="id" option-label="name" label="Fees for" required @input="feeSelected"/></div>
                    <div class="col-3 q-pr-lg"><q-input v-model="feeAmount" label="Fee Amount"/></div>
                    <div class="col-8 q-pr-lg"><q-input v-model="remarks" autogrow label="Remarks" type="textarea"/></div>
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
            fees:                   '',
            feeAmount:              '',
            remarks:                '',
            options:                [],
            showAddForm:            true,
            pagination:             { rowsPerPage: 30 },
        }
    },
    methods: {
        ...mapActions(['adminBasics']),
        showForm() { this.showAddForm = true;},
        hideForm() { this.showAddForm = false; },
        resetData(){
            this.classes=                  '',
            this.student=                  '',
            this.fees=                     '',
            this.feeAmount=                '',
            this.remarks=                  '',
            this.options=                  [],
            this.showAddForm=              false
        },
        submitHandler(){
            const data ={
                schoolId :                  this.user.institute,
                classes :                   this.classes,
                student :                   this.student.id,
                fees :                      this.fees,
                feeAmount :                 this.feeAmount,
                remarks :                   this.remarks
            }
            this.$store.dispatch('addFees', data);
        },
        classSelected(){
            const data={
                schoolId :      this.user.institute,
                classes:        this.classes
            }
            this.$store.dispatch('classSelInFees', data);
            this.filterFn();
            this.fees = '';
            this.student = '';
        },
        filterFn (val, update) {
            if (val) { 
                update(() => { this.options = this.filterStudents.filter(i=>i.name.includes(val)) })
                return
            }else{
                update(() => { this.options = this.filterStudents })
                // this.options = this.filterStudents
                return
            }
            // const data={
            //     name : val
            // }
            // this.$store.dispatch('filterStudents', data);
        },
        feeSelected(){
            console.log(`this.fees`, this.fees)
            this.feeAmount = this.filterFees.filter(i=>i.id == this.fees)[0].amount
        }
    },
    computed: {
        ...mapGetters([ 'user', 'schoolClassOptionsCopy', 'filterFees', 'filterStudents', 'feeRecords' ]),
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