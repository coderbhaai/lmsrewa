<template>
  <div class="q-pa-md">
    <div v-if="showAddForm"><q-btn @click="hideForm()" class="q-mb-lg" rounded glossy color="accent">Hide Form</q-btn></div>
    <div v-else><q-btn @click="showForm()" class="q-mb-lg" rounded glossy color="primary">Add Video</q-btn></div>
    <div v-if="showAddForm">
      <q-form class="q-gutter-md q-mb-lg" @submit="addSubmit">
        <div class="row qmb-lg">
          <div class="col-4 q-pr-lg"><q-select v-model="type" :options="options" label="Type" lazy-rules required/></div>
          <div class="col-4 q-pr-lg"><q-select emit-value v-model="video_class" :options="classOptions" label="Class" option-value="name" option-label="name" lazy-rules required/></div>
          <div class="col-4 q-pr-lg"><q-select emit-value v-model="sub" :options="subjectOptions" label="Subject" option-value="name" option-label="name" lazy-rules required/></div>
        </div>
        <div class="row">
          <div class="col-4 q-pr-lg"><q-input v-model="name" label="Name" lazy-rules required/></div>
          <div class="col-4 q-pr-lg"><q-input v-model="url" label="URL" lazy-rules required/></div>
          <div class="col-4 q-pr-lg"><q-select emit-value v-model="status" :options="display_options" option-value="value" option-label="name" label="Display Status" lazy-rules required/></div>
        </div>
        <div><q-btn label="Submit" type="submit" color="primary" class="q-mr-lg" /></div>
      </q-form>
    </div>
    <q-dialog v-model="alert">
      <q-card>
        <q-card-section>
          <div class="text-h6">Alert</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum repellendus sit voluptate voluptas eveniet porro. Rerum blanditiis perferendis totam, ea at omnis vel numquam exercitationem aut, natus minima, porro labore.
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="OK" color="primary" v-close-popup />
        </q-card-actions>
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
      url: '',
      video_class: '',
      sub: '',
      status: '',
      showAddForm: false,
      alert: false,
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
    ...mapActions('session', ['adminVideos']),
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
      this.$store.dispatch('session/addVideo', data);
      // this.resetData();
    },
    resetData() {
      this.type = '';
      this.name = '';
      this.url = '';
      this.video_class = '';
      this.sub = '';
      this.status = '';
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
      this.$store.dispatch('session/updateBlogMeta', data);
      this.medium = false;
    },
  },
  computed: {
    ...mapState('session', ['adminVideos', 'classOptions', 'subjectOptions']),
    // setter
    // set: function (newValue) {
    //   // var names = newValue.split(' ')
    //   // this.firstName = names[0]
    //   // this.lastName = names[names.length - 1]
    //   this.adminBlogs = newValue
    // }
  },
  created() {
    this.$store.dispatch('session/adminBasics');
    this.$store.dispatch('session/adminVideos');
  },
};
</script>
