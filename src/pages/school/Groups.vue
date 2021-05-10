<template>
    <div class="q-pa-md">
        <q-dialog v-model="medium" persistent transition-show="scale" transition-hide="scale">
            <q-card style="width: 70vw; max-width: 80vw;">
                <q-card-section class="modalHead"><div class="text-h6">Update Group</div><q-btn flat label="Close" color="primary" v-close-popup @click="resetData()"/></q-card-section>
                <q-card-section class="q-pt-none">
                    <q-form class="q-gutter-md" @submit="updateSubmit">
                        <div class="row">
                            <div class="col-12 q-pr-lg"><q-input v-model="name" label="Name" :rules="[...rules.required]"/></div>
                        </div>
                        <div class="text-center"><q-btn label="Submit" type="submit" color="primary" class="q-mr-lg" /></div>
                    </q-form>
                </q-card-section>
            </q-card>
        </q-dialog>
        <q-dialog v-model="medium2" persistent transition-show="scale" transition-hide="scale">
            <q-card style="width: 70vw; max-width: 60vw;">
                <q-card-section class="modalHead"><div class="text-h6">Add Students to a group</div><q-btn flat label="Close" color="primary" v-close-popup @click="resetData()"/></q-card-section>
                <q-card-section class="q-pt-none">
                    <q-form class="q-gutter-md" @submit="updateSubmit2">
                        <div class="row">
                            <div class="col-12 q-pr-lg">
                                <q-select map-options emit-value v-model="groupSelected" :options="schoolGroups" option-value="id" option-label="name" counter label="Add to group" :rules="[...rules.required]"/>
                            </div>
                        </div>
                        <div class="text-center"><q-btn label="Submit" type="submit" color="primary" class="q-mr-lg" /></div>
                    </q-form>
                </q-card-section>
            </q-card>
        </q-dialog>
        <q-splitter v-model="splitterModel">
            <template v-slot:before>
                <div class="text-center">
                    <div v-if="showAddForm"><q-btn @click="resetData()" rounded glossy color="accent">Hide Form</q-btn></div>
                    <div v-else><q-btn @click="showForm()" rounded glossy color="primary">Create Group</q-btn></div>
                </div>
                <div v-if="showAddForm">
                    <q-form class="q-gutter-md q-mb-lg" @submit="addSubmit">
                        <q-input v-model="name" label="Name" :rules="[...rules.required]"/>
                        <div class="text-center"><q-btn label="Submit" type="submit" color="primary" class="q-mr-lg"/></div>
                    </q-form>
                </div>
                <q-tabs v-model="tab" vertical class="text-teal">
                    <q-tab name="groups" label="All Groups"/>
                    <q-tab :name="index" :label="i.name" v-for="(i, index) in schoolGroups" :key="i.id" @click="showStudents(i.id)"/>
                    <q-tab name="students" label="All Students"/>
                </q-tabs>
            </template>
            <template v-slot:after>
                <q-tab-panels v-model="tab" animated swipeable vertical transition-prev="jump-up" transition-next="jump-up">
                    <q-tab-panel :name="index" v-for="(i, index) in schoolGroups" :key="i.id">
                        <q-table :title="i.name" :data="filterStudents" :columns="column2" row-key="id" class="my-sticky-header-table" :pagination.sync="pagination2">
                            <template v-slot:header="props"><q-tr :props="props"><q-th v-for="col in props.cols" :key="col.name" :props="props">{{ col.label }}</q-th></q-tr></template>
                            <template v-slot:body="props">
                                <q-tr :props="props">
                                <q-td key="id" :props="props">{{ props.row.id }}</q-td>
                                <q-td key="name" :props="props">{{ props.row.name }}</q-td>
                                <q-td key="tab1Name" :props="props">{{ props.row.tab1Name }}</q-td>
                                <q-td key="id"><q-checkbox v-model="selection" :val="props.row.id" color="teal"/></q-td>
                                </q-tr>
                            </template>
                        </q-table>                        
                    </q-tab-panel>
                    <q-tab-panel name="groups">
                        <q-table title="All Groups" :data="schoolGroups" :columns="column1" row-key="id" class="my-sticky-header-table" :pagination.sync="pagination1">
                            <template v-slot:header="props"><q-tr :props="props"><q-th v-for="col in props.cols" :key="col.name" :props="props">{{ col.label }}</q-th></q-tr></template>
                            <template v-slot:body="props">
                                <q-tr :props="props">
                                <q-td key="id" :props="props">{{ props.row.id }}</q-td>
                                <q-td key="name" :props="props">{{ props.row.name }}</q-td>
                                <q-td><img @click="updateDialog(props.row)" src="/images/icons/edit.svg" class="edit"/></q-td>
                                </q-tr>
                            </template>
                        </q-table>
                    </q-tab-panel>
                    <q-tab-panel name="students">
                        <q-table title="All Students" :data="schoolStudents" :columns="column2" row-key="id" class="my-sticky-header-table" :pagination.sync="pagination2">
                            <template v-slot:header="props"><q-tr :props="props"><q-th v-for="col in props.cols" :key="col.name" :props="props">{{ col.label }}</q-th></q-tr></template>
                            <template v-slot:body="props">
                                <q-tr :props="props">
                                <q-td key="id" :props="props">{{ props.row.id }}</q-td>
                                <q-td key="name" :props="props">{{ props.row.name }}</q-td>
                                <q-td key="tab1Name" :props="props">{{ props.row.tab1Name }}</q-td>
                                <q-td key="id"><q-checkbox v-model="selection" :val="props.row.id" color="teal"/></q-td>
                                </q-tr>
                            </template>
                        </q-table>
                    </q-tab-panel>
                </q-tab-panels>
                <q-page-sticky position="bottom-left" :offset="[50, 10]">
                    <q-fab icon="add" label="Actions" direction="up" color="accent">
                        <q-fab-action label-position="left" color="primary" @click="resetSelection" label="Reset Selection" v-if="selection.length"/>
                        <q-fab-action label-position="left" color="primary" @click="updateDialog2" label="Add to a Group" v-if="selection.length"/>
                    </q-fab>
                </q-page-sticky>
            </template> 
        </q-splitter>
    </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
