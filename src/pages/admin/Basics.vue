<template>
  <div class="q-pa-md">
    <div v-if="showAddForm">
      <q-btn @click="hideForm()" class="q-mb-lg" rounded glossy color="accent">Hide Form</q-btn>
    </div>
    <div v-else>
      <q-btn @click="showForm()" class="q-mb-lg" rounded glossy color="primary">Add Basic</q-btn>
    </div>
    <div v-if="showAddForm">
      <q-form class="q-gutter-md q-mb-lg" @submit="addSubmit">
        <div class="row">
          <div class="col-6 q-pr-lg"><q-select filled map-options emit-value v-model="type" :options="basicOptions" option-value="name" option-label="name" label="Type" lazy-rules required/></div>
          <div class="col-6 q-pr-lg"><q-input v-model="name" label="Name" lazy-rules required/></div>
          <div class="col-4 q-pr-lg"><q-input v-model="tab1" label="Tab 1" lazy-rules /></div>
          <div class="col-4 q-pr-lg"><q-input v-model="tab2" label="Tab 2" lazy-rules /></div>
          <div class="col-4 q-pr-lg"><q-input v-model="tab3" label="Tab 3" lazy-rules /></div>
        </div>
        <div><q-btn label="Submit" type="submit" color="primary" class="q-mr-lg" /></div>
      </q-form>
    </div>
    <q-table title="Basics" :data="adminBasics" :columns="columns" row-key="id">
      <template v-slot:header="props">
        <q-tr :props="props">
          <q-th v-for="col in props.cols" :key="col.name" :props="props">{{ col.label }}</q-th>
        </q-tr>
      </template>
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="id" :props="props">{{ props.row.id }}</q-td>
          <q-td key="type" :props="props">{{ props.row.type }}</q-td>
          <q-td key="name" :props="props">{{ props.row.name }}</q-td>
          <q-td key="tab1" :props="props">{{ props.row.tab1 }}</q-td>
          <q-td key="tab2" :props="props">{{ props.row.tab2 }}</q-td>
          <q-td key="tab3" :props="props">{{ props.row.tab3 }}</q-td>
          <q-td key="updated_at" :props="props">{{ props.row.updated_at }}</q-td>
          <q-td><img src="/images/icons/edit.svg" class="edit"/></q-td>
        </q-tr>
      </template>
    </q-table>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  data() {
    return {
      type: '',
      name: '',
      tab1: '',
      tab2: '',
      tab3: '',
      showAddForm: false,
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
          name: 'tab1', label: 'Tab 1', align: 'left', field: 'tab1', sortable: true,
        },
        {
          name: 'tab2', label: 'Tab 2', align: 'left', field: 'tab2', sortable: true,
        },
        {
          name: 'tab3', label: 'Tab 3', align: 'left', field: 'tab3', sortable: true,
        },
        {
          name: 'updated_at', label: 'Date', align: 'left', field: 'updated_at', sortable: true,
        },
      ],
      // options: [
      //   'Basic', 'Class',
      // ],
    };
  },
  methods: {
    ...mapActions('session', ['adminBasics']),
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
        tab1: this.tab1,
        tab2: this.tab2,
        tab3: this.tab3,
      };
      this.$store.dispatch('session/addBasic', data);
      this.resetData();
    },
    resetData() {
      this.type = '';
      this.name = '';
      this.tab1 = '';
      this.tab2 = '';
      this.tab3 = '';
      this.showAddForm = false;
    },
    editItem(item) {
      console.log('item', item);
      this.editedIndex = this.data.indexOf(item);
      this.editedItem = {
        id: item.id,
        name: item.name,
        url: item.url,
        type: item.type,
      };
      // this.editedItem = this.editedItem.assign({}, item);
      this.medium = true;
    },
    updateSubmit(e) {
      e.preventDefault();
      const data = {
        id: this.editedItem.id,
        name: this.editedItem.name,
        url: this.editedItem.url,
        type: this.editedItem.type,
      };
      this.$store.dispatch('session/updateBasic', data);
      this.medium = false;
    },
  },
  computed: {
    ...mapState('session', ['adminBasics', 'basicOptions']),
  },
  created() {
    this.$store.dispatch('session/adminBasics');
  },
};
</script>
