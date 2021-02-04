<template>
  <div class="q-pa-md">
    <h1 class="heading">{{this.title}}</h1>
    <div class="row q-mb-lg">
      <div class="col-4 q-pr-lg"><q-select emit-value @input="classSelected($event)"  v-model="classx" :options="activeClasses" label="Class" option-label="video_class" option-value="video_class" lazy-rules required/></div>
      <div class="col-4 q-pr-lg"><q-select emit-value @input="subSelected($event)" v-model="subject" :options="activeSubjects" label="Subject" option-label="video_sub" option-value="video_sub" lazy-rules required/></div>
    </div>
    <q-table title="Videos" :data="filterVideos" :columns="columns" row-key="id">
      <template v-slot:header="props"><q-tr :props="props"><q-th v-for="col in props.cols" :key="col.name" :props="props">{{ col.label }}</q-th></q-tr></template>
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="id" :props="props">{{ props.row.id }}</q-td>
          <q-td key="type" :props="props">{{ props.row.type }}</q-td>
          <q-td key="video_class" :props="props">{{ props.row.video_class }}</q-td>
          <q-td key="video_sub" :props="props">{{ props.row.video_sub }}</q-td>
          <q-td key="video_name" :props="props">{{ props.row.video_name }}</q-td>
          <q-td key="updated_at" :props="props">{{ props.row.updated_at }}</q-td>
          <q-td><q-btn label="Watch Video" color="primary" @click="videoDialog(props.row)"/></q-td>
        </q-tr>
      </template>
      <q-btn v-if="videos.pagesNumber > 2" icon="first_page" color="grey-8" round dense flat :disable="videos.isFirstPage" @click="videos.firstPage"/>
      <q-btn icon="chevron_left" color="grey-8" round dense flat :disable="videos.isFirstPage" @click="videos.prevPage"/>
      <q-btn icon="chevron_right" color="grey-8" round dense flat :disable="videos.isLastPage" @click="videos.nextPage"/>
      <!-- <q-btn v-if="pagesNumber> 2" icon="last_page" color="grey-8" round dense flat :disable="videos.isLastPage" @click="videos.lastPage"/> -->
    </q-table>
    <q-dialog v-model="dialog" persistent :maximized="maximizedToggle" transition-show="slide-up" transition-hide="slide-down">
      <q-card class="bg-primary text-white">
        <q-bar><q-space/>
          <q-btn dense flat icon="minimize" @click="maximizedToggle = false" :disable="!maximizedToggle"><q-tooltip v-if="maximizedToggle" content-class="bg-white text-primary">Minimize</q-tooltip></q-btn>
          <q-btn dense flat icon="crop_square" @click="maximizedToggle = true" :disable="maximizedToggle"><q-tooltip v-if="!maximizedToggle" content-class="bg-white text-primary">Maximize</q-tooltip></q-btn>
          <q-btn dense flat icon="close" v-close-popup><q-tooltip content-class="bg-white text-primary">Close</q-tooltip></q-btn>
        </q-bar>
        <q-card-section><div class="text-h6 text-center">{{this.video_name}} | Class {{this.video_class}} | Subject {{this.video_sub}}</div></q-card-section>
        <q-card-section><q-video :src="'https://www.youtube.com/embed/'+ this.url" :ratio="16/6"/></q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'videos',
  computed: {
    ...mapGetters(['videos', 'filterVideos', 'activeClasses', 'activeSubjects']),
  },
  data() {
    return {
      datax: [],
      title: '',
      classx: '',
      subject: '',
      video_sub: '',
      video_class: '',
      video_name: '',
      url: '',
      dialog: false,
      maximizedToggle: true,
      // pagination: {
      //   sortBy: 'desc',
      //   descending: false,
      //   page: 2,
      //   rowsPerPage: 3,
      // },
      columns: [
        {
          name: 'id', label: 'Sl No.', align: 'left', field: 'id',
        },
        {
          name: 'type', label: 'Type', align: 'left', field: 'type', sortable: true,
        },
        {
          name: 'video_class', label: 'Class', align: 'left', field: 'video_class', sortable: true,
        },
        {
          name: 'video_sub', label: 'Subject', align: 'left', field: 'video_sub', sortable: true,
        },
        {
          name: 'video_name', label: 'Name', align: 'left', field: 'video_name', sortable: true,
        },
      ],
    };
  },
  methods: {
    ...mapActions(['videos', 'activeClasses']),
    videoDialog(data) {
      this.video_sub = data.video_sub;
      this.video_class = data.video_class;
      this.video_name = data.video_name;
      this.url = data.url;
      this.dialog = true;
    },
    resetData() {
      this.video_sub = '';
      this.video_class = '';
      this.video_name = '';
      this.url = '';
      this.dialog = false;
    },
    classSelected(classx) {
      this.$store.dispatch('subjects', classx);
      this.subject = '';
    },
    subSelected(sub) {
      const data = {
        subject: sub,
        classx: this.classx,
      };
      this.$store.dispatch('filterBySubject', data);
    },
  },
  created() {
    const id = { id: this.$route.params.id };
    if (this.$route.params.id === 'All') {
      this.title = 'Video Tutorials';
    } else {
      this.title = `Video Tutorials for class ${this.$route.params.id}`;
      this.classx = this.$route.params.id;
    }
    this.$store.dispatch('videos', id);
  },
};
</script>

<style lang="sass" scoped>
</style>
