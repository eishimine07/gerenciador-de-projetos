<script setup lang="ts">
import { mdiArrowLeft } from '@mdi/js';
import { useRouter } from 'vue-router';
import ProjectForm from '@/components/ProjectForm.vue';
import Project from '@/models/project';
import useProjectsStore from '@/stores/projects';

const projectsStore = useProjectsStore();
const router = useRouter();

const onSubmit = (data: Omit<Project, 'id' | 'createdAt' | 'favorite'>) => {
  projectsStore.createProject({
    ...data,
    favorite: false,
  });
  router.push({ name: 'projects' });
};
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
        {{ $t('view.newProject.title') }}
      </h1>
    </div>
  
    <div class="d-flex align-center mx-auto my-10 form-wrapper">
      <ProjectForm @submit="onSubmit"/>
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