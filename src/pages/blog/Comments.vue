<template>
  <div class="q-pa-md blogs">
    <div class="container">
        <h2 class="heading">Share your views</h2>
        <p>Please keep your views respectful and not include any anchors, promotional content or obscene words in them. Such comments will be definitely removed and your IP be blocked for future purpose.</p>
        <div class="row">
            <div class="col-12">
                <q-card class="my-card">
                    <q-card-section>
                        <q-form class="q-gutter-md q-mb-lg" @submit="addSubmit">
                            <div class="row" v-if="!this.user">
                                <div class="col-6 q-pr-lg"><q-input v-model="name" label="Name" lazy-rules /></div>
                                <div class="col-6 q-pr-lg"><q-input v-model="email" label="Email" lazy-rules /></div>
                            </div>
                            <div class="row">
                                <div class="col-12 q-pr-lg"><q-input v-model="comment" label="Comment" type="textarea" lazy-rules /></div>
                            </div>
                            <div class="text-center"><q-btn label="Submit" type="submit" color="primary" class="q-mr-lg" /></div>
                        </q-form>
                    </q-card-section>
                </q-card>
            </div>
            <div class="col-12 text-center q-mt-xl"><h2 class="heading">Some love showed by users </h2></div>
            <div class="col-12 q-mt-lg" v-for='i in comments' :key='i.id'>
                <q-card class="my-card commentBox"><q-card-section>
                    <span v-html="i.comment"></span>
                    <div class="row user">
                        <h4><strong>{{i.user}}</strong></h4>
                        <p>{{i.updated_at}}</p>
                    </div>
                    <div class="col-12" v-for='j in response' :key='j.id'>
                        <div v-if="i.id === j.commentId" class="response q-my-sm">
                            <p v-html="j.comment"></p>
                            <div class="row user">
                                <h4><strong>{{j.user}}</strong></h4>
                                <span>{{j.updated_at}}</span>
                            </div>
                        </div>
                    </div>
                    <div class="text-right"><q-btn label="Reply" color="primary" @click="changeComment(i.id)"/></div>
                    <div v-if="i.id === commentId">
                        <q-form class="q-gutter-md q-mb-lg" @submit="replyComment">
                            <div class="row" v-if="!user">
                              <div class="col-6 q-pr-lg"><q-input v-model="name" label="Name" lazy-rules /></div>
                              <div class="col-6 q-pr-lg"><q-input v-model="email" label="Email" lazy-rules /></div>
                            </div>
                            <div class="row">
                              <div class="col-12 q-pr-lg"><q-input v-model="newComment" label="Comment" type="textarea" lazy-rules /></div>
                            </div>
                            <q-card-actions>
                              <q-btn color="primary" label="Submit Your Views" type="submit"/>
                              <q-space />
                              <q-btn color="primary" label="No Comments" @click="resetData"/>
                            </q-card-actions>
                        </q-form>
                    </div>
                </q-card-section></q-card>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'blog',
  props: ['comments', 'response', 'blogId'],
  data() {
    return {
      name: '',
      email: '',
      comment: '',
      newComment: '',
      commentId: 0,
      order: 0,
    };
  },
  methods: {
    ...mapActions(['user']),
    addSubmit(e) {
      e.preventDefault();
      const data = {
        name: this.user.name || this.name,
        email: this.user.email || this.email,
        comment: this.comment,
        commentId: this.commentId,
        order: this.order,
        blogId: this.blogId,
      };
      this.$store.dispatch('addComment', data);
      this.resetData();
    },
    changeComment(id) {
      this.commentId = id;
      this.order = 1;
    },
    replyComment(e) {
      e.preventDefault();
      const data = {
        name: this.user.name || this.name,
        email: this.user.email || this.email,
        comment: this.newComment,
        commentId: this.commentId,
        order: this.order,
        blogId: this.blogId,
      };
      this.$store.dispatch('addComment', data);
      this.resetData();
    },
    resetData() {
      this.name = '';
      this.email = '';
      this.comment = '';
      this.commentId = 0;
      this.order = 0;
    },
  },
  computed: {
    ...mapGetters(['user']),
  },
};
</script>

<style lang="sass" scoped>
  .user
    align-items: center
    justify-content: space-between
    p
        margin:0
  .response
    margin-left: 3em
    border-left: 5px solid red
    padding-left: 1em
    p
      margin:0
</style>
