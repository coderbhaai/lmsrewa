<template>
    <div class="q-pa-md">
        <q-table :title="tableTitle" :data="studentPendingFee" :columns="columns" row-key="id" class="my-sticky-header-table" :pagination.sync="pagination">
            <template v-slot:header="props"><q-tr :props="props"><q-th v-for="col in props.cols" :key="col.name" :props="props">{{ col.label }}</q-th></q-tr></template>
            <template v-slot:body="props">
                <q-tr :props="props">
                    <q-td key="studentId" :props="props">{{ props.row.studentId }}</q-td>
                    <q-td key="name" :props="props">{{ props.row.name }}</q-td>
                    <q-td key="className" :props="props">{{ props.row.className }}</q-td>
                    <q-td key="studentFeeData" :props="props" v-html="props.row.studentFeeData"></q-td>
                    <q-td key="totalPendingAmount" :props="props" v-html="props.row.totalPendingAmount"></q-td>
                    <q-td key="date" :props="props" v-html="refineDate(props.row.updated_at)"></q-td>
                    <q-td><img @click="updateDialog(props.row)" src="/images/icons/edit.svg" class="edit"/></q-td>
                </q-tr>
            </template>
        </q-table>
    </div>
</template>
<script>
import { mapGetters } from 'vuex';
import {message, rules, refineDate} from '../../store/functions'

