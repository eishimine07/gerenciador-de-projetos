<script setup lang="ts">
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useDate, useDisplay } from 'vuetify';
import ImageInput from '@/components/ImageInput.vue';
import dateFormatISO8601 from '@/helpers/dateFormatISO8601';
import Project from '@/models/project';

type ProjectFormProps = {
  client: string
  coverUrl?: string
  deadline: Date
  title: string
  start: Date
}

const props = defineProps<Partial<ProjectFormProps>>();
const emit = defineEmits<{
  submit: [value: Omit<Project, 'id' | 'createdAt' | 'favorite'>]
}>();

const { t } = useI18n();
const { smAndUp } = useDisplay();
const date = useDate();
const clientField = ref(props.client);
const coverUrlField = ref(props.coverUrl);
const deadlineField = ref(props.deadline ? dateFormatISO8601(props.deadline) : undefined);
const titleField = ref(props.title);
const startField = ref(props.start ? dateFormatISO8601(props.start) : undefined);

const rules = {
  required: (value?: string) => {
    if (!value || value.trim() === '') return t('error.minWords', { n: 1 });

    return true
  },
  minTwoWords: (value?: string) => {
    const trimmed = value?.trim();

    if (!trimmed || trimmed.split(' ').length < 2) return t('error.minWords', { n: 2 });

    return true
  },
  validDate: (value?: string) => {
    if (!date.isValid(value)) return t('error.invalidDate');

    return true;
  }
}

const onSubmit = () => {
  if (!clientField.value || !deadlineField.value || !titleField.value || !startField.value) {
    return;
  }

  emit('submit', {
    client: clientField.value,
    coverUrl: coverUrlField.value,
    deadline: date.parseISO(deadlineField.value) as Date,
    title: titleField.value,
    start: date.parseISO(startField.value) as Date,
  });
}
</script>

<template>
  <v-form
    class="w-100 text-primary"
    validate-on="blur"
    @submit.prevent="onSubmit"
  >
    <p>
      {{ $t('component.projectForm.label.title') }}
    </p>

    <v-text-field
      v-model="titleField"
      bg-color="white"
      density="compact"
      :rules="[rules.minTwoWords]"
      variant="outlined"
      type="text"
    />

    <p>
      {{ $t('component.projectForm.label.client') }}
    </p>

    <v-text-field
      v-model="clientField"
      bg-color="white"
      density="compact"
      :rules="[rules.required]"
      variant="outlined"
      type="text"
    />

    <div :class="smAndUp && 'd-grid'">
      <div>
        <p>
          {{ $t('component.projectForm.label.start') }}
        </p>
    
        <v-text-field
          v-model="startField"
          bg-color="white"
          density="compact"
          :rules="[rules.validDate]"
          variant="outlined"
          type="date"
        />
      </div>

      <div>
        <p>
          {{ $t('component.projectForm.label.deadline') }}
        </p>
    
        <v-text-field
          v-model="deadlineField"
          bg-color="white"
          density="compact"
          :rules="[rules.validDate]"
          variant="outlined"
          type="date"
        />
      </div>
    </div>

    <p>
      {{ $t('component.projectForm.label.cover') }}
    </p>

    <ImageInput
      v-model="coverUrlField"
      class="mb-8"
    />

    <v-btn
      block
      type="submit"
    >
      {{ $t('component.projectForm.label.save') }}
    </v-btn>
  </v-form>
</template>

<style lang="scss" scoped>
.d-grid {
  column-gap: 2.5rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
}
</style>