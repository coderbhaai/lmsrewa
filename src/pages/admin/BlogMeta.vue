<template>
  <div class="q-pa-md">
    <div v-if="showAddForm">
      <q-btn @click="hideForm()" class="q-mb-lg" rounded glossy color="accent">Hide Form</q-btn>
    </div>
    <div v-else>
      <q-btn @click="showForm()" class="q-mb-lg" rounded glossy color="primary">Add Blog Meta</q-btn>
    </div>
    <div v-if="showAddForm">
      <q-form class="q-gutter-md q-mb-lg" @submit="addSubmit">
        <div class="row">
          <div class="col-4 q-pr-lg">
            <q-select v-model="type" :options="options" label="Type" lazy-rules/>
          </div>
          <div class="col-4 q-pr-lg">
            <q-input v-model="name" label="Name" lazy-rules />
          </div>
          <div class="col-4 q-pr-lg">
            <q-input v-model="url" label="URL" lazy-rules />
          </div>
        </div>
        <div>
          <q-btn label="Submit" type="submit" color="primary" class="q-mr-lg" />
        </div>
      </q-form>
    </div>
    <q-table
      title="Blog Meta"
      :data="blogMeta"
      :columns="columns"
      row-key="id"
    >
      <template v-slot:header="props">
        <q-tr :props="props">
          <q-th
            v-for="col in props.cols"
            :key="col.name"
            :props="props"
          >
            {{ col.label }}
          </q-th>
        </q-tr>
      </template>
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="name" :props="props">{{ props.row.name }}</q-td>
          <q-td key="type" :props="props">{{ props.row.type }}</q-td>
          <q-td key="url" :props="props">{{ props.row.url }}</q-td>
          <q-td><img src="/images/icons/edit.svg" class="edit" @click="editItem(props.row)"/></q-td>
        </q-tr>
      </template>
    </q-table>
    <q-dialog v-model="medium" >
      <q-card style="width: 700px; max-width: 80vw;">
        <q-card-section>
          <div class="text-h6">Update Blog Meta</div>
        </q-card-section>
        <q-card-section class="q-pt-none">
          <q-form class="q-gutter-md q-mb-lg" @submit="updateSubmit">
            <div class="row">
              <div class="col-12 q-pr-lg">
                <q-select v-model="editedItem.type" :options="options" label="Type" lazy-rules readonly/>
              </div>
              <div class="col-6 q-pr-lg">
                <q-input v-model="editedItem.name" label="Name" lazy-rules />
              </div>
              <div class="col-6 q-pr-lg">
                <q-input v-model="editedItem.url" label="URL" lazy-rules />
              </div>
            </div>
            <div>
              <q-btn label="Submit" type="submit" color="primary"/>
            </div>
          </q-form>
        </q-card-section>
        <q-card-actions align="right" class="bg-white text-teal">
          <q-btn flat label="Close" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  data() {
    return {
      name: '',
      url: '',
      type: '',
      medium: false,
      showAddForm: false,
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
      editedIndex: -1,
      editedItem: {
        id: '',
        name: '',
        url: '',
        type: '',
      },
    };
  },
  methods: {
    ...mapActions('session', ['adminBlogMeta']),
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
      this.$store.dispatch('session/addBlogMeta', data);
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
    ...mapState('session', ['blogMeta']),
  },
  created() {
    this.$store.dispatch('session/adminBlogMeta');
  },
};
</script>
