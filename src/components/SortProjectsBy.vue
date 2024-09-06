<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import useProjectsStore, { SortingOption } from '@/stores/projects';

const { t } = useI18n();
const projectsStore = useProjectsStore();
const options = [
  {
    title: t('component.sortProjectsBy.options.alphabetical'),
    value: SortingOption.ALPHABETICAL,
  },
  {
    title: t('component.sortProjectsBy.options.recentlyStarted'),
    value: SortingOption.RECENTLY_STARTED,
  },
  {
    title: t('component.sortProjectsBy.options.upcomingDeadline'),
    value: SortingOption.UPCOMING_DEADLINE,
  },
];
</script>

<template>
  <div class="wrapper">
    <v-select
      v-model="projectsStore.sortingOption"
      bg-color="white"
      density="compact"
      hide-details
      :items="options"
      variant="outlined"
    />
  </div>
</template>

<style lang="scss" scoped>
.wrapper {
  width: 296px;
}
</style>
