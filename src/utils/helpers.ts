import { CollectionEntry } from "astro:content";

/**
 * returns a new array that contains a subset of the input `arrayToPaginate`, consisting of items
 * that belong to a specified page index and have a specified number of items per page.
 *
 * @param arrayToPaginate - The input array to paginate.
 * @param pageIndex - the index of the page to retrieve, starting from 0.
 * @param itemsPerPage - the maximum number of items to include on each page.
 * @returns a new array containing the items belonging to the specified page.
 *
 * the function assumes that the input array is zero-indexed.
 * the `pageIndex` argument is also zero-indexed, so a `pageIndex` value of 0 corresponds to the first page.
 *
 * if `pageIndex` is negative or greater than the maximum possible index, the function returns an empty array.
 * if `itemsPerPage` is negative or zero, the function returns the original `arrayToPaginate` array.
 */
export function paginateContentItemsArr<
  T extends CollectionEntry<"films"> | CollectionEntry<"tv-shows">
>(arrayToPaginate: T[], pageIndex: number, itemsPerPage: number): T[] {
  const indexOfLastItem = pageIndex * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = arrayToPaginate.slice(indexOfFirstItem, indexOfLastItem);
  return currentItems;
}

/**
 * returns an array containing a specified number of randomly-selected items from the input array.
 *
 * @param arr - the input array from which to select random items.
 * @param numberOfItemsToReturn - the number of items to randomly select and return from the input array.
 * @returns an array containing the specified number of randomly-selected items from the input array.
 *
 * the function uses the Fisher-Yates shuffle algorithm to randomly shuffle the input array. The algorithm works
 * by iterating through the array from the last element to the first element, and swapping each element with a
 * randomly-selected element that comes before it in the array. This ensures that each element has an equal chance
 * of being selected, and that the selected elements are randomly distributed throughout the array.
 */
export function getRandomItemsFromArr<T>(
  arr: T[],
  numberOfItemsToReturn: number
): T[] {
  const shuffled = [...arr];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled.slice(0, numberOfItemsToReturn);
}

/**
 * https://github.com/rodneylab/sveltekit-share-buttons/blob/main/src/lib/utilities/device.js
 * returns true if the device is thought to be a mobile or tablet
 */
export function isMobileDevice() {
  return typeof window !== "undefined"
    ? /(android|iphone|ipad|mobile)/i.test(window.navigator.userAgent)
    : null;
}
