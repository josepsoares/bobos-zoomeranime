/* GraphQL */
const contentPageQuery = (search: string) => `
  query {
    Media (search: "${search}", type: ANIME) {
      id
      bannerImage
      episodes
      duration
      source
      popularity
      startDate {
        day
        month
        year
      }
      averageScore
      trailer {
        id
      }
      genres
      tags {
        category
        name
        isGeneralSpoiler
      }
      characters(role: MAIN) {
        edges {
          role
          voiceActors(language: JAPANESE) {
            siteUrl
            name {
              full
              native
              userPreferred
            }
            image {
              large
            }
          }
          node {
            gender
            favourites
            image {
              large
            }
            name {
              native
              first
              last
            }
          }
        }
      }
      studios {
        edges {
          id
          isMain
          node {
            name
            siteUrl
          }
        }
      }
      staff(sort: RELEVANCE, page: 1, perPage: 8) {
        edges {
          role
          node {
            name {
              full
              native
            }
            image {
              large
            }
            siteUrl
          }
        }
      }
      reviews(page: 1, perPage: 6, sort: RATING_DESC) {
        edges {
          node {
            summary
            rating
            score
            ratingAmount
            siteUrl
          }
        }
      }
      siteUrl
      idMal
      externalLinks {
        site
        url
      }
    }
  }
`;

/* GraphQL */
const contentMainPageQuery = `
  query GetContent($search: String) {
    Media (search: $search, type: ANIME) {
      bannerImage
      episodes
      duration
      averageScore
      genres
      siteUrl
      idMal
      startDate {
        day
        month
        year
      }
      tags {
        category
        name
        isGeneralSpoiler
      } 
    }
  }
`;

export { contentPageQuery, contentMainPageQuery };
