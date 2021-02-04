<template>
  <div class="blogs" v-if="loading" >
    <img :src="'images/blog/'+ this.data.image"/>
    <h1 class="heading">{{this.data.title}}</h1>
    <div class="container">
        <div class="row q-mb-xl">
          <div class="col-12">
            {{this.data.content}}
          </div>
        </div>
        <h2 class="heading">Some More Reads</h2>
        <div class="row">
            <div class="col-4 q-pa-sm q-mb-lg text-center" v-for='i in suggestBlogs' :key='i.id' >
            <a :href="'/blog/' + i.url">
                <q-card class="my-card q-pa-sm" flat bordered>
                    <q-img :src="'images/blog/'+ i.image"/>
                    <h3>{{i.title}}</h3>
                    <q-btn color="primary" glossy label="Read More"/>
                </q-card>
            </a>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import axios from 'axios';
import api from '../../store/api';

export default {
  name: 'blog',
  data() {
    return {
      loading: true,
      data: [],
      blogs: [],
      category: [],
      tags: [],
      suggest: [],
    };
  },
  methods: {
    ...mapActions(['suggestBlogs']),
  },
  computed: {
    ...mapGetters(['suggestBlogs']),
  },
  created() {
    this.$store.dispatch('suggestBlogs');
  },
  mounted() {
    axios.get(api.singleBlog + this.$route.params.url)
      .then(
        (res) => {
          this.data = res.data.data;
          this.loading = true;
        },
      );
  },
};
</script>

<style lang="sass" scoped>
</style>
