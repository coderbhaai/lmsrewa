<template>
    <div class="q-pa-md">
        <div v-if="showAddForm"><q-btn @click="hideForm()" class="q-mb-lg" rounded glossy color="accent">Hide Fees</q-btn></div>
        <div v-else><q-btn @click="showForm()" class="q-mb-lg" rounded glossy color="primary">Add Fees</q-btn></div>
        <div v-if="showAddForm">
            <q-form class="q-gutter-md q-mb-lg" @submit="submitHandler">
                <div class="row">
                    <div class="col-6 q-pr-lg"><q-input v-model="name" label="Name of Fee" :rules="[...rules.required]"/></div>
                    <div class="col-3 q-pr-lg"><q-select map-options emit-value v-model="classes" :options="schoolClassOptions" option-value="id" option-label="name" label="Class" :rules="[...rules.required]"/></div>
                    <div class="col-3 q-pr-lg"><q-select map-options emit-value v-model="period" :options="periodOptions" option-value="value" option-label="name" label="Period" :rules="[...rules.required]"/></div>
                    <div class="col-4 q-pr-lg"><q-input v-model="amount" type="number" label="Fee Amount" :rules="[...rules.required]"/></div>
                    <div class="col-4 q-pr-lg"><q-select map-options emit-value v-model="status" :options="statusOptions" option-value="value" option-label="name" label="Status" :rules="[...rules.required]"/></div>
                    <div class="col-4 q-pr-lg flex-hc"><q-btn label="Create Fees" type="submit" color="primary" class="q-mr-lg"/></div>
                </div>
            </q-form>
        </div>
        <q-table title="Basics" :data="feeStructure" :columns="columns" row-key="id" class="my-sticky-header-table" :pagination.sync="pagination">
            <template v-slot:header="props"><q-tr :props="props"><q-th v-for="col in props.cols" :key="col.name" :props="props">{{ col.label }}</q-th></q-tr></template>
            <template v-slot:body="props">
                <q-tr :props="props">
                <q-td key="id" :props="props">{{ props.row.id }}</q-td>
                <q-td key="name" :props="props">{{ props.row.name }}</q-td>
                <q-td key="classes" :props="props">{{ props.row.className }}</q-td>
                <q-td key="amount" :props="props">{{ props.row.amount }}</q-td>
                <q-td key="period" :props="props">{{ props.row.period }}</q-td>
                <q-td key="updated_at" :props="props" v-html="refineDate(props.row.updated_at)"></q-td>
                <q-td key="status" :props="props">
                    <q-toggle v-model="props.row.status==1 ? true : false" color="primary" @input="changeStatus(props.row.id, props.row.status)"></q-toggle>
                </q-td>
                <q-td><img @click="updateDialog(props.row)" src="/images/icons/edit.svg" class="edit"/></q-td>
                </q-tr>
            </template>
        </q-table>
        <q-dialog v-model="medium" persistent transition-show="scale" transition-hide="scale">
            <q-card style="width: 70vw; max-width: 80vw;">
                <q-card-section class="modalHead"><div class="text-h6">Update Basic</div><q-btn flat label="Close" color="primary" v-close-popup @click="resetData()"/></q-card-section>
                <q-card-section class="q-pt-none">
                    <q-form class="q-gutter-md" @submit="updateHandler">
                        <div class="row">
                            <div class="col-6 q-pr-lg"><q-input v-model="name" label="Name of Fee" :rules="[...rules.required]"/></div>
                            <div class="col-3 q-pr-lg"><q-select map-options emit-value v-model="classes" :options="schoolClassOptions" option-value="name" option-label="name" label="Class" :rules="[...rules.required]"/></div>
                            <div class="col-3 q-pr-lg"><q-select map-options emit-value v-model="period" :options="periodOptions" option-value="value" option-label="name" label="Period" :rules="[...rules.required]"/></div>
                            <div class="col-4 q-pr-lg"><q-input v-model="amount" type="number" label="Fee Amount" :rules="[...rules.required]"/></div>
                            <div class="col-4 q-pr-lg"><q-select map-options emit-value v-model="status" :options="statusOptions" option-value="value" option-label="name" label="Status" :rules="[...rules.required]"/></div>
                            <div class="col-4 q-pr-lg flex-hc"><q-btn label="Update Fees" type="submit" color="primary" class="q-mr-lg"/></div>
                        </div>
                    </q-form>
                </q-card-section>
            </q-card>
        </q-dialog>
    </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
import {rules, refineDate} from '../../store/functions'

export default {
    data() {
        return {
            rules :                 rules,
            refineDate:             refineDate,
            id:                     '',
            schoolId:               '',
            name:                   '',
            classes:                '',
            amount:                 '',
            period:                 '',
            status:                 '',
            medium:                 false,
            statusOptions:            [
                {name: 'Active', value: 1 },
                {name: 'Not Active', value: 0 },
            ],
            periodOptions:            [
                {name: 'Monthly', value: 'Monthly'},
                {name: 'Quarterly', value: 'Quarterly'},
                {name: 'Half Yearly', value: 'HalfYearly'},
                {name: 'Annual', value: 'Annual'},
            ],
            showAddForm:            false,
            columns: [
                { name: 'id', label: 'Sl No.', align: 'left', field: 'Edit', },
                { name: 'name', label: 'Name', align: 'left', field: 'name', sortable: true, },
                { name: 'classes', label: 'Class', align: 'left', field: 'classes', sortable: true, },
                { name: 'amount', label: 'Amount', align: 'left', field: 'amount', sortable: true, },
                { name: 'period', label: 'period', align: 'left', field: 'period', sortable: true, },
                { name: 'updated_at', label: 'Date', align: 'left', field: 'updated_at', sortable: true, },
                { name: 'status', label: 'Status', align: 'left', field: 'status', sortable: true, },
                { name: 'index', label: 'Edit', align: 'left', field: 'id', sortable: true, },
            ],
            pagination: { rowsPerPage: 30 },
        }
    },
    methods: {
        ...mapActions(['adminBasics']),
        showForm() {
            this.showAddForm = true;
        },
        hideForm() {
            this.showAddForm = false;
        },
        submitHandler() {
            const data={
                schoolId :          this.user.institute,
                name:               this.name,
                classes:            this.classes,
                period:             this.period,
                amount:             this.amount,
                status:             this.status
            }
            this.$store.dispatch('addFeeStructure', data);
        },
        updateDialog(i){
            this.id =               i.id
            this.name =             i.name,
            this.classes =          i.classes,
            this.amount =           i.amount,
            this.period =           i.period,
            this.status =           i.status
            this.medium =           true
        },
        updateHandler(){
            const data={
                id:                 this.id,
                name:               this.name,
                classes:            this.classes,
                period:             this.period,
                amount:             this.amount,
                status:             this.status
            }
            this.$store.dispatch('updateFeeStructure', data);
            this.medium =           false
        },
        changeStatus(id, status){
            if(status == 0){ var change = 1 }else{ var change = 0}
            const data = {
                id:                             id,
                status:                         change
            };
            this.$store.dispatch('changeFeeStatus', data);
        },        
        resetData(){
            this.id =                     '',
            this.schoolId =               '',
            this.name =                   '',
            this.classes =                '',
            this.amount =                 '',
            this.period =                 '',
            this.status =                 '',
            this.medium =                 false
        }
    },
    computed: {
        ...mapGetters([ 'user', 'schoolClassOptions', 'feeStructure' ]),
    }, 
    created() {
        const data={
            schoolId : this.user.institute
        }
        this.$store.dispatch('feeStructure', data);
    },
};
</script>
<style>
</style>
