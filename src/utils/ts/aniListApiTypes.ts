export interface ICharacter {
  role: string
  node: {
    image: {
      large: string
    }
    name: {
      first: string | null
      last: string | null
    }
  }
}

export interface IReview {
  node: {
    summary: string
    rating: number
  }
}

export interface IStaff {
  role: string
  node: {
    name: {
      full: string
      native: string
    }
    image: {
      large: string
    }
  }
}

export interface ITag {
  category: string
  name: string
  isGeneralSpoiler: boolean
}

export interface IStudio {
  id: number
  isMain: true
  node: {
    name: string
    siteUrl: string
  }
}

export interface IMediaItem {
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
    tags: ITag[]
    genres: string[]
    characters: {
      edges: ICharacter[]
    }
    studios: {
      edges: IStudio[]
    }
    staff: {
      edges: IStaff[]
    }
    reviews: {
      edges: IReview[]
    }
    siteUrl: string
    idMal: number
  }
}
