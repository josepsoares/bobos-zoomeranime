/* GraphQL */
const contentPageQuery = `
  query GetContent($search: String) {
    Media (search: $search, type: ANIME) {
      bannerImage
      episodes
      duration
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
          node {
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
      staff(sort: RELEVANCE, page: 1) {
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
          }
        }
      }
      reviews {
        edges {
          node {
            summary
            rating
          }
        }
      }
      siteUrl
      idMal
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
