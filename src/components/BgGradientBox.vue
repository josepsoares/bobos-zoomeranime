<script lang="ts" setup>
const { img } = defineProps<{
  img: string
}>()
</script>

<template>
  <div
    :class="`relative -z-10 mb-6 flex w-full flex-col items-center justify-center py-64 opacity-100 before:bg-[linear-gradient(to bottom, rgba(255, 192, 203, 0.4) 0%, rgba(255, 192, 203, 0.2) 30%, #1919197d 80%, #191919 90%), url(${img})] before:absolute before:top-0 before:left-0 before:h-full before:w-full before:bg-cover before:bg-center before:opacity-30 before:grayscale before:content-['']`">
    <slot />
  </div>
</template>