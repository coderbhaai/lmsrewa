<template>
    <div class="q-pa-md">
        <div class="row">
          <div class="col-4 q-pr-lg"><q-select emit-value map-options v-model="classes" :options="schoolClassOptions" option-value="id" option-label="name" label="Select Class" required @input="classSelected()"/></div>
          <div class="col-4 q-pr-lg"><q-select emit-value map-options v-model="subject" :options="schoolSubjectOptions" option-value="id" option-label="name" label="Subject" required @input="subjectSelected()"/></div> 
        </div>
        <q-table :data="schoolStudentFilter" :columns="column2" row-key="id" class="my-sticky-header-table" :pagination.sync="pagination2" v-if="schoolStudentFilter.length" >
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
        <q-page-sticky position="bottom-left" :offset="[50, 10]" v-if="schoolStudentFilter.length">
            <q-fab icon="add" label="Actions" direction="up" color="accent">
                <q-fab-action label-position="left" color="primary" @click="submitAttendance" label="Submit Attendance"/>
                <q-fab-action label-position="left" color="primary" @click="selectAll" label="Select All"/>
                <q-fab-action label-position="left" color="primary" @click="selectNone" label="Unselect All" v-if="selection.length"/>
            </q-fab>
        </q-page-sticky>
    </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'TakeAttendance',
  data() {
    return {
      classes: '',
      period:  '',
      subject:  '',
      teacher: '',
      present: [],
      absent: [],
      pagination: { rowsPerPage: 30 },
      pagination2: { rowsPerPage: 0 },
      selection: [],
      columns: [
        {
          name: 'id', label: 'Sl No.', align: 'left', field: 'Edit',
        },
        {
          name: 'type', label: 'Type', align: 'left', field: 'type', sortable: true,
        },
        {
          name: 'name', label: 'Name', align: 'left', field: 'name', sortable: true,
        },
        {
          name: 'tab1', label: 'Class', align: 'left', field: 'tab1', sortable: true,
        },
        {
          name: 'tab2', label: 'Subject', align: 'left', field: 'tab2', sortable: true,
        },
        {
          name: 'tab3', label: 'Topic', align: 'left', field: 'tab3', sortable: true,
        },
        {
          name: 'updated_at', label: 'Date', align: 'left', field: 'updated_at', sortable: true,
        },
        {
          name: 'id', label: 'Edit', align: 'left', field: 'id', sortable: true,
        },
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
    classSelected(){
      this.subject = ''
      const data={
        schoolId: 1,
        classes: this.classes
      }
      this.$store.dispatch('attendanceClassSelected', data);
    },
    subjectSelected(){
      this.selection= []
      const data={
        schoolId: 1,
        classes: this.classes,
        subject: this.subject
      }
      this.$store.dispatch('attendanceSubjectSelected', data);
    },
    selectNone(){ this.selection= [] },
    selectAll(){
      var all = []
      this.schoolStudentFilter.map((i)=>( all.push(i.id) ))
      this.selection = all
    },
    submitAttendance(){
      var absent = []
      this.schoolStudentFilter.filter(e => !this.selection.includes(e.id)).map((i)=>( absent.push(i.id) ))
      const data={
        schoolId: 1,
        teacher: this.user.id,
        classes: this.classes,
        subject: this.subject,
        present: JSON.stringify(this.selection),
        absent: JSON.stringify(absent)
      }
      this.$store.dispatch('submitAttendance', data);
    }
  },
  computed: {
  ...mapGetters(['schoolClassOptions', 'schoolSubjectOptions', 'schoolStudentFilter', 'user']),
  },
  created() {
    
    const data={
      schoolId: 1,
    }
    this.$store.dispatch('schoolAttendance', data);
  },
};
</script>
<style>
</style>
