<script lang="ts" setup>
import JapaneseHeading from "@components/jp-heading.vue";
import type { ICharacter } from "@utils/ts/aniListApiTypes";

const { data } = defineProps<{
  data: ICharacter[];
}>();
</script>

<template>
  <div class="my-5">
    <h1
      class="bg-gradient-to-r from-teal-200 to-pink-300 bg-clip-text pb-4 font-manrope text-5xl font-bold text-transparent"
    >
      stinky main characters
      <JapaneseHeading left="0" top="-25%">ボボ の 電波な奴</JapaneseHeading>
    </h1>
    <div class="flex flex-row flex-wrap gap-4">
      <div v-for="char in data" class="flex flex-col">
        <img
          class="h-24 w-16"
          :alt="char.node.name.first || undefined"
          :src="char.node.image.large"
        />
        <h5 class="pt-2">
          {{ char.node.name?.first }} <br />
          {{ char.node.name?.last }}
        </h5>
      </div>
    </div>
  </div>
</template>
