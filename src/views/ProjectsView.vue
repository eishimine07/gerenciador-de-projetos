<script setup lang="ts">
import { mdiPlusCircleOutline } from '@mdi/js';
import { computed } from 'vue';
import { useDisplay } from 'vuetify';
import OnlyFavoriteProjectsSwitch from '@/components/OnlyFavoriteProjectsSwitch.vue';
import ProjectCard from '@/components/ProjectCard.vue';
import SortProjectsBy from '@/components/SortProjectsBy.vue';
import useProjectsStore from '@/stores/projects';

const projectsStore = useProjectsStore();
const { mdAndDown, smAndDown } = useDisplay();
const cardWidth = computed(() => {
  if (smAndDown.value) return 280;

  if (mdAndDown.value) return 300;

  return 320;
});
</script>

<template>
  <div class="pa-10">
    <div class="d-block d-sm-flex align-center ga-8">
      <h1 class="title mr-auto">
        {{ $t('view.projects.title', { n: projectsStore.filteredProjects.length }) }}
      </h1>

      <OnlyFavoriteProjectsSwitch />

      <SortProjectsBy />
    </div>
  
    <div class="d-flex flex-wrap ga-8 py-6">
      <div class="card-wrapper">
        <v-card
          border="md"
          flat
          height="100%"
          min-height="320"
          :to="{ name: 'newProject' }"
          :width="cardWidth"
        >
          <v-card-text class="d-flex flex-column ga-2 align-center justify-center text-grey-darken-2 h-100">
            <v-icon
              size="48"
              :icon="mdiPlusCircleOutline"
            />

            <h2>
              {{ $t('general.newProject') }}
            </h2>
          </v-card-text>
        </v-card>
      </div>

      <div
        v-for="project in projectsStore.filteredProjects"
        :key="project.id"
        class="card-wrapper"
      >
        <ProjectCard
          :id="project.id"
          :client="project.client"
          :cover-url="project.coverUrl"
          :deadline="project.deadline"
          :favorite="project.favorite"
          :start="project.start"
          :title="project.title"
          :width="cardWidth"
        />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.title {
  color: #1F1283;
}
</style>