import {rules} from '../../store/functions'

export default {
    name: 'SchoolGroups',
    data() {
        return {
            rules : rules,
            showAddForm: false,
            showActions: false,
            name:  '',
            tab: "students",
            splitterModel: 20,
            medium: false,
            medium2: false,
            pagination1: { rowsPerPage: 30 },
            pagination2: { rowsPerPage: 30 },
            selection: [],
            groupSelected: '',
            filterStudents: [],
            column1: [
                { name: 'id', label: 'Sl No.', align: 'left', field: 'Edit', },
                { name: 'name', label: 'Name', align: 'left', field: 'name', sortable: true,},
                { name: 'updated_at', label: 'Update', align: 'left', field: 'updated_at', sortable: true,},
            ],
            column2: [
                { name: 'id', label: 'Sl No.', align: 'left', field: 'Edit', },
                { name: 'name', label: 'Name', align: 'left', field: 'name', sortable: true,},
                { name: 'tab1Name', label: 'Class', align: 'left', field: 'tab1Name', sortable: true,},
                { name: 'updated_at', label: 'Update', align: 'left', field: 'updated_at', sortable: true,},
            ],
        };
    },
    methods: {
        ...mapActions(['schoolBasics']),
        showForm() { this.showAddForm = true; },
        addSubmit(e) {
            e.preventDefault();
            const data = {
                schoolId: 1,
                name: this.name
            };
            this.$store.dispatch('addSchoolGroup', data);
            this.resetData(); 
        },
        updateDialog(data) {
            this.id = data.id;
            this.name = data.name;
            this.medium = true;
        },
        updateDialog2(){
            this.medium2 = true;
        },
        resetData() {
            this.id = '';
            this.name = '';
            this.showAddForm = false;
            this.groupSelected= '',
            this.selection=[],
            this.medium = false;
            this.medium2 = false;
        },
        resetSelection(){
            this.selection= []
        },
        showStudents(id){
            this.selection = []
            var group = JSON.parse(this.schoolGroups.filter(i=>i.id == id)[0].students)
            if(group){
                this.filterStudents = this.schoolStudents.filter(i=>group.includes(i.id))
            }else{
                this.filterStudents = []
            }
        },
        updateSubmit(e) {
            e.preventDefault();
            const data = {
                id: this.id,
                name: this.name,
            };
            this.$store.dispatch('updateGroupName', data);
            this.resetData();
        },
        updateSubmit2(e) {
            e.preventDefault();
            if(this.schoolGroups.filter(i=>i.id == this.groupSelected)[0].students){
                var oldStudents = JSON.parse(this.schoolGroups.filter(i=>i.id = this.groupSelected)[0].students)
                var finalStudents = Array.from(new Set( [...oldStudents, ...this.selection]))
            }else{
                var finalStudents = this.selection
            }
            const data = {
                id: this.groupSelected,
                students: JSON.stringify(finalStudents)
            };
            this.$store.dispatch('updateGroupStudents', data);
            this.resetData();
        },
    },
    computed: {
        ...mapGetters(['schoolGroups', 'schoolStudents']),
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
