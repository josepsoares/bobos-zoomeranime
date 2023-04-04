import { z, defineCollection } from "astro:content";

const media = defineCollection({
  schema: z.object({
    title: z.string(),
    nativeTitle: z.string(),
    img: z.string(),
    releaseDate: z.string(),
    preface: z.string(),
    characterQuotes: z.array(
      z.object({
        quote: z.string(),
        character: z.string(),
      })
    ),
    scores: z.object({
      animation: z.number(),
      soundtrack: z.number(),
      narrative: z.number(),
      characters: z.number(),
    }),
    rating: z.object({
      overallScore: z.number(),
      text: z.string(),
      img: z.string(),
    }),
  }),
});

export const collections = {
  movies: media,
  "tv-shows": media,
};
