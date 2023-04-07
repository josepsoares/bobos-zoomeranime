<script lang="ts" setup>
import { CollectionEntry } from "astro:content";
import { ref, watch, onMounted, onUnmounted } from "vue";
import dayjs from "dayjs";
import {
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from "@headlessui/vue";

import ImageBox from "@components/imageBox.vue";
import CheckIcon from "@icons/bx-check.svg?component";

import { add } from "@utils/math";
import { dateFormat, contentItemsPerPage } from "@utils/constants";
import { paginateContentItemsArr } from "@utils/helpers";

const props = defineProps<{
  items: CollectionEntry<any>[];
  itemType: "movies" | "tv-shows";
  maxPage: number;
}>();

const sortOptions = [
  { id: "name-asc", name: "nome ▴" },
  { id: "name-desc", name: "nome ▾" },
  { id: "date-asc", name: "data de lançamento ▴" },
  { id: "date-desc", name: "data de lançamento ▾" },
];

const scrollComponent = ref<HTMLElement | null>(null);
const displayedItems = ref<CollectionEntry<any>[]>(
  paginateContentItemsArr(props.items, 1, contentItemsPerPage)
);
const pageNum = ref(1);
const selectedOrder = ref(sortOptions[0]);

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});

watch(selectedOrder, async (newOrder, _) => {
  reorderDisplayedItems(newOrder.id);
});

const handleScroll = () => {
  let element = scrollComponent.value;
  if (
    element !== null &&
    element?.getBoundingClientRect().bottom < window.innerHeight
  ) {
    const updatedPageNum = add(pageNum.value, 1);
    if (updatedPageNum <= props.maxPage) {
      displayedItems.value = displayedItems.value.concat(
        paginateContentItemsArr(
          props.items,
          updatedPageNum,
          contentItemsPerPage
        )
      );
      pageNum.value = updatedPageNum;
    }
  }
};

/**
 * func to reorder the displayed items arrray according to the
 * value chosen in the select by the user
 */
const reorderDisplayedItems = (order: string) => {
  const updateDisplayedItems = displayedItems.value.sort((a, b) => {
    if (order === "name-asc") {
      return a.data.title < b.data.title ? -1 : 1;
    } else if (order === "name-desc") {
      return a.data.title > b.data.title ? -1 : 1;
    } else if (order === "date-asc") {
      return dayjs(a.data.releaseDate, dateFormat).isAfter(
        dayjs(b.data.releaseDate, dateFormat)
      )
        ? 1
        : -1;
    } else if (order === "date-desc") {
      return dayjs(a.data.releaseDate, dateFormat).isBefore(
        dayjs(b.data.releaseDate, dateFormat)
      )
        ? 1
        : -1;
    } else {
      return 0;
    }
  });

  displayedItems.value = updateDisplayedItems;
};
</script>

<template>
  <div>
    <div class="flex flex-col items-start pb-6">
      <p class="pb-2 text-sm">ordenar por:</p>
      <Listbox v-model="selectedOrder">
        <div class="relative mt-1 min-w-[200px]">
          <ListboxButton
            class="relative w-full cursor-pointer rounded-lg bg-white py-2 pl-3 pr-10 text-left text-darkBlue shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm"
            >{{ selectedOrder.name }}</ListboxButton
          >
          <ListboxOptions
            class="absolute z-20 mt-1 max-h-60 w-full cursor-pointer overflow-auto rounded-md bg-white py-1 text-base text-darkBlue shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
          >
            <ListboxOption
              v-slot="{ active, selected }"
              v-for="option in sortOptions"
              class=""
              :key="option.id"
              :value="option"
              as="template"
            >
              <li
                :class="[
                  active ? 'bg-lightBlue text-darkPurple' : 'text-gray-900',
                  'relative cursor-default select-none py-2 pl-10 pr-4',
                ]"
              >
                <span
                  :class="[
                    selected ? 'font-medium' : 'font-normal',
                    'block truncate',
                  ]"
                  >{{ option.name }}</span
                >
                <span
                  v-if="selected"
                  class="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600"
                >
                  <CheckIcon class="h-5 w-5" aria-hidden="true" />
                </span>
              </li>
            </ListboxOption>
          </ListboxOptions>
        </div>
      </Listbox>
    </div>
    <div
      ref="scrollComponent"
      class="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 md:gap-6 xl:grid-cols-4 xl:gap-10"
    >
      <a
        v-for="item in displayedItems"
        :href="`/${props.itemType}/${item.slug}`"
      >
        <ImageBox
          h="50vh"
          :image="item.data.img"
          :title="item.data.title"
          :native-title="item.data.nativeTitle"
        />
      </a>
    </div>
  </div>
</template>
