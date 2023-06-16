<script lang="ts" setup>
const { image, title, nativeTitle } = defineProps<{
  h: string;
  image: string;
  title: string;
  nativeTitle?: string;
}>();
</script>

<template>
  <div
    :style="{ backgroundImage: `url('${image}')` }"
    class="opacity-1 group relative h-[400px] w-full bg-cover bg-center p-0 shadow-sm transition-all duration-300 before:absolute before:left-0 before:top-0 before:z-0 before:h-full before:w-full before:bg-blueGradient before:opacity-90 before:transition-all before:duration-300 before:content-[''] hover:before:opacity-0 active:before:opacity-0 sm:h-[500px]"
  >
    <aside
      class="relative z-10 m-0 flex h-full items-center justify-center text-center tracking-wide"
    >
      <h2
        class="m-0 max-w-[70%] border-2 border-lightPurple bg-transparent p-4 font-manrope text-2xl font-bold text-white transition-all duration-200 group-hover:bg-gray-800/95 group-active:bg-gray-800/90 xl:text-3xl"
      >
        {{ title }}
      </h2>
      <h3
        v-if="nativeTitle"
        class="absolute m-0 max-w-[70%] translate-x-0 translate-y-0 break-words text-4xl font-normal text-lightPurple opacity-20 transition-opacity group-hover:opacity-0 group-active:opacity-0"
      >
        {{ nativeTitle }}
      </h3>
    </aside>
  </div>
</template>
