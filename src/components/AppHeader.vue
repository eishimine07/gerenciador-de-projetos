<script setup lang="ts">
import { mdiMagnify } from '@mdi/js';
import AppIcon from '@/components/icons/AppIcon.vue';

type AppHeaderProps = {
  showAction?: boolean
}

defineProps<AppHeaderProps>();
</script>

<template>
  <header class="d-flex flex-row align-center w-100 px-16 header">
    <div class="w-100 text-center">
      <AppIcon />
    </div>

    <v-btn
      v-if="showAction"
      color="white"
      density="compact"
      :icon="mdiMagnify"
      size="x-large"
      slim
      variant="text"
      :to="{ name: 'searchProject' }"
    />
  </header>
</template>

<style lang="scss" scoped>
.header {
  background: #1C1930;
  height: 80px;
}
</style>