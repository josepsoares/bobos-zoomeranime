import useSWR from 'swr'
import { Fetcher } from 'swr/dist/types'
import MediaItem from '@interfaces/MediaItem'

const fetcher: Fetcher<MediaItem> = async (search: string) => {
  console.log(search)
  const query = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify({
      query:
        `query {
            Media (search: "` +
        search +
        `", type: ANIME) {
                title{
                    romaji
                    native
                }
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
        `
    })
  }

  const request = await fetch('https://graphql.anilist.co', query)
  const getData = await request.json()
  // console.log('data =>', data)
  return getData.data
}

export const useMedia = (
  searchTitle: string
): { isLoading: boolean; data: MediaItem; error: string } => {
  const { data, error } = useSWR<MediaItem, string>(searchTitle, fetcher)

  return { isLoading: !error && !data, data, error }
}
