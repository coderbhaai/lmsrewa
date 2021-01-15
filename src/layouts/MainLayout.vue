<template>
  <!-- <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn flat dense round icon="menu" aria-label="Menu" @click="leftDrawerOpen = !leftDrawerOpen" />
        <q-toolbar-title><a href="/" class="logo">LMS Rewa</a></q-toolbar-title>
        <div v-if="user"><p class="logOut text-white">{{user.name}}</p></div>
        <div v-else><a href="/register" class="text-white">Register</a> / <a href="/login" class="text-white">Login</a></div>
        <q-btn flat round dense icon="more_vert">
          <q-menu>
            <q-list dense style="min-width: 100px">
              <q-item clickable v-close-popup><q-item-section>New</q-item-section></q-item>
              <q-separator />
              <q-item clickable>
                <q-item-section>Preferences</q-item-section>
                <q-item-section side><q-icon name="keyboard_arrow_right" /></q-item-section>
                <q-menu anchor="top end" self="top start">
                  <q-list>
                    <q-item v-for="n in 3" :key="n" dense clickable>
                      <q-item-section>Submenu Label</q-item-section>
                      <q-item-section side>
                        <q-icon name="keyboard_arrow_right" />
                      </q-item-section>
                      <q-menu auto-close anchor="top end" self="top start">
                        <q-list>
                          <q-item v-for="n in 3" :key="n" dense clickable>
                            <q-item-section>3rd level Label</q-item-section>
                          </q-item>
                        </q-list>
                      </q-menu>
                    </q-item>
                  </q-list>
                </q-menu>
              </q-item>
              <q-separator/>
              <q-item clickable v-close-popup v-on:click="logout"><q-item-section>Log Out </q-item-section></q-item>
            </q-list>
          </q-menu>
        </q-btn>
      </q-toolbar>
    </q-header>
    <q-drawer v-model="leftDrawerOpen" show-if-above bordered content-class="bg-grey-1">
      <q-list>
        <q-item-label header class="user">{{user.name}}</q-item-label>
        <div v-if="user.role=='Admin'">
          <EssentialLink v-for="link in adminLinks" :key="link.title" v-bind="link"/>
        </div>
        <div v-else-if="user.role=='School'">
          <EssentialLink v-for="link in schoolLinks" :key="link.title" v-bind="link"/>
        </div>
        <div v-else>
          <EssentialLink v-for="link in essentialLinks" :key="link.title" v-bind="link"/>
        </div>
        <q-item-label header class="amitkk">A Product of <a href="#">AmitKK</a></q-item-label>
      </q-list>
    </q-drawer>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout> -->
  <q-layout view="hHh lpR fFf">
    <q-header elevated class="bg-primary text-white" height-hint="98">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="left = !left" />
        <q-toolbar-title>
          STUDY SPECTRUM
            <!-- <img src="/images/logo.png"> -->
          <!-- <q-avatar>
            <img src="https://cdn.quasar.dev/logo/svg/quasar-logo.svg">
          </q-avatar>
          Title -->
        </q-toolbar-title>
        <q-btn dense flat round icon="menu" @click="right = !right" />
      </q-toolbar>
      <q-tabs align="left">
        <q-route-tab to="/page1" label="Page One" />
        <q-route-tab to="/page2" label="Page Two" />
        <q-route-tab to="/page3" label="Page Three" />
      </q-tabs>
    </q-header>
    <q-drawer show-if-above v-model="left" side="left" bordered>
      <LeftSidebar/>
      <!-- <div v-if="user.role=='Admin'">
        <EssentialLink v-for="link in adminLinks" :key="link.title" v-bind="link"/>
      </div>
      <div v-else-if="user.role=='School'">
        <EssentialLink v-for="link in schoolLinks" :key="link.title" v-bind="link"/>
      </div>
      <div v-else>
        <EssentialLink v-for="link in essentialLinks" :key="link.title" v-bind="link"/>
      </div> -->
    </q-drawer>
    <q-drawer show-if-above v-model="right" side="right" bordered>
      <RightSidebar/>
      <!-- <div v-if="user.role=='Admin'">
        <EssentialLink v-for="link in adminLinks" :key="link.title" v-bind="link"/>
      </div>
      <div v-else-if="user.role=='School'">
        <EssentialLink v-for="link in schoolLinks" :key="link.title" v-bind="link"/>
      </div>
      <div v-else>
        <EssentialLink v-for="link in essentialLinks" :key="link.title" v-bind="link"/>
      </div> -->
    </q-drawer>
    <q-page-container>
      <router-view />
    </q-page-container>
    <q-footer elevated class="bg-grey-8 text-white">
      <q-toolbar>
        <q-toolbar-title>
          <!-- <img src="/images/logo.png"> -->
          STUDY SPECTRUM
          <!-- <q-avatar>
            <img src="https://cdn.quasar.dev/logo/svg/quasar-logo.svg">
          </q-avatar>
          Title -->
        </q-toolbar-title>
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>
<script>
// import EssentialLink from 'components/EssentialLink.vue';
import LeftSidebar from 'components/LeftSidebar.vue';
import RightSidebar from 'components/RightSidebar.vue';
import { mapState, mapActions } from 'vuex';

// const user = [
//   {
//     title: 'Blogs',
//     caption: 'Read Interesting Blogs here',
//     icon: 'school',
//     link: '/blog',
//   },
//   {
//     title: 'Github',
//     caption: 'github.com/quasarframework',
//     icon: 'code',
//     link: 'https://github.com/quasarframework',
//   },
//   {
//     title: 'Discord Chat Channel',
//     caption: 'chat.quasar.dev',
//     icon: 'chat',
//     link: 'https://chat.quasar.dev',
//   },
//   {
//     title: 'Forum',
//     caption: 'forum.quasar.dev',
//     icon: 'record_voice_over',
//     link: 'https://forum.quasar.dev',
//   },
//   {
//     title: 'Twitter',
//     caption: '@quasarframework',
//     icon: 'rss_feed',
//     link: 'https://twitter.quasar.dev',
//   },
//   {
//     title: 'Facebook',
//     caption: '@QuasarFramework',
//     icon: 'public',
//     link: 'https://facebook.quasar.dev',
//   },
//   {
//     title: 'Quasar Awesome',
//     caption: 'Community Quasar projects',
//     icon: 'favorite',
//     link: 'https://awesome.quasar.dev',
//   },
// ];

// const admin = [
//   {
//     title: 'Admin',
//     caption: 'Read Interesting Blogs here',
//     icon: 'school',
//     link: '/blog',
//   },
//   {
//     title: 'Github',
//     caption: 'github.com/quasarframework',
//     icon: 'code',
//     link: 'https://github.com/quasarframework',
//   },
// ];

// const school = [
//   {
//     title: 'Blogs',
//     caption: 'Read Interesting Blogs here',
//     icon: 'school',
//     link: '/blog',
//   },
//   {
//     title: 'Github',
//     caption: 'github.com/quasarframework',
//     icon: 'code',
//     link: 'https://github.com/quasarframework',
//   },
// ];

export default {
  name: 'MainLayout',
  // components: { EssentialLink },
  components: { LeftSidebar, RightSidebar },
  data() {
    return {
      leftDrawerOpen: false,
      // essentialLinks: user,
      // adminLinks: admin,
      // schoolLinks: school,
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
  .logOut
    margin: 0
  .logOut:hover
    cursor: pointer
  .amitkk, .user
    text-align: center
    width: 100%
    background: var(--q-color-primary)
    color: #fff
  .amitkk a
    color: #fff
  .amitkk
    position: absolute
    bottom: 0
</style>
