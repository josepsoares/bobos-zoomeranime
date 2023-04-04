<script lang="ts" setup>
import JapaneseHeading from "@components/jpHeading.vue";
import type { ICharacter } from "@utils/ts/aniListApiTypes";

const { data } = defineProps<{
  data: ICharacter[];
}>();
</script>

<template>
  <h1 class="pb-4">
    stinky main characters
    <JapaneseHeading left="0" top="-25%">ボボ の 電波な奴</JapaneseHeading>
  </h1>
  <div class="flex flex-row flex-wrap justify-center gap-4">
    <div v-for="char in data" class="flex flex-col items-center justify-center">
      <img
        class="h-28 w-28"
        :alt="char.node.name.first || undefined"
        :src="char.node.image.large"
      />
      <h5 class="pt-2">
        {{ char.node.name?.first }} <br />
        {{ char.node.name?.last }}
      </h5>
    </div>
  </div>
</template>
