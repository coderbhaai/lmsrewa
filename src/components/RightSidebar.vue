<template>
  <div>
    <q-list class="rounded-borders">
      <q-expansion-item expand-separator icon="mail" label="Inbox" caption="5 unread emails" default-closed >
        <q-expansion-item :header-inset-level="1" :content-inset-level="1" expand-separator icon="schedule" label="Postponed">
          <q-card>
          </q-card>
        </q-expansion-item>
      </q-expansion-item>
    </q-list>
  </div>
</template>

<script>
export default {
  name: 'rightSidebar',
};
</script>
