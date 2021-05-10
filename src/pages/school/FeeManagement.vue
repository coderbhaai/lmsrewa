<template>
    <div class="q-pa-md">
        <div class="filterRow q-mb-sm">
            <div v-if="showAddForm"><q-btn @click="hideForm()" class="q-mb-lg" rounded glossy color="accent">Hide Fees</q-btn></div>
            <div v-else><q-btn @click="showForm()" class="q-mb-lg" rounded glossy color="primary">Add Fees</q-btn></div>
            <div class="filterBy"><q-input v-model="filterBy" label="Filter By Student" @input="filterSelected()"/></div>
        </div>
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
        <q-table title="Fee Records" :data="feeRecordsCopy" :columns="columns" row-key="id" :filter="filter" class="my-sticky-header-table" :pagination.sync="pagination">
            <template v-slot:header="props"><q-tr :props="props"><q-th v-for="col in props.cols" :key="col.name" :props="props">{{ col.label }}</q-th></q-tr></template>
            <template v-slot:body="props">
                <q-tr :props="props">
                <q-td key="id" :props="props">{{ props.row.id }}</q-td>
                <q-td key="className" :props="props">{{ props.row.className }}</q-td>
                <q-td key="studentName" :props="props">{{ props.row.studentName }}</q-td>
                <q-td key="feeName" :props="props">{{ props.row.feeName }} - Rs. {{props.row.feeAmount}}</q-td>
                <q-td key="feeCollected" :props="props">Rs. {{ props.row.feeCollected }}</q-td>
                <q-td key="updated_at" :props="props">{{ props.row.updated_at }}</q-td>
                <q-td><img @click="updateDialog(props.row)" src="/images/icons/edit.svg" class="edit"/></q-td>
                </q-tr>
            </template>
        </q-table>
        <q-dialog v-model="medium" persistent transition-show="scale" transition-hide="scale">
            <q-card style="width: 70vw; max-width: 80vw;">
                <q-card-section class="modalHead"><div class="text-h6">Update Basic</div><q-btn flat label="Close" color="primary" v-close-popup @click="resetData()"/></q-card-section>
                <q-card-section class="q-pt-none">
                    <q-form class="q-gutter-md" @submit="updateSubmit">
                        <div class="row">
                            <div class="col-3 q-pr-lg"><q-input v-model="classes" label="Class" readonly/></div>
                            <div class="col-3 q-pr-lg"><q-input v-model="student" label="Student" readonly/></div>
                            <div class="col-3 q-pr-lg"><q-input v-model="fees" label="Fee Collected" readonly/></div>
                            <div class="col-3 q-pr-lg"><q-input v-model="feeAmount" label="Fee Amount" readonly/></div>
                            <div class="col-8 q-pr-lg"><q-input v-model="remarks" autogrow label="Remarks" type="textarea"/></div>
                            <div class="col-4 q-pr-lg flex-hc"><q-btn label="Update Remarks" type="submit" color="primary" class="q-mr-lg"/></div>
                        </div>
                    </q-form>
                </q-card-section>
            </q-card>
        </q-dialog>
    </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
export default {
    data() {
        return {
            id:                     '',
            classes:                '',
            student:                '',
            fees:                   '',
            feeAmount:              '',
            remarks:                '',
            filterBy:               '',
            options:                [],
            showAddForm:            false,
            pagination:             { rowsPerPage: 30 },
            medium:                 false,
            columns: [
                { name: 'id', label: 'Sl No.', align: 'left', field: 'Edit', },
                { name: 'className', label: 'Class', align: 'left', field: 'className', sortable: true, },
                { name: 'studentName', label: 'Student', align: 'left', field: 'studentName', sortable: true, },
                { name: 'feeName', label: 'Fee Name', align: 'left', field: 'feeName', sortable: true, },
                { name: 'feeCollected', label: 'Fee Collected', align: 'left', field: 'feeCollected', sortable: true, },
                { name: 'updated_at', label: 'Date', align: 'left', field: 'updated_at', sortable: true, },
                { name: 'index', label: 'Edit', align: 'left', field: 'id', sortable: true, },
            ],
        }
    },
    methods: {
        ...mapActions(['adminBasics']),
        showForm() { this.showAddForm = true;},
        hideForm() { this.showAddForm = false; },
        resetData(){
            this.id=                       ''
            this.classes=                  ''
            this.student=                  ''
            this.fees=                     ''
            this.feeAmount=                ''
            this.remarks=                  ''
            this.options=                  []
            this.showAddForm=              false
            this.medium=                   false
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
            this.feeAmount = this.filterFees.filter(i=>i.id == this.fees)[0].amount
        },
        updateDialog(i){
            this.id=                        i.id
            this.classes=                   i.className
            this.student=                   i.studentName
            this.fees=                      i.feeName
            this.feeAmount=                 i.feeCollected
            this.remarks=                   i.remarks
            this.medium =                   true
        },
        updateSubmit(){
            const data={
                id :                    this.id,
                remarks:                this.remarks
            }
            this.$store.dispatch('updateFeeRemarks', data);
            this.resetData()
        },
        filterSelected(){
            const data={
                filterBy : this.filterBy,
                schoolId : this.user.institute
            }
            this.$store.dispatch('filterFeeRecords', data);
        }
    },
    computed: {
        ...mapGetters([ 'user', 'schoolClassOptionsCopy', 'filterFees', 'filterStudents', 'feeRecordsCopy' ]),
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