<template>
  <div class="q-pa-md">
    <div class="filterRow q-mb-sm">
      <div v-if="showAddForm"><q-btn @click="hideForm()" rounded glossy color="accent">Hide Form</q-btn></div>
      <div v-else><q-btn @click="showForm()" rounded glossy color="primary">Add Basic</q-btn></div>
      <div class="filterBy"><q-select multiple emit-value map-options v-model="filterBy" :options="schoolBasicOptions" option-value="id" option-label="name" label="Filter By" @input="filterSelected()"/></div>
    </div>
    <div v-if="showAddForm">
      <q-form class="q-gutter-md q-mb-lg" @submit="addSubmit">
        <div class="row">
          <div class="col-4 q-pr-lg"><q-select emit-value v-model="type" :options="schoolBasicOptions" option-value="name" option-label="name" label="Type"  required @input="typeSelected()"/></div>
          <div class="col-4 q-pr-lg" v-if="this.type=='Student' || this.type=='Subject'">
            <q-select emit-value map-options v-model="tab1" :options="schoolClassOptions" option-value="id" option-label="name" label="Class"  required @input="classSelected()"/>
          </div>
          <div class="col-4 q-pr-lg"><q-input v-model="name" label="Name"  required/></div>
        </div>
        <div><q-btn label="Submit" type="submit" color="primary" class="q-mr-lg" /></div>
      </q-form>
    </div>
    <q-dialog v-model="medium" persistent transition-show="scale" transition-hide="scale">
      <q-card style="width: 70vw; max-width: 80vw;">
        <q-card-section class="modalHead"><div class="text-h6">Update Basic</div><q-btn flat label="Close" color="primary" v-close-popup @click="resetData()"/></q-card-section>
        <q-card-section class="q-pt-none">
          <q-form class="q-gutter-md" @submit="updateSubmit">
            <div class="row">
              <div class="col-4 q-pr-lg"><q-select emit-value v-model="type" :options="schoolBasicOptions" option-value="name" option-label="name" label="Type"  required @input="typeSelected()"/></div>
              <div class="col-4 q-pr-lg" v-if="this.type=='Student' || this.type=='Subject'">
                <q-select emit-value map-options v-model="tab1" :options="schoolClassOptions" option-value="id" option-label="name" label="Class"  required @input="classSelected()"/>
              </div>
              <div class="col-4 q-pr-lg"><q-input v-model="name" label="Name"  required/></div>
            </div>
            <div class="text-center"><q-btn label="Submit" type="submit" color="primary" class="q-mr-lg" /></div>
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>
    <q-table title="Basics" :data="schoolBasics" :columns="columns" row-key="id" :filter="filter" class="my-sticky-header-table" :pagination.sync="pagination">
      <template v-slot:header="props"><q-tr :props="props"><q-th v-for="col in props.cols" :key="col.name" :props="props">{{ col.label }}</q-th></q-tr></template>
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="id" :props="props">{{ props.row.id }}</q-td>
          <q-td key="type" :props="props">{{ props.row.type }}</q-td>
          <q-td key="name" :props="props">{{ props.row.name }}</q-td>
          <q-td key="tab1" :props="props" v-if="props.row.type== 'PaperOptions'">{{ props.row.tab1 }}</q-td>
          <q-td key="tab1" :props="props" v-else-if="props.row.type== 'Daily Practice Packages'">{{ props.row.tab1 }} Months Validity</q-td>
          <q-td key="tab1" :props="props" v-else>{{ props.row.tab1Name }}</q-td>
          <q-td key="tab1" :props="props" v-if="props.row.type== 'Daily Practice Packages'">Fees - {{ props.row.tab2 }}</q-td>
          <q-td key="tab2" :props="props" v-else>{{ props.row.tab2Name }}</q-td>
          <q-td key="tab3" :props="props">{{ props.row.tab3Name }}</q-td>
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
      tab1: null,
      tab2: null,
      tab3: null,
      showAddForm: false,
      medium: false,
      filter:   '',
      filterBy: [],
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
    showForm() { this.showAddForm = true; },
    hideForm() { this.showAddForm = false; },
    filterSelected(){
      const data={
        filterBy: this.filterBy
      }
      this.$store.dispatch('filterSchoolBasic', data);
    },
    typeSelected() {
      this.name = null;
      this.tab1 = null;
      this.tab2 = null;
      this.tab3 = null;
    },
    classSelected() {
      this.tab2 = null;
      this.tab3 = null;
      // const data={
      //   classSelected: this.tab1
      // }
      // this.$store.dispatch('basicClassSelected', data);
    },
    // subjectSelected() {
    //   this.tab3 = null;
    //   const data={
    //     classSelected: this.tab1,
    //     subjectSelected: this.tab2
    //   }
    //   this.$store.dispatch('basicSubjectSelected', data);
    // },
    addSubmit(e) {
      e.preventDefault();
      const data = {
        type: this.type,
        schoolId: this.user.id,
        name: this.name,
        tab1: this.tab1,
        tab2: this.tab2,
        tab3: this.tab3,
      };
      this.$store.dispatch('addSchoolBasic', data);
      // this.resetData();
    },
    resetData() {
      this.id = null;
      this.type = null;
      this.name = null;
      this.tab1 = null;
      this.tab2 = null;
      this.tab3 = null;
      this.showAddForm = false;
      this.medium = false;
    },
    updateDialog(data) {
      this.id = data.id;
      this.type = data.type;
      this.name = data.name;
      this.tab1 = parseInt(data.tab1);
      this.tab2 = parseInt(data.tab2);
      this.tab3 = parseInt(data.tab3);
      if(data.type=='Subject' || data.type=='Topic' || data.type=='SubTopic'){
        this.classSelected()
      }
      if(data.type=='Topic' || data.type=='SubTopic'){
        this.subjectSelected()
      }
      this.medium = true;
    },
    updateSubmit(e) {
      e.preventDefault();
      const data = {
        id: this.id,
        type: this.type,
        schoolId: this.user.id,
        name: this.name,
        tab1: this.tab1,
        tab2: this.tab2,
        tab3: this.tab3,
      };
      this.$store.dispatch('updateSchoolBasic', data);
      this.resetData();
    },
  },
  computed: {
    ...mapGetters(['user', 'schoolBasics', 'schoolBasicOptions', 'schoolClassOptions', 'schoolStudentOptions']),
  },
  created() {
    const data={
      id: this.user.id,
    }
    this.$store.dispatch('schoolBasics', data);
  },
};
</script>
