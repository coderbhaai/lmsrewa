<template>
  <div class="q-pa-md blogs">
    <h1 class="heading">Interesting Reads for You</h1>
    <div class="container">
        <div class="row">
          <div class="col-4 q-pa-sm q-mb-lg text-center" v-for='i in blogs' :key='i.id' >
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

export default {
  name: 'blog',
  methods: {
    ...mapActions(['blogs']),
  },
  computed: {
    ...mapGetters(['blogs']),
  },
  created() {
    this.$store.dispatch('blogs');
  },
};
</script>

<style lang="sass" scoped>
  .blogs> h1
    text-align: center
</style>
