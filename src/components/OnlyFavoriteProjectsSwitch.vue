<script setup lang="ts">
import useProjectsStore from '@/stores/projects';

const projectsStore = useProjectsStore();
</script>

<template>
  <v-switch
    v-model="projectsStore.showOnlyFavorites"
    color="amber-darken-1"
    density="compact"
    hide-details
    inset
    :label="$t('component.onlyFavoriteProjectsSwitch.label')"
  ></v-switch>
</template>