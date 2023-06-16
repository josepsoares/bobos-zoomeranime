import rss, { pagesGlobToRssItems } from "@astrojs/rss";
import { getCollection } from 'astro:content';

export async function get(context) {
  const films = await getCollection('films');
  const tvShows = await getCollection('tv-shows');

  return rss({
    title: "bobo's zoomeranime",
    description: "a página web onde o bobo divaga sobre as suas animações nipónicas e 'zoomers' favoritas",
    site: context.site,
    items: [
      ...films.map((film) => ({
        title: film.data.title,
        pubDate: post.data.pubDate,
        preface: film.data.preface,
        link: `/blog/${film.slug}/`,
      })), 
      ...tvShows.map((tvShow) => ({
        title: tvShow.data.title,
        pubDate: tvShow.data.pubDate,
        preface: tvShow.data.preface,
        link: `/blog/${tvShow.slug}/`,
      }))
    ],
    customData: `<language>pt-pt</language>`,
  });
}
