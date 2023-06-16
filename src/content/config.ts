import { z, defineCollection } from "astro:content";

const media = defineCollection({
  schema: z.object({
    title: z.string(),
    nativeTitle: z.string().optional(),
    img: z.string(),
    releaseDate: z.string(),
    pubDate: z.string(),
    preface: z.string(),
    rating: z.object({
      score: z.number(), 
      scoreExpression: z.string()
    }),
    draft: z.boolean().optional(),
  }),
});

export const collections = {
  films: media,
  "tv-shows": media,
};
