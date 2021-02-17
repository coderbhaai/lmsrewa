<template>
  <div class="q-pa-md">
    <h1 class="heading">Add Question Here</h1>
    <q-form class="q-gutter-md" @submit="onSubmit">
      <div class="row q-pb-lg">
        <div class="col-4 q-pr-lg q-mb-lg"><q-select filled map-options emit-value multiple v-model="board" :options="boardOptions" option-value="id" option-label="name" label="Select Boards" required/></div>
        <div class="col-4 q-pr-lg q-mb-lg"><q-select emit-value map-options v-model="classes" :options="classOptions" option-value="id" option-label="name" label="Class" lazy-rules required @input="classSelected()"/></div>
        <div class="col-4 q-pr-lg q-mb-lg"><q-select emit-value map-options v-model="subject" :options="basicSubjectFilter" option-value="id" option-label="name" label="Subject" lazy-rules required @input="subjectSelected()"/></div>
        <div class="col-4 q-pr-lg q-mb-lg"><q-select emit-value map-options v-model="topic" :options="basicTopicFilter" option-value="id" option-label="name" label="Topic" lazy-rules required @input="topicSelected()"/></div>
        <div class="col-4 q-pr-lg q-mb-lg"><q-select emit-value map-options v-model="subtopic" :options="basicSubTopicFilter" option-value="id" option-label="name" label="SubTopic" lazy-rules required/></div>
        <div class="col-4 q-pr-lg q-mb-lg"><q-select emit-value map-options v-model="difficulty" :options="difficultyOptions" option-value="id" option-label="name" label="Difficulty" lazy-rules required/></div>
        <div class="col-4 q-pr-lg q-mb-lg"><q-select emit-value map-options v-model="type" :options="typeOptions" option-value="id" option-label="name" label="Type" lazy-rules required @input="typeSelected()"/></div>
        <div class="col-4 q-pr-lg q-mb-lg"><q-input v-model="marks" label="Marks" lazy-rules required/></div>
        <div class="col-4 q-pr-lg q-mb-lg" v-if="this.type=='33'"><q-input v-model="answer" label="Answer" lazy-rules required/></div>
        <div class="col-12 q-pr-lg q-mb-lg"><q-input v-model="source" label="Source" lazy-rules required/></div>
      </div>
      <div class="row q-pb-lg">
        <div class="col-12">
          <label>Question</label>
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
                  options: [ 'p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'code' ]
                },
                {
                  label: $q.lang.editor.fontSize,
                  icon: $q.iconSet.editor.fontSize,
                  fixedLabel: true,
                  fixedIcon: true,
                  list: 'no-icons',
                  options: [ 'size-1', 'size-2', 'size-3', 'size-4', 'size-5', 'size-6', 'size-7' ]
                },
                {
                  label: $q.lang.editor.defaultFont,
                  icon: $q.iconSet.editor.font,
                  fixedIcon: true,
                  list: 'no-icons',
                  options: [ 'default_font', 'arial', 'arial_black', 'comic_sans', 'courier_new', 'impact', 'lucida_grande', 'times_new_roman', 'verdana' ]
                },
                'removeFormat'
              ],
              ['quote', 'unordered', 'ordered', 'outdent', 'indent'],

              ['undo', 'redo'],
              ['viewsource']
            ]"
            :fonts="{ arial: 'Arial', arial_black: 'Arial Black', comic_sans: 'Comic Sans MS', courier_new: 'Courier New', impact: 'Impact', lucida_grande: 'Lucida Grande', times_new_roman: 'Times New Roman', verdana: 'Verdana' }"
          />
        </div>
      </div>
      <div class="row q-pb-lg">
        <div v-if="type=='33'" v-for="(i, index) in options" :key="index" class="col-6 row">
          <div class="row q-pr-sm q-py-lg">
            <label>Option {{index +1}}</label>
            <q-editor
              v-model="options[index]"
              :dense="$q.screen.lt.md"
              :toolbar="[
                [
                  { label: $q.lang.editor.align, icon: $q.iconSet.editor.align, fixedLabel: true, list: 'only-icons', options: ['left', 'center', 'right', 'justify'] },
                  { label: $q.lang.editor.align, icon: $q.iconSet.editor.align, fixedLabel: true, options: ['left', 'center', 'right', 'justify'] }
                ],
                ['bold', 'italic', 'strike', 'underline', 'subscript', 'superscript'],
                ['token', 'hr', 'link', 'custom_btn'],
                ['print', 'fullscreen'],
                [
                  { label: $q.lang.editor.formatting, icon: $q.iconSet.editor.formatting, list: 'no-icons', options: [ 'p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'code' ] },
                  { label: $q.lang.editor.fontSize, icon: $q.iconSet.editor.fontSize, fixedLabel: true, fixedIcon: true, list: 'no-icons', options: [ 'size-1', 'size-2', 'size-3', 'size-4', 'size-5', 'size-6', 'size-7' ] },
                  { label: $q.lang.editor.defaultFont, icon: $q.iconSet.editor.font, fixedIcon: true, list: 'no-icons', options: [ 'default_font', 'arial', 'arial_black', 'comic_sans', 'courier_new', 'impact', 'lucida_grande', 'times_new_roman', 'verdana' ] },
                  'removeFormat'
                ],
                ['quote', 'unordered', 'ordered', 'outdent', 'indent'],
                ['undo', 'redo'],
                ['viewsource']
              ]"
              :fonts="{ arial: 'Arial', arial_black: 'Arial Black', comic_sans: 'Comic Sans MS', courier_new: 'Courier New', impact: 'Impact', lucida_grande: 'Lucida Grande', times_new_roman: 'Times New Roman', verdana: 'Verdana' }"
            />
            <span class="material-icons" @click="deleteOption(index)" style="color:red">delete</span>
          </div>
        </div>
        
        <q-btn @click="addOptions()" class="addOption q-my-sm" rounded glossy color="primary" v-if="this.type == 33">Add Options</q-btn>
      </div>
      <div class="text-center"><q-btn label="Add Question" type="submit" color="primary"/></div>
    </q-form>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { message } from '../../store/functions';

export default {
  name: 'AdminBlogs',
  data() {
    return {
      board:    null,
      classes:    '',
      subject:  '',
      topic:    '',
      subtopic: '',
      difficulty: '',
      type: '',
      marks: '',
      source: '',
      question: '',
      answer: '',
      options: ['', ''],
      qeditor: '',
    };
  },
  methods: {
    ...mapActions(['user', 'boardOptions']),
    onSubmit(e) {
      e.preventDefault();
      if(this.user.role=='SS'){
        var owner = 'SS'
      }else{
        var owner = this.user.id
      }
      const data={
        'board': JSON.stringify(this.board),
        'classes' : this.classes,
        'subject':  this.subject,
        'topic':    this.topic,
        'subtopic': this.subtopic,
        'difficulty': this.difficulty,
        'type': this.type,
        'marks': this.marks,
        'source': this.source,
        'status': 1,
        'owner': owner,
        'question': this.qeditor,
        'question': this.qeditor,
      }
      if(this.type==33){
        data['answer'] = this.answer,
        data['options'] = JSON.stringify(this.options)
      }
      
      this.$store.dispatch('addQuestion', data);
    },
    classSelected() {
      this.subject = ''
      this.topic = ''
      this.subtopic = ''
      const data={
        classSelected: this.classes
      }
      this.$store.dispatch('basicClassSelected', data);
    },
    subjectSelected() {
      this.topic = ''
      this.subtopic = ''
      const data={
        classSelected: this.classes,
        subjectSelected: this.subject
      }
      this.$store.dispatch('basicSubjectSelected', data);
    },
    topicSelected() {
      this.subtopic = ''
      const data={
        classSelected: this.classes,
        subjectSelected: this.subject,
        topicSelected: this.topic,
      }
      this.$store.dispatch('basicTopicSelected', data);
    },
    typeSelected() {
      this.options = ['', '']
    },
    addOptions() { if(this.type== '33'){ this.options.push('') }else{ message("Please check Question Type"); } },
    deleteOption(index) { if(this.options.length>2){this.options.splice(index, 1) }else { message("Minimum 02 options required for MCQ");} }
  },
  computed: {
    ...mapGetters(['user', 'boardOptions','classOptions', 'topicOptions', 'basicSubjectFilter', 'basicTopicFilter', 'basicSubTopicFilter', 'difficultyOptions', 'typeOptions']),
  },
  created() {
    this.$store.dispatch('questionOptions');
  },
};
</script>

<style lang="sass" scoped>
  .addOption
    max-height: 40px
    margin: auto
</style>
