<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated class="bg-primary text-white" height-hint="98">
      <q-toolbar>
        <div v-if="user">
          <div v-if="user.role=='SS' || user.role=='Admin' || user.role=='Owner'"><q-btn dense flat round icon="menu" @click="left = !left"/></div>
        </div>
        <q-toolbar-title><a href="/" class="logo"><q-avatar><img src="/images/icons/studyspectrum-logo.png"></q-avatar> STUDY SPECTRUM</a></q-toolbar-title>
        <div v-if="user">
          <div v-if="user.role=='Admin' || user.role=='Owner'"><q-btn dense flat round icon="menu" @click="right = !right" /></div>
        </div>
      </q-toolbar>
      <q-tabs align="left">
        <q-route-tab to="/" label="Home" />
        <div v-if="user" class="row">
          <q-route-tab to="/admin/basics" label="Admin Panel" />
        </div>
        <div v-else class="row">
          <q-route-tab to="/register" label="Register"/>
          <q-route-tab to="/login" label="Login"/>
        </div>
        <q-route-tab to="/blog" label="Blog" />
        <q-route-tab to="/video-tutorials/All" label="Video Tutorials" />
      </q-tabs>
    </q-header>
    <div v-if="user">
      <div v-if="user.role=='SS' || user.role=='Admin' || user.role=='Owner'">
        <q-drawer v-model="left" side="left" bordered><LeftSidebar/></q-drawer>
        <q-drawer v-model="right" side="right" bordered><RightSidebar/></q-drawer>
      </div>
    </div>
    <q-page-container>
      <router-view />
    </q-page-container>
    <q-footer elevated class="bg-grey-8 text-white">
      <q-toolbar>
        <q-toolbar-title><a href="/" class="logo"><q-avatar><img src="/images/icons/studyspectrum-logo.png"></q-avatar> STUDY SPECTRUM</a></q-toolbar-title>
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>
<script>
import LeftSidebar from 'components/LeftSidebar.vue';
import RightSidebar from 'components/RightSidebar.vue';
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'MainLayout',
  components: { LeftSidebar, RightSidebar },
  data() {
    return {
      leftDrawerOpen: false,
      left: false,
      right: false,
    };
  },
  methods: {
    ...mapActions(['user']),
    logout() {
      this.$store.dispatch('logout');
      this.$router.push({ name: 'login' });
    },
  },
  computed: {
    ...mapGetters(['user']),
  },
};
</script>

<style lang="sass" scoped>
  .logo
    color: #fff
</style>
