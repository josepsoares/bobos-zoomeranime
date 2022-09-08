import Tag from 'utils/ts/interfaces/Tag'
import Character from 'utils/ts/interfaces/Character'
import Studio from 'utils/ts/interfaces/Studio'
import Staff from 'utils/ts/interfaces/Staff'
import Review from 'utils/ts/interfaces/Review'

interface MediaItem {
  Media: {
    title: {
      romaji: string
      native: string
    }
    bannerImage: string
    episodes: number | null
    duration: number
    startDate: {
      day: number
      month: number
      year: number
    }
    averageScore: number
    trailer: {
      id: string
    }
    tags: Tag[]
    genres: string[]
    characters: {
      edges: Character[]
    }
    studios: {
      edges: Studio[]
    }
    staff: {
      edges: Staff[]
    }
    reviews: {
      edges: Review[]
    }
    siteUrl: string
    idMal: number
  }
}

export default MediaItem
