<script setup lang="ts">
import { ref } from "vue";
import { vElementSize } from "@vueuse/components";
import { tv } from "tailwind-variants";

import LeftArrowIcon from "@icons/bx-left-arrow-alt.svg?component";
import RightArrowIcon from "@icons/bx-right-arrow-alt.svg?component";
import RoundedSquareIcon from "@icons/bxs-square-rounded.svg?component";

const { data } = defineProps<{
  data: {
    quote: string;
    character: string;
  }[];
}>();

/* const quoteButton = tv({
  base: "bg-transparent border-0 p-2 my-0 mx-2 active:bg hover:bg",
  variants: {
    active: {
      true: "bg-blue-500 text-white",
      false: "bg-purple-500 text-white",
    },
  },
  compoundVariants: [{ size: ["sm", "md"], class: "px-3 py-1" }],
  defaultVariants: { active: false },
}); */

const quoteRef = ref(data[0]);
const quoteIndexRef = ref(0);

const contentHeight = ref(100);

function onResize({ width, height }: { width: number; height: number }) {
  const heightRef = Math.floor(height);
  contentHeight.value = heightRef;
}

function handleBtnQuotes(action: "next" | "previous") {
  const updateQuote =
    action === "next" ? quoteIndexRef.value + 1 : quoteIndexRef.value - 1;
  quoteRef.value = data[updateQuote];
}

function handleCircleBtnQuotes(index: number) {
  quoteIndexRef.value = index;
  quoteRef.value = data[index];
}

// const isActive = index === displayedQuote
</script>

<template>
  <div class="mt-10 w-full">
    <h2
      class="mb-4 bg-gradient-to-r from-teal-200 to-pink-300 bg-clip-text font-manrope text-3xl font-semibold text-transparent"
    >
      frases memoravéis explanadas pelas personagens
    </h2>

    <div v-element-size="onResize" class="items-center justify-center">
      <p class="mb-3 text-xl">
        <i>{{ quoteRef.quote }}</i> -
        <b>{{ quoteRef.character }}</b>
      </p>

      <div class="items-center justify-center">
        <button
          class=""
          :disabled="quoteIndexRef <= 0 && true"
          @click="handleBtnQuotes('previous')"
        >
          <LeftArrowIcon class="fill-lightGrey" />
        </button>

        <button
          v-for="(_, index) in data"
          class=""
          @click="() => handleCircleBtnQuotes(index)"
        >
          <RoundedSquareIcon class="fill-lightGrey" />
        </button>

        <button
          class=""
          :disabled="quoteIndexRef >= data.length - 1 && true"
          @click="() => handleBtnQuotes('next')"
        >
          <RightArrowIcon class="fill-lightGrey" />
        </button>
      </div>
    </div>
  </div>
</template>
