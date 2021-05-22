<template>
    <div class="q-pa-md">
        <q-table :title="tableTitle" :data="studentPendingFee" :columns="columns" row-key="id" class="my-sticky-header-table" :pagination.sync="pagination">
            <template v-slot:header="props"><q-tr :props="props"><q-th v-for="col in props.cols" :key="col.name" :props="props">{{ col.label }}</q-th></q-tr></template>
            <template v-slot:body="props">
                <q-tr :props="props">
                    <!-- <q-td key="studentId" :props="props">{{ props.row.studentId }}</q-td>
                    <q-td key="name" :props="props">{{ props.row.name }}</q-td>
                    <q-td key="className" :props="props">{{ props.row.className }}</q-td>
                    <q-td key="period" :props="props">
                        <span v-if="props.row.period">
                            {{ JSON.parse(props.row.period) }}
                        </span>
                    </q-td> -->
                    <q-td key="studentId" :props="props">{{ props.row.studentId }}</q-td>
                    <q-td key="name" :props="props">{{ props.row.name }}</q-td>
                    <q-td key="className" :props="props">{{ props.row.className }}</q-td>
                    <q-td key="fees" :props="props" v-html="refineData(props.row.remainingFeeData)"></q-td>
                    <!-- <q-td key="totalfees" :props="props" v-html="totalIndividualFees(props.row.remainingFeeData)"></q-td> -->
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
                {value : 2, name: 'Q1 (Apr - Jun)'},
                {value : 3, name: 'Q1 (Jul - Aug)'},
                {value : 4, name: 'Q1 (Sep - Dec)'}
            ],
            columns: [
                { name: 'studentId', label: 'Sl No.', align: 'left', field: 'Edit' },
                { name: 'name', label: 'Student', align: 'left', field: 'name', sortable: true },
                { name: 'className', label: 'Class', align: 'left', field: 'className', sortable: true },
                { name: 'fees', label: 'Pending Fee', align: 'left', field: 'fees', sortable: true },
                { name: 'totalfees', label: 'Total Pending Fee', align: 'left', field: 'totalfees', sortable: true },
                { name: 'date', label: 'Updated_at', align: 'left', field: 'id', sortable: true },
                { name: 'index', label: 'Edit', align: 'left', field: 'id', sortable: true, },
            ],
            refineData (feeData) {
                console.log(`feeData`, feeData)
                if (feeData !== null) {
                    var date = new Date()
                    var currentMonth = date.getMonth() + 1 // 0 = janauary [ date.getMonth() ]
                    var studentFeeData = ''
                    for (var i = 0; i < feeData.length; ++i) {
                        // var feesCategory = this.getCategoryName(feeData[i].type)
                        // var remaningMonths = this.getRemainingMonths(feeData[i].period, currentMonth)
                        // var pendingAmount = feeData[i].amount * feeData[i].period.length
                        // studentFeeData += feesCategory.concat(': ', remaningMonths, ' - ', String(pendingAmount), '<br>')
                    }
                    return studentFeeData
                } else {
                    return 'No Fees Remaining'
                }
            },
            totalIndividualFees (feeData) {
                console.log(`feeData`, feeData)
                var totalPendingAmount = 0
                if (feeData !== null) {
                    for (var i = 0; i < feeData.length; ++i) {
                    totalPendingAmount += feeData[i].amount * feeData[i].period.length
                    }
                    return String(totalPendingAmount)
                }
            },
            getCategoryName (categoryID) {
                for (var i = 0; i < this.feeRecords.length; ++i) {
                    if (this.feeRecords[i].id === categoryID) {
                    return this.feeRecords[i].name
                    }
                }
            },
            getRemainingMonths (paidPeriod, currentMonth) {
                console.log(`paidPeriod`, paidPeriod)
                var remainingMonths = ''
                for (var i = 1; i <= currentMonth; ++i) {
                    if(paidPeriod){
                        if (!paidPeriod.includes(this.months[i - 1].value)) {
                            remainingMonths = remainingMonths.concat(this.months[i - 1].name, ', ')
                        }
                    }
                }
                return remainingMonths.substring(0, remainingMonths.length - 2)
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
                            if (this.pendingFee[i].studentId === this.pendingFee[k].studentId) {
                                var feeData = {
                                    year: this.pendingFee[k].year,
                                    period: this.pendingFee[k].period,
                                    type: this.pendingFee[k].type,
                                    amount: this.pendingFee[k].amount
                                }
                                student.remainingFeeData.push(feeData)
                            }
                        }
                        this.studentPendingFee.push(student)
                    }
                }
            }
        }
    },
    methods: {
        updateDialog(i){
            console.log(`i`, i)
        },
    },
    computed: {
        ...mapGetters([ 'user', 'pendingFee', 'feeRecords' ]),
        tableTitle () {
            var title = 'Fee Records'
            var totalPendingAmount = 0
            if (this.studentPendingFee !== null) {
                console.log('000')
                for (var i = 0; i < this.studentPendingFee.length; ++i) {
                    var studentFee = this.studentPendingFee[i].remainingFeeData
                    for (var j = 0; j < studentFee.length; ++j) {
                        totalPendingAmount += studentFee[j].amount * this.pendingFee[j].period.length
                    }
                }
                title = title.concat(' (', String(totalPendingAmount), ')')
            }else{
                console.log('11')
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