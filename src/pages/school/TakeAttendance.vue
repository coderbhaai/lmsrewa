<template>
    <div class="q-pa-md">
        <div class="row">
          <div class="col-4 q-pr-lg"><q-select emit-value map-options v-model="classes" :options="schoolClassOptions" option-value="id" option-label="name" label="Class" required @input="classSelected()"/></div>
          <div class="col-4 q-pr-lg"><q-select emit-value map-options v-model="subject" :options="schoolSubjectOptions" option-value="id" option-label="name" label="Subject" required @input="subjectSelected()"/></div>
        </div>
    </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'TakeAttendance',
  data() {
    return {
      date: '',
      classes: '',
      subject: '',
      period:  '',
      teacher: '',
      present: [],
      absent: [],
      pagination: { rowsPerPage: 30 },
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
    };
  },
  methods: {
    ...mapActions(['schoolBasics']),
    classSelected(){
      console.log(this.classes)
      const data={
        classes: this.classes
      }
      this.$store.dispatch('attendanceClassSelected', data);
    },
    subjectSelected(){
      console.log(this.subject)
    },
  },
  computed: {
  ...mapGetters(['schoolClassOptions', 'schoolSubjectOptions']),
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
