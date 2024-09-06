<script setup lang="ts">
import { mdiArrowLeft } from '@mdi/js';
import { onBeforeMount, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import ProjectForm from '@/components/ProjectForm.vue';
import Project from '@/models/project';
import getProjectById from '@/services/projects/getProjectById';
import useProjectsStore from '@/stores/projects';

const route = useRoute();
const router = useRouter();
const projectsStore = useProjectsStore();
const currentProject = ref<Project>();

const onSubmit = (data: Omit<Project, 'id' | 'createdAt' | 'favorite'>) => {
  if (!currentProject.value) return;

  projectsStore.updateProject(currentProject.value.id, data);
  router.push({ name: 'projects' });
};

onBeforeMount(() => {
  const projectId = route.params.id.toString();

  if (!projectId) {  
    // something is wrong
    return;
  }

  const project = getProjectById(parseInt(projectId));
  currentProject.value = project ?? undefined;
})
</script>

<template>
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
        {{ $t('view.editProject.title') }}
      </h1>
    </div>
  
    <div class="d-flex align-center mx-auto my-10 form-wrapper">
      <ProjectForm
        :client="currentProject?.client"
        :cover-url="currentProject?.coverUrl"
        :deadline="currentProject?.deadline"
        :title="currentProject?.title"
        :start="currentProject?.start"
        @submit="onSubmit"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.form-wrapper {
  max-width: 750px;
}

.title {
  color: #1F1283;
}
</style>