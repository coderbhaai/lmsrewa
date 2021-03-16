<template>
    <div class="q-pa-md">
        <div class="filterRow q-mb-sm">
            <div v-if="showAddForm"><q-btn @click="hideForm()" rounded glossy color="accent">Hide Form</q-btn></div>
            <div v-else><q-btn @click="showForm()" rounded glossy color="primary">Create Group</q-btn></div>
            </div>
            <div v-if="showAddForm">
            <q-form class="q-gutter-md q-mb-lg" @submit="addSubmit">
                <div class="row">
                    <div class="col-4 q-pr-lg"><q-input v-model="name" label="Name"  required/></div>
                </div>
                <div><q-btn label="Submit" type="submit" color="primary" class="q-mr-lg" /></div>
            </q-form>
        </div>
        <div class="col-sm-4">
            <ul>
                <li>All Students</li>
                <li>All Students</li>
                
            </ul>
        </div>
        <div class="col-sm-8">

        </div>
    </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
export default {
    name: 'SchoolGroups',
    data() {
        return {
            showAddForm: false,
            name:  '',
        
        };
    },
    methods: {
        ...mapActions(['schoolBasics']),
        showForm() { this.showAddForm = true; },
        hideForm() { this.showAddForm = false; },
        addSubmit(e) {
            e.preventDefault();
            const data = {
                schoolId: 1,
                name: this.name
            };
            this.$store.dispatch('addSchoolGroup', data);
            // this.resetData();
        },
    },
    computed: {
        ...mapGetters(['schoolGroups']),
    },
    created() {
        const data={
            schoolId: 1,
        }
        this.$store.dispatch('schoolGroups', data);
    },
};
</script>
<style>
</style>
