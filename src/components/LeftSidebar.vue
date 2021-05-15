<template>
    <div v-if="user">
        <div v-if="user.role=='SS'">
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
              <q-item-section avatar><q-icon name="schedule"/></q-item-section><q-item-section><q-item-label>Videos</q-item-label></q-item-section>
            </q-item>
            <q-item clickable tag="a" href="/admin/meta">
              <q-item-section avatar><q-icon name="schedule"/></q-item-section><q-item-section><q-item-label>Meta Tags</q-item-label></q-item-section>
            </q-item>
            <q-item clickable tag="a" href="/admin/addQuestion">
              <q-item-section avatar><q-icon name="schedule"/></q-item-section><q-item-section><q-item-label>Add Question</q-item-label></q-item-section>
            </q-item>
            <q-item clickable tag="a" href="/admin/questionBank">
              <q-item-section avatar><q-icon name="schedule"/></q-item-section><q-item-section><q-item-label>Question Bank</q-item-label></q-item-section>
            </q-item>
            <q-item clickable tag="a" href="/admin/institutes">
              <q-item-section avatar><q-icon name="schedule"/></q-item-section><q-item-section><q-item-label>Institutes</q-item-label></q-item-section>
            </q-item>
            <q-expansion-item expand-separator icon="mail" label="Question Bank" caption="Add &amp; Update Questions" default-closed >
              <q-item clickable tag="a" href="/admin/questionBank">
                  <q-item-section avatar><q-icon name="schedule" /></q-item-section>
                  <q-item-section><q-item-label>Question Bank</q-item-label></q-item-section>
              </q-item>
              <q-item clickable tag="a" href="/admin/addQuestion">
                  <q-item-section avatar><q-icon name="schedule" /></q-item-section>
                  <q-item-section><q-item-label>Add Question</q-item-label></q-item-section>
              </q-item>
              <q-item clickable tag="a" href="/admin/questionSummary">
                  <q-item-section avatar><q-icon name="schedule" /></q-item-section>
                  <q-item-section><q-item-label>Question Summary</q-item-label></q-item-section>
              </q-item>
            </q-expansion-item>
            <q-item> 
              <q-item-section avatar><q-icon name="schedule"/></q-item-section><q-item-section @click="logOut"><q-item-label>Log Out</q-item-label></q-item-section>
            </q-item>
        </div>
        <div v-if="user.role=='User'">
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
                </q-expansion-item>
            </q-list>
            <q-item><q-item-section avatar><q-icon name="schedule" /></q-item-section><q-item-section ><q-item-label>Log Out</q-item-label></q-item-section></q-item>
        </div>
        <div v-if="user.role=='Owner'">
          <q-list class="rounded-borders">
            <q-item clickable tag="a" href="/institute/team"><q-item-section avatar><q-icon name="schedule" /></q-item-section><q-item-section><q-item-label>Team</q-item-label></q-item-section></q-item>
            <q-item ><q-item-section avatar><q-icon name="schedule" /></q-item-section><q-item-section @click="logOut"><q-item-label>Log Out</q-item-label></q-item-section></q-item>
          </q-list>
        </div>
        <div v-if="user.role=='Admin'">
          <q-list class="rounded-borders">
            <q-item clickable tag="a" href="/institute/team"><q-item-section avatar><q-icon name="schedule" /></q-item-section><q-item-section><q-item-label>Team</q-item-label></q-item-section></q-item>
            <q-item ><q-item-section avatar><q-icon name="schedule" /></q-item-section><q-item-section @click="logOut"><q-item-label>Log Out</q-item-label></q-item-section></q-item>
          </q-list>
        </div>
        <div v-if="user.role=='School'">
            <q-list class="rounded-borders">
              <q-item clickable tag="a" href="/school/basics"><q-item-section avatar><q-icon name="schedule" /></q-item-section><q-item-section><q-item-label>Basics</q-item-label></q-item-section></q-item>
              <q-item clickable tag="a" href="/school/teacherAttendance"><q-item-section avatar><q-icon name="schedule" /></q-item-section><q-item-section><q-item-label>Attendance Register</q-item-label></q-item-section></q-item>
              <q-item clickable tag="a" href="/school/takeAttendance"><q-item-section avatar><q-icon name="schedule" /></q-item-section><q-item-section><q-item-label>Take Attendance</q-item-label></q-item-section></q-item>
              <q-item clickable tag="a" href="/school/groups"><q-item-section avatar><q-icon name="schedule" /></q-item-section><q-item-section><q-item-label>Groups</q-item-label></q-item-section></q-item>
              <q-item clickable tag="a" href="/school/leadManagement"><q-item-section avatar><q-icon name="schedule" /></q-item-section><q-item-section><q-item-label>Lead Management</q-item-label></q-item-section></q-item>
              <q-item clickable tag="a" href="/school/team"><q-item-section avatar><q-icon name="schedule" /></q-item-section><q-item-section><q-item-label>Team</q-item-label></q-item-section></q-item>
              <q-item clickable tag="a" href="/school/fees"><q-item-section avatar><q-icon name="schedule" /></q-item-section><q-item-section><q-item-label>Fee Structure</q-item-label></q-item-section></q-item>
              <q-item clickable tag="a" href="/school/feeManagement"><q-item-section avatar><q-icon name="schedule" /></q-item-section><q-item-section><q-item-label>Fee Management</q-item-label></q-item-section></q-item>
              <q-item clickable tag="a" href="/school/pendingFee"><q-item-section avatar><q-icon name="schedule" /></q-item-section><q-item-section><q-item-label>Pending Fee</q-item-label></q-item-section></q-item>
            </q-list>
            <q-item>
              <q-item-section avatar><q-icon name="schedule"/></q-item-section><q-item-section @click="logOut"><q-item-label>Log Out</q-item-label></q-item-section>
            </q-item> 
        </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'leftSidebar',
  methods: {
    // ...mapActions(['user']),
    logOut(e) {
      e.preventDefault();
      const data={
        id: this.user.id
      }
      this.$store.dispatch('logout', data);
    },
  },
  computed: {
    ...mapGetters(['user']),
  }, 
};
</script>
