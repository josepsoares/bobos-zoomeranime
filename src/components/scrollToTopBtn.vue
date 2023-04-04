<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";
import ChevronUp from "@icons/bx-chevron-up.svg?component";

const threshold = ref(false);

function scrollToTop() {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth",
  });
}

onMounted(() => {
  window.addEventListener(
    "scroll",
    () => (threshold.value = window.scrollY >= 650 ? true : false)
  );
});

onUnmounted(() => {
  window.removeEventListener(
    "scroll",
    () => (threshold.value = window.scrollY >= 650 ? true : false)
  );
});
</script>

<template>
  <button
    class="border-light-purple hover:bg-dark-blue active:bg-dark-blue hover:shadow-light-purple active:shadow-light-purple group fixed top-[90%] left-[82.5%] flex h-10 w-10 items-center justify-center border-2 border-solid bg-zinc-800 opacity-0 shadow-lg transition-all sm:left-[88%] md:left-[92.5%] lg:top-[90%] lg:left-[94%]"
    :class="{ threshold: 'opacity-1' }"
    :disabled="!threshold"
    @click="scrollToTop"
  >
    <ChevronUp
      class="fill-light-blue group-hover:fill-light-purple group-active:fill-light-purple transition-all"
    />
  </button>
</template>
