import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import useProjectsStore from './projects';
import normalizeString from '@/helpers/normalizeString';
import addSearchHistory from '@/services/history/addSearchHistory';
import getAllSearchHistory from '@/services/history/getAllSearchHistory';

const useSearchProjectsStore = defineStore('searchProject', () => {
  const projectsStore = useProjectsStore();
  const search = ref('');
  const history = ref<string[]>([]);
  const result = computed(
    () => {
      const normalizedValue = normalizeString(search.value);

      return projectsStore.projects.filter(
        (project) => normalizeString(project.title).includes(normalizedValue),
      );
    },
  );

  function fetchHistory(): void {
    history.value = getAllSearchHistory();
  }

  function addhHistory(search: string): void {
    addSearchHistory(search);

    history.value = getAllSearchHistory();
  }

  return {
    addhHistory,
    fetchHistory,
    history,
    result,
    search,
  };
});

export default useSearchProjectsStore;
