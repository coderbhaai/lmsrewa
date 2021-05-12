<template>
  <div class="q-pa-md">
    <h1 class="heading">Update Blog Here {{ $route.params.id }}</h1>
    <q-form class="q-gutter-md" @submit="onSubmit">
      <div class="row q-pb-lg">
        <div class="col-4 q-pr-lg"><q-input v-model="title" label="Blog Title" :rules="[...rules.required]"/></div>
        <div class="col-4 q-pr-lg"><q-input v-model="url" label="Blog URL" :rules="[...rules.required]"/></div>
        <div class="col-4 previewImg">
          <q-file v-model="image" label="Blog Image" :rules="[...rules.required]"/>
          <img :src="'/images/blog/'+ oldImage" class="q-mt-sm"/>
        </div>
      </div>
      <div class="row q-pb-lg">
        <div class="col-12">
          <q-editor
            v-model="qeditor"
            :dense="$q.screen.lt.md"
            :toolbar="[
              [
                {
                  label: $q.lang.editor.align,
                  icon: $q.iconSet.editor.align,
                  fixedLabel: true,
                  list: 'only-icons',
                  options: ['left', 'center', 'right', 'justify']
                },
                {
                  label: $q.lang.editor.align,
                  icon: $q.iconSet.editor.align,
                  fixedLabel: true,
                  options: ['left', 'center', 'right', 'justify']
                }
              ],
              ['bold', 'italic', 'strike', 'underline', 'subscript', 'superscript'],
              ['token', 'hr', 'link', 'custom_btn'],
              ['print', 'fullscreen'],
              [
                {
                  label: $q.lang.editor.formatting,
                  icon: $q.iconSet.editor.formatting,
                  list: 'no-icons',
                  options: [
                    'p',
                    'h1',
                    'h2',
                    'h3',
                    'h4',
                    'h5',
                    'h6',
                    'code'
                  ]
                },
                {
                  label: $q.lang.editor.fontSize,
                  icon: $q.iconSet.editor.fontSize,
                  fixedLabel: true,
                  fixedIcon: true,
                  list: 'no-icons',
                  options: [
                    'size-1',
                    'size-2',
                    'size-3',
                    'size-4',
                    'size-5',
                    'size-6',
                    'size-7'
                  ]
                },
                {
                  label: $q.lang.editor.defaultFont,
                  icon: $q.iconSet.editor.font,
                  fixedIcon: true,
                  list: 'no-icons',
                  options: [
                    'default_font',
                    'arial',
                    'arial_black',
                    'comic_sans',
                    'courier_new',
                    'impact',
                    'lucida_grande',
                    'times_new_roman',
                    'verdana'
                  ]
                },
                'removeFormat'
              ],
              ['quote', 'unordered', 'ordered', 'outdent', 'indent'],

              ['undo', 'redo'],
              ['viewsource']
            ]"
            :fonts="{
              arial: 'Arial',
              arial_black: 'Arial Black',
              comic_sans: 'Comic Sans MS',
              courier_new: 'Courier New',
              impact: 'Impact',
              lucida_grande: 'Lucida Grande',
              times_new_roman: 'Times New Roman',
              verdana: 'Verdana'
            }"
          />
        </div>
      </div>
      <div class="row q-pb-lg">
        <div class="col-6 q-pr-sm"><q-select filled map-options emit-value v-model="catSelected" multiple :options="catOptions" option-value="value" option-label="text" counter label="Select Category" :rules="[...rules.required]"/></div>
        <div class="col-6 q-pr-sm"><q-select filled map-options emit-value v-model="tagSelected" multiple :options="tagOptions" option-value="value" option-label="text" counter label="Select Tag" :rules="[...rules.required]"/></div>
      </div>
      <div><q-btn label="Update Blog" type="submit" color="primary"/></div>
    </q-form>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import axios from 'axios';
import api from '../../store/api';
import {rules} from '../../store/functions'

export default {
  name: 'UpdateBlog',
  data() {
    return {
      rules : rules,
      id: '',
      title: '',
      url: '',
      image: '',
      qeditor: '',
      tagSelected: [],
      catSelected: [],
      oldImage: '',
      mediaId: '',
    };
  },
  methods: {
    ...mapActions(['tagOptions', 'catOptions']),
    onSubmit(e) {
      e.preventDefault();
      const data = new FormData();
      data.append('id', this.id);
      data.append('file', this.image);
      data.append('title', this.title);
      data.append('url', this.url.replace(/ /g, '-'));
      data.append('content', this.qeditor);
      data.append('tag', JSON.stringify(this.tagSelected));
      data.append('category', JSON.stringify(this.catSelected));
      data.append('oldImage', this.oldImage);
      data.append('mediaId', this.mediaId);
      this.$store.dispatch('updateBlog', data);
    },
  },
  computed: {
    ...mapGetters(['tagOptions', 'catOptions']),
  },
  created() {
    this.$store.dispatch('blogMetaOptions');
  },
  mounted() {
    axios.get(api.getBlog + this.$route.params.id)
      .then(
        (res) => {
          this.id = res.data.data.id;
          this.title = res.data.data.title;
          this.url = res.data.data.url;
          this.tagSelected = JSON.parse(res.data.data.tag);
          this.catSelected = JSON.parse(res.data.data.category);
          this.qeditor = res.data.data.content;
          this.oldImage = res.data.data.image;
          this.mediaId = res.data.data.mediaId;
        },
      );
  },
};
</script>

<style lang="sass" scoped>
</style>
