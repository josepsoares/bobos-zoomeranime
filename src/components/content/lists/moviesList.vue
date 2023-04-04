<script lang="ts" setup>
import { CollectionEntry } from "astro:content";
import { ref, watch, onMounted } from "vue";
import dayjs from "dayjs";
import {
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from "@headlessui/vue";

import ImageBox from "@components/imageBox.vue";

import { add } from "@utils/math";
import { dateFormat, tvShowsPerPage } from "@utils/constants";

const props = defineProps<{
  movies: CollectionEntry<"movies">[];
  maxPage: number;
}>();

const sortOptions = [
  { id: "name-asc", name: "nome ▴" },
  { id: "name-desc", name: "nome ▾" },
  { id: "date-asc", name: "data de lançamento ▴" },
  { id: "date-desc", name: "data de lançamento ▾" },
];

const displayedMovies = ref<CollectionEntry<"movies">[]>([]);
const pageNum = ref(1);
const selectedOrder = ref("name-asc");
const root = ref(null);

/**
 * util func to calculate and return the items of the movie list
 * according to the page number
 */
const calculatePage = (
  caculateResults: CollectionEntry<"movies">[],
  index: number
) => {
  const indexOfLastResults = index * tvShowsPerPage;
  const indexOfFirstResults = indexOfLastResults - tvShowsPerPage;
  const currentResults = caculateResults.slice(
    indexOfFirstResults,
    indexOfLastResults
  );
  return currentResults;
};

function onIntersectionObserver([{ isIntersecting }]) {
  if (isIntersecting) {
    const updatedPageNum = add(pageNum.value, 1);
    if (updatedPageNum <= props.maxPage) {
      displayedMovies.value = displayedMovies.value.concat(
        calculatePage(props.movies, updatedPageNum)
      );

      pageNum.value = updatedPageNum;
    }
  }
}

/**
 * func to reorder the displayed items arrray according to the
 * value chosen in the select by the user
 */
const reorderDisplayedMovies = (order: string) => {
  const updateDisplayedMovies = displayedMovies.value.sort((a, b) => {
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

  displayedMovies.value = updateDisplayedMovies;
};

/**
 * set displayed tv shows onmount
 */
onMounted(() => {
  displayedMovies.value = calculatePage(props.movies, 1);
});

watch(selectedOrder, async (newOrder, _) => {
  reorderDisplayedMovies(newOrder);
});

// TODO => set intersection observer if its last element on list
</script>

<template>
  <div>
    <div class="flex flex-col items-end pb-6">
      <p class="pb-2 text-sm">ordenar por:</p>
      <Listbox v-model="selectedOrder">
        <ListboxButton>{{ selectedOrder }}</ListboxButton>
        <ListboxOptions>
          <ListboxOption
            v-for="option in sortOptions"
            :key="option.id"
            :value="option"
          >
            {{ option.name }}
          </ListboxOption>
        </ListboxOptions>
      </Listbox>
    </div>
    <div
      ref="root"
      class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4"
    >
      <a
        v-for="item in displayedMovies"
        :href="`/movies/${item.slug}`"
        v-intersection-observer="[onIntersectionObserver, { root }]"
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
