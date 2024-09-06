<script setup lang="ts">
import {
  mdiCalendarCheckOutline,
  mdiCalendarTodayOutline,
  mdiDotsHorizontalCircle,
  mdiSquareEditOutline,
  mdiTrashCanOutline,
  mdiStar,
  mdiStarOutline,
} from '@mdi/js';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import ConfirmationModal from '@/components/ConfirmationModal.vue';
import useProjectsStore from '@/stores/projects';

type ProjectCardProps = {
  client: string
  coverUrl?: string
  deadline: Date
  favorite: boolean
  id: number
  start: Date
  title: string
  width: number
}

defineProps<ProjectCardProps>();

const router = useRouter();
const projectsStore = useProjectsStore();
const showAlert = ref(false);
</script>

<template>
  <v-card :width="width">
    <v-img
      class="align-end"
      cover
      height="231"
      :src="coverUrl ?? '/placeholder.png'"
    >
      <div class="d-flex align-center justify-end">
        <v-btn
          :color="favorite ? 'yellow-darken-2' : 'white'"
          density="compact"
          :icon="favorite ? mdiStar : mdiStarOutline"
          :ripple="false"
          size="x-large"
          slim
          variant="plain"
          @click="projectsStore.updateProject(id, { favorite: !favorite })"
        />

        <v-menu>
          <template #activator="{ props }">
            <v-btn
              color="white"
              density="compact"
              :icon="mdiDotsHorizontalCircle"
              :ripple="false"
              size="x-large"
              slim
              variant="plain"
              v-bind="props"
            />
          </template>

          <v-list rounded="lg">
            <v-list-item
              class="cursor-pointer"
              :prepend-icon="mdiSquareEditOutline"
              :title="$t('general.edit')"
              @click="router.push({ name: 'editProject', params: { id }})"
            />

            <v-divider />

            <v-list-item
              class="cursor-pointer"
              :prepend-icon="mdiTrashCanOutline"
              :title="$t('general.delete')"
              @click="showAlert = true"
            />
          </v-list>
        </v-menu>
      </div>
    </v-img>

    <v-card-item class="pa-6 pb-4">
      <v-card-title class="text-indigo-darken-4">
        {{ title }}
      </v-card-title>

      <v-card-subtitle class="text-grey-darken-2 text-subtitle-1">
        <b class="mr-1">{{ $t('general.client') }}:</b>

        {{ client }}
      </v-card-subtitle>
    </v-card-item>

    <v-divider class="mx-6"/>

    <v-card-text class="pa-6 pt-4 text-grey-darken-2">
      <div class="d-flex ga-4 text mb-4">
        <v-icon :icon="mdiCalendarTodayOutline" />

        <span>{{ $d(start, 'shortFullMonth') }}</span>
      </div>

      <div class="d-flex ga-4">
        <v-icon :icon="mdiCalendarCheckOutline" />

        <span>{{ $d(deadline, 'shortFullMonth') }}</span>
      </div>
    </v-card-text>
  </v-card>

  <ConfirmationModal
    :project-id="id"
    :open="showAlert"
    :project-title="title"
  />
</template>


<style lang="scss" scoped>
.avatar {
  left: calc(50% - 32px);
  position: absolute;
  top: -32px;
}

.actions {
  column-gap: 32px;
  display: grid;
  grid-template-columns: 1fr 1fr;
}
</style>
