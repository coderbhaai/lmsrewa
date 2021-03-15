<template>
  <div class="q-pa-md">
    <div v-if="showAddForm"><q-btn @click="hideForm()" class="q-mb-lg" rounded glossy color="accent">Hide Form</q-btn></div>
    <div v-else><q-btn @click="showForm()" class="q-mb-lg" rounded glossy color="primary">Add Video</q-btn></div>
    <div v-if="showAddForm">
      <q-form class="q-gutter-md q-mb-lg" @submit="addSubmit">
        <div class="row qmb-lg">
          <div class="col-4 q-pr-lg"><q-select v-model="type" :options="options" label="Type"  required/></div>
          <div class="col-4 q-pr-lg"><q-select emit-value v-model="video_class" :options="classOptions" label="Class" option-value="name" option-label="name"  required/></div>
          <div class="col-4 q-pr-lg"><q-select emit-value v-model="sub" :options="subjectOptions" label="Subject" option-value="name" option-label="name"  required/></div>
        </div>
        <div class="row">
          <div class="col-4 q-pr-lg"><q-input v-model="name" label="Name"  required/></div>
          <div class="col-4 q-pr-lg"><q-input v-model="url" label="URL"  required/></div>
          <div class="col-4 q-pr-lg"><q-select emit-value v-model="status" :options="display_options" option-value="value" option-label="name" label="Display Status"  required/></div>
        </div>
        <div><q-btn label="Submit" type="submit" color="primary" class="q-mr-lg" /></div>
      </q-form>
    </div>
    <q-dialog v-model="medium" persistent transition-show="scale" transition-hide="scale">
      <q-card style="width: 70vw; max-width: 80vw;">
        <q-card-section class="modalHead"><div class="text-h6">Update Video</div><q-btn flat label="Close" color="primary" v-close-popup @click="resetData()"/></q-card-section>
        <q-card-section class="q-pt-none">
          <q-form class="q-gutter-md" @submit="updateSubmit">
            <div class="row qmb-lg">
              <div class="col-4 q-pr-lg"><q-select v-model="type" :options="options" label="Type"  required/></div>
              <div class="col-4 q-pr-lg"><q-select emit-value v-model="video_class" :options="classOptions" label="Class" option-value="name" option-label="name"  required/></div>
              <div class="col-4 q-pr-lg"><q-select emit-value v-model="sub" :options="subjectOptions" label="Subject" option-value="name" option-label="name"  required/></div>
            </div>
            <div class="row">
              <div class="col-4 q-pr-lg"><q-input v-model="name" label="Name"  required/></div>
              <div class="col-4 q-pr-lg"><q-input v-model="url" label="URL"  required/></div>
              <div class="col-4 q-pr-lg"><q-select emit-value v-model="status" :options="display_options" option-value="value" option-label="name" label="Display Status"  required/></div>
            </div>
            <div class="text-center"><q-btn label="Submit" type="submit" color="primary" class="q-mr-lg" /></div>
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>
    <q-table title="Videos" :data="adminVideos" :columns="columns" row-key="id">
      <template v-slot:header="props">
        <q-tr :props="props">
          <q-th v-for="col in props.cols" :key="col.name" :props="props">{{ col.label }}</q-th>
        </q-tr>
      </template>
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="id" :props="props">{{ props.row.id }}</q-td>
          <q-td key="type" :props="props">{{ props.row.type }}</q-td>
          <q-td key="video_name" :props="props">{{ props.row.video_name }}</q-td>
          <q-td key="video_class" :props="props">{{ props.row.video_class }}</q-td>
          <q-td key="video_sub" :props="props">{{ props.row.video_sub }}</q-td>
          <q-td key="status" :props="props">{{ props.row.status }}</q-td>
          <q-td key="updated_at" :props="props">{{ props.row.updated_at }}</q-td>
          <q-td><img @click="updateDialog(props.row)" src="/images/icons/edit.svg" class="edit"/></q-td>
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
      id: '',
      type: '',
      name: '',
      url: '',
      video_class: '',
      sub: '',
      status: '',
      showAddForm: false,
      medium: false,
      columns: [
        {
          name: 'id', label: 'Sl No.', align: 'left', field: 'Edit',
        },
        {
          name: 'type', label: 'Type', align: 'left', field: 'type', sortable: true,
        },
        {
          name: 'video_name', label: 'Name', align: 'left', field: 'video_name', sortable: true,
        },
        {
          name: 'video_class', label: 'Class', align: 'left', field: 'video_class', sortable: true,
        },
        {
          name: 'video_sub', label: 'Subject', align: 'left', field: 'video_sub', sortable: true,
        },
        {
          name: 'status', label: 'Status', align: 'left', field: 'status', sortable: true,
        },
        {
          name: 'updated_at', label: 'Date', align: 'left', field: 'updated_at', sortable: true,
        },
      ],
      options: [
        'Recorded', 'Online',
      ],
      display_options: [
        { name: 'Hide', value: 0 },
        { name: 'Show', value: 1 },
      ],
    };
  },
  methods: {
    ...mapActions(['adminVideos']),
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
        url: this.url,
        video_class: this.video_class,
        sub: this.sub,
        status: this.status,
      };
      this.$store.dispatch('addVideo', data);
      this.resetData();
    },
    resetData() {
      this.id = '';
      this.type = '';
      this.name = '';
      this.url = '';
      this.video_class = '';
      this.sub = '';
      this.status = '';
      this.showAddForm = false;
      this.medium = false;
    },
    updateDialog(data) {
      this.id = data.id;
      this.type = data.type;
      this.name = data.video_name;
      this.url = data.url;
      this.video_class = data.video_class;
      this.sub = data.video_sub;
      this.status = data.status;
      this.medium = true;
    },
    updateSubmit(e) {
      e.preventDefault();
      const data = {
        id: this.id,
        type: this.type,
        name: this.name,
        url: this.url,
        video_class: this.video_class,
        sub: this.sub,
        status: this.status,
      };
      this.$store.dispatch('updateVideo', data);
      this.resetData();
    },
  },
  computed: {
    ...mapGetters(['adminVideos', 'classOptions', 'subjectOptions']),
  },
  created() {
    this.$store.dispatch('adminBasics');
    this.$store.dispatch('adminVideos');
  },
};
</script>
