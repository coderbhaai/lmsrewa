<template>
    <div class="q-pa-md">
        <q-table title="Fee Records" :data="pendingFee" :columns="columns" row-key="id" class="my-sticky-header-table" :pagination.sync="pagination">
            <template v-slot:header="props"><q-tr :props="props"><q-th v-for="col in props.cols" :key="col.name" :props="props">{{ col.label }}</q-th></q-tr></template>
            <template v-slot:body="props">
                <q-tr :props="props">
                    <q-td key="studentId" :props="props">{{ props.row.studentId }}</q-td>
                    <q-td key="name" :props="props">{{ props.row.name }}</q-td>
                    <q-td key="className" :props="props">{{ props.row.className }}</q-td>
                    <q-td key="fees" :props="props">
                        
                        {{ JSON.parse(props.row.fees) }}
                    </q-td>
                    <q-td><img @click="updateDialog(props.row)" src="/images/icons/edit.svg" class="edit"/></q-td>
                </q-tr>
            </template>
        </q-table>
    </div>
</template>
<script>
import { mapGetters } from 'vuex';
import {message, rules} from '../../store/functions'

export default {
    data() {
        return {
            rules: rules,
            pagination: { rowsPerPage: 30 },
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
                { name: 'studentId', label: 'Sl No.', align: 'left', field: 'Edit', },
                { name: 'name', label: 'Student', align: 'left', field: 'name', sortable: true, },
                { name: 'className', label: 'Class', align: 'left', field: 'className', sortable: true, },
                { name: 'fees', label: 'Pending Fee', align: 'left', field: 'fees', sortable: true, },
                { name: 'index', label: 'Edit', align: 'left', field: 'id', sortable: true, },
            ],
        }
    },
    methods: {
        updateDialog(i){
            console.log(`i`, i)
        },
    },
    computed: {
        ...mapGetters([ 'user', 'pendingFee', 'feeRecords' ]),
    },
    created() {
        const data={
            schoolId : this.user.institute
        }
        this.$store.dispatch('pendingFee', data);
    }
};
</script>
<style>
</style>