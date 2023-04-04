<script lang="ts" setup>
import { reactive } from "vue";

const { h, image, title, nativeTitle } = defineProps<{
  h: string;
  image: string;
  title: string;
  nativeTitle: string;
}>();

console.log(h, image);

const styleObject = reactive({
  height: h,
  backgroundImage: `url('${image}')`,
});
</script>

<template>
  <div
    :style="styleObject"
    class="opacity-1 group relative w-full bg-cover bg-center p-0 shadow-sm"
  >
    <aside
      class="transition-all, relative z-10 m-0 flex h-full items-center justify-center text-center tracking-widest opacity-80"
    >
      <h2 class="m-0 max-w-[70%] border-2 border-lightPurple p-4 text-white">
        {{ title }}
      </h2>
      <h3
        class="absolute m-0 max-w-[70%] translate-x-0 translate-y-0 break-words font-normal text-lightBlue opacity-25"
      >
        {{ nativeTitle }}
      </h3>
    </aside>
  </div>
</template>

<!-- const ImageBoxEl = styled('div', {
  '&:before': {
    zIndex: 0,
    position: 'absolute',
    content: '',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    opacity: 0.85,
    transition: '$normal',
    backgroundImage: '$blueGradient'
  },

  '&:hover:before, &:active:before, &:hover > aside, &:active > aside': {
    opacity: 0
  },
}) -->
