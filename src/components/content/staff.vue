<script lang="ts" setup>
import { ref } from "vue";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  DialogDescription,
  TransitionRoot,
} from "@headlessui/vue";
import type { IStaff } from "@utils/ts/aniListApiTypes";

const isOpen = ref(false);

function setIsOpen(value) {
  isOpen.value = value;
}

const { data } = defineProps<{
  data: IStaff[];
}>();

const displayedStaff = data.slice(0, 6);

console.log(displayedStaff);
</script>

<template>
  <div>
    <h1
      class="relative bg-gradient-to-r from-teal-200 to-pink-300 bg-clip-text pb-4 font-manrope text-5xl font-bold text-transparent"
    >
      amazing humans who did this
      <JpHeading left="0" top="25%">ボボ の 電波な奴</JpHeading>
    </h1>
    <div class="flex flex-row flex-wrap gap-4">
      <div v-for="staff in displayedStaff" class="flex flex-col">
        <img
          width="100"
          height="100"
          :alt="staff.node.name.full"
          :src="staff.node.image.large"
        />
        <h5 class="pt-2">{{ staff.node.name.full }}</h5>
        <p>{{ staff.role }}</p>
      </div>
      <button @click="setIsOpen(true)">see all the staff</button>
    </div>
  </div>
  <TransitionRoot
    :show="isOpen"
    as="template"
    enter="duration-300 ease-out"
    enter-from="opacity-0"
    enter-to="opacity-100"
    leave="duration-200 ease-in"
    leave-from="opacity-100"
    leave-to="opacity-0"
  >
    <Dialog :open="isOpen" @close="setIsOpen" class="relative z-50">
      <!-- The backdrop, rendered as a fixed sibling to the panel container -->
      <div class="fixed inset-0 bg-black/30" aria-hidden="true" />

      <!-- Full-screen scrollable container -->
      <div class="fixed inset-0 overflow-y-auto">
        <!-- Container to center the panel -->
        <div class="flex min-h-full items-center justify-center p-4">
          <!-- The actual dialog panel -->
          <DialogPanel class="w-full max-w-sm rounded bg-white">
            <DialogTitle>Complete your order</DialogTitle>

            <DialogDescription>
              <div v-for="staff in data" class="flex flex-col">
                <img
                  width="100"
                  height="100"
                  :alt="staff.node.name.full"
                  :src="staff.node.image.large"
                />
                <h5 class="pt-2">{{ staff.node.name.full }}</h5>
                <p>{{ staff.role }}</p>
              </div>
            </DialogDescription>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
