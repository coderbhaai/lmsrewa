<template>
  <div class="q-pa-md">
    <div v-if="showAddForm"><q-btn @click="hideForm()" class="q-mb-lg" rounded glossy color="accent">Hide Form</q-btn></div>
    <div v-else><q-btn @click="showForm()" class="q-mb-lg" rounded glossy color="primary">Add Institute</q-btn></div>
    <div v-if="showAddForm">
      <q-form class="q-gutter-md q-mb-lg" @submit="addSubmit">
        <div class="row">
          <div class="col-4 q-pr-lg"><q-select emit-value v-model="type" :options="typeOptions" option-value="name" option-label="name" label="Type" required/></div>
          <div class="col-4 q-pr-lg"><q-input v-model="name" label="Name" required/></div>
          <div class="col-4 q-pr-lg"><q-input v-model="email" label="Email" required/></div>
          <div class="col-4 q-pr-lg"><q-input v-model="phone" label="Phone" required/></div>
          <div class="col-4 q-pr-lg"><q-select map-options emit-value v-model="status" :options="statusOptions" option-value="value" option-label="text" label="Status" required/></div>
        </div>
        <div><q-btn label="Submit" type="submit" color="primary" class="q-mr-lg" /></div>
      </q-form>
    </div>
    <q-table title="Institutes" :data="adminInstitutes" :columns="columns" row-key="id" class="my-sticky-header-table" :pagination.sync="pagination">
      <template v-slot:header="props"><q-tr :props="props"><q-th v-for="col in props.cols" :key="col.name" :props="props">{{ col.label }}</q-th></q-tr></template>
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="id" :props="props">{{ props.row.id }}</q-td>
          <q-td key="name" :props="props">{{ props.row.name }}</q-td>
          <q-td key="email" :props="props">{{ props.row.email }}</q-td>
          <q-td key="phone" :props="props">{{ props.row.phone }}</q-td>
          <q-td key="status" :props="props">
            <q-toggle v-model="props.row.status==1 ? true : false" color="primary" @input="changeStatus(props.row.id, props.row.status)"></q-toggle>
          </q-td>
          <q-td key="updated_at" :props="props">{{ props.row.updated_at }}</q-td>
          <q-td><img @click="updateDialog(props.row)" src="/images/icons/edit.svg" class="edit"/></q-td>
        </q-tr>
      </template>
    </q-table>
    <q-dialog v-model="medium" persistent transition-show="scale" transition-hide="scale">
      <q-card style="width: 70vw; max-width: 80vw;">
        <q-card-section class="modalHead"><div class="text-h6">Update School</div><q-btn flat label="Close" color="primary" v-close-popup @click="resetData()"/></q-card-section>
        <q-card-section class="q-pt-none">
          <q-form class="q-gutter-md" @submit="updateHandler">
            <div class="row">
              <div class="col-4 q-pr-lg"><q-select emit-value v-model="type" :options="typeOptions" option-value="name" option-label="name" label="Type" required/></div>
              <div class="col-4 q-pr-lg"><q-input v-model="name" label="Name" required/></div>
              <div class="col-4 q-pr-lg"><q-input v-model="email" label="Email" required/></div>
              <div class="col-4 q-pr-lg"><q-input v-model="phone" label="Phone" required/></div>
              <div class="col-4 q-pr-lg"><q-select map-options emit-value v-model="status" :options="statusOptions" option-value="value" option-label="text" label="Status" required/></div>
            </div>
            <div class="text-center"><q-btn label="Submit" type="submit" color="primary" class="q-mr-lg" /></div>
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  data() {
    return {
      showAddForm: false,
      type: '',
      name: '',
      email: '',
      phone: '',
      status: '',
      medium: false,
      typeOptions: [
        {name: 'School'},
        {name: 'College'},
        {name: 'Coaching Class'},
        {name: 'Kindergarten'},
      ],
      statusOptions: [
        {text: 'Active', value: 1},
        {text: 'Not Active', value: 0},
      ],
      pagination: { rowsPerPage: 30 },
      columns: [
        { name: 'id', label: 'Sl No.', align: 'left', field: 'Edit', },
        { name: 'name', label: 'Name', align: 'left', field: 'name', sortable: true, },
        { name: 'email', label: 'Email', align: 'left', field: 'email', sortable: true, },
        { name: 'phone', label: 'Phone', align: 'left', field: 'phone', sortable: true, },
        { name: 'status', label: 'Status', align: 'left', field: 'status', sortable: true, },
        { name: 'updated_at', label: 'Date', align: 'left', field: 'updated_at', sortable: true, },
        { name: 'id', label: 'Edit', align: 'left', field: 'id', sortable: true, },
      ],
    };
  },
  methods: {
    ...mapActions(['adminInstitutes']),
    showForm() {
      this.showAddForm = true;
    },
    hideForm() {
      this.showAddForm = false;
    },
    addSubmit(e) {
      e.preventDefault();
      const data = {
        type: this.type,
        name: this.name,
        email: this.email,
        phone: this.phone,
        status: this.status,
      };
      this.$store.dispatch('addInstitute', data);
      this.resetData();
    },
    resetData() {
      this.type = '',
      this.name = '',
      this.email = '',
      this.phone = '',
      this.status = '',
      this.showAddForm = false;
      this.medium = false;
    },
    changeStatus(id, status){
      if(status == 0){ var change = 1 }else{ var change = 0}
      const data = {
        id: id,
        status: change,
      };
      this.$store.dispatch('changeInstituteStatus', data);
    },
    updateDialog(data) {
      this.id = data.id;
      this.type = data.type;
      this.name = data.name;
      this.email = data.email;
      this.phone = data.phone;
      this.status = data.status;
      this.medium = true;
    },
    updateHandler(e) {
      e.preventDefault();
      const data = {
        id: this.id,
        type: this.type,
        name: this.name,
        email: this.email,
        phone: this.phone,
        status: this.status,
      };
      this.$store.dispatch('updateInstitute', data);
      this.resetData();
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
