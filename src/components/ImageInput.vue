<script setup lang="ts">
import { mdiTrashCanOutline, mdiTrayArrowUp } from '@mdi/js';
import { ref } from 'vue';
import generateUID from '@/helpers/generateUID';

const url = defineModel({ type: String });

const input = ref<HTMLInputElement>();
const inputId = generateUID().toString();

const onClickRemoveImage = () => {
  if (input.value) {
    input.value.value = '';
    input.value.files = null;
  }
  url.value = undefined;
};

const onChangeImage = () => {
  const files = input.value?.files ?? [];

  if (files && files[0]) {
    const reader = new FileReader();

    reader.readAsDataURL(files[0]);
    reader.onload = () => {
      url.value = reader.result as string;
    };
  }
};
</script>

<template>
  <div>
    <div v-if="url">
      <v-img
        cover
        height="395"
        rounded="lg"
        :src="url"
      >
        <div class="d-flex justify-end">
          <div class="rounded-circle bg-white ma-4">
            <v-btn
              color="bg-white"
              density="compact"
              :icon="mdiTrashCanOutline"
              :ripple="false"
              size="large"
              slim
              variant="plain"
              @click="onClickRemoveImage"
            />
          </div>
        </div>
      </v-img>
    </div>

    <div
      v-else
      class="border-dashed rounded-lg pa-6 text-center"
    >
      <v-icon
        class="mb-4"
        color="grey-darken-2"
        :icon="mdiTrayArrowUp"
      />
  
      <p class="mb-6 text-grey-darken-2">
        {{ $t('component.imageInput.description') }}
      </p>
  
      <div class="cursor-pointer border-sm border-primary border-opacity-100 text-primary rounded-pill pa-2 ma-auto bg-white w-144px">
        <label class="cursor-pointer" :for="inputId">
          {{ $t('general.select') }}
        </label>

        <input
          :id="inputId"
          ref="input"
          accept="image/*"
          class="d-none"
          type="file"
          @change="onChangeImage"
        />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.w-144px {
  width: 144px;
}
</style>