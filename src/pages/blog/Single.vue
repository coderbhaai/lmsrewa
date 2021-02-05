<template>
  <div class="blogs">
    <img :src="'images/blog/'+ singleBlog.image"/>
    <h1 class="heading">{{singleBlog.title}}</h1>
    <div class="container">
        <div class="row q-mb-xl">
          <div class="col-12">
            {{singleBlog.content}}
          </div>
        </div>
        <comments v-bind:comments="comments" v-bind:response="response" v-bind:blogId="singleBlog.id"/>
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
import Comments from './Comments.vue';
// import axios from 'axios';
// import api from '../../store/api';

export default {
  components: { Comments },
  name: 'blog',
  data() {
    return {
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
    ...mapGetters(['singleBlog', 'blogList', 'comments', 'response', 'catList', 'tagList', 'suggestBlogs']),
  },
  created() {
    // this.$store.dispatch('suggestBlogs');
    const form = {
      url: this.$route.params.url,
    };
    this.$store.dispatch('singleBlog', form);
  },
  // mounted() {
  //   axios.get(api.singleBlog + this.$route.params.url)
  //     .then(
  //       (res) => {
  //         this.data = res.data.data;
  //       },
  //     );
  // },
};
</script>

<style lang="sass" scoped>
</style>
