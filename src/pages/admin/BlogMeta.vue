<template>
  <div class="q-pa-md">
    <div v-if="showAddForm"><q-btn @click="hideForm()" class="q-mb-lg" rounded glossy color="accent">Hide Form</q-btn></div>
    <div v-else><q-btn @click="showForm()" class="q-mb-lg" rounded glossy color="primary">Add Blog Meta</q-btn></div>
    <div v-if="showAddForm">
      <q-form class="q-gutter-md q-mb-lg" @submit="addSubmit">
        <div class="row">
          <div class="col-4 q-pr-lg"><q-select v-model="type" :options="options" label="Type" :rules="[...rules.required]"/></div>
          <div class="col-4 q-pr-lg"><q-input v-model="name" label="Name" :rules="[...rules.required]"/></div>
          <div class="col-4 q-pr-lg"><q-input v-model="url" label="URL" :rules="[...rules.required]"/></div>
        </div>
        <div><q-btn label="Submit" type="submit" color="primary" class="q-mr-lg"/></div>
      </q-form>
    </div>
    <q-dialog v-model="medium" persistent transition-show="scale" transition-hide="scale">
      <q-card style="width: 70vw; max-width: 80vw;">
        <q-card-section class="modalHead"><div class="text-h6">Update Blog Meta</div><q-btn flat label="Close" color="primary" v-close-popup @click="resetData()"/></q-card-section>
        <q-card-section class="q-pt-none">
          <q-form class="q-gutter-md" @submit="updateSubmit">
            <div class="row">
              <div class="col-4 q-pr-lg"><q-select v-model="type" :options="options" label="Type" :rules="[...rules.required]"/></div>
              <div class="col-4 q-pr-lg"><q-input v-model="name" label="Name" :rules="[...rules.required]"/></div>
              <div class="col-4 q-pr-lg"><q-input v-model="url" label="URL" :rules="[...rules.required]"/></div>
            </div>
            <div class="text-center"><q-btn label="Submit" type="submit" color="primary" class="q-mr-lg" /></div>
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>
    <q-table title="Blog Meta" :data="blogMeta" :columns="columns" row-key="id" class="my-sticky-header-table" :pagination.sync="pagination">
      <template v-slot:header="props"><q-tr :props="props"><q-th v-for="col in props.cols" :key="col.name" :props="props">{{ col.label }}</q-th></q-tr></template>
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="name" :props="props">{{ props.row.name }}</q-td>
          <q-td key="type" :props="props">{{ props.row.type }}</q-td>
          <q-td key="url" :props="props">{{ props.row.url }}</q-td>
          <q-td><img src="/images/icons/edit.svg" class="edit" @click="updateDialog(props.row)" /></q-td>
        </q-tr>
      </template>
    </q-table>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import {rules} from '../../store/functions'

export default {
  data() {
    return {
      rules : rules,
      type: '',
      name: '',
      url: '',
      medium: false,
      showAddForm: false,
      pagination: { rowsPerPage: 30 },
      columns: [
        {
          name: 'name', label: 'Name', align: 'left', field: 'name', sortable: true,
        },
        {
          name: 'type', label: 'Type', align: 'left', field: 'type', sortable: true,
        },
        {
          name: 'url', label: 'Url', align: 'left', field: 'url', sortable: true,
        },
        {
          name: 'id', label: 'Edit1', align: 'left', field: 'Edit',
        },
      ],
      options: [
        'category', 'tag',
      ],
    };
  },
  methods: {
    // ...mapActions(['adminBlogMeta']),
    showForm() {
      this.showAddForm = true;
    },
    hideForm() {
      this.showAddForm = false;
    },
    addSubmit(e) {
      e.preventDefault();
      const data = {
        name: this.name,
        url: this.url,
        type: this.type,
      };
      this.$store.dispatch('addBlogMeta', data);
    },
    resetData() {
      this.id = '';
      this.type = '';
      this.name = '';
      this.url = '';
      this.showAddForm = false;
      this.medium = false;
    },
    updateDialog(data) {
      this.id = data.id;
      this.type = data.type;
      this.name = data.name;
      this.url = data.url;
      this.medium = true;
    },
    updateSubmit(e) {
      e.preventDefault();
      const data = {
        id: this.id,
        type: this.type,
        name: this.name,
        url: this.url,
      };
      this.$store.dispatch('updateBlogMeta', data);
      this.resetData();
    },
  },
  computed: {
    ...mapGetters(['blogMeta']),
  },
  created() {
    this.$store.dispatch('adminBlogMeta');
  },
};
</script>