export default {
    data() {
        return {
            rules: rules,
            refineDate: refineDate,
            pagination: { rowsPerPage: 30 },
            studentPendingFee: [],
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
                {value : 2, name: 'Q2 (Apr - Jun)'},
                {value : 3, name: 'Q3 (Jul - Aug)'},
                {value : 4, name: 'Q4 (Sep - Dec)'}
            ],
            columns: [
                { name: 'studentId', label: 'Sl No.', align: 'left', field: 'Edit' },
                { name: 'name', label: 'Student', align: 'left', field: 'name', sortable: true },
                { name: 'className', label: 'Class', align: 'left', field: 'className', sortable: true },
                { name: 'studentFeeData', label: 'Pending Fee', align: 'left', field: 'studentFeeData', sortable: true },
                { name: 'totalPendingAmount', label: 'Total Pending Fee', align: 'left', field: 'totalPendingAmount', sortable: true },
                { name: 'date', label: 'Updated_at', align: 'left', field: 'id', sortable: true },
                { name: 'index', label: 'Edit', align: 'left', field: 'id', sortable: true, },
            ],    
            getRemainingMonths (paidPeriod, currentMonth) {
                var remainingMonths = []
                for (var i = 1; i <= currentMonth; ++i) {
                    if(paidPeriod){
                        if (!paidPeriod.includes(this.months[i - 1].value)) { remainingMonths.push(this.months[i - 1].name) }
                    }
                }
                return remainingMonths
            },
            getRemainingQuarters (paidPeriod, currentquarter) {
                var remainingQuarters = []
                for (var i = 1; i <= currentquarter; ++i) {
                    if(paidPeriod){
                        if (!paidPeriod.includes(this.quarter[i - 1].value)) { remainingQuarters.push(this.quarter[i - 1].name) }
                    }
                }
                return remainingQuarters
            },
            reformatPendingFee () {
                for (var i = 0; i < this.pendingFee.length; ++i) {
                    var STUDENT_NOT_FOUND = true
                    for (var j = 0; j < this.studentPendingFee.length; ++j) {
                        if (this.pendingFee[i].studentId === this.studentPendingFee[j].studentId) {
                            STUDENT_NOT_FOUND = false
                        }
                    }
                    if (STUDENT_NOT_FOUND) {
                        var student = {
                            studentId: this.pendingFee[i].studentId,
                            schoolId: this.pendingFee[i].schoolId,
                            name: this.pendingFee[i].name,
                            tab1: this.pendingFee[i].tab1,
                            className: this.pendingFee[i].className,
                            remainingFeeData: [],
                            updated_at: this.pendingFee[i].updated_at
                        }
                        for (var k = i; k < this.pendingFee.length; ++k) {
                            if (this.pendingFee[i].studentId === this.pendingFee[k].studentId && this.pendingFee[k].period) {
                                var feeData = {
                                    year: this.pendingFee[k].year,
                                    period: this.pendingFee[k].period,
                                    type: this.pendingFee[k].type,
                                    amount: this.pendingFee[k].amount,
                                    feePeriod: this.pendingFee[k].feePeriod,
                                    feeName: this.pendingFee[k].feeName,
                                }
                                student.remainingFeeData.push(feeData)
                            }
                        }
                        this.studentPendingFee.push(student)
                    }
                }                
                var date = new Date()
                var currentMonth = date.getMonth() + 1 // 0 = janauary [ date.getMonth() ]
                var currentQuarter = Math.floor((currentMonth + 3) / 3);

                for (var i = 0; i < this.studentPendingFee.length; ++i) {
                    var totalPendingAmount = 0
                    var studentFeeData = ''
                    if(this.studentPendingFee[i].remainingFeeData.length){
                        var monthly = this.feeRecords.filter(k=>k.classes == this.studentPendingFee[i].tab1).filter(k=>k.period == 'Monthly')
                        var quarterly = this.feeRecords.filter(k=>k.classes == this.studentPendingFee[i].tab1).filter(k=>k.period == 'Quarterly')

                        if(this.studentPendingFee[i].remainingFeeData.filter(el=> el.feePeriod=="Monthly").length>0){
                            for (var j = 0; j < monthly.length; ++j) {
                                var monthArray = this.studentPendingFee[i].remainingFeeData.filter(el=> el.feePeriod=="Monthly" && el.feeName==monthly[j].name)
                                if(monthArray.length){
                                    for (var k = 0; k < monthArray.length; ++k) {
                                        var remainingQuarters = this.getRemainingMonths(JSON.parse(monthArray[k].period), currentMonth)
                                        studentFeeData += monthArray[k].feeName.concat(': ', remainingQuarters.join(', '), ' - ', String(monthArray[k].amount*remainingQuarters.length), '<br>');
                                        totalPendingAmount +=  monthArray[k].amount*remainingQuarters.length
                                    }
                                }else{
                                    var remainingQuarters = this.getRemainingMonths([], currentMonth)
                                    studentFeeData += monthly[j].name.concat(': ', remainingQuarters.join(', '), ' - ', String(monthly[j].amount*remainingQuarters.length), '<br>');
                                    totalPendingAmount +=  monthly[j].amount*remainingQuarters.length
                                }
                            }
                        }else{
                            for (var j = 0; j < monthly.length; ++j) {
                                var remainingQuarters = this.getRemainingMonths([], currentMonth)
                                studentFeeData += monthly[j].name.concat(': ', remainingQuarters.join(', '), ' - ', String(monthly[j].amount*remainingQuarters.length), '<br>');
                                totalPendingAmount +=  monthly[j].amount*remainingQuarters.length
                            }
                        }
                        
                        if(this.studentPendingFee[i].remainingFeeData.filter(el=> el.feePeriod=="Quarterly").length>0){
                            for (var j = 0; j < quarterly.length; ++j) {
                                var quartArray = this.studentPendingFee[i].remainingFeeData.filter(el=> el.feePeriod=="Quarterly" && el.feeName==quarterly[j].name)
                                if(quartArray.length){
                                    for (var k = 0; k < quartArray.length; ++k) {
                                        var remainingQuarters = this.getRemainingQuarters(JSON.parse(quartArray[k].period), currentQuarter)
                                        studentFeeData += quartArray[k].feeName.concat(': ', remainingQuarters.join(', '), ' - ', String(quartArray[k].amount*remainingQuarters.length), '<br>');
                                        totalPendingAmount +=  quartArray[k].amount*remainingQuarters.length
                                    }
                                }else{
                                    var remainingQuarters = this.getRemainingQuarters([], currentQuarter)
                                    studentFeeData += quarterly[j].name.concat(': ', remainingQuarters.join(', '), ' - ', String(quarterly[j].amount*remainingQuarters.length), '<br>');
                                    totalPendingAmount +=  quarterly[j].amount*remainingQuarters.length
                                }
                            }
                        }else{
                            for (var j = 0; j < quarterly.length; ++j) {
                                var remainingQuarters = this.getRemainingQuarters([], currentQuarter)
                                studentFeeData += quarterly[j].name.concat(': ', remainingQuarters.join(', '), ' - ', String(quarterly[j].amount*remainingQuarters.length), '<br>');
                                totalPendingAmount +=  quarterly[j].amount*remainingQuarters.length
                            }
                        }
                    }else{
                        var remainingMonths = this.getRemainingMonths([], currentMonth)
                        var remainingQuarters = this.getRemainingQuarters([], currentQuarter)
                        for (var k = 0; k < monthly.length; ++k) {
                            studentFeeData += monthly[k].name.concat(': ', remainingMonths.join(', '), ' - ', String(monthly[k].amount*currentMonth), '<br>');
                            totalPendingAmount +=  monthly[k].amount*currentMonth
                        }
                        for (var k = 0; k < quarterly.length; ++k) {
                            studentFeeData += quarterly[k].name.concat(': ', remainingQuarters.join(', '), ' - ', String(quarterly[k].amount*currentQuarter), '<br>');
                            totalPendingAmount +=  quarterly[k].amount*currentQuarter
                        }
                    }
                    this.studentPendingFee[i].totalPendingAmount = totalPendingAmount
                    this.studentPendingFee[i].studentFeeData = studentFeeData                    
                }
            }
        }
    },
    methods: {
        updateDialog(i){
        },
    },
    computed: {
        ...mapGetters([ 'user', 'pendingFee', 'feeRecords' ]),
        tableTitle () {
            var title = 'Pending Fee'
            var totalPendingAmount = 0
            if (this.studentPendingFee !== null) {
                for (var i = 0; i < this.studentPendingFee.length; ++i) {
                    totalPendingAmount += this.studentPendingFee[i].totalPendingAmount
                }
                title = title.concat(' (Rs. ', String(totalPendingAmount), ')')
            }else{
               
            }
            return title
        }
    },
    created() {
        const data={
            schoolId : this.user.institute
        }
        this.$store.dispatch('pendingFee', data);
    },
    mounted () {
        this.reformatPendingFee()
    }
};
</script>
<style>
</style>