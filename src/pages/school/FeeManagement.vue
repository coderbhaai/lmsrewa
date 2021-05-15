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
                    <div class="col-3 q-pr-lg"><q-select map-options emit-value v-model="classes" :options="schoolClassOptionsCopy" option-value="id" option-label="name" label="Class" @input="classSelected" :rules="[...rules.required]"/></div>
                    <div class="col-3 q-pr-lg">
                        <q-select v-model="student" use-input input-debounce="0" label="Select Student" :options="options" option-value="id" option-label="name" @filter="filterFn" :rules="[...rules.required]">
                            <template v-slot:no-option><q-item><q-item-section class="text-grey">No results</q-item-section></q-item></template>
                        </q-select>
                    </div>
                    <div class="col-3 q-pr-lg"><q-select map-options emit-value v-model="mode" :options="modeOptions" option-value="name" option-label="name" label="Payment Mode" :rules="[...rules.required]"/></div>
                    <div class="col-3 q-pr-lg"><q-select map-options emit-value v-model="year" :options="years" option-value="name" option-label="name" label="Year" :rules="[...rules.required]"/></div>
                    <div class="col-12"><q-btn @click="addFeeOption()" class="q-mb-lg" rounded glossy color="accent">Add Fees</q-btn></div>
                    <div class="col-12 row" v-for='(i, index) in feeArray' :key='i.id'>
                        <div class="col-4 q-pr-lg"><q-select map-options emit-value v-model="feeArray[index][1]" :options="filterFees" option-value="id" option-label="name" label="Fees for" @input="feeSelected(index)" :rules="[...rules.required]"/></div>
                        <div class="col-3 q-pr-lg"><q-input v-model="feeArray[index][2]" label="Fee Amount (Rs.)" :rules="[...rules.required]"/></div>
                        <div class="col-3 q-pr-lg" v-if="feeArray[index][0]=='Monthly'">
                            <q-select multiple map-options emit-value v-model="feeArray[index][3]" :options="months" option-value="value" option-label="name" label="Fees for" :rules="[...rules.required]"/>
                        </div>
                        <div class="col-3 q-pr-lg" v-if="feeArray[index][0]=='Quarterly'">
                            <q-select multiple map-options emit-value v-model="feeArray[index][3]" :options="quarter" option-value="value" option-label="name" label="Fees for" :rules="[...rules.required]"/>
                        </div>
                        <div class="col-1 q-pr-lg flex-hc text-purple delete" style="font-size: 2em"><q-icon name="delete" @click="deleteFeeArray(index)"/></div>                        
                    </div>
                    <div class="col-9 q-pr-lg"><q-input v-model="remarks" autogrow label="Remarks" type="textarea"/></div>
                    <div class="col-3 q-pr-lg flex-hc"><q-btn label="Create Fees" type="submit" color="primary" class="q-mr-lg"/></div>
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
                <q-td key="mode" :props="props">{{ props.row.mode }}</q-td>
                <q-td key="feeCollected" :props="props">Rs. {{ props.row.feeCollected }}</q-td>
                <q-td key="updated_at" :props="props">{{ props.row.updated_at }}</q-td>
                <q-td><img @click="updateDialog(props.row)" src="/images/icons/edit.svg" class="edit"/></q-td>
                </q-tr>
            </template>
        </q-table>
        <q-dialog v-model="medium" persistent transition-show="scale" transition-hide="scale">
            <q-card style="width: 70vw; max-width: 80vw;">
                <q-card-section class="modalHead"><div class="text-h6">Update Remarks In Fees</div><q-btn flat label="Close" color="primary" v-close-popup @click="resetData()"/></q-card-section>
                <q-card-section class="q-pt-none">
                    <q-form class="q-gutter-md" @submit="updateSubmit">
                        <div class="row">
                            <div class="col-3 q-pr-lg"><q-input v-model="classes" label="Class" readonly/></div>
                            <div class="col-3 q-pr-lg"><q-input v-model="student" label="Student" readonly/></div>
                            <div class="col-3 q-pr-lg"><q-input v-model="feeAmount" label="Fee Amount" readonly/></div>
                            <div class="col-3 q-pr-lg"><q-input v-model="mode" label="Payment Mode" readonly/></div>
                            <div class="col-12 q-pr-lg"><q-input v-model="remarks" autogrow label="Remarks" type="textarea"/></div>
                            <div class="col-12 row" v-for='(i, index) in feeArray' :key='i.id'>
                                <div class="col-4 q-pr-lg"><q-select map-options emit-value v-model="feeArray[index][1]" :options="feeStructure" option-value="id" option-label="name" label="Fees for" @input="feeSelected(index)" readonly/></div>
                                <div class="col-4 q-pr-lg"><q-input v-model="feeArray[index][2]" label="Fee Amount (Rs.)" readonly/></div>
                                <div class="col-4 q-pr-lg" v-if="feeArray[index][0]=='Monthly'">
                                    <q-select multiple map-options emit-value v-model="feeArray[index][3]" :options="months" option-value="value" option-label="name" label="Fees for" readonly/>
                                </div>
                                <div class="col-4 q-pr-lg" v-if="feeArray[index][0]=='Quarterly'">
                                    <q-select multiple map-options emit-value v-model="feeArray[index][3]" :options="quarter" option-value="value" option-label="name" label="Fees for" readonly/>
                                </div>                       
                            </div>
                            <div class="col-3 q-pr-lg flex-hc"><q-btn label="Update Remarks" type="submit" color="primary" class="q-mr-lg"/></div>
                        </div>
                    </q-form>
                </q-card-section>
            </q-card>
        </q-dialog>
    </div>
