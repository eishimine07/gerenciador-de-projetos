<script setup lang="ts">
import { mdiArrowLeft } from '@mdi/js';
import { computed, onBeforeMount, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useDisplay } from 'vuetify';
import ProjectCard from '@/components/ProjectCard.vue';
import SearchInput from '@/components/SearchInput.vue';
import useSearchProjectsStore from '@/stores/searchProject';

const MIN_LENGTH = 3;

const route = useRoute();
const router = useRouter();
const searchProjectsStore = useSearchProjectsStore();
const { mdAndDown, smAndDown } = useDisplay();
const cardWidth = computed(() => {
  if (smAndDown.value) return 280;

  if (mdAndDown.value) return 300;

  return 320;
});

const search = (searchValue: string) => {
  if (searchValue.trim().length < MIN_LENGTH) return;

  searchProjectsStore.addhHistory(searchValue);

  router.replace({
    name: 'searchProject',
    query: { q: searchValue }
  });
}

const refresh = () => {
  const searchQuery = route.query.q?.toLocaleString() ?? '';

  searchProjectsStore.search = searchQuery;

  searchProjectsStore.fetchHistory();
}

onBeforeMount(() => refresh());

watch(
  () => route.query,
  () => refresh(),
);
</script>

<template>
  <SearchInput
    :initial-value="searchProjectsStore.search"
    :hint="searchProjectsStore.history"
    @search="search"
  />

  <div class="pa-10">
    <div class="my-6">
      <v-btn
        class="mb-2"
        :prepend-icon="mdiArrowLeft"
        variant="text"
        @click="router.back()"
      >
        {{ $t('general.back') }}
      </v-btn>
      
      <h1 class="title">
        {{ $t('view.searchProject.title') }}
      </h1>
    </div>
  
    <div class="d-flex flex-wrap ga-8 py-6">
      <div
        v-for="project in searchProjectsStore.result"
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