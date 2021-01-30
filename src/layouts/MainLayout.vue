<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated class="bg-primary text-white" height-hint="98">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="left = !left" />
        <q-toolbar-title><a href="/" class="logo"><q-avatar><img src="/images/icons/studyspectrum-logo.png"></q-avatar> STUDY SPECTRUM</a></q-toolbar-title>
        <q-btn dense flat round icon="menu" @click="right = !right" />
      </q-toolbar>
      <q-tabs align="left">
        <q-route-tab to="/" label="Home" />
        <q-route-tab to="/blog" label="Blog" />
        <q-route-tab to="/video-tutorials/All" label="Video Tutorials" />
        <div v-if="user" class="row">
          <!-- <q-route-tab to="/blog" label="Blog" /> -->
        </div>
        <div v-else class="row">
          <q-route-tab to="/register" label="Register"/>
          <q-route-tab to="/login" label="Login"/>
        </div>
      </q-tabs>
    </q-header>
    <q-drawer show-if-above v-model="left" side="left" bordered><LeftSidebar/></q-drawer>
    <q-drawer show-if-above v-model="right" side="right" bordered><RightSidebar/></q-drawer>
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
import { mapState, mapActions } from 'vuex';

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
    ...mapActions('session', ['fetchUser']),
    logout() {
      this.$store.dispatch('session/logout');
      this.$router.push({ name: 'login' });
    },
  },
  computed: {
    ...mapState('session', ['user']),
  },
};
</script>

<style lang="sass" scoped>
  .logo
    color: #fff
</style>
