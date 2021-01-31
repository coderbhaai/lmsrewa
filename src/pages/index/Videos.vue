<template>
  <div class="q-pa-md videos">
    <h1 class="heading">{{this.title}}</h1>
    <div class="container">
        <div class="row">
          <div class="col-3 q-pr-lg"><q-select emit-value v-model="classx" :options="activeClasses" label="Class" option-label="video_class" option-value="video_class" lazy-rules required/></div>
          <div class="col-3 q-pr-lg"><q-select emit-value v-model="limit" :options="optionsLimit" label="Show" lazy-rules required/></div>
        </div>
        <div class="row">
            <div class="col-4 q-pa-sm q-mb-lg text-center" v-for='(i,index) in videos' :key='i.id' >
              <q-card class="my-card" v-if="index < limit">
                <q-video :src="'https://www.youtube.com/embed/'+ i.url" />
                <q-card-section>
                  <h3 class="oneLine">{{i.video_name}}</h3>
                  <div class="oneLine text-subtitle2">Class : {{i.video_class}} | Subject : {{i.video_sub}}</div>
                </q-card-section>
              </q-card>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'videos',
  data() {
    return {
      title: '',
      classx: '',
      limit: 3,
      optionsLimit: [
        3, 6, 9, 15, 30,
      ],
      filter: '',
    };
  },
  methods: {
    ...mapActions('session', ['videos', 'activeClasses']),
    fetchVideos() {
      console.log('Fetching');
    },
  },
  computed: {
    ...mapState('session', ['videos', 'activeClasses']),
  },
  created() {
    console.log('1');
    const id = { id: this.$route.params.id };
    if (this.$route.params.id === 'All') {
      console.log('All', this.$route.params.id);
      this.title = 'Video Tutorials';
    } else {
      console.log('Class', this.$route.params.id);
      this.title = `Video Tutorials for class ${this.$route.params.id}`;
    }
    this.$store.dispatch('session/videos', id);
    this.fetchVideos(this.$route.params.id);
  },
  mounted() {
    this.fetchVideos(this.$route.params.id);
  },
};
</script>

<style lang="sass" scoped>
  .videos h3
    font-size: 15px
    text-align: center
    margin-top: 0
</style>
