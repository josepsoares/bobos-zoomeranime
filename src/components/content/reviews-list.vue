<script setup lang="ts">
import type { IReview } from "@utils/ts/aniListApiTypes";

const { reviews } = defineProps<{
  reviews: IReview[];
}>();

console.log(reviews)
</script>

<template>
  <div class="-mx-3 md:flex items-start">
    <div v-for="item in reviews" class="border-lightPurple border bg-gray-800 p-7 md:w-1/3 shadow-md">
        <p class="line-clamp-3 font-manrope text-center text-xl font-semibold mb-2">
          <span class="text-lightBlue mr-0.5 font-bold">🙶</span>
            {{item.node.summary}}
          <span class="text-lightBlue ml-0.5 font-bold">🙷</span>
        </p>
        <p class="text-center">{{ item.node.score }} / 100</p>
        <p>{{ item.node.rating }} {{ item.node.ratingAmount }}</p>
        <div class="flex justify-end mt-4">
          <a 
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex underline transition-colors decoration-2 active:fill-lightBlue hover:fill-lightBlue active:text-lightBlue hover:text-lightBlue decoration-lightPurple" :href="item.node.siteUrl">
            <span class="text-sm opacity-70">
              <i>review</i> na íntegra
            </span>
          </a>
        </div>
      </div>
  </div>
  <!-- <masonry-wall :items="reviews" :column-width="300" :max-columns="3" :gap="16" class="mb-10">
    <template #default="{ item }">
      <div class="border-lightPurple flex w-full flex-col border bg-gray-800 p-7 shadow-md">
        <p class="line-clamp-3 font-manrope text-center text-xl font-semibold mb-2">
          <span class="text-lightBlue mr-0.5 font-bold">🙶</span>
            {{item.node.summary}}
          <span class="text-lightBlue ml-0.5 font-bold">🙷</span>
        </p>
        <p class="text-center">{{ item.node.score }} / 100</p>
        <p>{{ item.node.rating }} {{ item.node.ratingAmount }}</p>
        <div class="flex justify-end mt-4">
          <a 
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex underline transition-colors decoration-2 active:fill-lightBlue hover:fill-lightBlue active:text-lightBlue hover:text-lightBlue decoration-lightPurple" :href="item.node.siteUrl">
            <span class="text-sm opacity-70">
              <i>review</i> na íntegra
            </span>
          </a>
        </div>
      </div>
    </template>
  </masonry-wall> -->
</template>