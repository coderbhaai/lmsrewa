<template>
  <div class="q-pa-md">
    <a href="/admin/addQuestion"><q-btn class="q-mb-lg" rounded glossy color="primary">Add Question</q-btn></a>
    <q-table title="Question Bank" :data="questionSummary" :columns="columns" row-key="id" class="my-sticky-header-table" :pagination.sync="pagination">
      <template v-slot:header="props"><q-tr :props="props"><q-th v-for="col in props.cols" :key="col.name" :props="props">{{ col.label }}</q-th></q-tr></template>
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="id" :props="props">{{props.row.id}}</q-td>
          <q-td key="type" :props="props">{{props.row.typeName}}</q-td>
          <q-td key="type" :props="props">{{props.row.className }} => {{props.row.subjectName}} => {{props.row.topicName}} => {{props.row.subTopicName}} => {{props.row.topicName}}</q-td>
          <q-td key="name" :props="props">{{props.row.name}}</q-td>
          <q-td key="question" :props="props">{{props.row.question}}</q-td>
          <q-td key="status" :props="props">{{props.row.status}}</q-td>
          <q-td key="marks" :props="props">{{props.row.marks}}</q-td>
          <q-td key="updated_at" :props="props">{{props.row.updated_at}}</q-td>
          <q-td><a :href="'/admin/updateQuestion/'+props.row.id"><img src="/images/icons/edit.svg" class="edit"/></a></q-td>
        </q-tr>
      </template>
    </q-table>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'QuestionSummary',
  data() {
    return {
      pagination: { rowsPerPage: 30 },
      columns: [
        { name: 'id', label: 'Sl No.', align: 'left', field: 'Edit', },
        { name: 'type', label: 'Type', align: 'left', field: 'type', },
        { name: 'type', label: 'Filter', align: 'left', field: 'type', },
        { name: 'question', label: 'Question', align: 'left', field: 'question', sortable: true, },
        { name: 'status', label: 'Status', align: 'left', field: 'status', sortable: true, },
        { name: 'marks', label: 'Marks', align: 'left', field: 'marks', sortable: true, },
        { name: 'updated_at', label: 'Date', align: 'left', field: 'updated_at', sortable: true, },
        { name: 'id', label: 'Edit', align: 'left', field: 'id', sortable: true, },
      ],
    };
  },
  methods: {
    ...mapActions(['questionSummary']),
  },
  computed: {
    ...mapGetters(['questionSummary']),
  },
  created() {
    this.$store.dispatch('questionSummary');
  },
};
</script>
