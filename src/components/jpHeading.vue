<script lang="ts" setup>
const { top = "-10%", left = "40%" } = defineProps<{
  top?: string
  left?: string
}>()
</script>
<template>
  <span
    :class="`text-mediumBlue top-[${top}] left-[${left}] absolute -z-10 flex w-full justify-center break-keep opacity-30`">
    <slot />
  </span>
</template>
