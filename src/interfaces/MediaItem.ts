import Tag from '@interfaces/Tag'
import Character from '@interfaces/Character'
import Studio from '@interfaces/Studio'
import Staff from '@interfaces/Staff'
import Review from '@interfaces/Review'

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
