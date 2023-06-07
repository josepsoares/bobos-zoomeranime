<script lang="ts" setup>
import type { ICharacter } from "@utils/ts/aniListApiTypes";

const { data } = defineProps<{
  data: ICharacter[];
}>();
</script>

<template>
  <div
    class="grid grid-cols-1 gap-4 pb-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
  >
    <div
      v-for="char in data"
      class="flex flex-col gap-4 border-2 border-lightPurple md:flex-row"
    >
      <img
        class="h-28 w-20 object-cover"
        :alt="char.node.name.first || undefined"
        :src="char.node.image.large"
      />
      <div class="pt-2">
        <h2 class="text-2xl">
          {{ char.node.name?.first }}
          {{ char.node.name?.last }}
        </h2>
        <p class="italic">{{ char.role.toLowerCase() }} character</p>
        <p v-if="char.voiceActors">
          VA(s):
          <span v-for="voiceActor in char.voiceActors">
            {{ voiceActor.name.full }}
          </span>
        </p>
      </div>
    </div>
  </div>
</template>
