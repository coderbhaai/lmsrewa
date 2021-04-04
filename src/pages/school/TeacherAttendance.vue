<template>
    <q-page padding>
        <q-tab-panel name="students">
            <div class="filterRow">
                <div class="filterBy"><q-select class='col-sm-6' emit-value map-options v-model="classes" :options="teacherClassOptions" option-value="class" option-label="className" label="Filter By Class" @input="classSelected()"/></div>
                <div class="filterBy"><q-select class='col-sm-6' emit-value map-options v-model="subject" :options="teacherSubjectOptions" option-value="subject" option-label="subjectName" label="Filter By Subject" @input="classSelected()"/></div>
            </div>
            <q-table :data="teacherAttendanceFilter" :columns="column" row-key="id" class="my-sticky-header-table" :pagination.sync="pagination">
                <template v-slot:header="props"><q-tr :props="props"><q-th v-for="col in props.cols" :key="col.name" :props="props">{{ col.label }}</q-th></q-tr></template>
                <template v-slot:body="props">
                    <q-tr :props="props">
                    <q-td key="id" :props="props">{{ props.row.id }}</q-td>
                    <q-td key="date" :props="props">{{ props.row.date }}</q-td>
                    <q-td key="className" :props="props">{{ props.row.className }}</q-td>
                    <q-td key="subjectName" :props="props">{{ props.row.subjectName }}</q-td>
                    <q-td key="present" :props="props">{{ JSON.parse(props.row.present).length }}</q-td>
                    <q-td key="absent" :props="props">{{ JSON.parse(props.row.absent).length }}</q-td>
                    <q-td><img @click="updateDialog(props.row)" src="/images/icons/edit.svg" class="edit"/></q-td>
                    </q-tr>
                </template>
            </q-table>
            <q-page-sticky position="bottom-left" :offset="[50, 10]">
                <q-fab icon="add" label="Actions" direction="up" color="accent">
                    <q-fab-action label-position="left" color="primary" @click="resetFilters" label="Reset Filters"/>
                </q-fab>
            </q-page-sticky>
        </q-tab-panel>
        <q-dialog v-model="medium" persistent transition-show="scale" transition-hide="scale">
            <q-card style="width: 70vw; max-width: 80vw;">
                <q-card-section class="modalHead"><div class="text-h6">Attendance - {{this.modalClass}} | {{this.modalSubject}}</div><q-btn flat label="Close" color="primary" v-close-popup @click="closeModal()"/></q-card-section>
                <q-card-section class="q-pt-none studentList">
                    <!-- <div>
                        <h3>Present Student</h3>
                        <ul>
                            <li v-for="i in this.present">{{ i.name }}</li>
                        </ul>
                    </div>
                    <div>
                        <h3>Absent Student</h3>
                        <ul>
                            <li v-for="i in this.absent">{{ i.name }}</li>
                        </ul>
                    </div> -->
                    <q-list class="rounded-borders">
                        <h3>Present Student</h3>
                        <q-item v-for="i in this.present" :key="i.id">
                            <q-item-section >{{ i.name }}</q-item-section>
                        </q-item>
                    </q-list>
                    <q-list class="rounded-borders">
                        <h3>Absent Student</h3>
                        <q-item v-for="i in this.absent" :key=i.id>
                            <q-item-section>{{ i.name }}</q-item-section>
                        </q-item>
                    </q-list>
                </q-card-section>
            </q-card>
        </q-dialog>
    </q-page>
</template>
<script>
    import { mapGetters, mapActions } from 'vuex';
    export default {
        name: 'TeacherAttendance',
        data() {
            return {
                classes: '',
                subject: '',
                modalClass: '',
                modalSubject: '',
                medium: false,
                pagination: { rowsPerPage: 30 },
                column: [
                    { name: 'id', label: 'Sl No.', align: 'left', field: 'Edit', },
                    { name: 'date', label: 'Date', align: 'left', field: 'name', sortable: true,},
                    { name: 'className', label: 'Class', align: 'left', field: 'name', sortable: true,},
                    { name: 'subjectName', label: 'Subject', align: 'left', field: 'name', sortable: true,},
                    { name: 'present', label: 'Present', align: 'left', field: 'name', sortable: true,},
                    { name: 'absent', label: 'Absent', align: 'left', field: 'name', sortable: true,},
                    { name: 'updated_at', label: 'Update', align: 'left', field: 'updated_at', sortable: true,},
                ],
            };
        },
        methods: {
            ...mapActions(['teacherAttendance']),
            classSelected(){
                const data={
                    classes: this.classes,
                    subject: this.subject,
                }
                this.$store.dispatch('filterAttendance', data);
            },
            updateDialog(value) {
                const data={
                    present: value.present,
                    absent: value.absent,
                }
                console.log(`data`, data)
                this.$store.dispatch('showAttendance', data);
                this.medium = true;
                this.modalClass = value.className;
                this.modalSubject = value.subjectName;
            },
            resetFilters(){
                this.classes= '',
                this.subject= '',
                this.$store.dispatch('resetAttendance');
            },
            closeModal(){ 
                this.medium = false;
                this.$store.dispatch('clearPresentAbsent');
            }
        },
        computed: {
            ...mapGetters(['teacherAttendanceFilter', 'teacherClassOptions', 'teacherSubjectOptions', 'present', 'absent', 'user']),
        },
        created() {
            const data={
                schoolId: 1,
                teacher: this.user.id
            }
            this.$store.dispatch('teacherAttendance', data);
        },
    };
</script>
<style lang="sass" scoped>
    .studentList
        display: flex
        align-items: self-start
        justify-content: space-evenly
        li
            list-style: none
        h3
            font-weight: bold
</style>
