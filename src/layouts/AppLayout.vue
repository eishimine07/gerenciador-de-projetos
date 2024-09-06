<script setup lang="ts">
import { onBeforeMount } from 'vue';
import { useRoute } from 'vue-router';
import AppHeader from '@/components/AppHeader.vue';
import useProjectsStore from '@/stores/projects';

const route = useRoute();
const projectsStore = useProjectsStore();

onBeforeMount(() => {
  projectsStore.fetchProjects();
})
</script>

<template>
  <v-app class="full-screen">
    <AppHeader
      v-if="!route.meta.hideHeader"
      :show-action="route.meta.showHeaderAction"
    />

    <v-main class="main">
      <RouterView />
    </v-main>
  </v-app>
</template>

<style scoped lang="scss">
.full-screen {
  height: 100dvh;
  width: 100dvw;
}

.main {
  background-color: #F4F2FF;
}
</style>
