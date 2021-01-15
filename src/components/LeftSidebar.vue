<template>
    <div>
        <div v-if="user.role=='Admin'">
            <q-list class="rounded-borders">
                <q-expansion-item expand-separator icon="mail" label="Blogs" caption="Add &amp; Update Blogs" default-closed >
                    <q-item clickable tag="a" href="/admin/addBlog">
                        <q-item-section avatar><q-icon name="schedule" /></q-item-section>
                        <q-item-section><q-item-label>Add Blog</q-item-label></q-item-section>
                    </q-item>
                    <q-item clickable tag="a" href="/admin/blogs">
                        <q-item-section avatar><q-icon name="schedule" /></q-item-section>
                        <q-item-section><q-item-label>Blog Lists</q-item-label></q-item-section>
                    </q-item>
                    <!-- <q-expansion-item :header-inset-level="1" :content-inset-level="1" expand-separator icon="schedule" label="Add Blog">
                    <q-card>
                    </q-card> -->
                    <!-- </q-expansion-item> -->
                </q-expansion-item>
            </q-list>
            <q-list class="rounded-borders">
                <q-expansion-item expand-separator icon="mail" label="Blogs" caption="Add &amp; Update Blogs" default-closed >
                    <q-item clickable tag="a" href="/admin/addBlog">
                        <q-item-section avatar><q-icon name="schedule" /></q-item-section>
                        <q-item-section><q-item-label>Add Blog</q-item-label></q-item-section>
                    </q-item>
                    <q-item clickable tag="a" href="/admin/blogs">
                        <q-item-section avatar><q-icon name="schedule" /></q-item-section>
                        <q-item-section><q-item-label>Blog Lists</q-item-label></q-item-section>
                    </q-item>
                </q-expansion-item>
            </q-list>
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
