<script lang="ts" setup>
const { h, image, title, nativeTitle } = defineProps<{
  h: string;
  image: string;
  title: string;
  nativeTitle: string;
}>();
</script>

<template>
  <div
    :style="{ backgroundImage: `url('${image}')` }"
    class="opacity-1 group relative h-[400px] w-full bg-cover bg-center p-0 shadow-sm transition-all before:absolute before:top-0 before:left-0 before:z-0 before:h-full before:w-full before:bg-blueGradient before:opacity-90 before:transition-all before:content-[''] hover:before:opacity-0 active:before:opacity-0 sm:h-[500px]"
  >
    <aside
      class="relative z-10 m-0 flex h-full items-center justify-center text-center tracking-widest"
    >
      <h2
        class="m-0 max-w-[70%] border-2 border-lightPurple p-4 text-xl font-semibold text-white transition-all group-hover:bg-darkBlue/60 group-active:bg-darkBlue/60"
      >
        {{ title }}
      </h2>
      <h3
        class="absolute m-0 max-w-[70%] translate-x-0 translate-y-0 break-words text-4xl font-normal text-lightPurple opacity-30 transition-opacity group-hover:opacity-50 group-active:opacity-50"
      >
        {{ nativeTitle }}
      </h3>
    </aside>
  </div>
</template>
