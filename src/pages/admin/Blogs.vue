<template>
  <div class="q-pa-md">
    <q-table title="Blogs" :data="adminBlogs" :columns="columns" row-key="id">
      <template v-slot:header="props">
        <q-tr :props="props">
          <q-th v-for="col in props.cols" :key="col.name" :props="props">{{ col.label }}</q-th>
        </q-tr>
      </template>
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="id" :props="props">{{ props.row.id }}</q-td>
          <q-td key="title" :props="props">{{ props.row.title }}</q-td>
          <q-td key="coverImg" :props="props">{{ props.row.coverImg }}</q-td>
          <!-- <q-td key="coverImg" :props="props"><img src="/images/blogs/" + {{ props.row.coverImg }}/></q-td> -->
          <q-td key="url" :props="props">{{ props.row.url }}</q-td>
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
      columns: [
        {
          name: 'id', label: 'Edit1', align: 'left', field: 'Edit',
        },
        {
          name: 'title', label: 'Title', align: 'left', field: 'title', sortable: true,
        },
        {
          name: 'coverImg', label: 'Cover Image', align: 'left', field: 'coverImg', sortable: true,
        },
        {
          name: 'url', label: 'Url', align: 'left', field: 'url', sortable: true,
        },
        {
          name: 'updated_at', label: 'Date', align: 'left', field: 'updated_at', sortable: true,
        },
      ],
    };
  },
  methods: {
    ...mapActions('session', ['adminBlogs']),
  },
  computed: {
    ...mapState('session', ['adminBlogs']),
    // setter
    // set: function (newValue) {
    //   // var names = newValue.split(' ')
    //   // this.firstName = names[0]
    //   // this.lastName = names[names.length - 1]
    //   this.adminBlogs = newValue
    // }
  },
  created() {
    this.$store.dispatch('session/adminBlogs');
  },
};
</script>
