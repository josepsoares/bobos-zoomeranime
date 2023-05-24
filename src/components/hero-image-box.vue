<script lang="ts" setup>
import { reactive } from "vue";

const { img } = defineProps<{
  img: string;
}>();

const styleObject = reactive({
  backgroundImage: `linear-gradient(to bottom, rgba(255, 192, 203, 0.4) 0%, rgba(255, 192, 203, 0.2) 30%, #1919197d 70%, #191919 90%)`,
});
</script>

<template>
  <div
    :class="`relative mb-6 flex h-[70vh] w-full flex-col items-center justify-center border-2 border-lightPurple`"
  >
    <img
      :style="styleObject"
      class="absolute top-0 left-0 -z-10 h-full w-full object-cover opacity-20"
      :src="img"
      alt=""
    />
    <slot />
  </div>
</template>
