<template>
    <div class="q-pa-md">
        <div v-if="showAddForm"><q-btn @click="hideForm()" class="q-mb-lg" rounded glossy color="accent">Hide Fees</q-btn></div>
        <div v-else><q-btn @click="showForm()" class="q-mb-lg" rounded glossy color="primary">Add Fees</q-btn></div>
        <div v-if="showAddForm">
            <q-form class="q-gutter-md q-mb-lg" @submit="addSubmit">
                <div class="row">
                    <div class="col-4 q-pr-lg"><q-select emit-value v-model="type" :options="typeOptions" option-value="value" option-label="name" label="Type of fees" required/></div>
                    <div class="col-4 q-pr-lg"><q-select emit-value v-model="type" :options="schoolClassOptions" option-value="value" option-label="name" label="Type of fees" required/></div>

                    <!-- <div class="col-4 q-pr-lg"><q-input v-model="name" label="Name"  required/></div>
                    <div class="col-4 q-pr-lg" v-if="this.type=='PaperOptions'"><q-input v-model="tab1" label="Number of Questions"  required/></div>
                    <div class="col-4 q-pr-lg" v-if="this.type=='Daily Practice Packages'"><q-input v-model="tab1" type="number" label="Validity Months"  required/></div>
                    <div class="col-4 q-pr-lg" v-if="this.type=='Daily Practice Packages'"><q-input v-model="tab2" type="number" label="Amount"  required/></div> -->
                </div>
                <div><q-btn label="Submit" type="submit" color="primary" class="q-mr-lg" /></div>
            </q-form>
        </div>
    </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';

export default {
    data() {
        return {
            id:                     '',
            schoolId:               '',
            type:                   '',
            classes:                '',
            amount:                 '',
            period:                 '',
            status:                 '',
            typeOptions:            [
                {name: 'VI', value: 'VI'},
            ],
            showAddForm:            false,
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
        addSubmit() {

        }
    },
    computed: {
        ...mapGetters([ 'user', 'schoolClassOptions' ]),
    },
    created() {
        const data={
            schoolId : this.user.institute
        }
        this.$store.dispatch('feeManagement', data);
    },
};
</script>
<style>
</style>
