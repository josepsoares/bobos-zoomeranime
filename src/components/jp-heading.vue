<script lang="ts" setup>
import { reactive } from "vue";

const { top = "-10%", left = "40%" } = defineProps<{
  top?: string;
  left?: string;
}>();

const styles = reactive({
  left: left,
  top: top,
});
</script>

<template>
  <span
    :style="styles"
    :class="`absolute -z-10 flex w-full justify-center break-keep font-jp text-mediumBlue opacity-10`"
  >
    <slot />
  </span>
</template>
