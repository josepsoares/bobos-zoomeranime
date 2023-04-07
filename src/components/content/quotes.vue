<script setup lang="ts">
import { reactive, ref } from "vue";
import { vElementSize } from "@vueuse/components";
import { tv } from "tailwind-variants";

import LeftArrowIcon from "@icons/bx-left-arrow-alt.svg?component";
import RightArrowIcon from "@icons/bx-left-arrow-alt.svg?component";
import RoundedSquareIcon from "@icons/bxs-square-rounded.svg?component";

const { data } = defineProps<{
  data: {
    quote: string;
    character: string;
  }[];
}>();

/* 
const quoteButton = styled('button', {
  color: '$lightPurple',
  backgroundCcolor: 'transparent',
  transition: '$normal',
  border: 0,
  padding: '$2',
  margin: '0 $4',

  '&:hover, &:active': {
    backgroundColor: 'rgba(88, 111, 124, 0.25)'
  },

  '&:disabled': {
    opacity: 0.3,

    '&:hover, &:active': {
      backgroundColor: 'transparent'
    }
  },

  svg: {
    display: 'flex',
    alignItems: 'center'
  },

  variants: {
    active: {
      true: {
        color: '$lightBlue',
        backgroundColor: 'rgba(199, 155, 178, 0.25)'
      }
    }
  }
})
*/

const quoteButton = tv({
  base: "bg-transparent border-0 p-2 my-0 mx-2 active:bg hover:bg",
  variants: {
    active: {
      true: "bg-blue-500 text-white",
      false: "bg-purple-500 text-white",
    },
  },
  compoundVariants: [{ size: ["sm", "md"], class: "px-3 py-1" }],
  defaultVariants: { active: false },
});

interface QuoteState {
  displayedQuote: number;
  toggle: boolean;
}

const quoteState = reactive<QuoteState>({
  displayedQuote: 0,
  toggle: false,
});

const { displayedQuote } = quoteState;

const contentHeight = ref(100);

function onResize({ width, height }: { width: number; height: number }) {
  const heightRef = Math.floor(height);
  contentHeight.value = heightRef;
}

const handleBtnQuotes = (action: boolean) => {
  quoteState.toggle = true;
  setTimeout(() => {
    const updateQuote = action ? displayedQuote + 1 : displayedQuote - 1;
    quoteState.displayedQuote = updateQuote;
    quoteState.toggle = false;
  }, 300);
};

const handleCircleBtnQuotes = (index: number) => {
  quoteState.toggle = true;
  setTimeout(() => {
    quoteState.displayedQuote = index;
    quoteState.toggle = false;
  }, 300);
};

// const isActive = index === displayedQuote
</script>

<template>
  <div ref="{quotesContainerRef}" class="w-full py-20 px-4">
    <BgGradientBox>
      <h2 class="w-full text-center">fancy quotes proclaimed in this piece</h2>

      <div v-element-size="onResize" class="items-center justify-center">
        <p class="px-2 pb-3">
          <i>{{ data[displayedQuote].quote }}</i> -{' '}
          <b>{{ data[displayedQuote].character }}</b>
        </p>

        <div class="items-center justify-center">
          <button
            class=""
            :disabled="displayedQuote <= 0 && true"
            @onClick="handleBtnQuotes(false)"
          >
            <LeftArrowIcon name="bx-left-arrow-alt" />
          </button>

          <button
            v-for="(_, index) in data"
            class=""
            @onClick="handleCircleBtnQuotes(index)"
          >
            <RoundedSquareIcon name="bxs-square-rounded" />
          </button>

          <button
            class=""
            :disabled="displayedQuote >= data.length - 1 && true"
            @onClick="handleBtnQuotes(true)"
          >
            <RightArrowIcon name="bx-right-arrow-alt" />
          </button>
        </div>
      </div>
    </BgGradientBox>
  </div>
</template>
