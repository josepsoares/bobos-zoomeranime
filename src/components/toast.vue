<script setup lang="ts">
import { ref, watch } from "vue";

import SuccessIcon from "@icons/bx-check.svg?component";
import ErrorIcon from "@icons/bx-error.svg?component";
import CloseIcon from "@icons/bx-x.svg?component";

let timeoutVal = ref<null | ReturnType<typeof setTimeout>>(null);

const emit = defineEmits(["hideToast"]);

const props = defineProps({
  type: { type: String, required: true, default: "success" },
  text: { type: String, required: false, default: "everything is fine" },
  showToast: { type: Boolean, required: true, default: false },
});

watch(
  () => props.showToast,
  () => {
    if (timeoutVal.value) {
      clearTimeout(timeoutVal.value);
      timeoutVal.value = null;
    }

    timeoutVal.value = setTimeout(() => {
      emit("hideToast");
    }, 3000);
  }
);
</script>

<template>
  <Transition name="toast">
    <div
      :class="`toast-content fixed bottom-8 left-1/2 z-50 flex w-full max-w-xs -translate-x-1/2 transform cursor-pointer items-center border-2 border-lightPurple bg-[#13100e] p-4 text-gray-400 shadow-lg shadow-indigo-500`"
      v-show="props.showToast"
      @click="$emit('hideToast')"
    >
      <div
        class="inline-flex h-8 w-8 flex-shrink-0 items-center justify-center"
      >
        <SuccessIcon class="fill-green-500" v-if="props.type === 'success'" />
        <ErrorIcon class="fill-red-500" v-else />
      </div>
      <div class="ml-2 text-sm font-normal">
        <p>{{ props.text }}</p>
      </div>
      <button
        class="ml-auto flex h-8 w-8 items-center justify-center text-gray-500 hover:text-white focus:ring-2 focus:ring-lightPurple/50"
      >
        <CloseIcon class="" />
      </button>
    </div>
  </Transition>
</template>

<style scoped>
.toast-enter-from {
  @apply translate-y-32;
}

.toast-enter-to {
  @apply translate-y-0;
}

.toast-enter-active {
  transition: all 400ms ease-in-out;
}

.toast-leave-from {
  @apply translate-y-0;
}

.toast-leave-to {
  @apply translate-y-32;
}

.toast-leave-active {
  transition: all 400ms ease-in-out;
}
</style>
