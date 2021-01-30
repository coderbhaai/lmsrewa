<template>
    <div>
        <div v-if="user.role=='Admin'">
            <q-list class="rounded-borders">
              <q-item clickable tag="a" href="/admin/basics">
                <q-item-section avatar><q-icon name="schedule" /></q-item-section>
                <q-item-section><q-item-label>Basics</q-item-label></q-item-section>
              </q-item>
                <q-expansion-item expand-separator icon="mail" label="Blogs" caption="Add &amp; Update Blogs" default-closed >
                    <q-item clickable tag="a" href="/admin/addBlog">
                        <q-item-section avatar><q-icon name="schedule" /></q-item-section>
                        <q-item-section><q-item-label>Add Blog</q-item-label></q-item-section>
                    </q-item>
                    <q-item clickable tag="a" href="/admin/blogs">
                        <q-item-section avatar><q-icon name="schedule" /></q-item-section>
                        <q-item-section><q-item-label>Blog Lists</q-item-label></q-item-section>
                    </q-item>
                    <q-item clickable tag="a" href="/admin/blogMeta">
                        <q-item-section avatar><q-icon name="schedule" /></q-item-section>
                        <q-item-section><q-item-label>Blog Meta</q-item-label></q-item-section>
                    </q-item>
                </q-expansion-item>
            </q-list>
            <q-item clickable tag="a" href="/admin/videos">
              <q-item-section avatar><q-icon name="schedule" /></q-item-section>
              <q-item-section><q-item-label>Videos</q-item-label></q-item-section>
            </q-item>
            <q-item clickable tag="a" href="/admin/meta">
              <q-item-section avatar><q-icon name="schedule" /></q-item-section>
              <q-item-section><q-item-label>Meta Tags</q-item-label></q-item-section>
            </q-item>
            <q-item clickable tag="a" href="/auth/logOut">
                <q-item-section avatar><q-icon name="schedule" /></q-item-section>
                <q-item-section><q-item-label>Log Out</q-item-label></q-item-section>
              </q-item>
        </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'leftSidebar',
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
