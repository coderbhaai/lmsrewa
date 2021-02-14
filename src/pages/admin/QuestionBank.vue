<template>
  <div class="q-pa-md">
    <q-btn @click="addDialog()" class="q-mb-lg" rounded glossy color="primary">Add Question</q-btn>
    <q-dialog v-model="medium2" persistent transition-show="scale" transition-hide="scale">
      <q-card style="width: 70vw; max-width: 80vw;">
        <q-card-section class="modalHead"><div class="text-h6">Add Question</div><q-btn flat label="Close" color="primary" v-close-popup @click="resetData()"/></q-card-section>
        <q-card-section class="q-pt-none">
          <q-form class="q-gutter-md" @submit="addHandler">
            <div class="row">
              <div class="col-3 q-pr-lg"><q-select emit-value map-options v-model="board" :options="boardOptions" option-value="id" option-label="name" label="Board" lazy-rules required/></div>
              <div class="col-3 q-pr-lg"><q-select emit-value map-options v-model="classes" :options="classOptions" option-value="id" option-label="name" label="Class" lazy-rules required @input="classSelected()"/></div>
              <div class="col-3 q-pr-lg"><q-select emit-value map-options v-model="subject" :options="basicSubjectFilter" option-value="id" option-label="name" label="Subject" lazy-rules required @input="subjectSelected()"/></div>
              <div class="col-3 q-pr-lg"><q-select emit-value map-options v-model="topic" :options="basicTopicFilter" option-value="id" option-label="name" label="Topic" lazy-rules required @input="topicSelected()"/></div>
              <div class="col-3 q-pr-lg"><q-select emit-value map-options v-model="subtopic" :options="basicSubTopicFilter" option-value="id" option-label="name" label="SubTopic" lazy-rules required/></div>
              <div class="col-3 q-pr-lg"><q-select emit-value map-options v-model="difficulty" :options="difficultyOptions" option-value="id" option-label="name" label="Difficulty" lazy-rules required/></div>
              <div class="col-3 q-pr-lg"><q-select emit-value map-options v-model="type" :options="typeOptions" option-value="id" option-label="name" label="Type" lazy-rules required/></div>
              <div class="col-3 q-pr-lg"><q-input v-model="marks" label="Marks" lazy-rules required/></div>
              <div class="col-6 q-pr-lg"><q-input v-model="source" label="Source" lazy-rules required/></div>
              <div class="col-12 q-pr-lg"><q-input v-model="question" label="Question" lazy-rules required/></div>
              <div class="col-12 row">
                <div v-if="type=='33'" v-for="(i, index) in options" :key="index" class="col-3 row">
                  <q-input v-model="options[index]" label="Option" lazy-rules required/><span class="material-icons" @click="deleteOption(index)" style="color:red">delete</span>
                </div>
                <q-btn @click="addOptions()" class="q-my-sm" rounded glossy color="primary">Add Options</q-btn>
              </div>
            </div>
            <div class="text-center"><q-btn label="Submit" type="submit" color="primary" class="q-mr-lg" /></div>
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>
    <q-dialog v-model="medium" persistent transition-show="scale" transition-hide="scale">
      <q-card style="width: 70vw; max-width: 80vw;">
        <q-card-section class="modalHead"><div class="text-h6">Update Video</div><q-btn flat label="Close" color="primary" v-close-popup @click="resetData()"/></q-card-section>
        <q-card-section class="q-pt-none">
          <q-form class="q-gutter-md" @submit="updateHandler">
            <div class="row">
              <div class="col-6 q-pr-lg"><q-select emit-value v-model="type" :options="boardOptions" option-value="name" option-label="name" label="Type" lazy-rules required/></div>
              <!-- <div class="col-6 q-pr-lg"><q-input v-model="name" label="Name" lazy-rules required/></div>
              <div class="col-4 q-pr-lg"><q-input v-model="tab1" label="Tab 1" lazy-rules required/></div>
              <div class="col-4 q-pr-lg"><q-input v-model="tab2" label="Tab 2" lazy-rules required/></div>
              <div class="col-4 q-pr-lg"><q-input v-model="tab3" label="Tab 3" lazy-rules required/></div> -->
            </div>
            <div class="text-center"><q-btn label="Submit" type="submit" color="primary" class="q-mr-lg" /></div>
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>
    <q-table title="Basics" :data="boardOptions" :columns="columns" row-key="id">
      <template v-slot:header="props"><q-tr :props="props"><q-th v-for="col in props.cols" :key="col.name" :props="props">{{ col.label }}</q-th></q-tr></template>
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="id" :props="props">{{ props.row.id }}</q-td>
          <q-td key="type" :props="props">{{ props.row.type }}</q-td>
          <q-td key="name" :props="props">{{ props.row.name }}</q-td>
          <q-td key="tab1" :props="props">{{ props.row.tab1 }}</q-td>
          <q-td key="tab2" :props="props">{{ props.row.tab2 }}</q-td>
          <q-td key="tab3" :props="props">{{ props.row.tab3 }}</q-td>
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
      board:    '',
      classes:    '',
      subject:  '',
      topic:    '',
      subtopic: '',
      difficulty: '',
      type: '',
      marks: '',
      source: '',
      question: '',
      options: ['', ''],
      medium: false,
      medium2: false,
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
        {
          name: 'id', label: 'Edit', align: 'left', field: 'id', sortable: true,
        },
      ],
      classSelected() {
        const data={
          classSelected: this.classes
        }
        this.$store.dispatch('basicClassSelected', data);
      },
      subjectSelected() {
        const data={
          classSelected: this.classes,
          subjectSelected: this.subject
        }
        this.$store.dispatch('basicSubjectSelected', data);
      },
      topicSelected() {
        const data={
          classSelected: this.classes,
          subjectSelected: this.subject,
          topicSelected: this.topic,
        }
        this.$store.dispatch('basicTopicSelected', data);
      },
      addOptions() {
        console.log('1')
        this.options.push('')
      },
      deleteOption(index) {
        console.log('index', index)
        this.options.splice(index, 1)
      }
    };
  },
  methods: {
    ...mapActions(['adminBasics']),
    addHandler(e) {
      e.preventDefault();
      const data = {
        type: this.type,
        name: this.name,
        tab1: this.tab1,
        tab2: this.tab2,
        tab3: this.tab3,
      };
      this.$store.dispatch('addBasic', data);
      this.resetData();
    },
    resetData() {
      this.id = '';
      this.type = '';
      this.name = '';
      this.tab1 = '';
      this.tab2 = '';
      this.tab3 = '';
      this.showAddForm = false;
      this.medium = false;
    },
    addDialog() {
      this.medium2 = true
    },
    updateDialog(data) {
      this.id = data.id;
      this.type = data.type;
      this.name = data.name;
      this.tab1 = data.tab1;
      this.tab2 = data.tab2;
      this.tab3 = data.tab3;
      this.medium = true;
    },
    updateHandler(e) {
      e.preventDefault();
      const data = {
        id: this.id,
        type: this.type,
        name: this.name,
        tab1: this.tab1,
        tab2: this.tab2,
        tab3: this.tab3,
      };
      this.$store.dispatch('updateBasic', data);
      this.resetData();
    },
  },
  computed: {
    // ...mapGetters(['boardOptions', 'classOptions', 'subjectOptions', 'topicOptions', 'subtopicOptions', 'difficultyOptions', 'basicSubjectFilter', 'basicTopicFilter']),
    ...mapGetters(['boardOptions','classOptions', 'topicOptions', 'basicSubjectFilter', 'basicTopicFilter', 'basicSubTopicFilter', 'difficultyOptions', 'typeOptions']),
  },
  created() {
    this.$store.dispatch('questionOptions');
  },
};
</script>
