<script setup lang="ts">
import { mdiHistory, mdiMagnify } from '@mdi/js';
import { ref } from 'vue';
import generateUID from '@/helpers/generateUID';

type SearchInputProps = {
  initialValue?: string
  hint?: string[]
}

const props = defineProps<SearchInputProps>();
const emit = defineEmits<{
  search: [value: string]
}>();

const input = ref(props.initialValue ?? '');
const showHint = ref(false);

const onClickHint = (hint: string) => {
  input.value = hint;
  showHint.value = false;
  emit('search', input.value);
};

const onKeydownEnter = () => {
  showHint.value = false;
  emit('search', input.value);
} 
</script>

<template>
  <div v-click-outside="() => showHint = false" class="w-100">
    <v-text-field
      v-model="input"
      bg-color="white"
      hide-details
      :prepend-inner-icon="mdiMagnify"
      variant="outlined"
      type="text"
      @keydown.enter="onKeydownEnter"
      @focusin="showHint = true"
    />

    <div v-if="hint" class="position-absolute w-100 elevation-1 z-index-1">
      <div v-show="showHint">
        <div
          v-for="value in hint"
          :key="`${value}-${generateUID()}`"
          class="w-100 pa-4 bg-white rounded-b-lg cursor-pointer"
          @click="onClickHint(value)"
        >
          <v-icon
            color="grey-darken-2 mr-2"
            :icon="mdiHistory"
          />

          {{ value }}
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.z-index-1 {
  z-index: 1;
}
</style>