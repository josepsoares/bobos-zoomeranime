import { useQuery } from 'react-query'
import type IContent from '@utils/ts/IContent'
import { IMediaItem } from '@utils/ts/aniListApiTypes'

const fetcher = async (search: string): Promise<IMediaItem> => {
  const query = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify({
      query: `query {
            Media (search: "${search}", type: ANIME) {
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

  return getData.data
}

export const useContentMediaQuery = (
  searchTitle: string
): { isLoading: boolean; data: IMediaItem; error: unknown } => {
  const { data, error } = useQuery({
    queryKey: ['content', searchTitle],
    queryFn: () => fetcher(searchTitle)
  })

  return { isLoading: !error && !data, data, error }
}
