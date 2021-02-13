<template>
  <div class="q-pa-md">
    <q-table title="Institutes" :data="adminInstitutes" :columns="columns" row-key="id">
      <template v-slot:header="props"><q-tr :props="props"><q-th v-for="col in props.cols" :key="col.name" :props="props">{{ col.label }}</q-th></q-tr></template>
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="id" :props="props">{{ props.row.id }}</q-td>
          <q-td key="name" :props="props">{{ props.row.name }}</q-td>
          <q-td key="status" :props="props">
            <q-toggle v-model="props.row.status==1 ? true : false" color="primary" @input="changeStatus(props.row.id, props.row.status)"></q-toggle>
          </q-td>
          <q-td key="updated_at" :props="props">{{ props.row.updated_at }}</q-td>
        </q-tr>
      </template>
    </q-table>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  data() {
    return {
      columns: [
        {
          name: 'id', label: 'Sl No.', align: 'left', field: 'Edit',
        },
        {
          name: 'name', label: 'Name', align: 'left', field: 'name', sortable: true,
        },
        {
          name: 'status', label: 'Status', align: 'left', field: 'status', sortable: true,
        },
        {
          name: 'updated_at', label: 'Date', align: 'left', field: 'updated_at', sortable: true,
        },
      ],
    };
  },
  methods: {
    ...mapActions(['adminInstitutes']),
    changeStatus(id, status){
      if(status == 0){ var change = 1 }else{ var change = 0}
      const data = {
        id: id,
        status: change,
      };
      this.$store.dispatch('changeInstituteStatus', data);
    },
  },
  computed: {
    ...mapGetters(['adminInstitutes']),
  },
  created() {
    this.$store.dispatch('adminInstitutes');
  },
};
</script>