</template>
<script>
import { mapGetters } from 'vuex';
import {message, rules} from '../../store/functions'

export default {
    data() {
        return {
            rules : rules,
            id:                     '',
            year:                   new Date().getFullYear(),
            classes:                '',
            student:                '',
            fees:                   '',
            feeAmount:              '',
            mode:                   '',
            remarks:                '',
            filterBy:               '',
            feeArray:               [],
            options:                [],
            showAddForm:            false,
            pagination:             { rowsPerPage: 30 },
            medium:                 false,
            columns: [
                { name: 'id', label: 'Sl No.', align: 'left', field: 'Edit', },
                { name: 'className', label: 'Class', align: 'left', field: 'className', sortable: true, },
                { name: 'studentName', label: 'Student', align: 'left', field: 'studentName', sortable: true, },
                { name: 'mode', label: 'Mode', align: 'left', field: 'mode', sortable: true, },
                { name: 'feeCollected', label: 'Fee Collected', align: 'left', field: 'feeCollected', sortable: true, },
                { name: 'updated_at', label: 'Date', align: 'left', field: 'updated_at', sortable: true, },
                { name: 'index', label: 'Edit', align: 'left', field: 'id', sortable: true, },
            ],
            modeOptions: [
                {name: "Cash"},
                {name: "Cheque"},
                {name: "Online"},
                {name: "Others"}
            ],
            months: [
                {value: 1, name: 'January'},
                {value: 2, name: 'February'},
                {value: 3, name: 'March'},
                {value: 4, name: 'April'},
                {value: 5, name: 'May'},
                {value: 6, name: 'June'},
                {value: 7, name: 'July'},
                {value: 8, name: 'August'},
                {value: 9, name: 'September'},
                {value: 10, name: 'October'},
                {value: 11, name: 'November'},
                {value: 12, name: 'December'},
            ],
            quarter: [
                {value : 1, name: 'Q1 (Jan - Mar)'},
                {value : 2, name: 'Q1 (Apr - Jun)'},
                {value : 3, name: 'Q1 (Jul - Aug)'},
                {value : 4, name: 'Q1 (Sep - Dec)'}
            ]
        }
    },
    methods: {
        showForm() { this.showAddForm = true;},
        hideForm() { this.showAddForm = false; },
        resetData(){
            this.id=                       ''
            this.classes=                  ''
            this.student=                  ''
            this.fees=                     ''
            this.remarks=                  ''
            this.mode=                     ''
            this.options=                  []
            this.feeArray=                 []
            this.showAddForm=              false
            this.medium=                   false
        },
        submitHandler(e){
            e.preventDefault();
            const total =    this.feeArray.reduce(function(total, current){
                    return total + parseInt(current[2])
                }, 0)
            console.log(`total`, total)
            const data ={
                schoolId :                  this.user.institute,
                classes :                   this.classes,
                year :                      this.year,
                student :                   this.student.id,
                fees :                      JSON.stringify( this.feeArray ),
                feeAmount :                 total,
                remarks :                   this.remarks,
                mode:                       this.mode 
            }
            this.$store.dispatch('addFees', data);
            this.$store.dispatch('feeRegister', data);
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
        updateDialog(i){
            this.id=                        i.id
            this.classes=                   i.className
            this.student=                   i.studentName
            this.feeArray=                  JSON.parse(i.fees)
            this.feeAmount=                 i.feeCollected
            this.mode=                      i.mode
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
        },
        addFeeOption(){
            if(this.classes){
                this.feeArray.push(['', '', ''])
            }else{
                message('Please select class first');
            }
        },
        feeSelected(index){
            this.feeArray[index][0]= this.filterFees.filter(i=>i.id == this.feeArray[index][1])[0].period
            this.feeArray[index][2]= this.filterFees.filter(i=>i.id == this.feeArray[index][1])[0].amount
        },
        deleteFeeArray(index){ this. feeArray.splice(index, 1) }
    },
    computed: {
        ...mapGetters([ 'user', 'schoolClassOptionsCopy', 'filterFees', 'filterStudents', 'feeRecordsCopy', 'feeStructure' ]),
        years () {
            const year = new Date().getFullYear()
            console.log(`year`, year)
            return Array.from({length: year - 2019}, (value, index) => 2020 + index)
        }
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