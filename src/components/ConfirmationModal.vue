<script setup lang="ts">
import { mdiTrashCanOutline } from '@mdi/js';
import useProjectsStore from '@/stores/projects';

type ConfirmationModalProps = {
  projectId: number
  projectTitle: string
}

const props = defineProps<ConfirmationModalProps>();
const show = defineModel('open', { type: Boolean });

const projectsStore = useProjectsStore();

const onClickConfirm = () => {
  projectsStore.deleteProject(props.projectId);
  show.value = false;
}
</script>

<template>
  <v-dialog
    v-model="show"
    persistent
  > 
    <v-card
      class="w-100 ma-auto text-center overflow-visible"
      max-width="582"
    >
      <v-avatar
        class="elevation-4 avatar"
        color="primary"
        :icon="mdiTrashCanOutline"
        size="64"
      />

      <v-card-item class="pt-12">
        <v-card-title class="text-indigo-darken-4">
          {{ $t('component.confirmationModal.title') }}
        </v-card-title>
      </v-card-item>

      <v-divider class="mx-6"/>

      <v-card-text class="pa-6 pt-8 text-grey-darken-2 text-body-1">
        <p class="mb-3">
          {{ $t('component.confirmationModal.description') }}
        </p>

        <b class="text-h5">
          {{ projectTitle }}
        </b>
      </v-card-text>

      <v-card-actions class="pa-6 pt-2 actions-wrapper">
        <v-btn
          block
          variant="outlined"
          @click="show = false"
        >
          {{ $t('general.cancel') }}
        </v-btn>

        <v-btn
          block
          variant="flat"
          @click="onClickConfirm"
        >
          {{ $t('general.confirm') }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>


<style lang="scss" scoped>
.avatar {
  left: calc(50% - 32px);
  position: absolute;
  top: -32px;
}

.actions-wrapper {
  column-gap: 32px;
  display: grid;
  grid-template-columns: 1fr 1fr;
}
</style>
