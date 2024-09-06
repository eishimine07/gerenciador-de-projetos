import { defineStore } from 'pinia';
import { computed, readonly, ref } from 'vue';
import sortListOfObjects from '@/helpers/sortListOfObjects';
import Project from '@/models/project';
import createProjectService from '@/services/projects/createProject';
import deleteProjectService from '@/services/projects/deleteProject';
import getAllProjects from '@/services/projects/getAllProjects';
import updateProjectService from '@/services/projects/updateProject';

export enum SortingOption {
  'ALPHABETICAL',
  'RECENTLY_STARTED',
  'UPCOMING_DEADLINE',
}

function findProjectIndex(projects: Project[], id: number): number {
  const index = projects.findIndex((project) => project.id === id);

  if (index === -1) {
    throw new Error(`Projeto com id ${id} não foi encontrado`);
  }

  return index;
}

const useProjectsStore = defineStore('projects', () => {
  const projects = ref<Project[]>([]);
  const showOnlyFavorites = ref(false);
  const sortingOption = ref<SortingOption>(SortingOption.ALPHABETICAL);
  const filteredProjects = computed<Project[]>(() => {
    let result: Project[];

    if (showOnlyFavorites.value) {
      result = projects.value.filter((project) => project.favorite);
    } else {
      result = projects.value;
    }

    switch (sortingOption.value) {
      case SortingOption.RECENTLY_STARTED:
        return sortListOfObjects(result, 'start', 'desc');
      case SortingOption.UPCOMING_DEADLINE:
        return sortListOfObjects(result, 'deadline');
      default:
        return sortListOfObjects(result, 'title');
    }
  });

  function fetchProjects(): void {
    projects.value = getAllProjects();
  }

  function createProject(data: Omit<Project, 'id' | 'createdAt'>): void {
    const project = createProjectService(data);

    projects.value.push(project);
  }

  function updateProject(id: number, data: Partial<Project>): void {
    const index = findProjectIndex(projects.value, id);
    const project = updateProjectService({ ...projects.value[index], ...data });

    if (!project) return;

    projects.value[index] = project;
  }

  function deleteProject(id: number): void {
    const index = findProjectIndex(projects.value, id);

    deleteProjectService(id);
    projects.value.splice(index, 1);
  }

  return {
    createProject,
    deleteProject,
    fetchProjects,
    filteredProjects,
    projects: readonly(projects),
    showOnlyFavorites,
    sortingOption,
    updateProject,
  };
});

export default useProjectsStore;
